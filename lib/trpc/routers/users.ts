import { RoleSchema } from '@/src/generated/zod'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { z } from 'zod'
import { router, publicProcedure, managerProcedure, adminProcedure, protectedProcedure } from '../trpc'
import { TRPCError } from '@trpc/server'

export const signupSchema = z.object({
	email: z.string().email(),
	name: z.string().min(2),
	password: z.string().min(8),
	companyName: z.string().min(2),
})

export const createUserSchema = z.object({
	email: z.string().email(),
	name: z.string().min(2),
	role: RoleSchema.optional(),
	hourlyRate: z.number().optional().nullable(),
	password: z.string().min(8),
	companyId: z.string(),
})

export const createEmployeeSchema = z.object({
	email: z.string().email(),
	name: z.string().min(2),
	hourlyRate: z.number().optional().nullable(),
	password: z.string().min(8),
})

export const updateEmployeeSchema = z.object({
	id: z.string(),
	email: z.string().email().optional(),
	name: z.string().min(2).optional(),
	hourlyRate: z.number().optional().nullable().optional(),
})

export const updateProfileSchema = z.object({
	name: z.string().min(2).optional(),
	email: z.email().optional(),
	newPassword: z.string().min(8).optional(),
})

export const userRouter = router({
	signup: publicProcedure.input(signupSchema).mutation(async ({ ctx, input }) => {
		const { password, companyName, ...userData } = input

		const existingUser = await ctx.prisma.user.findUnique({
			where: { email: input.email },
		})

		if (existingUser) {
			throw new TRPCError({
				code: 'CONFLICT',
				message: 'Użytkownik z tym emailem już istnieje',
			})
		}

		const existingCompany = await ctx.prisma.company.findFirst({
			where: { name: companyName },
		})

		if (existingCompany) {
			throw new TRPCError({
				code: 'CONFLICT',
				message: 'Firma z tym nazwą już istnieje',
			})
		}

		// Create user in Supabase first
		const { data, error } = await supabaseAdmin.auth.admin.createUser({
			email: input.email,
			password,
		})

		if (error || !data.user) {
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Błąd podczas tworzenia użytkownika, spróbuj ponownie później',
			})
		}

		// Create company
		const company = await ctx.prisma.company.create({
			data: {
				name: companyName,
			},
		})

		// Create user in Prisma with Supabase ID
		return ctx.prisma.user.create({
			data: {
				...userData,
				id: data.user.id,
				role: 'MANAGER',
				company: { connect: { id: company.id } },
			},
		})
	}),

	create: adminProcedure.input(createUserSchema).mutation(async ({ ctx, input }) => {
		const { password, companyId, ...userData } = input

		const existing = await ctx.prisma.user.findUnique({
			where: { email: input.email },
		})

		if (existing)
			throw new TRPCError({
				code: 'CONFLICT',
				message: 'Użytkownik z tym emailem już istnieje',
			})

		const { data, error } = await supabaseAdmin.auth.admin.createUser({
			email: input.email,
			password,
			email_confirm: true,
		})

		if (error || !data.user)
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Błąd podczas tworzenia użytkownika, spróbuj ponownie później',
			})

		return ctx.prisma.user.create({
			data: {
				...userData,
				id: data.user.id,
				company: { connect: { id: companyId } },
			},
		})
	}),

	getUser: publicProcedure.query(async ({ ctx }) => {
		return { user: ctx.user, profile: ctx.profile }
	}),

	updateProfile: protectedProcedure.input(updateProfileSchema).mutation(async ({ ctx, input }) => {
		const { name, email, newPassword } = input

		if (email || newPassword) {
			const updateData: { email?: string; password?: string } = {}
			if (email) updateData.email = email
			if (newPassword) updateData.password = newPassword

			const { error } = await supabaseAdmin.auth.admin.updateUserById(ctx.user.id, updateData)

			if (error)
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Błąd podczas aktualizacji danych autoryzacji',
				})
		}

		const updateData: { name?: string; email?: string } = {}
		if (name && ctx.profile.role === 'MANAGER') updateData.name = name
		if (email) updateData.email = email

		return ctx.prisma.user.update({
			where: { id: ctx.user.id },
			data: updateData,
			select: { id: true, name: true, email: true, role: true, hourlyRate: true },
		})
	}),

	getUserById: managerProcedure.input(z.string()).query(async ({ ctx, input }) => {
		const user = await ctx.prisma.user.findUnique({
			where: { id: input },
			select: {
				id: true,
				email: true,
				name: true,
				hourlyRate: true,
			},
		})

		if (!user) throw new TRPCError({ code: 'NOT_FOUND', message: 'Nie znaleziono użytkownika' })

		return user
	}),

	createEmployee: managerProcedure.input(createEmployeeSchema).mutation(async ({ ctx, input }) => {
		const { password, ...userData } = input

		const existing = await ctx.prisma.user.findUnique({
			where: { email: input.email },
		})

		if (existing)
			throw new TRPCError({
				code: 'CONFLICT',
				message: 'Użytkownik z tym emailem już istnieje',
			})

		const { data, error } = await supabaseAdmin.auth.admin.createUser({
			email: input.email,
			password,
			email_confirm: true,
		})

		if (error || !data.user)
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Błąd podczas tworzenia użytkownika, spróbuj ponownie później',
			})

		return ctx.prisma.user.create({
			data: {
				...userData,
				id: data.user.id,
				company: { connect: { id: ctx.profile.companyId } },
			},
		})
	}),

	updateEmployee: managerProcedure.input(updateEmployeeSchema).mutation(async ({ ctx, input }) => {
		const { id, ...data } = input

		const existing = await ctx.prisma.user.findFirst({
			where: { id, companyId: ctx.profile.companyId },
		})

		if (!existing) throw new TRPCError({ code: 'NOT_FOUND', message: 'Nie znaleziono pracownika' })

		return ctx.prisma.user.update({
			where: { id },
			data,
		})
	}),

	deleteEmployee: managerProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
		const existing = await ctx.prisma.user.findFirst({
			where: { id: input, companyId: ctx.profile.companyId },
		})

		if (!existing) throw new TRPCError({ code: 'NOT_FOUND', message: 'Nie znaleziono pracownika' })

		await ctx.prisma.user.delete({ where: { id: input } })

		const { error } = await supabaseAdmin.auth.admin.deleteUser(input)

		if (error)
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Błąd podczas usuwania użytkownika z systemu autoryzacji',
			})

		return { success: true }
	}),

	getAllEmployees: managerProcedure.query(async ({ ctx }) => {
		const employees = await ctx.prisma.user.findMany({
			where: { companyId: ctx.profile.companyId, role: 'EMPLOYEE' },
			select: {
				id: true,
				name: true,
				email: true,
				hourlyRate: true,
				workLogs: {
					where: { paid: false },
					select: { hours: true },
				},
			},
		})

		return employees.map(e => ({
			id: e.id,
			name: e.name,
			email: e.email,
			hourlyRate: e.hourlyRate,
			unpaidHours: e.workLogs.reduce((sum, log) => sum + log.hours, 0),
		}))
	}),
})

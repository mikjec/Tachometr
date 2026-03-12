import { RoleSchema } from '@/src/generated/zod'
import { supabase } from '@/lib/supabase/client'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { z } from 'zod'
import { router, publicProcedure, managerProcedure, protectedProcedure, adminProcedure } from '../trpc'
import { UserCreateInputSchema, UserUpdateInputSchema } from '@/src/generated/zod'
import { TRPCError } from '@trpc/server'

export const createUserSchema = z.object({
	email: z.string().email(),
	name: z.string().min(2),
	role: RoleSchema.optional(),
	hourlyRate: z.number().optional().nullable(),
	password: z.string().min(8),
	companyId: z.string(),
})

export const createEmployeeSchema = z.object({
	email: z.email(),
	name: z.string().min(2),
	hourlyRate: z.number().optional().nullable(),
	password: z.string().min(8),
})

export const userRouter = router({
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

	getUserById: managerProcedure.input(z.string()).query(async ({ ctx, input }) => {
		const user = await ctx.prisma.user.findUnique({
			where: { id: input },
		})

		if (!user) throw new TRPCError({ code: 'NOT_FOUND', message: 'Nie znaleziono użytkownika' })

		return user
	}),
})

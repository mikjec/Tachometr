import { RoleSchema } from '@/src/generated/zod'
import { supabase } from '@/lib/supabase/client'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { z } from 'zod'
import { router, publicProcedure, managerProcedure, protectedProcedure, adminProcedure } from '../trpc'
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

		const { data, error } = await supabaseAdmin.auth.admin.createUser({
			email: input.email,
			password,
		})

		if (error || !data.user) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' })

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
})

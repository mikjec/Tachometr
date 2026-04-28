import { z } from 'zod'
import { router, managerProcedure } from '../trpc'
import { TRPCError } from '@trpc/server'

export const companyRouter = router({
	create: managerProcedure.input(z.object({ name: z.string().min(2) })).mutation(async ({ ctx, input }) => {
		const existing = await ctx.prisma.company.findFirst({
			where: { name: input.name },
		})

		if (existing) {
			throw new TRPCError({
				code: 'CONFLICT',
				message: 'Firma z tym nazwą już istnieje',
			})
		}

		const company = await ctx.prisma.company.create({
			data: {
				name: input.name,
			},
		})

		return company
	}),

	update: managerProcedure.input(z.object({ name: z.string().min(2) })).mutation(async ({ ctx, input }) => {
		const user = await ctx.prisma.user.findUnique({
			where: { id: ctx.profile.id },
			select: { companyId: true },
		})

		if (!user) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Użytkownik nie znaleziony',
			})
		}

		const company = await ctx.prisma.company.update({
			where: { id: user.companyId },
			data: { name: input.name },
		})

		return company
	}),

	getCompany: managerProcedure.query(async ({ ctx }) => {
		const user = await ctx.prisma.user.findUnique({
			where: { id: ctx.profile.id },
			select: { companyId: true },
		})

		if (!user) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Użytkownik nie znaleziony',
			})
		}

		const company = await ctx.prisma.company.findUnique({
			where: { id: user.companyId },
		})

		return company
	}),
})

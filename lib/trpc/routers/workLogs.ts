import { z } from 'zod'
import { router, publicProcedure, managerProcedure, protectedProcedure, adminProcedure } from '../trpc'
import { TRPCError } from '@trpc/server'
import { WorkLogUncheckedCreateInputSchema } from '@/src/generated/zod'

export const updateWorkLogSchema = z.object({
	id: z.string(),
	date: z.coerce.date(),
	hours: z.number().min(0.5).max(24),
	note: z.string().optional(),
})

export const workLogsRouter = router({
	getAll: protectedProcedure.query(async ({ ctx }) => {
		return ctx.prisma.workLog.findMany({
			where: { userId: ctx.profile.id },
			select: { id: true, date: true, hours: true, paid: true, note: true },
			orderBy: { date: 'desc' },
		})
	}),

	getByUserId: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
		const user = await ctx.prisma.user.findFirst({
			where: { id: input, companyId: ctx.profile.companyId },
		})

		if (!user) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Użytkownik nie istnieje',
			})
		}

		return ctx.prisma.workLog.findMany({
			where: { userId: input },
			select: { id: true, date: true, hours: true, paid: true, note: true },
			orderBy: { date: 'desc' },
		})
	}),

	create: protectedProcedure.input(WorkLogUncheckedCreateInputSchema).mutation(async ({ ctx, input }) => {
		const { hours, note, date } = input

		if (date > new Date()) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Nie można dodać wpisu z przyszłą datą',
			})
		}

		const existing = await ctx.prisma.workLog.findFirst({
			where: {
				userId: ctx.profile.id,
				date: date,
			},
		})

		if (existing)
			throw new TRPCError({
				code: 'CONFLICT',
				message: 'Wpis na ten dzień już istnieje',
			})

		return ctx.prisma.workLog.create({
			data: {
				hours: hours,
				date: date,
				note: note,
				userId: ctx.profile.id,
			},
		})
	}),

	update: protectedProcedure.input(updateWorkLogSchema).mutation(async ({ ctx, input }) => {
		const { hours, note, id, date } = input

		if (date > new Date()) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Nie można dodać wpisu z przyszłą datą',
			})
		}

		const existing = await ctx.prisma.workLog.findFirst({
			where: { userId: ctx.profile.id, id: id },
		})

		if (!existing)
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Nie odnaleziono wpisu',
			})

		const conflict = await ctx.prisma.workLog.findFirst({
			where: {
				userId: ctx.profile.id,
				date: date,
				NOT: { id: id },
			},
		})

		if (conflict) {
			throw new TRPCError({
				code: 'CONFLICT',
				message: 'Wpis na ten dzień już istnieje',
			})
		}

		return ctx.prisma.workLog.update({
			where: {
				id: id,
				userId: ctx.profile.id,
			},
			data: {
				hours: hours,
				date: date,
				note: note,
			},
		})
	}),

	delete: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
		const existing = await ctx.prisma.workLog.findFirst({
			where: {
				id: input,
				userId: ctx.profile.id,
			},
		})

		if (!existing)
			throw new TRPCError({
				code: 'CONFLICT',
				message: 'Nie można usunąć wpisu',
			})

		return ctx.prisma.workLog.delete({
			where: {
				id: input,
				userId: ctx.profile.id,
			},
		})
	}),
})

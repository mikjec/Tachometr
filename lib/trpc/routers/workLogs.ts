import { z } from 'zod'
import { router, protectedProcedure, managerProcedure } from '../trpc'
import { TRPCError } from '@trpc/server'

export const updateWorkLogSchema = z.object({
	id: z.string(),
	date: z.coerce.date(),
	hours: z.number().min(0.5).max(24),
	note: z.string().optional(),
})

export const createWorkLogSchema = z.object({
	hours: z.number().min(0.5).max(24),
	note: z.string().optional(),
	date: z.coerce.date(),
})

export const workLogsRouter = router({
	getAllForCompany: protectedProcedure.input(z.number()).query(async ({ input, ctx }) => {
		return ctx.prisma.workLog.findMany({
			where: {
				user: {
					companyId: ctx.profile.companyId,
				},
			},
			select: {
				id: true,
				date: true,
				hours: true,
				paid: true,
				note: true,
				user: {
					select: {
						id: true,
						name: true,
					},
				},
			},
			orderBy: { date: 'desc' },
			take: 10,
			skip: input - 10,
		})
	}),

	getPagesForCompany: protectedProcedure.query(async ({ ctx }) => {
		const count = await ctx.prisma.workLog.count({
			where: {
				user: {
					companyId: ctx.profile.companyId,
				},
			},
		})

		return Math.ceil(count / 10)
	}),

	getAll: protectedProcedure.input(z.number()).query(async ({ input, ctx }) => {
		return ctx.prisma.workLog.findMany({
			where: { userId: ctx.profile.id },
			select: { id: true, date: true, hours: true, paid: true, note: true },
			orderBy: { date: 'desc' },
			take: 10,
			skip: input - 10,
		})
	}),

	getById: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
		return ctx.prisma.workLog.findFirst({
			where: { id: input },
			select: { id: true, date: true, hours: true, paid: true, note: true },
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

	getPages: protectedProcedure.input(z.string().optional()).query(async ({ input, ctx }) => {
		const id = input ? ctx.profile.id : input

		const count = await ctx.prisma.workLog.count({
			where: { userId: id },
		})

		return Math.ceil(count / 10)
	}),

	create: protectedProcedure.input(createWorkLogSchema).mutation(async ({ ctx, input }) => {
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

		if (existing.paid) {
			throw new TRPCError({
				code: 'CONFLICT',
				message: 'Nie można edytować opłaconego wpisu',
			})
		}

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

		if (existing.paid) {
			throw new TRPCError({
				code: 'CONFLICT',
				message: 'Nie można usunąć opłaconego wpisu',
			})
		}

		return ctx.prisma.workLog.delete({
			where: {
				id: input,
				userId: ctx.profile.id,
			},
		})
	}),

	setPaid: protectedProcedure.input(z.array(z.string())).mutation(async ({ ctx, input }) => {
		if (input.length === 0) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Nie wybrano żadnych wpisów',
			})
		}

		const workLogs = await ctx.prisma.workLog.findMany({
			where: { id: { in: input } },
			include: { user: true },
		})

		if (workLogs.length !== input.length) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Niektóre wpisy nie zostały znalezione',
			})
		}

		const invalidLogs = workLogs.filter(log => log.user.companyId !== ctx.profile.companyId)
		if (invalidLogs.length > 0) {
			throw new TRPCError({
				code: 'FORBIDDEN',
				message: 'Nie masz uprawnień do oznaczania tych wpisów jako opłacone',
			})
		}

		return ctx.prisma.workLog.updateMany({
			where: { id: { in: input } },
			data: { paid: true },
		})
	}),

	togglePaid: managerProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
		const workLog = await ctx.prisma.workLog.findFirst({
			where: { id: input },
		})

		if (!workLog) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Nie znaleziono wpisu',
			})
		}

		return ctx.prisma.workLog.update({
			where: { id: input },
			data: { paid: !workLog.paid },
		})
	}),
})

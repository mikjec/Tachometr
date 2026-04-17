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

function assertNotFutureDate(date: Date) {
	if (date > new Date()) {
		throw new TRPCError({
			code: 'BAD_REQUEST',
			message: 'Nie można dodać wpisu z przyszłą datą',
		})
	}
}

export const workLogsRouter = router({
	// =========================
	// COMPANY WORKLOGS
	// =========================
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
			take: 20,
			skip: input - 20,
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

		return Math.ceil(count / 20)
	}),

	// =========================
	// USER WORKLOGS
	// =========================
	getAll: protectedProcedure.input(z.number()).query(async ({ input, ctx }) => {
		return ctx.prisma.workLog.findMany({
			where: { userId: ctx.profile.id },
			select: {
				id: true,
				date: true,
				hours: true,
				paid: true,
				note: true,
			},
			orderBy: { date: 'desc' },
			take: 10,
			skip: input - 10,
		})
	}),

	getByUserId: protectedProcedure
		.input(z.object({ userId: z.string(), offset: z.number() }))
		.query(async ({ ctx, input }) => {
			const user = await ctx.prisma.user.findFirst({
				where: {
					id: input.userId,
					companyId: ctx.profile.companyId,
				},
			})

			if (!user) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'Użytkownik nie istnieje',
				})
			}

			return ctx.prisma.workLog.findMany({
				where: { userId: input.userId },
				select: {
					id: true,
					date: true,
					hours: true,
					paid: true,
					note: true,
				},
				orderBy: { date: 'desc' },
				take: 20,
				skip: input.offset - 20,
			})
		}),

	getPages: protectedProcedure.input(z.string().optional()).query(async ({ input, ctx }) => {
		const id = input ?? ctx.profile.id

		const count = await ctx.prisma.workLog.count({
			where: { userId: id },
		})

		return Math.ceil(count / 10)
	}),

	getPagesForUserId: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
		const user = await ctx.prisma.user.findFirst({
			where: {
				id: input,
				companyId: ctx.profile.companyId,
			},
		})

		if (!user) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Użytkownik nie istnieje',
			})
		}

		const count = await ctx.prisma.workLog.count({
			where: { userId: input },
		})

		return Math.ceil(count / 20)
	}),

	// =========================
	// SINGLE WORKLOG
	// =========================
	getById: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
		return ctx.prisma.workLog.findUnique({
			where: { id: input },
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
		})
	}),

	// =========================
	// CREATE
	// =========================
	create: protectedProcedure.input(createWorkLogSchema).mutation(async ({ ctx, input }) => {
		const { hours, note, date } = input

		assertNotFutureDate(date)

		try {
			return await ctx.prisma.workLog.create({
				data: {
					hours,
					date,
					note,
					userId: ctx.profile.id,
				},
			})
		} catch (e: unknown) {
			if (e instanceof Error && 'code' in e && e.code === 'P2002') {
				throw new TRPCError({
					code: 'CONFLICT',
					message: 'Wpis na ten dzień już istnieje',
				})
			}

			throw e
		}
	}),

	// =========================
	// UPDATE
	// =========================
	update: protectedProcedure.input(updateWorkLogSchema).mutation(async ({ ctx, input }) => {
		const { hours, note, id, date } = input

		assertNotFutureDate(date)

		const existing = await ctx.prisma.workLog.findUnique({
			where: { id },
		})

		if (!existing || existing.userId !== ctx.profile.id) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Nie odnaleziono wpisu',
			})
		}

		if (existing.paid) {
			throw new TRPCError({
				code: 'CONFLICT',
				message: 'Nie można edytować opłaconego wpisu',
			})
		}

		try {
			return await ctx.prisma.workLog.update({
				where: { id },
				data: { hours, date, note },
			})
		} catch (e: unknown) {
			if (e instanceof Error && 'code' in e && e.code === 'P2002') {
				throw new TRPCError({
					code: 'CONFLICT',
					message: 'Wpis na ten dzień już istnieje',
				})
			}

			throw e
		}
	}),

	// =========================
	// DELETE
	// =========================
	delete: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
		const existing = await ctx.prisma.workLog.findUnique({
			where: { id: input },
		})

		if (!existing || existing.userId !== ctx.profile.id) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Nie można usunąć wpisu',
			})
		}

		if (existing.paid) {
			throw new TRPCError({
				code: 'CONFLICT',
				message: 'Nie można usunąć opłaconego wpisu',
			})
		}

		return ctx.prisma.workLog.delete({
			where: { id: input },
		})
	}),

	// =========================
	// MANAGER ACTIONS
	// =========================
	setPaid: managerProcedure.input(z.array(z.string())).mutation(async ({ ctx, input }) => {
		if (input.length === 0) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Nie wybrano żadnych wpisów',
			})
		}

		const workLogs = await ctx.prisma.workLog.findMany({
			where: { id: { in: input } },
			include: {
				user: {
					select: {
						companyId: true,
					},
				},
			},
		})

		if (workLogs.length !== input.length) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Niektóre wpisy nie zostały znalezione',
			})
		}

		const invalid = workLogs.some(log => log.user.companyId !== ctx.profile.companyId)

		if (invalid) {
			throw new TRPCError({
				code: 'FORBIDDEN',
				message: 'Brak uprawnień',
			})
		}

		return ctx.prisma.workLog.updateMany({
			where: {
				id: { in: input },
				paid: false,
			},
			data: { paid: true },
		})
	}),

	togglePaid: managerProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
		const workLog = await ctx.prisma.workLog.findUnique({
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

import { initTRPC, TRPCError } from '@trpc/server'
import type { Context } from './context'
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create()
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router
export const publicProcedure = t.procedure

const isAuthed = t.middleware(({ ctx, next }) => {
	if (!ctx.user || !ctx.profile) {
		throw new TRPCError({ code: 'UNAUTHORIZED' })
	}

	return next({
		ctx: {
			...ctx,
			user: ctx.user,
			profile: ctx.profile, // od teraz TypeScript wie że nie jest null
		},
	})
})

export const protectedProcedure = t.procedure.use(isAuthed)

export const managerProcedure = protectedProcedure.use(({ ctx, next }) => {
	if (ctx.profile.role !== 'MANAGER' && ctx.profile.role !== 'ADMIN') {
		throw new TRPCError({ code: 'FORBIDDEN', message: 'Operacja niedozwolona, brak uprawnień' })
	}
	return next({ ctx })
})

export const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
	if (ctx.profile.role !== 'ADMIN') {
		throw new TRPCError({ code: 'FORBIDDEN', message: 'Operacja niedozwolona, brak uprawnień' })
	}
	return next({ ctx })
})

import { router } from '../trpc'
import { userRouter } from './users'
import { workLogsRouter } from './workLogs'

export const appRouter = router({
	user: userRouter,
	workLog: workLogsRouter
})
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter

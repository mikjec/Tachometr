import { router } from '../trpc'
import { userRouter } from './users'
import { workLogsRouter } from './workLogs'
import { companyRouter } from './companies'

export const appRouter = router({
	user: userRouter,
	workLog: workLogsRouter,
	company: companyRouter,
})
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter

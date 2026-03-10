// app/api/trpc/[trpc]/route.ts
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '@/lib/trpc/routers/index'
import { createContext } from '@/lib/trpc/context'

const handler = (req: Request) =>
	fetchRequestHandler({
		endpoint: '/api/trpc',
		req,
		router: appRouter,
		createContext,
		onError: ({ error }) => {
			console.error('tRPC error:', error)
		},
	})

export { handler as GET, handler as POST }

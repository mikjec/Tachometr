import TopPanel from '@/app/components/TopPanel'
import RecentLogs from './components/RecentLogs'
import { createContext } from '@/lib/trpc/context'
import { appRouter } from '@/lib/trpc/routers'

async function Page() {
	const context = await createContext()
	const caller = appRouter.createCaller(context)

	const logs = await caller.workLog.getNewestForCompany()

	return (
		<>
			<header>
				<TopPanel>Strona główna</TopPanel>
			</header>
			<main className='flex flex-col gap-4 md:gap-8 w-full h-full p-4 mx-auto max-w-280 mt-topPanel-height pt-topPanel-height'>
				<RecentLogs logs={logs} />
			</main>
		</>
	)
}

export default Page

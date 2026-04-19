import TopPanel from '@/app/components/TopPanel'
import RecentLogs from './components/RecentLogs'
import { prisma } from '@/lib/prisma/prisma'
import { createClient } from '@/lib/supabase/server'
import StatsChart from './components/StatsChart'
import { getMonthlyStats } from '@/lib/cache/companyStats'
import { th } from 'zod/v4/locales'

async function Page() {
	const supabase = await createClient()

	const {
		data: { user },
		error,
	} = await supabase.auth.getUser()

	if (error) {
		throw error
	}

	const profile = await prisma.user.findUnique({
		where: { id: user?.id },
	})

	if (!profile) throw new Error('Profil użytkownika nie został znaleziony')

	const start = new Date()
	start.setHours(0, 0, 0, 0)

	const end = new Date()
	end.setHours(23, 59, 59, 999)

	const logs = await prisma.workLog.findMany({
		where: {
			user: {
				companyId: profile.companyId,
			},
			userId: { not: profile.id },
			date: {
				gte: start,
				lte: end,
			},
		},
		orderBy: { createdAt: 'desc' },
	})

	const data: { month: string; hours: number }[] = await getMonthlyStats(profile.companyId)

	return (
		<>
			<header>
				<TopPanel>Strona główna</TopPanel>
			</header>
			<main className='flex flex-col gap-4 md:gap-8 w-full p-4 mx-auto max-w-280 pt-topPanel-height'>
				<RecentLogs logs={logs} />
				<StatsChart data={data} />
			</main>
		</>
	)
}

export default Page

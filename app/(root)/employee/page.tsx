import React from 'react'
import { prisma } from '@/lib/prisma/prisma'
import { createClient } from '@/lib/supabase/server'
import { StatsCards } from '@/app/(root)/employee/components/StatsCards'
import { RecentLogs } from '@/app/(root)/employee/components/RecentLogs'
import TopPanel from '@/app/components/TopPanel'
import CompanyHeader from '@/app/components/CompanyHeader'
import { Suspense } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'

async function Page() {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	const [unpaid, profile, recentLogs] = await Promise.all([
		prisma.workLog.aggregate({
			where: { userId: user!.id, paid: false },
			_sum: { hours: true },
		}),
		prisma.user.findUnique({
			where: { id: user!.id },
			select: { hourlyRate: true },
		}),
		prisma.workLog.findMany({
			where: { userId: user!.id },
			orderBy: { date: 'desc' },
			take: 5,
			select: { id: true, date: true, hours: true, paid: true, note: true },
		}),
	])

	const unpaidHours = unpaid._sum.hours ?? 0
	const hourlyRate = profile?.hourlyRate ?? 0

	return (
		<>
			<header>
				<TopPanel>Strona główna</TopPanel>
			</header>
			<main className='flex flex-col gap-4 md:gap-8 w-full h-full p-4 mx-auto max-w-280 pt-topPanel-height'>
				<CompanyHeader />

				<Suspense fallback={<Spinner />}>
					<StatsCards
						unpaidHours={unpaidHours}
						hourlyRate={hourlyRate}
					/>
				</Suspense>

				<div className='mx-auto flex items-center justify-center'>
					<Link
						href='/employee/workLogs/create'
						className='flex items-center justify-center gap-2 bg-white shadow-sm text-gray-500 px-4 py-4 rounded-2xl text-sm lg:text-lg font-medium hover:bg-gray-300 hover:text-gray-700 transition-colors'>
						<Plus className='size-6 lg:size-8' />
						<span>Dodaj wpis</span>
					</Link>
				</div>

				<Suspense fallback={<Spinner />}>
					<RecentLogs logs={recentLogs} />
				</Suspense>
			</main>
		</>
	)
}

export default Page

'use client'

import { useState } from 'react'
import { trpc } from '@/lib/trpc/provider'
import { Spinner } from '@/components/ui/spinner'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { refreshPath } from '@/lib/actions/actions'

function WorkLog({ id }: { id: string }) {
	const [error, setError] = useState<string | null>(null)

	const query = trpc.workLog.getById.useQuery(id, { staleTime: 1000 * 60 })

	const updatePaidMutation = trpc.workLog.togglePaid.useMutation({
		onSuccess: async () => {
			query.refetch()
			await refreshPath('/manage/workLogs')
			setError(null)
		},
		onError: err => {
			setError(err.message)
		},
	})

	if (query.isLoading)
		return (
			<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
				<Spinner className='size-10' />
			</div>
		)

	if (!query.data)
		return (
			<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500'>
				Nie znaleziono wpisu
			</div>
		)

	const workLog = query.data

	const handleTogglePaid = () => {
		updatePaidMutation.mutate(workLog.id)
		refreshPath('/manage/workLogs')
	}

	return (
		<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 md:gap-8 w-[90vw] h-[70vh] sm:w-[80vw] md:w-[70vw] md:h-[60vh] bg-white p-5 md:p-8 rounded-xl shadow-sm max-w-300'>
			<div className='flex items-center justify-between'>
				<h1 className='text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800'>
					{new Date(workLog.date).toLocaleDateString('pl-PL', {
						day: 'numeric',
						month: 'long',
						year: 'numeric',
					})}
				</h1>

				<Link
					href='/manage/workLogs'
					className='text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition-colors bg-gray-100 p-2 lg:p-3 rounded-4xl'>
					<ArrowLeft />
				</Link>
			</div>

			{error && <div className='p-3 rounded-xl bg-red-50 text-red-600 text-sm'>{error}</div>}

			{/* Responsywny Grid */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_2fr_1fr_1fr] gap-4 lg:gap-8'>
				<div className='flex flex-col gap-1'>
					<span className='text-xs text-gray-400 uppercase tracking-wide'>Godziny</span>
					<span className='text-xl lg:text-2xl font-semibold text-gray-800'>{workLog.hours}h</span>
				</div>
				<div className='flex flex-col gap-1'>
					<span className='text-xs text-gray-400 uppercase tracking-wide'>ID wpisu</span>
					<span className='text-base lg:text-lg font-medium text-gray-700 break-all'>{workLog.id}</span>
				</div>

				<div className='flex flex-col gap-1'>
					<span className='text-xs text-gray-400 uppercase tracking-wide'>Użytkownik</span>
					<Link
						className='text-base lg:text-lg font-medium text-gray-700 break-all'
						href={`/manage/employees/${workLog.user.id}/workLogs`}>
						{workLog.user.name}
					</Link>
				</div>

				<div className='flex flex-col gap-1'>
					<span className='text-xs text-gray-400 uppercase tracking-wide'>Status</span>
					{workLog.paid ? (
						<span className='w-fit px-3 py-1 rounded-full text-xs lg:text-sm font-medium bg-green-100 text-green-700'>
							Opłacone
						</span>
					) : (
						<span className='w-fit px-3 py-1 rounded-full text-xs lg:text-sm font-medium bg-yellow-100 text-yellow-700'>
							Oczekuje
						</span>
					)}
				</div>
			</div>

			<div className='flex flex-col gap-2 flex-1 min-h-0'>
				<span className='text-xs text-gray-400 uppercase tracking-wide'>Notatka</span>
				<div className='border border-gray-100 rounded-xl p-4 lg:p-6 text-sm lg:text-base text-gray-700 bg-gray-50 h-full overflow-y-auto'>
					{workLog.note ?? 'Brak notatki'}
				</div>
			</div>

			{/* Button to toggle paid status */}
			<div className='flex justify-end gap-3 pt-4 border-t border-gray-100'>
				<button
					onClick={handleTogglePaid}
					disabled={updatePaidMutation.isPending}
					className={`w-full lg:w-auto px-4 py-3 lg:py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer ${
						workLog.paid
							? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
							: 'bg-green-100 text-green-700 hover:bg-green-200'
					}`}>
					{updatePaidMutation.isPending && <Spinner className='size-4' />}
					{workLog.paid ? 'Oznacz jako nieopłacone' : 'Oznacz jako opłacone'}
				</button>
			</div>
		</div>
	)
}

export default WorkLog

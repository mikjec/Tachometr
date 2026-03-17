'use client'

import React from 'react'
import { trpc } from '@/lib/trpc/provider'
import { Spinner } from '@/components/ui/spinner'
import { Suspense } from 'react'

function WorkLogs() {
	const { data, isLoading } = trpc.workLog.getAll.useQuery()

	return (
		<div className='flex flex-col gap-2 w-[60vw] m-auto bg-white p-4 rounded-lg scroll-y'>
			<div className='grid grid-cols-4 px-6 py-2 text-sm'>
				<span className=' text-gray-400 uppercase tracking-wide'>Data</span>
				<span className=' text-gray-400 uppercase tracking-wide'>Godziny</span>
				<span className=' text-gray-400 uppercase tracking-wide'>Notatka</span>
				<span className=' text-gray-400 uppercase tracking-wide'>Status</span>
			</div>

			{data ? (
				data?.map(log => (
					<div
						key={log.id}
						className='grid grid-cols-4 bg-white border border-gray-100 rounded-xl px-6 py-4 items-center shadow-sm hover:shadow-md transition-shadow'>
						<span className='text-sm font-medium text-gray-800'>
							{new Date(log.date).toLocaleDateString('pl-PL', {
								day: 'numeric',
								month: 'short',
								year: 'numeric',
							})}
						</span>

						<span className='text-sm font-semibold text-gray-800'>{log.hours}h</span>

						<span className='text-sm text-gray-600 truncate pr-4'>{log.note ?? '—'}</span>

						<div>
							{log.paid ? (
								<span className='px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700'>Opłacone</span>
							) : (
								<span className='px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700'>
									Oczekuje
								</span>
							)}
						</div>
					</div>
				))
			) : (
				<p className='mx-auto text-gray-500'>Nie znaleziono danych</p>
			)}
		</div>
	)
}

export default WorkLogs

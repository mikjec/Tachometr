'use client'

import React from 'react'
import { trpc } from '@/lib/trpc/provider'
import { Spinner } from '@/components/ui/spinner'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import clsx from 'clsx'

function WorkLogs() {
	const [page, setPage] = useState(1)

	const { data, isLoading } = trpc.workLog.getAll.useQuery(page * 10)
	const pages = trpc.workLog.getPages.useQuery()

	if (isLoading) return <Spinner />

	return (
		<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 w-[70vw] bg-white p-4 rounded-lg h-[80vh] max-w-300 max-h-250 '>
			<div className='grid grid-cols-[1fr_1fr_3fr_1fr] px-6 py-2 text-sm'>
				<span className=' text-gray-400 uppercase tracking-wide'>Data</span>
				<span className=' text-gray-400 uppercase tracking-wide'>Godziny</span>
				<span className=' text-gray-400 uppercase tracking-wide'>Notatka</span>
				<span className=' text-gray-400 uppercase tracking-wide'>Status</span>
			</div>

			<div className='overflow-y-scroll h-full'>
				{isLoading && <Spinner className='size-8' />}
				{data && !isLoading ? (
					data?.map(log => (
						<Link
							key={log.id}
							href={`/employee/workLogs/${log.id}`}>
							<div className='grid grid-cols-[1fr_1fr_3fr_1fr] bg-white border border-gray-100 rounded-xl px-6 py-4 items-center shadow-sm hover:shadow-md hover:bg-gray-100 transition-shadow my-2'>
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
										<span className='px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700'>
											Opłacone
										</span>
									) : (
										<span className='px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700'>
											Oczekuje
										</span>
									)}
								</div>
							</div>
						</Link>
					))
				) : (
					<p className='mx-auto text-gray-500'>Nie znaleziono danych</p>
				)}
			</div>
			<div className='w-full flex items-center justify-center text-gray-400 text-xl'>
				<button
					onClick={() => {
						if (page > 1) setPage(page - 1)
					}}>
					<ChevronLeft />
				</button>
				{Array.from({ length: pages.data ?? 0 }, (_, i) => (
					<button
						key={i}
						className={clsx(`px-4 py-2 m-1 cursor-pointer ${page == i + 1 ? 'text-gray-700' : 'text-gray-400'}`)}
						onClick={() => setPage(i + 1)}>
						{i + 1}
					</button>
				))}
				<button
					onClick={() => {
						if (page < (pages?.data ?? 0)) setPage(page + 1)
					}}>
					<ChevronRight />
				</button>
			</div>
		</div>
	)
}

export default WorkLogs

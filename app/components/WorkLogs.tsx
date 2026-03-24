'use client'

import React, { useState } from 'react'
import { trpc } from '@/lib/trpc/provider'
import { Spinner } from '@/components/ui/spinner'
import Pagination from '@/app/components/Pagination'
import Link from 'next/link'

function WorkLogs() {
	const [page, setPage] = useState(1)

	const { data, isLoading, isFetching } = trpc.workLog.getAll.useQuery(page * 10)
	const pages = trpc.workLog.getPages.useQuery()

	const isWorking = isLoading || isFetching

	return (
		<div className='w-full absolute top-1/2 lg:left-1/2 lg:-translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 lg:w-[70vw] bg-white p-4 lg:rounded-lg h-[80vh] lg:max-w-300 lg:max-h-250 '>
			<div className='hidden lg:grid grid-cols-[1fr_1fr_3fr_1fr] px-6 py-2 lg:text-sm xl:text-base'>
				<span className='text-gray-400 uppercase tracking-wide'>Data</span>
				<span className='text-gray-400 uppercase tracking-wide'>Godziny</span>
				<span className='text-gray-400 uppercase tracking-wide'>Notatka</span>
				<span className='text-gray-400 uppercase tracking-wide'>Status</span>
			</div>

			<div className='overflow-y-scroll h-full'>
				{isWorking && (
					<div className='flex w-full h-full items-center justify-center min-h-[100px]'>
						<Spinner className='size-8' />
					</div>
				)}

				{!isWorking &&
					data &&
					data.length > 0 &&
					data.map(log => (
						<Link
							key={log.id}
							href={`/employee/workLogs/${log.id}`}
							className='block'>
							<div className='flex flex-col gap-2 lg:grid lg:grid-cols-[1fr_1fr_3fr_1fr] lg:gap-0 lg:items-center bg-white border border-gray-100 rounded-xl px-6 py-4 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all my-2'>
								<div className='flex justify-between items-center lg:contents'>
									<span className='text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium text-gray-800 flex items-center gap-2'>
										<span className='text-gray-400 text-[10px] sm:text-xs md:text-sm uppercase lg:hidden'>Data:</span>
										{new Date(log.date).toLocaleDateString('pl-PL', {
											day: 'numeric',
											month: 'short',
											year: 'numeric',
										})}
									</span>

									<span className='text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-gray-800 flex items-center gap-2'>
										<span className='text-gray-400 text-[10px] sm:text-xs md:text-sm uppercase lg:hidden'>Czas:</span>
										{log.hours}h
									</span>
								</div>

								<span className='text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 truncate lg:pr-4 mt-2 lg:mt-0'>
									{log.note ?? '—'}
								</span>

								<div className='mt-3 lg:mt-0 flex justify-end lg:justify-start'>
									{log.paid ? (
										<span className='px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-medium bg-green-100 text-green-700'>
											Opłacone
										</span>
									) : (
										<span className='px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-medium bg-yellow-100 text-yellow-700'>
											Oczekuje
										</span>
									)}
								</div>
							</div>
						</Link>
					))}

				{!isWorking && (!data || data.length === 0) && (
					<p className='mx-auto text-gray-500 text-sm md:text-base lg:text-lg text-center mt-4'>
						Nie znaleziono danych
					</p>
				)}
			</div>

			<Pagination
				page={page}
				setPage={setPage}
				pages={pages.data}
			/>
		</div>
	)
}

export default WorkLogs

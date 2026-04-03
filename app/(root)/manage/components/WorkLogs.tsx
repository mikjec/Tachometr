'use client'

import { useState, useRef, useEffect } from 'react'
import { trpc } from '@/lib/trpc/provider'
import { Spinner } from '@/components/ui/spinner'
import Pagination from '@/app/components/Pagination'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function WorkLogs() {
	const [page, setPage] = useState(1)
	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

	const { data, isLoading, isFetching, refetch } = trpc.workLog.getAllForCompany.useQuery(page * 10, {
		staleTime: 1000 * 60 * 5,
	})
	const pages = trpc.workLog.getPagesForCompany.useQuery()
	const setPaidMutation = trpc.workLog.setPaid.useMutation({
		onSuccess: () => {
			setSelectedIds(new Set())
			refetch()
		},
	})

	const unpaidLogs = data?.filter(log => !log.paid) || []
	const scrollContainerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		scrollContainerRef.current?.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}, [page])

	const handleSelectAll = () => {
		if (unpaidLogs.length === 0) return
		if (allUnpaidSelected) {
			setSelectedIds(new Set())
		} else {
			setSelectedIds(new Set(unpaidLogs.map(log => log.id)))
		}
	}

	const handleSelectOne = (id: string) => {
		const newSelected = new Set(selectedIds)
		if (newSelected.has(id)) {
			newSelected.delete(id)
		} else {
			newSelected.add(id)
		}
		setSelectedIds(newSelected)
	}

	const handleMarkAsPaid = () => {
		if (selectedIds.size === 0) return
		setPaidMutation.mutate(Array.from(selectedIds))
	}

	const allUnpaidSelected = unpaidLogs.length > 0 && unpaidLogs.every(log => selectedIds.has(log.id))

	return (
		<div className='w-full flex flex-col gap-2 lg:w-[70vw] bg-white p-4 pb-6 lg:rounded-lg h-[70vh] md:h-[80vh] lg:max-w-300 lg:max-h-250 mt-topPanel-height'>
			<div className='flex items-center justify-between mb-2 ps-4'>
				<div className='flex items-center gap-2'>
					<input
						type='checkbox'
						checked={allUnpaidSelected || false}
						onChange={handleSelectAll}
						className='w-5 h-5 rounded border-gray-300 focus:ring-2   accent-green-600       focus:ring-blue-500 cursor-pointer'
						disabled={isLoading || !data || data.filter(log => !log.paid).length === 0}
					/>
					<span className='text-sm text-gray-600'>
						{selectedIds.size > 0 ? `Wybrano ${selectedIds.size} wpisów` : 'Zaznacz wszystkie nieopłacone'}
					</span>
				</div>
				<Button
					onClick={handleMarkAsPaid}
					disabled={selectedIds.size === 0 || setPaidMutation.isPending}
					className='bg-green-500 hover:bg-green-700 text-white cursor-pointer py-6 rounded-lg transition-colors'>
					{setPaidMutation.isPending ? <Spinner className='size-4' /> : 'Oznacz jako opłacone'}
				</Button>
			</div>

			<div className='hidden lg:grid grid-cols-[1fr_2fr_1fr_1fr_1fr_50px] px-6 py-2 lg:text-sm xl:text-base'>
				<span className='text-gray-400 uppercase tracking-wide'>Użytkownik</span>
				<span className='text-gray-400 uppercase tracking-wide'>Data</span>
				<span className='text-gray-400 uppercase tracking-wide'>Godziny</span>
				<span className='text-gray-400 uppercase tracking-wide'>Notatka</span>
				<span className='text-gray-400 uppercase tracking-wide'>Status</span>
				<span className='text-gray-400 uppercase tracking-wide'></span>
			</div>

			<div
				className='overflow-y-scroll h-full flex flex-col justify-between'
				ref={scrollContainerRef}>
				{isLoading && (
					<div className='flex w-full h-full items-center justify-center min-h-[100px]'>
						<Spinner className='size-8' />
					</div>
				)}

				{!isLoading && data && data.length > 0 && (
					<ul className='list-none p-0 m-0'>
						{data.map(log => (
							<li key={log.id}>
								<Link href={`./workLogs/${log.id}`}>
									<div className='flex flex-col gap-2 lg:grid lg:grid-cols-[1fr_2fr_1fr_1fr_1fr_50px] lg:gap-0 lg:items-center bg-white border border-gray-100 rounded-xl px-6 py-4 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all my-2 cursor-pointer'>
										<span className='text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium text-gray-800'>
											{log.user.name ?? 'Nieznany'}
										</span>

										<span className='text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium text-gray-800'>
											{new Date(log.date).toLocaleDateString('pl-PL', {
												day: 'numeric',
												month: 'short',
												year: 'numeric',
											})}
										</span>

										<span className='text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-gray-800'>
											{log.hours}h
										</span>

										<span className='text-sm sm:text-md md:text-base lg:text-lg xl:text-xl text-gray-600 truncate lg:pr-4 mt-2 lg:mt-0'>
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

										<div className='mt-3 lg:mt-0 flex justify-center'>
											<input
												type='checkbox'
												checked={selectedIds.has(log.id)}
												onChange={() => handleSelectOne(log.id)}
												disabled={log.paid}
												className='w-5 h-5 rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 accent-green-600 color-white'
											/>
										</div>
									</div>
								</Link>
							</li>
						))}
					</ul>
				)}

				{!isLoading && (!data || data.length === 0) && (
					<p className='mx-auto text-gray-500 text-sm md:text-base lg:text-lg text-center mt-4'>
						Nie znaleziono danych
					</p>
				)}

				<Pagination
					page={page}
					setPage={setPage}
					pages={pages.data}
				/>
			</div>
		</div>
	)
}

export default WorkLogs

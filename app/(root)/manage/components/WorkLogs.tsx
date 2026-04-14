'use client'

import { useState, useRef, useEffect } from 'react'
import { trpc } from '@/lib/trpc/provider'
import { Spinner } from '@/components/ui/spinner'
import Pagination from '@/app/components/Pagination'
import Link from 'next/link'
import { Download, ChevronRight, Check } from 'lucide-react'

interface WorkLogsProps {
	userId?: string
}

function WorkLogs({ userId }: WorkLogsProps) {
	const [page, setPage] = useState(1)
	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

	const utils = trpc.useUtils()

	const allForCompanyQuery = trpc.workLog.getAllForCompany.useQuery(page * 20, {
		staleTime: 1000 * 60 * 5,
		enabled: !userId,
	})

	const byUserIdQuery = trpc.workLog.getByUserId.useQuery(
		{ userId: userId!, offset: page * 20 },
		{
			staleTime: 1000 * 60 * 5,
			enabled: !!userId,
		},
	)

	const pagesForCompanyQuery = trpc.workLog.getPagesForCompany.useQuery(undefined, { enabled: !userId })
	const pagesForUserQuery = trpc.workLog.getPagesForUserId.useQuery(userId!, { enabled: !!userId })

	const activeQuery = userId ? byUserIdQuery : allForCompanyQuery
	const data = userId ? byUserIdQuery.data?.map(log => ({ ...log, user: undefined })) : allForCompanyQuery.data
	const isLoading = activeQuery.isLoading

	const setPaidMutation = trpc.workLog.setPaid.useMutation({
		onSuccess: async () => {
			setSelectedIds(new Set())
			if (userId) {
				await utils.workLog.getByUserId.invalidate()
				await utils.workLog.getPagesForUserId.invalidate()
			} else {
				await utils.workLog.getAllForCompany.invalidate()
				await utils.workLog.getPagesForCompany.invalidate()
			}
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
		<div className='w-full h-[80vh] mt-topPanel-height flex flex-col gap-2 lg:w-[70vw] bg-white p-4 lg:rounded-lg md:h-[80vh] lg:max-w-300 lg:max-h-250 relative'>
			<div className='flex items-center justify-between mb-2 ps-4 pb-2 border-b border-gray-100'>
				<div className='flex items-center gap-2'>
					<input
						type='checkbox'
						checked={allUnpaidSelected || false}
						onChange={handleSelectAll}
						className='w-5 h-5 rounded border-gray-300 focus:ring-2 accent-green-600 focus:ring-blue-500 cursor-pointer'
						disabled={isLoading || !data || data.filter(log => !log.paid).length === 0}
					/>
					<span className='text-xs sm:text-sm text-gray-600'>
						{selectedIds.size > 0 ? `Wybrano ${selectedIds.size} wpisów` : 'Zaznacz nieopłacone'}
					</span>
				</div>
				<div className='flex items-center gap-2'>
					<a
						href='/api/export/worklogs'
						download
						className='px-4 py-2 rounded-lg text-sm font-medium bg-blue-50 text-gray-500 hover:bg-blue-100 transition-colors flex items-center gap-2'>
						<Download className='size-5' />
						<span className='hidden sm:inline'>Pobierz CSV</span>
					</a>

					<button
						onClick={handleMarkAsPaid}
						disabled={selectedIds.size === 0 || setPaidMutation.isPending}
						className='px-4 py-2 rounded-lg text-sm font-medium bg-green-100 text-green-700 hover:bg-green-200 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'>
						{setPaidMutation.isPending && <Spinner className='size-4' />}
						<span className='hidden md:inline'>Opłacono</span>
						<Check className='size-5' />
					</button>
				</div>
			</div>

			<div
				className={`hidden lg:grid ${userId ? 'grid-cols-[50px_1fr_1fr_2fr_1fr_50px]' : 'grid-cols-[50px_1fr_1fr_1fr_2fr_1fr_50px]'} px-6 py-2 lg:text-sm xl:text-base`}>
				<span className='text-gray-400 uppercase tracking-wide'></span>
				{!userId && <span className='text-gray-400 uppercase tracking-wide'>Użytkownik</span>}
				<span className='text-gray-400 uppercase tracking-wide'>Data</span>
				<span className='text-gray-400 uppercase tracking-wide'>Godziny</span>
				<span className='text-gray-400 uppercase tracking-wide'>Notatka</span>
				<span className='text-gray-400 uppercase tracking-wide'>Status</span>
				<span className='text-gray-400 uppercase tracking-wide'></span>
			</div>

			<div
				className='overflow-y-scroll flex-1 flex flex-col pb-20'
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
								<div
									className={`flex flex-col gap-3 lg:grid lg:gap-0 lg:items-center bg-white border border-gray-100 rounded-xl px-5 py-4 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all my-2 ${userId ? 'lg:grid-cols-[50px_1fr_1fr_2fr_1fr_50px]' : 'lg:grid-cols-[50px_1fr_1fr_1fr_2fr_1fr_50px]'}`}>
									<div className='hidden lg:flex justify-center'>
										<input
											type='checkbox'
											checked={selectedIds.has(log.id)}
											onChange={() => handleSelectOne(log.id)}
											onClick={e => e.stopPropagation()}
											disabled={log.paid}
											className='w-5 h-5 rounded border-gray-300 accent-green-600 focus:ring-blue-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50'
										/>
									</div>

									{'user' in log && log.user && (
										<span className='text-xs sm:text-sm md:text-base lg:text-base xl:text-lg font-medium text-gray-800'>
											{(log.user as { name?: string | null }).name ?? 'Nieznany'}
										</span>
									)}

									<div className='flex justify-between items-center lg:contents'>
										<span className='text-xs sm:text-sm md:text-base lg:text-base xl:text-lg font-medium text-gray-800 flex items-center gap-2'>
											<span className='text-gray-400 text-[10px] sm:text-xs md:text-sm uppercase lg:hidden'>Data:</span>
											{new Date(log.date).toLocaleDateString('pl-PL', {
												day: 'numeric',
												month: 'short',
												year: 'numeric',
											})}
										</span>

										<span className='text-xs sm:text-sm md:text-base lg:text-base xl:text-lg font-semibold text-gray-800 flex items-center gap-2'>
											<span className='text-gray-400 text-[10px] sm:text-xs md:text-sm uppercase lg:hidden'>Czas:</span>
											{log.hours}h
										</span>
									</div>

									<span className='text-sm sm:text-md md:text-base lg:text-base xl:text-lg text-gray-600 truncate lg:pr-4'>
										{log.note ?? '—'}
									</span>

									<div className='flex justify-end lg:justify-start'>
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

									<div className='lg:hidden flex justify-between items-center mt-2 gap-2'>
										<input
											type='checkbox'
											checked={selectedIds.has(log.id)}
											onChange={() => handleSelectOne(log.id)}
											disabled={log.paid}
											className='w-5 h-5 rounded border-gray-300 accent-green-600 focus:ring-blue-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50'
										/>
										<Link
											href={`/manage/workLogs/${log.id}`}
											className='text-gray-400 hover:text-gray-600 transition-colors'>
											<ChevronRight className='size-5' />
										</Link>
									</div>

									<div className='hidden lg:flex justify-center'>
										<Link
											href={`/manage/workLogs/${log.id}`}
											className='text-gray-400 hover:text-gray-600 transition-colors'>
											<ChevronRight className='size-5' />
										</Link>
									</div>
								</div>
							</li>
						))}
					</ul>
				)}

				{!isLoading && (!data || data.length === 0) && (
					<p className='mx-auto text-gray-500 text-sm md:text-base lg:text-lg text-center mt-4'>
						Nie znaleziono danych
					</p>
				)}
			</div>
			{!userId && (
				<div className='absolute bottom-0 left-0 right-0 bg-white border-t rounded-lg border-gray-100 p-4 md:p-0'>
					<Pagination
						page={page}
						setPage={setPage}
						pages={pagesForCompanyQuery.data}
					/>
				</div>
			)}
			{userId && (
				<div className='absolute bottom-0 left-0 right-0 bg-white border-t rounded-lg border-gray-100 p-4 md:p-0'>
					<Pagination
						page={page}
						setPage={setPage}
						pages={pagesForUserQuery.data}
					/>
				</div>
			)}
		</div>
	)
}

export default WorkLogs

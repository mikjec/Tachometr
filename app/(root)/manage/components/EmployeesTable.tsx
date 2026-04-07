'use client'

import { trpc } from '@/lib/trpc/provider'
import { Spinner } from '@/components/ui/spinner'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function EmployeesTable() {
	const router = useRouter()
	const { data, isLoading } = trpc.user.getAllEmployees.useQuery(undefined, {
		staleTime: 1000 * 60 * 5,
	})

	return (
		<div className='w-full flex flex-col gap-2 lg:w-[70vw] bg-white p-4 lg:rounded-lg h-[70vh] md:h-[80vh] lg:max-w-300 lg:max-h-250'>
			<div className='hidden lg:grid grid-cols-[2fr_2fr_1fr_1fr_50px] px-6 py-2 lg:text-sm xl:text-base'>
				<span className='text-gray-400 uppercase tracking-wide'>Imię i nazwisko</span>
				<span className='text-gray-400 uppercase tracking-wide'>Email</span>
				<span className='text-gray-400 uppercase tracking-wide'>Stawka</span>
				<span className='text-gray-400 uppercase tracking-wide'>Godziny</span>
				<span className='text-gray-400 uppercase tracking-wide'></span>
			</div>

			<div className='overflow-y-scroll h-full flex flex-col'>
				{isLoading && (
					<div className='flex w-full h-full items-center justify-center min-h-[100px]'>
						<Spinner className='size-8' />
					</div>
				)}

				{!isLoading && data && data.length > 0 && (
					<ul className='list-none p-0 m-0'>
						{data.map(employee => (
							<li key={employee.id}>
								<div
									className='flex flex-col gap-3 lg:grid lg:grid-cols-[2fr_2fr_1fr_1fr_50px] lg:gap-0 lg:items-center bg-white border border-gray-100 rounded-xl px-5 py-3 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all my-2 cursor-pointer'
									onClick={() => router.push(`/manage/employees/${employee.id}`)}>
									<span className='text-xs sm:text-sm md:text-base lg:text-base xl:text-lg font-medium text-gray-800'>
										{employee.name ?? 'Brak nazwy'}
									</span>

									<span className='text-xs sm:text-sm md:text-base lg:text-base xl:text-lg text-gray-600 truncate'>
										{employee.email}
									</span>

									<div className='flex justify-between items-center lg:contents'>
										<span className='text-gray-400 text-[10px] sm:text-xs uppercase lg:hidden'>Stawka:</span>
										<span className='text-xs sm:text-sm md:text-base lg:text-base xl:text-lg font-medium text-gray-800'>
											{employee.hourlyRate != null ? `${employee.hourlyRate} zł/h` : '—'}
										</span>

										<span className='text-gray-400 text-[10px] sm:text-xs uppercase lg:hidden'>Nieopł. godz.:</span>
										<span className='text-xs sm:text-sm md:text-base lg:text-base xl:text-lg font-semibold text-gray-800'>
											{employee.unpaidHours}h
										</span>
									</div>

									<div
										className='flex justify-end lg:justify-center'
										onClick={e => e.stopPropagation()}>
										<Link
											href={`/manage/employees/${employee.id}/workLogs`}
											className='inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 bg-white rounded-lg  ring-1 ring-inset ring-gray-200 hover:bg-gray-50 hover:text-gray-900 hover:shadow'
											title='Wpisy pracownika'>
											Wpisy
										</Link>
									</div>
								</div>
							</li>
						))}
					</ul>
				)}

				{!isLoading && (!data || data.length === 0) && (
					<p className='mx-auto text-gray-500 text-sm md:text-base lg:text-lg text-center mt-4'>
						Nie znaleziono pracowników
					</p>
				)}
			</div>
		</div>
	)
}

export default EmployeesTable

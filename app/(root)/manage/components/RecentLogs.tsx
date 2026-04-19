import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Log {
	id: string
	date: Date
	hours: number
	paid: boolean
	note: string | null
}

export function RecentLogs({ logs }: { logs: Log[] }) {
	return (
		<div className='bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 block w-full my-2 mt-topPanel-height'>
			<h2 className='text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 mb-4'>Dzisiejsze wpisy</h2>

			{logs.length === 0 ? (
				<p className='text-gray-400 text-sm md:text-base'>Brak wpisów</p>
			) : (
				<div className='flex flex-col gap-2'>
					<div className='hidden md:grid grid-cols-[1fr_1fr_3fr_1fr] px-4 py-2 text-xs lg:text-sm text-gray-400 uppercase tracking-wide'>
						<span>Data</span>
						<span>Godziny</span>
						<span>Notatka</span>
						<span>Status</span>
					</div>

					<ul className='flex flex-col gap-2 m-0 p-0 list-none'>
						{logs.map(log => (
							<li key={log.id}>
								<Link
									href={`/manage/workLogs/${log.id}`}
									className='block'>
									<div className='flex flex-col gap-2 md:grid md:grid-cols-[1fr_1fr_3fr_1fr] p-4 md:px-4 md:py-3 rounded-xl hover:bg-gray-50 transition-colors md:items-center border border-gray-100 md:border-transparent'>
										<div className='flex justify-between items-center md:contents'>
											<span className='text-sm md:text-base lg:text-lg text-gray-700'>
												<span className='md:hidden text-sm text-gray-400 uppercase mr-2'>Data:</span>
												{new Date(log.date).toLocaleDateString('pl-PL', {
													day: 'numeric',
													month: 'short',
													year: 'numeric',
												})}
											</span>

											<div className='md:hidden'>
												{log.paid ? (
													<span className='px-2 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700'>
														Opłacone
													</span>
												) : (
													<span className='px-2 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700'>
														Oczekuje
													</span>
												)}
											</div>
										</div>

										<span className='text-sm md:text-base lg:text-lg font-bold text-gray-700 flex items-center'>
											<span className='md:hidden text-sm text-gray-400 uppercase font-normal mr-2'>Czas:</span>
											{log.hours}h
										</span>

										<span className='text-md md:text-base lg:text-lg text-gray-500 truncate md:pr-4'>
											{log.note ?? '—'}
										</span>

										<div className='hidden md:block'>
											{log.paid ? (
												<span className='px-2 py-1 rounded-full text-xs lg:text-sm font-medium bg-green-100 text-green-700'>
													Opłacone
												</span>
											) : (
												<span className='px-2 py-1 rounded-full text-xs lg:text-sm font-medium bg-yellow-100 text-yellow-700'>
													Oczekuje
												</span>
											)}
										</div>
									</div>
								</Link>
							</li>
						))}
					</ul>

					<Link
						href='/manage/workLogs'
						className='text-sm md:text-base text-gray-400 hover:text-gray-600 text-center mt-3 lg:mt-4 transition-colors flex justify-center items-center gap-1'>
						Zobacz wszystkie
						<ArrowRight className='size-4 md:size-5' />
					</Link>
				</div>
			)}
		</div>
	)
}

export default RecentLogs

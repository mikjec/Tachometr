// app/(root)/employee/_components/StatsCards.tsx
interface StatsCardsProps {
	unpaidHours: number
	hourlyRate: number
}

export function StatsCards({ unpaidHours, hourlyRate }: StatsCardsProps) {
	const amountDue = unpaidHours * hourlyRate

	return (
		<div className='flex flex-col items-center justify-center sm:grid sm:grid-cols-2 min-w-[100px] gap-4 mt-topPanel-height pt-topPanel-height  text-xl lg:text-2xl py-2'>
			<div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-full'>
				<p className='text-sm lg:text-lg text-gray-400 uppercase tracking-wide'>Godziny</p>
				<p className=' font-bold text-gray-800 mt-2'>{unpaidHours}h</p>
			</div>
			<div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-full'>
				<p className='text-sm lg:text-lg text-gray-400 uppercase tracking-wide'>Do wypłaty</p>
				<p className=' font-bold text-gray-800 mt-2'>
					{amountDue.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' })}
				</p>
			</div>
		</div>
	)
}

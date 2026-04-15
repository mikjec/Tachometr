'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Label, LabelList } from 'recharts'

function StatsChart({
	isAnimationActive = true,
	data,
}: {
	isAnimationActive?: boolean
	data: { month: string; hours: number }[]
}) {
	return (
		<div className='bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 block w-full my-2'>
			<h2 className='text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 mb-4'>
				Statystyki z ostatnich miesięcy
			</h2>
			<BarChart
				className='p-1'
				style={{ width: '100%', maxHeight: '70vh', aspectRatio: 1.618 }}
				responsive
				barCategoryGap='20%'
				data={data}
				margin={{
					top: 15,
					right: 0,
					left: 5,
					bottom: 5,
				}}>
				<XAxis dataKey='month' />
				<YAxis
					width='auto'
					label={{
						value: 'Godziny',
						angle: -90,
						position: 'insideLeft',
						textAnchor: 'middle',
					}}
				/>
				<Bar
					dataKey='hours'
					fill='#8884d8'
					isAnimationActive={isAnimationActive}
					maxBarSize={90}>
					<LabelList
						dataKey='hours'
						position='top'
					/>
				</Bar>
			</BarChart>
		</div>
	)
}

export default StatsChart

import React from 'react'
import TopPanel from '@/app/components/TopPanel'
import Breadcrumbs from '@/app/components/breadcrumbs'
import WorkLogForm from '@/app/components/WorkLogForm'

export default function CreateWorkLogPage() {
	const breadcrumbs = [
		{ label: 'Pracownik', href: '/employee' },
		{ label: 'Moje wpisy', href: '/employee/workLogs' },
		{ label: 'Dodaj wpis', href: '/employee/workLogs/create', active: true },
	]

	return (
		<div>
			<TopPanel>
				<Breadcrumbs breadcrumbs={breadcrumbs} />
			</TopPanel>

			<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg mx-4 bg-white rounded-2xl shadow-sm p-8'>
				{/* Header */}
				<div className='mb-6'>
					<h2 className='text-2xl font-semibold text-gray-800'>Dodaj nowy wpis</h2>
					<p className='text-sm text-gray-500 mt-1'>Wprowadź dane swojego wpisu pracy</p>
				</div>

				<WorkLogForm mode='create' />
			</div>
		</div>
	)
}

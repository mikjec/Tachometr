import React from 'react'
import TopPanel from '@/app/components/TopPanel'
import Breadcrumbs from '@/app/components/breadcrumbs'
import WorkLogForm from '@/app/(root)/employee/components/WorkLogForm'

export default function CreateWorkLogPage() {
	const breadcrumbs = [
		{ label: 'Moje wpisy', href: '/employee/workLogs' },
		{ label: 'Utwórz nowy', href: '/employee/workLogs/create', active: true },
	]

	return (
		<>
			<header>
				<TopPanel>
					<Breadcrumbs breadcrumbs={breadcrumbs} />
				</TopPanel>
			</header>

			<main>
				<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen max-h-[80vh] sm:max-w-lg bg-white sm:rounded-2xl shadow-sm p-5 lg:p-8 flex flex-col justify-between'>
					{/* Header */}
					<div className='mb-6'>
						<h2 className='text-2xl font-semibold text-gray-800'>Dodaj nowy wpis</h2>
						<p className='text-sm text-gray-500 mt-1'>Wprowadź dane swojego wpisu pracy</p>
					</div>

					<WorkLogForm mode='create' />
				</div>
			</main>
		</>
	)
}

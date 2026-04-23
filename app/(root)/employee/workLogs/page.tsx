import React from 'react'
import WorkLogs from '../components/WorkLogs'
import TopPanel from '@/app/components/TopPanel'

function Page() {
	return (
		<>
			<header>
				<TopPanel>Moje wpisy</TopPanel>
			</header>
			<main className='flex flex-col items-center py-4'>
				<div className='w-full lg:w-[70vw] lg:max-w-300 mt-topPanel-height pt-topPanel-height max-h-[60vh]'>
					<WorkLogs />
				</div>
			</main>
		</>
	)
}

export default Page

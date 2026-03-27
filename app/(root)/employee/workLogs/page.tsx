import React from 'react'
import WorkLogs from '../../../components/WorkLogs'
import TopPanel from '@/app/components/TopPanel'
import Link from 'next/link'
import { Plus } from 'lucide-react'

function Page() {
	return (
		<>
			<TopPanel>Moje wpisy</TopPanel>
			<main className='flex flex-col items-center py-4'>
				<div className='w-full lg:w-[70vw] lg:max-w-300 pt-topPanel-height max-h-[60vh]'>
					<div className='flex justify-end my-2'>
						<Link
							href='/employee/workLogs/create'
							className='flex items-center gap-2 bg-white shadow-sm text-gray-500 px-4 py-4 rounded-2xl text-sm lg:text-xl font-medium hover:bg-gray-300 mt-4 hover:text-gray-700 transition-colors'>
							<Plus />
							Dodaj wpis
						</Link>
					</div>
					<WorkLogs />
				</div>
			</main>
		</>
	)
}

export default Page

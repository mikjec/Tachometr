import React from 'react'
import WorkLogs from '../../../components/WorkLogs'
import TopPanel from '@/app/components/TopPanel'
import Link from 'next/link'
import { Plus } from 'lucide-react'

function Page() {
	return (
		<div>
			<TopPanel>
				<div className='flex items-center justify-between w-full'>
					<span>moje wpisy</span>
				</div>
			</TopPanel>
			<div>
				<Link
					href='/employee/workLogs/create'
					className='flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors'>
					<Plus />
					Dodaj wpis
				</Link>
			</div>
			<WorkLogs />
		</div>
	)
}

export default Page

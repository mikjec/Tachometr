'use client'

import React from 'react'
import WorkLogs from '../_components/WorkLogs'
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

			<WorkLogs />
		</div>
	)
}

export default Page

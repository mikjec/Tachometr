import React from 'react'
import { trpc } from '@/lib/trpc/provider'
import WorkLogs from '../../components/WorkLogs'
import { Suspense } from 'react'
import { Spinner } from '@/components/ui/spinner'
import TopPanel from '@/app/components/TopPanel'

async function Page() {
	return (
		<div>
			<TopPanel>strona główna</TopPanel>
		</div>
	)
}

export default Page

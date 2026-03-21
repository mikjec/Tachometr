import React from 'react'
import { trpc } from '@/lib/trpc/provider'
import WelcomeHeading from '@/app/components/welcomeHeading'
import WorkLogs from '../_components/WorkLogs'
import { Suspense } from 'react'
import { Spinner } from '@/components/ui/spinner'
import TopPanel from '@/app/components/TopPanel'

async function Page() {
	return (
		<div>
			<TopPanel>Moje wpisy</TopPanel>
			<WorkLogs />
		</div>
	)
}

export default Page

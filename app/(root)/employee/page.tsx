import React from 'react'
import { trpc } from '@/lib/trpc/provider'
import WelcomeHeading from '@/app/components/welcomeHeading'
import WorkLogs from './_components/WorkLogs'

async function Page() {
	return (
		<div>
			<WelcomeHeading />
			<WorkLogs />
		</div>
	)
}

export default Page

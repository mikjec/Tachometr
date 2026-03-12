import React from 'react'
import { trpc } from '@/lib/trpc/provider'
import WelcomeHeading from './_components/welcomeHeading'

async function Page() {
	return (
		<div>
			<WelcomeHeading />
		</div>
	)
}

export default Page

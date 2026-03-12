'use client'

import { trpc } from '@/lib/trpc/provider'

function WelcomeHeading() {
	const { data, isLoading } = trpc.user.getUser.useQuery()

	if (isLoading) return <p>Ładowanie...</p>

	return (
		<div>
			<h1>Cześć, {data?.profile?.name}!</h1>
		</div>
	)
}

export default WelcomeHeading

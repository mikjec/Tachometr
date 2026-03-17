'use client'

import { trpc } from '@/lib/trpc/provider'

function WelcomeHeading() {
	const { data, isLoading } = trpc.user.getUser.useQuery()

	if (isLoading) return <p>Ładowanie...</p>

	return (
		<div className='flex flex-col gap-2 w-[60vw] mx-auto my-4 bg-white p-4 rounded-lg scroll-y text-black font-semibold'>
			<h1>Cześć, {data?.profile?.name}!</h1>
		</div>
	)
}

export default WelcomeHeading

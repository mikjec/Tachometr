import React from 'react'
import Image from 'next/image'
import userIcon from '@/public/userIcon.svg'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma/prisma'

async function TopPanel({ children }: { children: React.ReactNode }) {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	const profile = await prisma.user.findUnique({
		where: { id: user?.id },
		select: { name: true },
	})

	const name = profile?.name ?? user?.email ?? ''

	return (
		<>
			<div className='fixed top-0 w-screen h-topPanel-height bg-white text-xl ps-6 py-8 z-40 border-gray-100 shadow-sm pe-nav-width'>
				<div className='w-full h-full max-w-700 flex items-center justify-between mx-auto uppercase'>
					<span className='text-sm'>{children}</span>
					<button className='m-4 flex items-center'>
						{name}
						<Image
							src={userIcon}
							alt='user icon'
							width={40}
							className='ms-2'
						/>
					</button>
				</div>
			</div>
		</>
	)
}

export default TopPanel

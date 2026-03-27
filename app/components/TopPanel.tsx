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
			<div className='fixed top-0 w-screen h-topPanel-height bg-white ps-6 py-8 z-40 border-gray-100 shadow-sm lg:pe-nav-width'>
				<div className='w-full h-full max-w-400 flex items-center justify-between mx-auto uppercase'>
					<span className='text-md lg:text-lg'>{children}</span>
					<span className='m-4 flex items-center hidden md:flex'>
						{name}
						<Image
							src={userIcon}
							alt='user icon'
							width={40}
							className='ms-2'
						/>
					</span>
				</div>
			</div>
		</>
	)
}

export default TopPanel

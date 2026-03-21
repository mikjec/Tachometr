import React from 'react'
import { CircleUserRound } from 'lucide-react'
import Image from 'next/image'
import userIcon from '@/public/userIcon.svg'

function TopPanel({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className='fixed  top-0  w-screen h-topPanel-height bg-white text-xl ps-6 z-40 border-gray-100 shadow-sm pe-nav-width'>
				<div className='w-full max-w-700 flex items-center justify-between mx-auto'>
					<span>{children}</span>

					<button className='m-4 flex items-center'>
						Robol
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

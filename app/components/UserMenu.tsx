'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import userIcon from '@/public/userIcon.svg'
import LogOut from './LogOut'

export default function UserMenu({ name }: { name: string }) {
	const [open, setOpen] = useState(false)
	const ref = useRef<HTMLDivElement>(null)
	const router = useRouter()

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	return (
		<div
			ref={ref}
			className='relative m-4'>
			<button
				onClick={() => setOpen(prev => !prev)}
				className='flex items-center gap-2 cursor-pointer rounded-full px-2 py-1 hover:bg-gray-100 transition-colors'>
				<span className='hidden md:inline text-md lg:text-lg font-medium uppercase'>{name}</span>
				<Image
					src={userIcon}
					alt='user icon'
					width={40}
				/>
			</button>

			{open && (
				<div className='absolute right-0 top-full mt-2  bg-gray-100 rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150  text-gray-700m min-w-40'>
					<Link
						href='/profile'
						onClick={() => setOpen(false)}
						className='flex items-center py-3 px-4  lg:px-6 text-sm  hover:bg-gray-200 transition-colors letter w-full'>
						<span>Profil</span>
					</Link>

					<LogOut className=' flex justify-between items-center w-full hover:bg-gray-200 py-3 px-4 lg:px-6 cursor-pointer' />
				</div>
			)}
		</div>
	)
}

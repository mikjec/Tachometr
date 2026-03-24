'use client'
import { supabase } from '@/lib/supabase/client'
import { redirect } from 'next/navigation'
import { LogOutIcon } from 'lucide-react'

export function LogOut({ ...props }) {
	return (
		<button
			{...props}
			onClick={() => {
				supabase.auth.signOut()
				redirect('/login')
			}}>
			<LogOutIcon className='w-7 h-7' />
			<span className='hidden 2xl:inline lg:ms-2 lg:text-lg'>Wyloguj</span>
		</button>
	)
}

export default LogOut

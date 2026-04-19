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
			<span className='inline   text-gray-700 uppercase me-2 text-sm'>Wyloguj</span>
			<LogOutIcon className='size-4 inline' />
		</button>
	)
}

export default LogOut

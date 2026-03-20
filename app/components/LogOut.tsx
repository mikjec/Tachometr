'use client'
import { supabase } from '@/lib/supabase/client'
import { redirect } from 'next/navigation'
import { LogOutIcon } from 'lucide-react'

export function LogOut({ ...props }) {
	return (
		<div>
			<button
				className='border rounded-lg text-black cursor-pointer'
				{...props}
				onClick={() => {
					supabase.auth.signOut()
					redirect('/login')
				}}>
				<LogOutIcon className='inline-block me-2' />
				Wyloguj
			</button>
		</div>
	)
}

export default LogOut

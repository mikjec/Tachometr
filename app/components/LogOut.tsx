'use client'
import { supabase } from '@/lib/supabase/client'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LogOutIcon } from 'lucide-react'

export function LogOut({ ...props }) {
	return (
		<div>
			<button
				className='border rounded-lg text-black'
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

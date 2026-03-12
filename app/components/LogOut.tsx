'use client'
import { supabase } from '@/lib/supabase/client'
import { redirect } from 'next/navigation'

export function LogOut() {
	return (
		<div>
			<button
				className='bg-white border-2-white text-black p-2 cursor-pointer'
				onClick={async () => {
					await supabase.auth.signOut()
					redirect('/login')
				}}>
				Wyloguj
			</button>
		</div>
	)
}

export default LogOut

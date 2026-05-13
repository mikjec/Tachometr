// app/login/set-password/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function SetPasswordPage() {
	const [password, setPassword] = useState('')
	const [ready, setReady] = useState(false)
	const [error, setError] = useState('')
	const router = useRouter()

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			console.log('sesja: ', session)
			if (session) setReady(true)
		})

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, session) => {
			if (event === 'SIGNED_IN' && session) {
				setReady(true)
			}
		})

		return () => subscription.unsubscribe()
	}, [])

	async function handleSubmit() {
		if (password.length < 6) {
			setError('Hasło musi mieć minimum 6 znaków')
			return
		}

		const { error } = await supabase.auth.updateUser({ password })

		if (error) {
			setError(error.message)
			return
		}

		router.push('/dashboard')
	}

	return (
		<div>
			<h1>Ustaw hasło</h1>
			<input
				type='password'
				value={password}
				onChange={e => setPassword(e.target.value)}
				placeholder='Nowe hasło (min. 6 znaków)'
			/>
			{error && <p>{error}</p>}
			<button onClick={handleSubmit}>Zapisz hasło</button>
		</div>
	)
}

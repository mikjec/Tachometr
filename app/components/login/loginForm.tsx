'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

export default function LoginForm() {
	const router = useRouter()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError(null)

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		})

		if (error) {
			setError(error.message)
			setLoading(false)
			return
		}

		router.push('/dashboard')
	}

	return (
		<div className='min-h-screen flex items-center justify-center'>
			<form
				onSubmit={handleLogin}
				className='w-full max-w-md p-6 border rounded-lg space-y-4'>
				<h1 className='text-2xl font-bold'>Logowanie</h1>

				<input
					type='email'
					placeholder='Email'
					className='w-full border p-2 rounded'
					value={email}
					onChange={e => setEmail(e.target.value)}
					required
				/>

				<input
					type='password'
					placeholder='Hasło'
					className='w-full border p-2 rounded'
					value={password}
					onChange={e => setPassword(e.target.value)}
					required
				/>

				{error && <p className='text-red-500 text-sm'>{error}</p>}

				<button
					type='submit'
					aria-disabled={loading}
					className='w-full bg-black text-white p-2 rounded'>
					{loading ? 'Logowanie...' : 'Zaloguj się'}
				</button>
			</form>
		</div>
	)
}

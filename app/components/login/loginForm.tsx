'use client'

import { useState } from 'react'
import { redirect, useRouter } from 'next/navigation'
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

		function translateAuthError(message: string): string {
			const errors: Record<string, string> = {
				'Invalid login credentials': 'Nieprawidłowy email lub hasło',
				'Email not confirmed': 'Email nie został potwierdzony',
				'User already registered': 'Użytkownik z tym emailem już istnieje',
				'Password should be at least 6 characters': 'Hasło musi mieć co najmniej 6 znaków',
				'Too many requests': 'Zbyt wiele prób logowania, spróbuj później',
				'User not found': 'Nie znaleziono użytkownika',
				'Email rate limit exceeded': 'Przekroczono limit emaili, spróbuj później',
			}

			return errors[message] ?? message
		}

		if (error) {
			setError(translateAuthError(error.message))
			setLoading(false)
			return
		} else {
			redirect('/')
		}
	}

	return (
		<div className='min-h-screen flex items-center justify-center'>
			<form
				onSubmit={handleLogin}
				className='w-full max-w-md p-6 border-none rounded-lg space-y-4 bg-white text-gray-700'>
				<input
					type='email'
					placeholder='Email'
					className='w-full border-2 border-gray-300 p-2 rounded focus:outline-none  focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-700'
					value={email}
					onChange={e => setEmail(e.target.value)}
					required
				/>

				<input
					type='password'
					placeholder='Hasło'
					className='w-full border-2 border-gray-300 p-2 rounded text-gray-700 focus:outline-none  focus:ring-2 focus:ring-gray-400 focus:border-transparent'
					value={password}
					onChange={e => setPassword(e.target.value)}
					required
				/>

				{error && <p className='text-red-500 text-sm'>{error}</p>}

				<button
					type='submit'
					aria-disabled={loading}
					className='w-full bg-gray-400 hover:bg-gray-600 cursor-pointer text-white p-2 rounded'>
					{loading ? 'Logowanie...' : 'Zaloguj się'}
				</button>
			</form>
		</div>
	)
}

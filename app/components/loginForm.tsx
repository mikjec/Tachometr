'use client'

import { useState } from 'react'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { Spinner } from '@/components/ui/spinner'
import Logo from '@/app/components/Logo'

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

export default function LoginForm() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)
		setError(null)

		const { error } = await supabase.auth.signInWithPassword({ email, password })

		if (error) {
			setError(translateAuthError(error.message))
			setLoading(false)
			return
		}

		redirect('/')
	}

	return (
		<div>
			<form
				onSubmit={handleLogin}
				className='w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-2xl space-y-4 bg-white shadow-md text-gray-700'>
				<Logo className='mx-auto mb-8 mt-2 w-24 sm:w-30' />

				<div className='space-y-3'>
					<input
						type='email'
						placeholder='Email'
						className='w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-700 text-sm sm:text-base'
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>

					<input
						type='password'
						placeholder='Hasło'
						className='w-full border-2 border-gray-300 p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm sm:text-base'
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
					/>
				</div>

				{error && <p className='text-red-500 text-xs sm:text-sm'>{error}</p>}

				<button
					type='submit'
					disabled={loading}
					className='w-full bg-gray-500 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors text-white p-3 rounded-lg text-sm sm:text-base'>
					{loading ? <Spinner className='mx-auto my-1' /> : 'Zaloguj się'}
				</button>
			</form>
		</div>
	)
}

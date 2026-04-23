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

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
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
		<div className='w-full max-w-sm sm:max-w-md lg:max-w-3xl'>
			<form
				onSubmit={handleLogin}
				className='w-full p-6 sm:p-8 lg:p-0 rounded-2xl space-y-4 lg:space-y-0 bg-white shadow-md text-gray-700 lg:flex lg:overflow-hidden lg:min-h-110'>
				<div className='lg:flex-1 lg:flex lg:items-center lg:justify-center lg:bg-gray-50 lg:border-r lg:border-gray-100 lg:p-12'>
					<Logo className='mx-auto mb-8 mt-2 w-24 sm:w-30 lg:mx-0 lg:my-0 lg:w-80' />
				</div>

				<div className='lg:flex-1 lg:flex lg:flex-col lg:justify-center lg:p-10 space-y-4 text-xl gap-2'>
					<input
						type='email'
						placeholder='Email'
						className='w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-700 '
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>
					<input
						type='password'
						placeholder='Hasło'
						className='w-full border-2 border-gray-300 p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent '
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
					/>

					{error && <p className='text-red-500 text-xs sm:text-sm'>{error}</p>}

					<button
						type='submit'
						disabled={loading}
						className='w-full bg-gray-500 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors text-white p-3 rounded-lg mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2'>
						{loading ? <Spinner className='mx-auto my-1' /> : 'Zaloguj się'}
					</button>
				</div>
			</form>
		</div>
	)
}

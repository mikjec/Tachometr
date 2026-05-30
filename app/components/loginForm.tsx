'use client'

import { useState } from 'react'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { Spinner } from '@/components/ui/spinner'

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

interface LoginFormProps {
	onSwitchToRegister: () => void
}

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
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
		<form
			onSubmit={handleLogin}
			className='flex flex-col items-center justify-center h-full gap-8 w-full p-2'>
			<input
				type='email'
				placeholder='Email'
				className='w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-700'
				value={email}
				onChange={e => setEmail(e.target.value)}
				required
			/>
			<input
				type='password'
				placeholder='Hasło'
				className='w-full border-2 border-gray-300 p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent'
				value={password}
				onChange={e => setPassword(e.target.value)}
				required
			/>

			{error && <p className='text-red-500 text-xs sm:text-sm'>{error}</p>}

			<button
				type='submit'
				disabled={loading}
				className='w-full bg-gray-500 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors text-white p-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2'>
				{loading ? <Spinner className='mx-auto my-1' /> : 'Zaloguj się'}
			</button>
			<div className='w-full flex flex-col items-end gap-4'>
				<button
					type='button'
					onClick={onSwitchToRegister}
					className='text-sm text-gray-500 underline underline-offset-2 hover:text-gray-700 transition-colors cursor-pointer'>
					Nie masz konta? Zarejestruj się
				</button>
				<a
					href='/login/reset-password'
					className='text-sm text-gray-500 underline underline-offset-2 hover:text-gray-700 transition-colors cursor-pointer hidden'>
					Nie pamiętasz hasła? Resetuj hasło
				</a>
			</div>
		</form>
	)
}

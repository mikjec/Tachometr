'use client'

import { useState } from 'react'
import { trpc } from '@/lib/trpc/provider'
import { Spinner } from '@/components/ui/spinner'
import { useRouter } from 'next/navigation'

function translateAuthError(message: string): string {
	const errors: Record<string, string> = {
		'user already registered': 'Użytkownik z tym emailem już istnieje',
		'password should be at least 6 characters': 'Hasło musi mieć co najmniej 6 znaków',
		'email rate limit exceeded': 'Przekroczono limit emaili, spróbuj później',
		'too many requests': 'Zbyt wiele prób, spróbuj później',
		'invalid email': 'Nieprawidłowy adres email',
	}
	return errors[message] ?? message
}

interface RegisterFormProps {
	onSwitchToLogin: () => void
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
	const router = useRouter()
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [companyName, setCompanyName] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState(false)

	const signupMutation = trpc.user.signup.useMutation({
		onSuccess: () => {
			setSuccess(true)
		},
		onError: err => {
			setError(err.message)
		},
	})

	const handleRegister = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()
		setError(null)

		// Validation
		if (!name.trim()) {
			setError('Imię jest wymagane')
			return
		}

		if (!email.trim()) {
			setError('Email jest wymagany')
			return
		}

		if (!password) {
			setError('Hasło jest wymagane')
			return
		}

		if (password.length < 8) {
			setError('Hasło musi mieć co najmniej 8 znaków')
			return
		}

		if (password !== confirmPassword) {
			setError('Hasła nie są zgodne')
			return
		}

		if (!companyName.trim()) {
			setError('Nazwa firmy jest wymagana')
			return
		}

		signupMutation.mutate({
			email: email.trim(),
			name: name.trim(),
			password,
			companyName: companyName.trim(),
		})
	}

	if (success) {
		return (
			<div className='flex flex-col items-center justify-center h-full gap-4 sm:w-1/2 text-center'>
				<div className='text-4xl'>✉️</div>
				<p className='text-gray-700 font-medium'>Sprawdź swoją skrzynkę!</p>
				<p className='text-gray-500 text-sm'>
					Wysłaliśmy link aktywacyjny na adres <strong>{email}</strong>.
				</p>
				<button
					onClick={onSwitchToLogin}
					className='mt-4 text-sm text-gray-500 underline underline-offset-2 hover:text-gray-700 transition-colors cursor-pointer'>
					Wróć do logowania
				</button>
			</div>
		)
	}

	return (
		<form
			onSubmit={handleRegister}
			className='flex flex-col items-center justify-center h-full gap-5 p-2 '>
			<input
				type='text'
				placeholder='Imię'
				className='w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-700'
				value={name}
				onChange={e => setName(e.target.value)}
				required
			/>
			<input
				type='email'
				placeholder='Email'
				className='w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-700'
				value={email}
				onChange={e => setEmail(e.target.value)}
				required
			/>
			<input
				type='text'
				placeholder='Nazwa firmy'
				className='w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-700'
				value={companyName}
				onChange={e => setCompanyName(e.target.value)}
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
			<input
				type='password'
				placeholder='Potwierdź hasło'
				className='w-full border-2 border-gray-300 p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent'
				value={confirmPassword}
				onChange={e => setConfirmPassword(e.target.value)}
				required
			/>

			{error && <p className='text-red-500 text-xs sm:text-sm'>{error}</p>}

			<button
				type='submit'
				disabled={signupMutation.isPending}
				className='w-full bg-gray-500 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors text-white p-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2'>
				{signupMutation.isPending ? <Spinner className='mx-auto my-1' /> : 'Zarejestruj się'}
			</button>

			<button
				type='button'
				onClick={onSwitchToLogin}
				className='text-sm text-gray-500 underline underline-offset-2 hover:text-gray-700 transition-colors cursor-pointer'>
				Masz już konto? Zaloguj się
			</button>
		</form>
	)
}

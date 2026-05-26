'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import Logo from '@/app/components/Logo'
import { Spinner } from '@/components/ui/spinner'

export default function ResetPasswordPage() {
	const [email, setEmail] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [success, setSuccess] = useState(false)

	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!email) {
			setError('Proszę wpisać adres e-mail.')
			return
		}

		setLoading(true)
		setError('')
		setSuccess(false)

		const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${window.location.origin}/login/set-password`,
		})

		setLoading(false)

		if (resetError) {
			setError(resetError.message || 'Nie udało się wysłać linku resetującego hasło.')
			return
		}

		setSuccess(true)
		setEmail('')
	}

	return (
		<main className='min-h-screen flex items-center justify-center px-6'>
			<div className='p-6 sm:p-8 lg:px-10 rounded-2xl space-y-4 lg:space-y-0 min-w-80 sm:min-w-130 lg:min-w-200 bg-white shadow-md text-gray-700 lg:flex lg:h-130 flex flex-col lg:flex-row items-center justify-center'>
				<div className='lg:w-1/2 mx-auto'>
					<Logo className='w-30 lg:w-60 mx-auto' />
				</div>

				<div className='w-full lg:w-1/2'>
					<form
						onSubmit={handleSubmit}
						className='flex flex-col items-center justify-center h-full gap-8 w-full p-2'>
						<h1 className='text-2xl font-semibold text-center'>Resetuj hasło</h1>

						{!success ? (
							<>
								<p className='text-sm text-gray-600 text-center'>
									Wpisz swój adres e-mail, a wyślemy Ci link do resetowania hasła.
								</p>

								<input
									type='email'
									placeholder='Adres e-mail'
									disabled={loading}
									className='w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-700'
									value={email}
									onChange={e => setEmail(e.target.value)}
									required
								/>

								{error && <p className='text-red-500 text-xs sm:text-sm text-center'>{error}</p>}

								<button
									type='submit'
									disabled={loading}
									className='w-full bg-gray-500 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors text-white p-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2'>
									{loading ? <Spinner className='mx-auto my-1' /> : 'Wyślij link resetujący'}
								</button>
							</>
						) : (
							<div className='flex flex-col items-center justify-center gap-4'>
								<p className='text-green-600 text-sm sm:text-base text-center font-medium'>
									Link do resetowania hasła został wysłany!
								</p>
								<p className='text-sm text-gray-600 text-center'>
									Sprawdź swoją skrzynkę odbiorczą i postępuj zgodnie z instrukcjami w wiadomości e-mail.
								</p>
							</div>
						)}
					</form>
				</div>
			</div>
		</main>
	)
}

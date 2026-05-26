'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import Logo from '@/app/components/Logo'
import { Spinner } from '@/components/ui/spinner'
import { useSearchParams } from 'next/navigation'

export default function SetPasswordPage() {
	const router = useRouter()
	const searchParams = useSearchParams()

	const [ready, setReady] = useState(false)
	const [loading, setLoading] = useState(false)

	const [error, setError] = useState('')
	const [password, setPassword] = useState('')
	const [confirm, setConfirm] = useState('')

	useEffect(() => {
		const init = async () => {
			const code = searchParams.get('code')

			if (code) {
				const { error } = await supabase.auth.exchangeCodeForSession(code)

				if (error) {
					setError('Wystąpił błąd, spróbuj ponownie później.')
					return
				}

				setReady(true)
				return
			}

			const hash = window.location.hash
			const params = new URLSearchParams(hash.slice(1))

			const accessToken = params.get('access_token')
			const refreshToken = params.get('refresh_token')

			if (!accessToken || !refreshToken) {
				setError('Link jest nieprawidłowy lub wygasł.')
				return
			}

			supabase.auth
				.setSession({
					access_token: accessToken,
					refresh_token: refreshToken,
				})
				.then(({ error }) => {
					if (error) {
						setError(error.message)
					} else {
						setReady(true)
					}
				})
		}
		init()
	}, [])

	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (password !== confirm) {
			setError('Hasła nie są identyczne.')
			return
		}

		setLoading(true)
		setError('')

		const { error } = await supabase.auth.updateUser({
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
		<main className='min-h-screen flex items-center justify-center px-6'>
			<div className='p-6 sm:p-8 lg:px-10 rounded-2xl space-y-4 lg:space-y-0 min-w-80 sm:min-w-130 lg:min-w-200 bg-white shadow-md text-gray-700 lg:flex lg:h-130 flex flex-col lg:flex-row items-center justify-center'>
				<div className='lg:w-1/2 mx-auto'>
					<Logo className='w-30 lg:w-60 mx-auto' />
				</div>

				<div className='w-full lg:w-1/2'>
					{!ready && !error ? (
						<div className='flex items-center justify-center h-full'>
							<Spinner className='mx-auto my-1' />
						</div>
					) : (
						<form
							onSubmit={handleSubmit}
							className='flex flex-col items-center justify-center h-full gap-8 w-full p-2'>
							<h1 className='text-2xl font-semibold text-center'>Ustaw nowe hasło</h1>

							<input
								type='password'
								placeholder='Nowe hasło'
								disabled={!ready || loading}
								className='w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-700'
								value={password}
								onChange={e => setPassword(e.target.value)}
								required
							/>

							<input
								type='password'
								placeholder='Powtórz hasło'
								disabled={!ready || loading}
								className='w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-700'
								value={confirm}
								onChange={e => setConfirm(e.target.value)}
								required
							/>

							{error && <p className='text-red-500 text-xs sm:text-sm text-center'>{error}</p>}

							<button
								type='submit'
								disabled={!ready || loading}
								className='w-full bg-gray-500 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors text-white p-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2'>
								{loading ? <Spinner className='mx-auto my-1' /> : 'Zapisz hasło'}
							</button>
						</form>
					)}
				</div>
			</div>
		</main>
	)
}

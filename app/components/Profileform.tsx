'use client'

import { useState } from 'react'
import { trpc } from '@/lib/trpc/provider'
import { Spinner } from '@/components/ui/spinner'
import { Eye, EyeOff, User, Mail, Lock, ShieldCheck } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface Profile {
	id: string
	name: string
	email: string
	role: 'ADMIN' | 'MANAGER' | 'EMPLOYEE'
	hourlyRate: number | null
}

export default function ProfileForm({ profile }: { profile: Profile }) {
	const router = useRouter()
	const isManager = profile.role === 'MANAGER' || profile.role === 'ADMIN'

	const [name, setName] = useState(profile.name)
	const [email, setEmail] = useState(profile.email)
	const [newPassword, setNewPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [showNew, setShowNew] = useState(false)
	const [showConfirm, setShowConfirm] = useState(false)

	const [showConfirmModal, setShowConfirmModal] = useState(false)
	const [currentPassword, setCurrentPassword] = useState('')
	const [showCurrent, setShowCurrent] = useState(false)
	const [authError, setAuthError] = useState<string | null>(null)
	const [authLoading, setAuthLoading] = useState(false)
	const [formError, setFormError] = useState<string | null>(null)
	const [success, setSuccess] = useState(false)

	const utils = trpc.useUtils()
	const updateMutation = trpc.user.updateProfile.useMutation({
		onSuccess: async () => {
			utils.user.invalidate()
			if (newPassword) {
				await supabase.auth.signInWithPassword({
					email: email,
					password: newPassword,
				})
			}
			showSuccess()
			setNewPassword('')
			setConfirmPassword('')
			setShowConfirmModal(false)
			setCurrentPassword('')
			setAuthLoading(false)
			router.refresh()
		},
		onError: err => {
			setAuthError(err.message)
			setAuthLoading(false)
		},
	})

	const hasChanges = name !== profile.name || email !== profile.email || newPassword.length > 0

	const handleSaveClick = () => {
		setFormError(null)
		setSuccess(false)

		if (newPassword && newPassword !== confirmPassword) {
			setFormError('Hasła nie są zgodne')
			return
		}
		if (newPassword && newPassword.length < 8) {
			setFormError('Nowe hasło musi mieć co najmniej 8 znaków')
			return
		}
		if (!hasChanges) {
			setFormError('Nie wprowadzono żadnych zmian')
			return
		}

		setAuthError(null)
		setCurrentPassword('')
		setShowConfirmModal(true)
	}

	const handleConfirm = async () => {
		if (!currentPassword) {
			setAuthError('Podaj aktualne hasło')
			return
		}

		setAuthLoading(true)
		setAuthError(null)

		const { error } = await supabase.auth.signInWithPassword({
			email: profile.email,
			password: currentPassword,
		})

		if (error) {
			setAuthError('Nieprawidłowe hasło')
			setAuthLoading(false)
			return
		}

		updateMutation.mutate({
			...(isManager && name !== profile.name ? { name } : {}),
			...(email !== profile.email ? { email } : {}),
			...(newPassword ? { newPassword } : {}),
		})
	}

	const showSuccess = () => {
		setSuccess(true)
		setTimeout(() => setSuccess(false), 2000)
	}

	document.addEventListener('keydown', e => {
		if (e.key === 'Enter' && !showConfirmModal) {
			handleSaveClick()
		}
	})

	return (
		<>
			<div className='w-full max-w-lg bg-white rounded-xl border border-gray-100 shadow-sm p-6 lg:p-8 flex flex-col gap-4 mt-topPanel-height mx-auto'>
				<h2 className='text-lg font-semibold text-gray-800 uppercase tracking-wide'>Dane Użytkownika</h2>

				<div className='h-px bg-gray-100' />

				{isManager && (
					<div className='flex flex-col gap-2'>
						<label className='text-sm font-medium text-gray-700 flex items-center gap-1.5'>
							<User className='size-4 text-gray-400' />
							Imię i nazwisko
						</label>
						<input
							type='text'
							value={name}
							onChange={e => setName(e.target.value)}
							className='w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-700'
						/>
					</div>
				)}

				<div className='flex flex-col gap-2'>
					<label className='text-sm font-medium text-gray-700 flex items-center gap-1.5'>
						<Mail className='size-4 text-gray-400' />
						Adres email
					</label>
					<input
						type='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						className='w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-700'
					/>
				</div>

				<div className='h-px bg-gray-100' />

				<div className='flex flex-col gap-1'>
					<span className='text-sm font-medium text-gray-700 flex items-center gap-1.5 mb-1'>
						<Lock className='size-4 text-gray-400' />
						Zmień hasło
					</span>
					<div className='flex flex-col gap-3'>
						<div className='relative'>
							<input
								type={showNew ? 'text' : 'password'}
								value={newPassword}
								onChange={e => setNewPassword(e.target.value)}
								placeholder='Nowe hasło (min. 8 znaków)'
								className='w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-700 pr-11'
							/>
							<button
								type='button'
								onClick={() => setShowNew(p => !p)}
								className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'>
								{showNew ? <Eye className='size-4' /> : <EyeOff className='size-4' />}
							</button>
						</div>
						<div className='relative'>
							<input
								type={showConfirm ? 'text' : 'password'}
								value={confirmPassword}
								onChange={e => setConfirmPassword(e.target.value)}
								placeholder='Potwierdź nowe hasło'
								className='w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-700 pr-11'
							/>
							<button
								type='button'
								onClick={() => setShowConfirm(p => !p)}
								className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'>
								{showConfirm ? <Eye className='size-4' /> : <EyeOff className='size-4' />}
							</button>
						</div>
					</div>
				</div>

				{formError && <div className='p-3 rounded-xl bg-red-50 text-red-600 text-sm'>{formError}</div>}
				{success && (
					<div className='p-3 rounded-xl bg-green-50 text-green-700 text-sm'>Dane zostały zaktualizowane</div>
				)}

				<button
					type='button'
					onClick={handleSaveClick}
					disabled={!hasChanges}
					className='w-full bg-gray-800 hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium p-3 rounded-xl transition-colors flex items-center justify-center gap-2'>
					Zapisz zmiany
				</button>
			</div>

			{showConfirmModal && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm'>
					<div className='bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4 flex flex-col gap-4'>
						<div className='flex flex-col gap-1'>
							<h3 className='text-base font-semibold text-gray-800  tracking-wide'>Podaj hasło</h3>
							<p className='text-sm text-gray-400'>Aby zapisać zmiany, podaj aktualne hasło</p>
						</div>

						<div className='relative'>
							<input
								type={showCurrent ? 'text' : 'password'}
								value={currentPassword}
								onChange={e => setCurrentPassword(e.target.value)}
								placeholder='Aktualne hasło'
								autoFocus
								onKeyDown={e => e.key === 'Enter' && handleConfirm()}
								className='w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-700 pr-11'
							/>
							<button
								type='button'
								onClick={() => setShowCurrent(p => !p)}
								className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'>
								{showCurrent ? <Eye className='size-4' /> : <EyeOff className='size-4' />}
							</button>
						</div>

						{authError && <div className='p-3 rounded-xl bg-red-50 text-red-600 text-sm'>{authError}</div>}

						<div className='flex gap-3'>
							<button
								type='button'
								onClick={() => setShowConfirmModal(false)}
								className='flex-1 px-4 py-3 rounded-xl text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors'>
								Anuluj
							</button>
							<button
								type='button'
								onClick={handleConfirm}
								disabled={authLoading}
								className='flex-1 bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400 text-white font-medium p-3 rounded-xl transition-colors flex items-center justify-center gap-2'>
								{authLoading ? (
									<>
										<Spinner className='size-4' />
									</>
								) : (
									'Potwierdź'
								)}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

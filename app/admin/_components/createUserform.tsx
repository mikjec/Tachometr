'use client'

import { useState } from 'react'
import { trpc } from '@/lib/trpc/client'

interface Props {
	companies: { id: string; name: string }[]
	onSuccess?: () => void
}

export function CreateUserForm({ companies, onSuccess }: Props) {
	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const [role, setRole] = useState<'MANAGER' | 'EMPLOYEE'>('EMPLOYEE')
	const [companyId, setCompanyId] = useState('')
	const [hourlyRate, setHourlyRate] = useState('')
	const [error, setError] = useState('')

	const { mutate, isPending } = trpc.user.create.useMutation({
		onSuccess: () => {
			setEmail('')
			setName('')
			setPassword('')
			setRole('EMPLOYEE')
			setCompanyId('')
			setHourlyRate('')
			setError('')
			onSuccess?.()
		},
		onError: e => setError(String(e.message)),
	})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (!email || !name || !password || !companyId) {
			setError('Wypełnij wszystkie wymagane pola')
			return
		}

		setError('')
		mutate({
			email,
			name,
			password,
			role,
			companyId,
			hourlyRate: hourlyRate ? Number(hourlyRate) : undefined,
		})
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col gap-4 max-w-md'>
			{error && <p className='text-red-500 text-sm'>{error}</p>}

			<input
				type='email'
				placeholder='Email'
				value={email}
				onChange={e => setEmail(e.target.value)}
				className='border rounded-md px-3 py-2 text-sm'
			/>
			<input
				type='text'
				placeholder='Imię i nazwisko'
				value={name}
				onChange={e => setName(e.target.value)}
				className='border rounded-md px-3 py-2 text-sm'
			/>
			<input
				type='password'
				placeholder='Hasło (min. 8 znaków)'
				value={password}
				onChange={e => setPassword(e.target.value)}
				className='border rounded-md px-3 py-2 text-sm'
			/>
			<select
				value={role}
				onChange={e => setRole(e.target.value as 'MANAGER' | 'EMPLOYEE')}
				className='border rounded-md px-3 py-2 text-sm'>
				<option value='EMPLOYEE'>Pracownik</option>
				<option value='MANAGER'>Manager</option>
			</select>
			<select
				value={companyId}
				onChange={e => setCompanyId(e.target.value)}
				className='border rounded-md px-3 py-2 text-sm'>
				<option value=''>Wybierz firmę</option>
				{companies.map(c => (
					<option
						key={c.id}
						value={c.id}>
						{c.name}
					</option>
				))}
			</select>
			<input
				type='number'
				placeholder='Stawka godzinowa (opcjonalna)'
				value={hourlyRate}
				onChange={e => setHourlyRate(e.target.value)}
				className='border rounded-md px-3 py-2 text-sm'
			/>

			<button
				type='submit'
				disabled={isPending}
				className='bg-blue-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50'>
				{isPending ? 'Tworzenie...' : 'Utwórz użytkownika'}
			</button>
		</form>
	)
}

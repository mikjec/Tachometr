'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { trpc } from '@/lib/trpc/provider'
import { Spinner } from '@/components/ui/spinner'

interface EmployeeFormProps {
	mode?: 'create' | 'edit'
	employeeId?: string
	initialData?: {
		name: string
		email: string
		hourlyRate: number | null
	}
}

export default function EmployeeForm({ mode = 'create', employeeId, initialData }: EmployeeFormProps) {
	const router = useRouter()
	const [name, setName] = useState(initialData?.name ?? '')
	const [email, setEmail] = useState(initialData?.email ?? '')
	const [hourlyRate, setHourlyRate] = useState(initialData?.hourlyRate?.toString() ?? '')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)

	const isEditing = mode === 'edit'

	const createMutation = trpc.user.createEmployee.useMutation({
		onSuccess: () => {
			router.push('/manage/employees')
		},
		onError: err => {
			setError(err.message)
		},
	})

	const updateMutation = trpc.user.updateEmployee.useMutation({
		onSuccess: () => {
			router.push('/manage/employees')
		},
		onError: err => {
			setError(err.message)
		},
	})

	const deleteMutation = trpc.user.deleteEmployee.useMutation({
		onSuccess: () => {
			router.push('/manage/employees')
		},
		onError: err => {
			setError(err.message)
		},
	})

	const isPending = isEditing ? updateMutation.isPending : createMutation.isPending

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		setError(null)

		const rate = hourlyRate ? parseFloat(hourlyRate) : null
		if (hourlyRate && (isNaN(rate!) || rate! < 0)) {
			setError('Stawka godzinowa musi być liczbą nieujemną')
			return
		}

		if (isEditing && employeeId) {
			updateMutation.mutate({
				id: employeeId,
				name: name || undefined,
				email: email || undefined,
				hourlyRate: rate,
			})
		} else {
			if (password.length < 8) {
				setError('Hasło musi mieć co najmniej 8 znaków')
				return
			}
			createMutation.mutate({
				name,
				email,
				hourlyRate: rate,
				password,
			})
		}
	}

	const handleDelete = () => {
		if (!employeeId) return
		if (!confirm('Czy na pewno chcesz usunąć tego pracownika? Tej operacji nie można cofnąć.')) return
		deleteMutation.mutate(employeeId)
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col gap-4 lg:gap-5 w-full'>
			{/* Name */}
			<div className='flex flex-col gap-2'>
				<label
					htmlFor='name'
					className='text-sm font-medium text-gray-700'>
					Imię i nazwisko <span className='text-red-500'>*</span>
				</label>
				<input
					type='text'
					id='name'
					value={name}
					onChange={e => setName(e.target.value)}
					placeholder='np. Jan Kowalski'
					className='w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-700'
					required
				/>
			</div>

			{/* Email */}
			<div className='flex flex-col gap-2'>
				<label
					htmlFor='email'
					className='text-sm font-medium text-gray-700'>
					Email <span className='text-red-500'>*</span>
				</label>
				<input
					type='email'
					id='email'
					value={email}
					onChange={e => setEmail(e.target.value)}
					placeholder='np. jan@firma.pl'
					className='w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-700'
					required
				/>
			</div>

			{/* Hourly Rate */}
			<div className='flex flex-col gap-2'>
				<label
					htmlFor='hourlyRate'
					className='text-sm font-medium text-gray-700'>
					Stawka godzinowa (zł)
				</label>
				<input
					type='number'
					id='hourlyRate'
					value={hourlyRate}
					onChange={e => setHourlyRate(e.target.value)}
					placeholder='np. 35'
					min='0'
					step='0.01'
					className='w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-700'
				/>
			</div>

			{/* Password (create only) */}
			{!isEditing && (
				<div className='flex flex-col gap-2'>
					<label
						htmlFor='password'
						className='text-sm font-medium text-gray-700'>
						Hasło <span className='text-red-500'>*</span>
					</label>
					<input
						type='password'
						id='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						placeholder='Minimum 8 znaków'
						minLength={8}
						className='w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-700'
						required
					/>
				</div>
			)}

			{/* Error Message */}
			{error && <div className='p-3 rounded-xl bg-red-50 text-red-600 text-sm'>{error}</div>}

			{/* Buttons */}
			<div className='flex sm:flex-row gap-3 pt-2'>
				<button
					type='button'
					onClick={() => router.back()}
					className='w-full sm:flex-1 px-4 py-3 rounded-xl text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer'>
					Anuluj
				</button>
				{isEditing && (
					<button
						type='button'
						onClick={handleDelete}
						disabled={deleteMutation.isPending}
						className='w-full sm:flex-1 px-4 py-3 rounded-xl text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center justify-center gap-2'>
						{deleteMutation.isPending ? (
							<>
								<Spinner className='size-5' />
								Usuwanie...
							</>
						) : (
							'Usuń pracownika'
						)}
					</button>
				)}
				<button
					type='submit'
					disabled={isPending}
					className='w-full sm:flex-1 bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400 text-white font-medium p-3 lg:p-4 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2'>
					{isPending ? (
						<>
							<Spinner className='size-5' />
							{isEditing ? 'Zapisywanie...' : 'Tworzenie...'}
						</>
					) : isEditing ? (
						'Zapisz zmiany'
					) : (
						'Utwórz pracownika'
					)}
				</button>
			</div>
		</form>
	)
}

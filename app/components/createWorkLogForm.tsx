'use client'

import React, { useState } from 'react'
import { trpc } from '@/lib/trpc/provider'
import { X } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'

interface CreateWorkLogFormProps {
	onClose: () => void
	onSuccess?: () => void
}

export default function CreateWorkLogForm({ onClose, onSuccess }: CreateWorkLogFormProps) {
	const today = new Date().toISOString().split('T')[0]
	const [date, setDate] = useState(today)
	const [hours, setHours] = useState('')
	const [note, setNote] = useState('')
	const [error, setError] = useState<string | null>(null)

	const createMutation = trpc.workLog.create.useMutation({
		onSuccess: () => {
			onSuccess?.()
			onClose()
		},
		onError: err => {
			setError(err.message)
		},
	})

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError(null)

		const hoursNum = parseFloat(hours)
		if (isNaN(hoursNum) || hoursNum < 0.5 || hoursNum > 24) {
			setError('Godziny muszą być wartością od 0.5 do 24')
			return
		}

		if (!date) {
			setError('Data jest wymagana')
			return
		}

		createMutation.mutate({
			date: new Date(date),
			hours: hoursNum,
			note: note || undefined,
		})
	}

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center'>
			{/* Backdrop */}
			<div
				className='absolute inset-0 bg-black/50 backdrop-blur-sm'
				onClick={onClose}
			/>

			{/* Form Container */}
			<div className='relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-xl p-8'>
				{/* Close Button */}
				<button
					onClick={onClose}
					className='absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors'
					aria-label='Zamknij'>
					<X className='size-5' />
				</button>

				{/* Header */}
				<div className='mb-6'>
					<h2 className='text-2xl font-semibold text-gray-800'>Dodaj nowy wpis</h2>
					<p className='text-sm text-gray-500 mt-1'>Wprowadź dane swojego wpisu pracy</p>
				</div>

				{/* Form */}
				<form
					onSubmit={handleSubmit}
					className='flex flex-col gap-5'>
					{/* Date */}
					<div className='flex flex-col gap-2'>
						<label
							htmlFor='date'
							className='text-sm font-medium text-gray-700'>
							Data <span className='text-red-500'>*</span>
						</label>
						<input
							type='date'
							id='date'
							value={date}
							onChange={e => setDate(e.target.value)}
							max={new Date().toISOString().split('T')[0]}
							className='w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-700'
							required
						/>
					</div>

					{/* Hours */}
					<div className='flex flex-col gap-2'>
						<label
							htmlFor='hours'
							className='text-sm font-medium text-gray-700'>
							Godziny <span className='text-red-500'>*</span>
						</label>
						<input
							type='number'
							id='hours'
							value={hours}
							onChange={e => setHours(e.target.value)}
							placeholder='np. 8'
							min='0.5'
							max='24'
							step='0.25'
							className='w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-700'
							required
						/>
					</div>

					{/* Note */}
					<div className='flex flex-col gap-2'>
						<label
							htmlFor='note'
							className='text-sm font-medium text-gray-700'>
							Notatka
						</label>
						<textarea
							id='note'
							value={note}
							onChange={e => setNote(e.target.value)}
							placeholder='Opcjonalna notatka do wpisu...'
							rows={4}
							className='w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-700 resize-none'
						/>
					</div>

					{/* Error Message */}
					{error && <div className='p-3 rounded-xl bg-red-50 text-red-600 text-sm'>{error}</div>}

					{/* Submit Button */}
					<button
						type='submit'
						disabled={createMutation.isPending}
						className='w-full bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400 text-white font-medium p-4 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2'>
						{createMutation.isPending ? (
							<>
								<Spinner className='size-5' />
								Tworzenie...
							</>
						) : (
							'Dodaj wpis'
						)}
					</button>
				</form>
			</div>
		</div>
	)
}

'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { trpc } from '@/lib/trpc/provider'
import { Spinner } from '@/components/ui/spinner'

interface WorkLogFormProps {
	mode?: 'create' | 'edit'
	workLogId?: string
	initialData?: {
		date: Date
		hours: number
		note: string | null
	}
	onSuccess?: () => void
}

export default function WorkLogForm({ mode = 'create', workLogId, initialData, onSuccess }: WorkLogFormProps) {
	const router = useRouter()
	const [date, setDate] = useState(
		initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
	)
	const [hours, setHours] = useState(initialData?.hours?.toString() ?? '')
	const [note, setNote] = useState(initialData?.note ?? '')
	const [error, setError] = useState<string | null>(null)

	const createMutation = trpc.workLog.create.useMutation({
		onSuccess: () => {
			onSuccess?.()
			router.push('/employee/workLogs')
		},
		onError: err => {
			setError(err.message)
		},
	})

	const updateMutation = trpc.workLog.update.useMutation({
		onSuccess: () => {
			router.refresh()
		},
		onError: err => {
			setError(err.message)
		},
	})

	const isPending = mode === 'create' ? createMutation.isPending : updateMutation.isPending
	const isEditing = mode === 'edit'

	const handleSubmit = (e: React.SubmitEvent) => {
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

		if (isEditing && workLogId) {
			updateMutation.mutate({
				id: workLogId,
				date: new Date(date),
				hours: hoursNum,
				note: note,
			})
		} else {
			createMutation.mutate({
				date: new Date(date),
				hours: hoursNum,
				note: note || undefined,
			})
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col  gap-4 lg:gap-5 w-full'>
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

			{/* Responsywne Przyciski (na telefonie w kolumnie, od rozmiaru 'sm' w wierszu) */}
			<div className='flex sm:flex-row gap-3 pt-2'>
				<button
					type='button'
					onClick={() => router.back()}
					className='w-full sm:flex-1 px-4 py-3 rounded-xl text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer'>
					Anuluj
				</button>
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
						'Dodaj wpis'
					)}
				</button>
			</div>
		</form>
	)
}

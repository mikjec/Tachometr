'use client'

import React, { useState } from 'react'
import { trpc } from '@/lib/trpc/provider'
import { Spinner } from '@/components/ui/spinner'
import Link from 'next/link'
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

function translateError(message: string): string {
	const errors: Record<string, string> = {
		'Nie można dodać wpisu z przyszłą datą': 'Nie można dodać wpisu z przyszłą datą',
		'Wpis na ten dzień już istnieje': 'Wpis na ten dzień już istnieje',
		'Użytkownik nie istnieje': 'Użytkownik nie istnieje',
		'Nie odnaleziono wpisu': 'Nie odnaleziono wpisu',
		'Nie można usunąć wpisu': 'Nie można usunąć wpisu',
		'Wpis został opłacony i nie może być edytowany': 'Wpis został opłacony i nie może być edytowany',
	}

	return errors[message] ?? message
}

function WorkLog({ id }: { id: string }) {
	const router = useRouter()
	const [isEditing, setIsEditing] = useState(false)
	const [date, setDate] = useState('')
	const [hours, setHours] = useState('')
	const [note, setNote] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [deleteConfirm, setDeleteConfirm] = useState(false)

	const query = trpc.workLog.getById.useQuery(id)

	const updateMutation = trpc.workLog.update.useMutation({
		onSuccess: () => {
			query.refetch()
			setIsEditing(false)
			setError(null)
		},
		onError: err => {
			setError(translateError(err.message))
		},
	})

	const deleteMutation = trpc.workLog.delete.useMutation({
		onSuccess: () => {
			router.push('/employee/workLogs')
		},
		onError: err => {
			setError(translateError(err.message))
			setDeleteConfirm(false)
		},
	})

	if (query.isLoading)
		return (
			<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
				<Spinner className='size-10' />
			</div>
		)

	if (!query.data)
		return (
			<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500'>
				Nie znaleziono wpisu
			</div>
		)

	const workLog = query.data

	const handleEdit = () => {
		setDate(new Date(workLog.date).toISOString().split('T')[0])
		setHours(workLog.hours.toString())
		setNote(workLog.note ?? '')
		setIsEditing(true)
		setError(null)
	}

	const handleSave = async (e: React.FormEvent) => {
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

		updateMutation.mutate({
			id: workLog.id,
			date: new Date(date),
			hours: hoursNum,
			note: note || undefined,
		})
	}

	const handleDelete = () => {
		deleteMutation.mutate(workLog.id)
	}

	if (isEditing) {
		return (
			<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg mx-4 bg-white rounded-2xl shadow-sm p-8'>
				<div className='flex items-center justify-between mb-6'>
					<h2 className='text-2xl font-semibold text-gray-800'>Edytuj wpis</h2>
					<button
						onClick={() => setIsEditing(false)}
						className='text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition-colors bg-gray-100 p-3 rounded-4xl'>
						<ArrowLeft />
					</button>
				</div>

				<form
					onSubmit={handleSave}
					className='flex flex-col gap-5'>
					<div className='flex flex-col gap-2'>
						<label
							htmlFor='edit-date'
							className='text-sm font-medium text-gray-700'>
							Data <span className='text-red-500'>*</span>
						</label>
						<input
							type='date'
							id='edit-date'
							value={date}
							onChange={e => setDate(e.target.value)}
							max={new Date().toISOString().split('T')[0]}
							className='w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-700'
							required
						/>
					</div>

					<div className='flex flex-col gap-2'>
						<label
							htmlFor='edit-hours'
							className='text-sm font-medium text-gray-700'>
							Godziny <span className='text-red-500'>*</span>
						</label>
						<input
							type='number'
							id='edit-hours'
							value={hours}
							onChange={e => setHours(e.target.value)}
							min='0.5'
							max='24'
							step='0.5'
							className='w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-700'
							required
						/>
					</div>

					<div className='flex flex-col gap-2'>
						<label
							htmlFor='edit-note'
							className='text-sm font-medium text-gray-700'>
							Notatka
						</label>
						<textarea
							id='edit-note'
							value={note}
							onChange={e => setNote(e.target.value)}
							rows={4}
							className='w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-700 resize-none'
						/>
					</div>

					{error && <div className='p-3 rounded-xl bg-red-50 text-red-600 text-sm'>{error}</div>}

					<div className='flex gap-3 pt-2'>
						<button
							type='button'
							onClick={() => setIsEditing(false)}
							className='flex-1 px-4 py-3 rounded-xl text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer'>
							Anuluj
						</button>
						<button
							type='submit'
							disabled={updateMutation.isPending}
							className='flex-1 bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400 text-white font-medium p-4 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2'>
							{updateMutation.isPending ? (
								<>
									<Spinner className='size-5' />
									Zapisywanie...
								</>
							) : (
								'Zapisz zmiany'
							)}
						</button>
					</div>
				</form>
			</div>
		)
	}

	return (
		<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-8 w-[60vw] h-[60vh] bg-white p-8 rounded-2xl shadow-sm max-w-300'>
			<div className='flex items-center justify-between'>
				<h1 className='text-3xl font-semibold text-gray-800'>
					{new Date(workLog.date).toLocaleDateString('pl-PL', {
						day: 'numeric',
						month: 'long',
						year: 'numeric',
					})}
				</h1>

				<Link
					href='/employee/workLogs'
					className='text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition-colors bg-gray-100 p-3 rounded-4xl '>
					<ArrowLeft />
				</Link>
			</div>

			{error && <div className='p-3 rounded-xl bg-red-50 text-red-600 text-sm'>{error}</div>}

			<div className='grid grid-cols-3 gap-8'>
				<div className='flex flex-col gap-1'>
					<span className='text-xs text-gray-400 uppercase tracking-wide'>Godziny</span>
					<span className='text-2xl font-semibold text-gray-800'>{workLog.hours}h</span>
				</div>
				<div className='flex flex-col gap-1'>
					<span className='text-xs text-gray-400 uppercase tracking-wide'>ID wpisu</span>
					<span className='text-lg font-medium text-gray-700 break-all'>{workLog.id}</span>
				</div>
				<div className='flex flex-col gap-1'>
					<span className='text-xs text-gray-400 uppercase tracking-wide'>Status</span>
					{workLog.paid ? (
						<span className='w-fit px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700'>
							Opłacone
						</span>
					) : (
						<span className='w-fit px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700'>
							Oczekuje
						</span>
					)}
				</div>
			</div>

			<div className='flex flex-col gap-2 flex-1'>
				<span className='text-xs text-gray-400 uppercase tracking-wide'>Notatka</span>
				<div className='border border-gray-100 rounded-xl p-6 text-gray-700 bg-gray-50 h-full overflow-y-auto'>
					{workLog.note ?? 'Brak notatki'}
				</div>
			</div>

			{workLog.paid ? (
				''
			) : deleteConfirm ? (
				<div className='flex justify-end gap-3 pt-2 border-t border-gray-100'>
					<span className='flex-1 flex items-center text-sm text-gray-600'>Czy na pewno chcesz usunąć ten wpis?</span>
					<button
						onClick={() => setDeleteConfirm(false)}
						className='px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer'>
						Anuluj
					</button>
					<button
						onClick={handleDelete}
						disabled={deleteMutation.isPending}
						className='px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors cursor-pointer flex items-center gap-2'>
						{deleteMutation.isPending && <Spinner className='size-4' />}
						Usuń
					</button>
				</div>
			) : (
				<div className='flex justify-end gap-3 pt-2 border-t border-gray-100'>
					<button
						onClick={handleEdit}
						className='px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer flex items-center gap-2'>
						<Pencil className='size-4' />
						Edytuj
					</button>

					<button
						onClick={() => setDeleteConfirm(true)}
						className='px-4 py-2 rounded-lg text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-colors cursor-pointer flex items-center gap-2'>
						<Trash2 className='size-4' />
						Usuń
					</button>
				</div>
			)}
		</div>
	)
}

export default WorkLog

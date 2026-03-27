'use client'

import React, { useState } from 'react'
import { trpc } from '@/lib/trpc/provider'
import { Spinner } from '@/components/ui/spinner'
import Link from 'next/link'
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import WorkLogForm from '@/app/components/WorkLogForm'

function WorkLog({ id }: { id: string }) {
	const router = useRouter()
	const [isEditing, setIsEditing] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [deleteConfirm, setDeleteConfirm] = useState(false)

	const query = trpc.workLog.getById.useQuery(id, { staleTime: 1000 * 60 })

	const deleteMutation = trpc.workLog.delete.useMutation({
		onSuccess: () => {
			router.push('/employee/workLogs')
		},
		onError: err => {
			setError(err.message)
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

	if (isEditing) {
		return (
			<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen max-h-[80vh] sm:h-fit  lg:w-full sm:max-w-lg bg-white sm:rounded-2xl shadow-sm p-5 lg:p-8 flex flex-col justify-between'>
				<div className='flex items-center justify-between mb-6 h-[10%]'>
					<h2 className='text-xl lg:text-2xl font-semibold text-gray-800'>Edytuj wpis</h2>
					<button
						onClick={() => setIsEditing(false)}
						className='text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition-colors bg-gray-100 p-2 lg:p-3 rounded-4xl'>
						<ArrowLeft />
					</button>
				</div>

				<WorkLogForm
					mode='edit'
					workLogId={workLog.id}
					initialData={{
						date: new Date(workLog.date),
						hours: workLog.hours,
						note: workLog.note,
					}}
					onSuccess={() => {
						query.refetch()
						setIsEditing(false)
						setError(null)
					}}
				/>
			</div>
		)
	}

	return (
		<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 md:gap-8 w-screen h-[80vh] md:w-[60vw] md:h-[60vh] bg-white p-5 md:p-8 md:rounded-2xl shadow-sm max-w-300'>
			<div className='flex items-center justify-between'>
				<h1 className='text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800'>
					{new Date(workLog.date).toLocaleDateString('pl-PL', {
						day: 'numeric',
						month: 'long',
						year: 'numeric',
					})}
				</h1>

				<Link
					href='/employee/workLogs'
					className='text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition-colors bg-gray-100 p-2 lg:p-3 rounded-4xl'>
					<ArrowLeft />
				</Link>
			</div>

			{error && <div className='p-3 rounded-xl bg-red-50 text-red-600 text-sm'>{error}</div>}

			{/* Responsywny Grid */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8'>
				<div className='flex flex-col gap-1'>
					<span className='text-xs text-gray-400 uppercase tracking-wide'>Godziny</span>
					<span className='text-xl lg:text-2xl font-semibold text-gray-800'>{workLog.hours}h</span>
				</div>
				<div className='flex flex-col gap-1'>
					<span className='text-xs text-gray-400 uppercase tracking-wide'>ID wpisu</span>
					<span className='text-base lg:text-lg font-medium text-gray-700 break-all'>{workLog.id}</span>
				</div>
				<div className='flex flex-col gap-1'>
					<span className='text-xs text-gray-400 uppercase tracking-wide'>Status</span>
					{workLog.paid ? (
						<span className='w-fit px-3 py-1 rounded-full text-xs lg:text-sm font-medium bg-green-100 text-green-700'>
							Opłacone
						</span>
					) : (
						<span className='w-fit px-3 py-1 rounded-full text-xs lg:text-sm font-medium bg-yellow-100 text-yellow-700'>
							Oczekuje
						</span>
					)}
				</div>
			</div>

			<div className='flex flex-col gap-2 flex-1 min-h-0'>
				<span className='text-xs text-gray-400 uppercase tracking-wide'>Notatka</span>
				<div className='border border-gray-100 rounded-xl p-4 lg:p-6 text-sm lg:text-base text-gray-700 bg-gray-50 h-full overflow-y-auto'>
					{workLog.note ?? 'Brak notatki'}
				</div>
			</div>

			{/* Responsywne przyciski na dole */}
			{workLog.paid ? null : deleteConfirm ? (
				<div className='flex flex-col lg:flex-row lg:justify-end gap-3 pt-4 border-t border-gray-100'>
					<span className='flex-1 flex items-center justify-center lg:justify-start text-sm text-gray-600 text-center lg:text-left mb-2 lg:mb-0'>
						Czy na pewno chcesz usunąć ten wpis?
					</span>
					<button
						onClick={() => setDeleteConfirm(false)}
						className='w-full lg:w-auto px-4 py-3 lg:py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer'>
						Anuluj
					</button>
					<button
						onClick={() => deleteMutation.mutate(workLog.id)}
						disabled={deleteMutation.isPending}
						className='w-full lg:w-auto px-4 py-3 lg:py-2 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors cursor-pointer flex items-center justify-center gap-2'>
						{deleteMutation.isPending && <Spinner className='size-4' />}
						Usuń
					</button>
				</div>
			) : (
				<div className='flex lg:flex-row justify-end gap-3 pt-4 border-t border-gray-100'>
					<button
						onClick={() => setIsEditing(true)}
						className='w-full lg:w-auto px-4 py-3 lg:py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer flex items-center justify-center lg:justify-start gap-2'>
						<Pencil className='size-4' />
						Edytuj
					</button>
					<button
						onClick={() => setDeleteConfirm(true)}
						className='w-full lg:w-auto px-4 py-3 lg:py-2 rounded-lg text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-colors cursor-pointer flex items-center justify-center lg:justify-start gap-2'>
						<Trash2 className='size-4' />
						Usuń
					</button>
				</div>
			)}
		</div>
	)
}

export default WorkLog

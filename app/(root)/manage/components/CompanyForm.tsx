'use client'

import { useState } from 'react'
import { trpc } from '@/lib/trpc/provider'
import { Spinner } from '@/components/ui/spinner'
import { Building2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Company {
	id: string
	name: string
}

export default function CompanyForm({ company }: { company: Company | null }) {
	const router = useRouter()
	const [name, setName] = useState(company?.name ?? '')
	const [formError, setFormError] = useState<string | null>(null)
	const [success, setSuccess] = useState(false)

	const utils = trpc.useUtils()
	const updateMutation = trpc.company.update.useMutation({
		onSuccess: () => {
			utils.company.invalidate()
			showSuccess()
			router.refresh()
		},
		onError: err => {
			setFormError(err.message)
		},
	})

	const createMutation = trpc.company.create.useMutation({
		onSuccess: () => {
			utils.company.invalidate()
			showSuccess()
			setName('')
			router.refresh()
		},
		onError: err => {
			setFormError(err.message)
		},
	})

	const hasChanges = company ? name !== company.name : name.length > 0
	const isLoading = updateMutation.isPending || createMutation.isPending

	const handleSaveClick = () => {
		setFormError(null)
		setSuccess(false)

		if (!name.trim()) {
			setFormError('Nazwa firmy jest wymagana')
			return
		}

		if (name.trim().length < 2) {
			setFormError('Nazwa firmy musi mieć co najmniej 2 znaki')
			return
		}

		if (!hasChanges) {
			setFormError('Nie wprowadzono żadnych zmian')
			return
		}

		if (company) {
			updateMutation.mutate({ name: name.trim() })
		} else {
			createMutation.mutate({ name: name.trim() })
		}
	}

	const showSuccess = () => {
		setSuccess(true)
		setTimeout(() => setSuccess(false), 2000)
	}

	return (
		<form className='w-full max-w-lg bg-white rounded-xl border border-gray-100 shadow-sm p-6 lg:p-8 flex flex-col gap-4 mt-topPanel-height mx-auto'>
			<h2 className='text-lg font-semibold text-gray-800 uppercase tracking-wide'>
				{company ? 'Dane Firmy' : 'Utworz Firmę'}
			</h2>

			<div className='h-px bg-gray-100' />

			<div className='flex flex-col gap-2'>
				<label className='text-sm font-medium text-gray-700 flex items-center gap-1.5'>
					<Building2 className='size-4 text-gray-400' />
					Nazwa firmy
				</label>
				<input
					type='text'
					value={name}
					onChange={e => setName(e.target.value)}
					placeholder='np. Acme Corp'
					className='w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-700'
				/>
			</div>

			{formError && <div className='p-3 rounded-xl bg-red-50 text-red-600 text-sm'>{formError}</div>}
			{success && (
				<div className='p-3 rounded-xl bg-green-50 text-green-700 text-sm'>
					{company ? 'Dane firmy zostały zaktualizowane' : 'Firma została utworzona'}
				</div>
			)}

			<button
				type='button'
				onClick={handleSaveClick}
				disabled={!hasChanges || isLoading}
				className='w-full bg-gray-800 hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium p-3 rounded-xl transition-colors flex items-center justify-center gap-2'>
				{isLoading ? (
					<>
						<Spinner className='size-4' />
					</>
				) : company ? (
					'Zapisz zmiany'
				) : (
					'Utwórz firmę'
				)}
			</button>
		</form>
	)
}

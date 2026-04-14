'use client'

import { ChevronRight, ChevronLeft } from 'lucide-react'
import { useEffect } from 'react'
import clsx from 'clsx'

function Pagination({
	page,
	setPage,
	pages,
}: {
	page: number
	setPage: (page: number) => void
	pages: number | undefined
}) {
	const totalPages = pages ?? 0

	const getPageNumbers = (): (number | '...')[] => {
		if (totalPages <= 7) {
			return Array.from({ length: totalPages }, (_, i) => i + 1)
		}

		const delta = 1
		const left = page - delta
		const right = page + delta

		const pages_: (number | '...')[] = []

		pages_.push(1)

		if (left > 2) {
			pages_.push('...')
		} else if (left === 2) {
			pages_.push(2)
		}

		for (let i = Math.max(2, left); i <= Math.min(totalPages - 1, right); i++) {
			pages_.push(i)
		}

		if (right < totalPages - 1) {
			pages_.push('...')
		} else if (right === totalPages - 1) {
			pages_.push(totalPages - 1)
		}

		pages_.push(totalPages)

		return pages_
	}

	const pageNumbers = getPageNumbers()

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === 'ArrowLeft' && page > 1) {
				setPage(page - 1)
			} else if (e.key === 'ArrowRight' && page < totalPages) {
				setPage(page + 1)
			}
		}

		document.addEventListener('keydown', handler)
		return () => document.removeEventListener('keydown', handler) // sprzątanie!
	}, [page, totalPages, setPage])

	return (
		<div className='w-full flex items-center justify-center text-gray-400 text-xl rounded-b-lg bg-white md:bg-white md:shadow-lg md:border-t md:border-gray-100 py-2 lg:py-4 lg:gap-2'>
			<button
				onClick={() => {
					if (page > 1) setPage(page - 1)
				}}
				disabled={page === 1}
				className='disabled:opacity-30 cursor-pointer'>
				<ChevronLeft />
			</button>

			{pageNumbers.map((p, i) =>
				p === '...' ? (
					<span
						key={`dots-${i}`}
						className='px-2 select-none'>
						...
					</span>
				) : (
					<button
						key={p}
						className={clsx('px-3 py-2 m-0.5 cursor-pointer rounded', {
							'text-gray-700 font-semibold': page === p,
							'text-gray-400 hover:text-gray-600': page !== p,
						})}
						onClick={() => setPage(p)}>
						{p}
					</button>
				),
			)}

			<button
				onClick={() => {
					if (page < totalPages) setPage(page + 1)
				}}
				disabled={page === totalPages}
				className='disabled:opacity-30 cursor-pointer'>
				<ChevronRight />
			</button>
		</div>
	)
}

export default Pagination

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
		const total = totalPages

		if (total <= 7) {
			return Array.from({ length: total }, (_, i) => i + 1)
		}

		const visible = new Set<number>()

		// zawsze pokazujemy pierwszą i ostatnią
		visible.add(1)
		visible.add(total)

		// aktualna strona i sąsiedzi
		for (let i = page - 1; i <= page + 1; i++) {
			if (i > 1 && i < total) {
				visible.add(i)
			}
		}

		// gdy jesteśmy blisko początku
		if (page <= 3) {
			visible.add(2)
			visible.add(3)
			visible.add(4)
		}

		// gdy jesteśmy blisko końca
		if (page >= total - 2) {
			visible.add(total - 1)
			visible.add(total - 2)
			visible.add(total - 3)
		}

		const sorted = [...visible].filter(n => n >= 1 && n <= total).sort((a, b) => a - b)

		const result: (number | '...')[] = []

		for (let i = 0; i < sorted.length; i++) {
			const current = sorted[i]
			const previous = sorted[i - 1]

			if (i > 0 && current - previous > 1) {
				result.push('...')
			}

			result.push(current)
		}

		return result
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
		<div className='w-full flex items-center justify-center text-gray-400 text-xl rounded-xl md:rounded-b-lg md:rounded-t-none  bg-white border-t border-gray-200 lg:py-3 lg:gap-2 py-2'>
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
						className={clsx('px-2 md:px-3 py-1 m-0.5 cursor-pointer rounded', {
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

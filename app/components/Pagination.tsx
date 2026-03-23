import { ChevronRight, ChevronLeft } from 'lucide-react'
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
	return (
		<div className='w-full flex items-center justify-center text-gray-400 text-xl'>
			<button
				onClick={() => {
					if (page > 1) setPage(page - 1)
				}}>
				<ChevronLeft />
			</button>
			{Array.from({ length: pages ?? 0 }, (_, i) => (
				<button
					key={i}
					className={clsx(`px-4 py-2 m-1 cursor-pointer ${page == i + 1 ? 'text-gray-700' : 'text-gray-400'}`)}
					onClick={() => setPage(i + 1)}>
					{i + 1}
				</button>
			))}
			<button
				onClick={() => {
					if (page < (pages ?? 0)) setPage(page + 1)
				}}>
				<ChevronRight />
			</button>
		</div>
	)
}

export default Pagination

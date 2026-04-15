'use client'
import React from 'react'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
	return (
		<main className='flex items-center justify-center min-h-screen px-4'>
			<div className='flex flex-col gap-6 w-screen sm:w-auto sm:max-w-lg bg-white p-5 sm:p-8 sm:rounded-2xl shadow-sm'>
				<div className='flex flex-col gap-3 text-center'>
					<h1 className='text-5xl sm:text-6xl font-bold text-gray-800'>Błąd</h1>
					<p className='text-lg sm:text-xl text-gray-600'>Wystąpił nieoczekiwany błąd</p>
					<p className='text-sm sm:text-base text-gray-500'>
						{error.message || 'Coś poszło nie tak. Spróbuj ponownie.'}
					</p>
				</div>

				<button
					onClick={reset}
					className='w-full px-4 py-3 rounded-lg text-sm font-medium bg-blue-100  hover:bg-blue-200 transition-colors cursor-pointer text-center'>
					Spróbuj ponownie
				</button>
			</div>
		</main>
	)
}

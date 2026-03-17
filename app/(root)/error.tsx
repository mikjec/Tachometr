'use client'
import React from 'react'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
	return (
		<div>
			<p>Wystąpił błąd: {error.message}</p>
			<button onClick={reset}>Spróbuj ponownie</button>
		</div>
	)
}

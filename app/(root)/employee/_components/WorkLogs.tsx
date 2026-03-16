'use client'

import React from 'react'
import { trpc } from '@/lib/trpc/provider'

function WorkLogs() {
	const { data, isLoading, error } = trpc.workLog.getAll.useQuery()

	if (isLoading) return <p>Ładowanie...</p>
	if (error) return <p>Wystąpił błąd: {error.message}, spróbuj ponownie później</p>

	return (
		<div>
			{data?.map(log => (
				<div
					key={log.id}
					className='p-4 m-4 bg-white w-[200px] text-black'>
					<p>{log.date}</p>
					<p>{log.hours}</p>
					<p>{log.note}</p>
					{log.paid ? 'paid' : 'pending'}
				</div>
			))}
		</div>
	)
}

export default WorkLogs

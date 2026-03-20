'use client'

import React from 'react'
import { trpc } from '@/lib/trpc/provider'

function WorkLog({ id }: { id: string }) {
	const log = trpc.workLog.getById.useQuery(id)

	return (
		<div>
			<h1>{log.data?.date}</h1>
			<p>{log.data?.hours}h</p>
			<p>{log.data?.note}</p>
		</div>
	)
}

export default WorkLog

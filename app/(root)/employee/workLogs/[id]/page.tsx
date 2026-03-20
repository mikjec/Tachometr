import React from 'react'
import WorkLog from './workLog'

async function page(props: { params: Promise<{ id: string }> }) {
	const params = await props.params

	return (
		<div>
			<WorkLog id={params.id} />
		</div>
	)
}

export default page

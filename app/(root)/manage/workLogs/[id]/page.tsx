import React from 'react'
import WorkLog from '../../components/workLog'
import TopPanel from '@/app/components/TopPanel'
import Breadcrumbs from '@/app/components/breadcrumbs'

async function page(props: { params: Promise<{ id: string }> }) {
	const params = await props.params

	return (
		<div>
			<TopPanel>
				<Breadcrumbs
					breadcrumbs={[
						{ label: 'Wpisy pracowników', href: '/manage/workLogs' },
						{
							label: 'Szczegóły',
							href: `/manage/workLogs/${params.id}`,
							active: true,
						},
					]}
				/>
			</TopPanel>
			<WorkLog id={params.id} />
		</div>
	)
}

export default page

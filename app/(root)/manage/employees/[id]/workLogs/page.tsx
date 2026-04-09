import TopPanel from '@/app/components/TopPanel'
import Breadcrumbs from '@/app/components/breadcrumbs'
import WorkLogs from '../../../components/WorkLogs'
import { prisma } from '@/lib/prisma/prisma'
import { notFound } from 'next/navigation'

interface PageProps {
	params: Promise<{ id: string }>
}

async function Page({ params }: PageProps) {
	const { id } = await params

	const employee = await prisma.user.findUnique({
		where: { id },
		select: { name: true },
	})

	if (!employee) notFound()

	return (
		<>
			<header>
				<TopPanel>
					<Breadcrumbs
						breadcrumbs={[
							{ label: 'Pracownicy', href: '/manage/employees' },
							{ label: employee.name ?? 'Pracownik', href: `/manage/employees/${id}` },
							{ label: 'Wpisy', href: `/manage/employees/${id}/workLogs`, active: true },
						]}
					/>
				</TopPanel>
			</header>

			<main className='flex flex-col items-center py-4'>
				<div className='w-full lg:w-[70vw] lg:max-w-300 pt-topPanel-height max-h-[60vh]'>
					<WorkLogs userId={id} />
				</div>
			</main>
		</>
	)
}

export default Page

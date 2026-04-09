// app/admin/page.tsx
import { prisma } from '@/lib/prisma/prisma'
import { CreateUserForm } from './_components/createUserform'
import TopPanel from '@/app/components/TopPanel'

export default async function AdminPage() {
	const companies = await prisma.company.findMany({
		select: { id: true, name: true },
	})

	return (
		<>
			<header>
				<TopPanel>Panel Admina</TopPanel>
			</header>
			<main>
				<div className='p-8'>
					<CreateUserForm companies={companies} />
				</div>
			</main>
		</>
	)
}

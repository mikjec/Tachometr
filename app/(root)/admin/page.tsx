// app/admin/page.tsx
import { prisma } from '@/lib/prisma/prisma'
import { CreateUserForm } from './_components/createUserform'

export default async function AdminPage() {
	const companies = await prisma.company.findMany({
		select: { id: true, name: true },
	})

	return (
		<div className='p-8'>
			<h1 className='text-2xl font-bold mb-6'>Panel Admina</h1>
			<CreateUserForm companies={companies} />
		</div>
	)
}

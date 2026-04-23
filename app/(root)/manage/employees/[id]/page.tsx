import TopPanel from '@/app/components/TopPanel'
import Breadcrumbs from '@/app/components/breadcrumbs'
import EmployeeForm from '../../components/EmployeeForm'
import { prisma } from '@/lib/prisma/prisma'
import { notFound } from 'next/navigation'

async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params

	const employee = await prisma.user.findUnique({
		where: { id },
		select: { id: true, name: true, email: true, hourlyRate: true },
	})

	if (!employee) notFound()

	return (
		<>
			<TopPanel>
				<Breadcrumbs
					breadcrumbs={[
						{ label: 'Pracownicy', href: '/manage/employees' },
						{ label: employee.name ?? 'Edycja', href: `/manage/employees/${id}`, active: true },
					]}
				/>
			</TopPanel>

			<main className='flex flex-col items-center justify-center py-4 pt-topPanel-height h-[90vh]'>
				<div className='w-full lg:w-[50vw] lg:max-w-150 bg-white p-6 lg:p-8 lg:rounded-xl shadow-sm mt-4'>
					<h2 className='text-lg font-semibold text-gray-800 mb-6'>Edytuj dane pracownika</h2>
					<EmployeeForm
						mode='edit'
						employeeId={employee.id}
						initialData={{
							name: employee.name ?? '',
							email: employee.email,
							hourlyRate: employee.hourlyRate,
						}}
					/>
				</div>
			</main>
		</>
	)
}

export default Page

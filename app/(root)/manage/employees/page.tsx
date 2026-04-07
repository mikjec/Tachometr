import TopPanel from '@/app/components/TopPanel'
import Breadcrumbs from '@/app/components/breadcrumbs'
import EmployeesTable from '../components/EmployeesTable'
import Link from 'next/link'
import { Plus } from 'lucide-react'

function Page() {
	return (
		<>
			<TopPanel>
				<Breadcrumbs
					breadcrumbs={[{ label: 'Pracownicy', href: '/manage/employees', active: true }]}
				/>
			</TopPanel>

			<main className='flex flex-col items-center py-4'>
				<div className='w-full lg:w-[70vw] lg:max-w-300 pt-topPanel-height'>
					<div className='flex justify-end my-2'>
						<Link
							href='/manage/employees/create'
							className='flex items-center gap-2 bg-white shadow-sm text-gray-500 px-4 py-4 rounded-2xl text-sm lg:text-xl font-medium hover:bg-gray-300 mt-4 hover:text-gray-700 transition-colors'>
							<Plus />
							Dodaj pracownika
						</Link>
					</div>
					<EmployeesTable />
				</div>
			</main>
		</>
	)
}

export default Page

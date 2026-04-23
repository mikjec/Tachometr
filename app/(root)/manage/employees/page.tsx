import TopPanel from '@/app/components/TopPanel'
import Breadcrumbs from '@/app/components/breadcrumbs'
import EmployeesTable from '../components/EmployeesTable'
import Link from 'next/link'
import { Plus } from 'lucide-react'

function Page() {
	return (
		<>
			<TopPanel>Pracownicy</TopPanel>

			<main className='flex flex-col items-center py-4'>
				<div className='w-full lg:w-[70vw] lg:max-w-300 pt-topPanel-height mt-topPanel-height'>
					<EmployeesTable />
				</div>
			</main>
		</>
	)
}

export default Page

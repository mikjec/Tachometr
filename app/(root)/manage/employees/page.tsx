import TopPanel from '@/app/components/TopPanel'
import EmployeesTable from '../components/EmployeesTable'

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

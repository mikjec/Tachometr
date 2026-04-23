import TopPanel from '@/app/components/TopPanel'
import Breadcrumbs from '@/app/components/breadcrumbs'
import EmployeeForm from '../../components/EmployeeForm'

function Page() {
	return (
		<>
			<TopPanel>
				<Breadcrumbs
					breadcrumbs={[
						{ label: 'Pracownicy', href: '/manage/employees' },
						{ label: 'Nowy pracownik', href: '/manage/employees/create', active: true },
					]}
				/>
			</TopPanel>

			<main className='flex flex-col items-center justify-center py-4 pt-topPanel-height h-[90vh]'>
				<div className='w-full lg:w-[50vw] lg:max-w-150 bg-white p-6 lg:p-8 lg:rounded-xl shadow-sm'>
					<h2 className='text-lg font-semibold text-gray-800 mb-6'>Dodaj nowego pracownika</h2>
					<EmployeeForm mode='create' />
				</div>
			</main>
		</>
	)
}

export default Page

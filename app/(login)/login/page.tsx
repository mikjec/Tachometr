import AuthForms from '@/app/components/AuthForms'
import Logo from '@/app/components/Logo'

export default function LoginPage() {
	return (
		<main className='min-h-screen flex items-center justify-center px-6'>
			<div className='p-6 sm:p-8 lg:px-16 rounded-2xl space-y-4 lg:space-y-0 min-w-80 sm:min-w-130 lg:min-w-200 bg-white shadow-md text-gray-700 lg:flex lg:h-130 flex flex-col lg:flex-row items-center justify-center gap-10'>
				<Logo className='mx-auto w-24 sm:w-30 lg:mx-0 lg:my-0 lg:w-80' />
				<AuthForms />
			</div>
		</main>
	)
}

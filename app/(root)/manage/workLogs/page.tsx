import TopPanel from '@/app/components/TopPanel'
import WorkLogs from '../components/WorkLogs'

function Page() {
	return (
		<>
			<TopPanel>Wpisy Pracowników</TopPanel>

			<main className='flex flex-col items-center py-4'>
				<div className='w-full flex lg:w-[70vw] lg:max-w-300 pt-topPanel-height max-h-[60vh]'>
					<WorkLogs />
				</div>
			</main>
		</>
	)
}

export default Page

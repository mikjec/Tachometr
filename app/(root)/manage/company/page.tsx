import TopPanel from '@/app/components/TopPanel'
import CompanyForm from '../components/CompanyForm'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma/prisma'

async function Page() {
	const supabase = await createClient()
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser()

	if (error) throw error

	const profile = await prisma.user.findUnique({
		where: { id: user?.id },
		select: { companyId: true, role: true },
	})

	if (!profile) throw new Error('Profil użytkownika nie został znaleziony')

	if (profile.role !== 'MANAGER' && profile.role !== 'ADMIN') {
		throw new Error('Brak dostępu do zarządzania firmą')
	}

	const company = await prisma.company.findUnique({
		where: { id: profile.companyId },
		select: { id: true, name: true },
	})

	return (
		<>
			<header>
				<TopPanel>Zarządzanie Firmą</TopPanel>
			</header>
			<main className='flex flex-col gap-4 w-full p-4 mx-auto max-w-280 pt-topPanel-height'>
				<CompanyForm company={company} />
			</main>
		</>
	)
}

export default Page

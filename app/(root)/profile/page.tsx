import TopPanel from '@/app/components/TopPanel'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma/prisma'
import ProfileForm from '@/app/components/Profileform'

async function Page() {
	const supabase = await createClient()
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser()

	if (error) throw error

	const profile = await prisma.user.findUnique({
		where: { id: user?.id },
		select: { id: true, name: true, email: true, role: true, hourlyRate: true },
	})

	if (!profile) throw new Error('Profil użytkownika nie został znaleziony')

	return (
		<>
			<header>
				<TopPanel>Profil</TopPanel>
			</header>
			<main className='flex flex-col gap-4 w-full p-4 mx-auto max-w-280 pt-topPanel-height'>
				<ProfileForm profile={profile} />
			</main>
		</>
	)
}

export default Page

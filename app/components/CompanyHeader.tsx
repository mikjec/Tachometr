import { prisma } from '@/lib/prisma/prisma'
import { createClient } from '@/lib/supabase/server'

async function CompanyHeader() {
	const supabase = await createClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	const profile = await prisma.user.findUnique({
		where: { id: user?.id },
		select: { companyId: true },
	})

	if (!profile) return null

	const company = await prisma.company.findUnique({
		where: { id: profile.companyId },
		select: { name: true },
	})

	if (!company) return null

	return (
		<div className='bg-white rounded-2xl p-4 md:p-6 shadow-sm my-8'>
			<h1 className='text-lg md:text-xl lg:text-2xl font-semibold text-gray-800'>{company.name}</h1>
		</div>
	)
}

export default CompanyHeader

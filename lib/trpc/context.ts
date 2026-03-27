import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma/prisma'

export async function createContext() {
	const supabase = await createClient()

	const { data } = await supabase.auth.getUser()

	let profile = null

	if (data.user) {
		profile = await prisma.user.findUnique({
			where: { id: data.user.id },
		})
	}

	return {
		prisma,
		user: data.user,
		profile,
	}
}

export type Context = Awaited<ReturnType<typeof createContext>>

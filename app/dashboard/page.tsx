'use client'

import { supabase } from '@/lib/supabase/client'
import { trpc } from '@/lib/trpc/provider'
import { useEffect, useState } from 'react'

export default function Page() {
	const { data, isLoading } = trpc.user.getUser.useQuery()
	const { user, profile } = data || {}
	const [authData, setAuthData] = useState<string>('')

	const getAuth = async () => {
		const d = await supabase.auth.getUser()
		setAuthData(d.data.user?.id ?? '')
	}

	if (isLoading) return <p>Ładowanie...</p>

	return (
		<div>
			<p>Profile: {profile?.name}</p>
			<p>Role: {profile?.role}</p>
			<p>Id: {profile?.id}</p>
			<p>User: {user?.id}</p>
			<p>Auth: {authData}</p>
		</div>
	)
}

import { supabase } from '@/lib/supabase/client'
import LoginForm from '../components/login/loginForm'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
	const user = await (await supabase.auth.getUser()).data.user
	if (user) {
		console.log(user)
		redirect('/dashboard')
	}

	return (
		<div className='min-h-screen flex items-center justify-center'>
			<LoginForm />
		</div>
	)
}

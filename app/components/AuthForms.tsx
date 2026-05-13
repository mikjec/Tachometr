'use client'

import { useState } from 'react'
import LoginForm from '@/app/components/loginForm'
import RegisterForm from '@/app/components/registerForm'

export default function AuthForms() {
	const [isLogin, setIsLogin] = useState(true)

	return (
		<div className='relative overflow-hidden w-full lg:w-1/2'>
			<div
				className='transition-all duration-400 ease-in-out'
				style={{
					transform: isLogin ? 'translateY(0)' : 'translateY(-110%)',
					opacity: isLogin ? 1 : 0,
					position: isLogin ? 'relative' : 'absolute',
					inset: isLogin ? 'auto' : 0,
					pointerEvents: isLogin ? 'auto' : 'none',
				}}>
				<LoginForm onSwitchToRegister={() => setIsLogin(false)} />
			</div>

			<div
				className='transition-all duration-400 ease-in-out'
				style={{
					transform: isLogin ? 'translateY(110%)' : 'translateY(0)',
					opacity: isLogin ? 0 : 1,
					position: isLogin ? 'absolute' : 'relative',
					inset: isLogin ? 0 : 'auto',
					pointerEvents: isLogin ? 'none' : 'auto',
				}}>
				<RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
			</div>
		</div>
	)
}

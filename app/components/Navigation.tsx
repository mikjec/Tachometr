import React from 'react'
import NavLink from '@/app/components/NavLink'
import LogOut from '@/app/components/LogOut'
import Logo from '@/app/components/Logo'
import { Clock, LayoutDashboard } from 'lucide-react'

function Navigation() {
	return (
		<nav className='fixed top-0 left-0 bg-white h-screen w-56 flex flex-col border-r border-gray-100 shadow-sm z-50'>
			<div className='h-topPanel-height flex items-center justify-center '>
				<Logo />
			</div>

			<div className='flex flex-col flex-1 my-4'>
				<NavLink href='/employee'>
					<LayoutDashboard className='w-4 h-4' />
					Strona główna
				</NavLink>
				<NavLink href='/employee/workLogs'>
					<Clock className='w-4 h-4' />
					Biblioteka
				</NavLink>
			</div>

			<LogOut className='w-full justify-start gap-2 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-all cursor-pointer' />
		</nav>
	)
}

export default Navigation

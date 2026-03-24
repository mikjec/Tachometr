import React from 'react'
import NavLink from '@/app/components/NavLink'
import LogOut from '@/app/components/LogOut'
import Logo from '@/app/components/Logo'
import { Clock, LayoutDashboard } from 'lucide-react'

function Navigation() {
	return (
		<nav
			className='
		fixed
		bottom-0
		left-0
		right-0
		h-16
		bg-white
		border-t
		border-gray-100
		shadow-sm
		z-50

		grid
		grid-cols-[2fr_1fr]
		lg:flex
		items-center

		lg:top-0
		lg:left-0
		lg:right-auto
		lg:h-screen
		lg:w-nav-width
		lg:flex-col
		lg:justify-start
		lg:border-t-0
		lg:border-r
	'>
			{/* LOGO — tylko desktop */}
			<div className='hidden lg:flex h-topPanel-height items-center justify-center w-full py-8'>
				<Logo />
			</div>

			{/* LINKI */}
			<div
				className='
					flex w-full h-full justify-around
					lg:flex-col
					lg:flex-1
					lg:justify-start
				'>
				<NavLink href='/employee'>
					<LayoutDashboard className='w-7 h-7' />

					{/* tekst tylko desktop */}
					<span className='hidden 2xl:inline '>Pulpit</span>
				</NavLink>

				<NavLink href='/employee/workLogs'>
					<Clock className='w-7 h-7' />

					<span className='hidden 2xl:inline'>Biblioteka</span>
				</NavLink>
			</div>

			{/* LOGOUT */}
			<div className='flex w-full h-full lg:h-fit'>
				<LogOut className='w-full py-2 px-4 h-full flex items-center justify-center 2xl:justify-start text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-all cursor-pointer' />
			</div>
		</nav>
	)
}

export default Navigation

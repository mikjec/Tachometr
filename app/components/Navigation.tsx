import React from 'react'
import NavLink from '@/app/components/NavLink'
import LogOut from '@/app/components/LogOut'
import Logo from '@/app/components/Logo'
import { Users, LayoutDashboard, Clock, Building2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma/prisma'
import LogoIcon from './LogoIcon'

const employeeNavLinks = [
	{
		href: '/employee',
		icon: <LayoutDashboard className='w-6 h-6 md:w-7 md:h-7' />,
		label: 'Pulpit',
	},
	{
		href: '/employee/workLogs',
		icon: <Clock className='w-6 h-6 md:w-7 md:h-7' />,
		label: 'Wpisy',
	},
]

const managerNavLinks = [
	{
		href: '/manage',
		icon: <LayoutDashboard className='w-6 h-6 md:w-7 md:h-7' />,
		label: 'Pulpit',
	},
	{
		href: '/manage/workLogs',
		icon: <Clock className='w-6 h-6 md:w-7 md:h-7' />,
		label: 'Wpisy',
	},
	{
		href: '/manage/employees',
		icon: <Users className='w-6 h-6 md:w-7 md:h-7' />,
		label: 'Pracownicy',
	},
	{
		href: '/manage/company',
		icon: <Building2 className='w-6 h-6 md:w-7 md:h-7' />,
		label: 'Moja Firma',
	},
]

async function Navigation() {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	const profile = await prisma.user.findUnique({
		where: { id: user?.id },
		select: { role: true },
	})

	const links = profile?.role == 'MANAGER' ? managerNavLinks : employeeNavLinks

	return (
		<nav
			className='
		fixed
		bottom-0
		left-0
		right-0
		h-12
		sm:h-17
		bg-white
		border-t
		border-gray-100
		shadow-sm
		z-50

		grid
		grid-cols
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
			<div className='hidden lg:flex h-topPanel-height items-center justify-center w-full py-8'>
				<div className='hidden 2xl:block'>
					<Logo />
				</div>
				<div>
					<LogoIcon className='2xl:hidden' />
				</div>
			</div>

			<div className='flex w-full h-full justify-around lg:flex-col lg:flex-1 lg:justify-start'>
				{links.map(link => (
					<NavLink
						key={link.href}
						href={link.href}>
						{link.icon}
						<span className='hidden 2xl:inline'>{link.label}</span>
					</NavLink>
				))}
			</div>
		</nav>
	)
}

export default Navigation

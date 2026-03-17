import React from 'react'
import NavLink from '@/app/components/NavLink'
import LogOut from '@/app/components/LogOut'

function Navigation() {
	return (
		<nav className='fixed top-0 left-0 bg-white h-[100vh] p-4'>
			<NavLink href={'/employee/workLogs'}>Moje godziny</NavLink>
			<LogOut className='absolute bottom-5' />
		</nav>
	)
}

export default Navigation

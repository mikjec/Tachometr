'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
	const pathname = usePathname()
	const isActive = pathname === href

	return (
		<Link
			href={href}
			className={`flex items-center gap-2 px-4 py-2 w-full text-xl font-medium transition-all duration-150 text-gray-500
        ${isActive ? 'shadow-sm border-t bg-gray-100' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}>
			{children}
		</Link>
	)
}

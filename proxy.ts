// middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from './lib/prisma/prisma'

export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl

	const response = NextResponse.next({
		request: {
			headers: request.headers,
		},
	})

	if (pathname === '/login/set-password' || pathname.startsWith('/api')) {
		return response
	}

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll()
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value, options }) => {
						request.cookies.set(name, value)
						response.cookies.set(name, value, options)
					})
				},
			},
		},
	)

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user && !pathname.startsWith('/login')) {
		const loginUrl = new URL('/login', request.url)
		loginUrl.searchParams.set('redirectTo', pathname)
		return NextResponse.redirect(loginUrl)
	}

	if (user) {
		const profile = await prisma.user.findUnique({
			where: { id: user.id },
			select: { role: true, companyId: true },
		})

		const { role, companyId } = profile ?? { role: null, companyId: null }

		if (!companyId && role == 'MANAGER') {
			return NextResponse.redirect(new URL('/manage/company', request.url))
		}

		if (role === 'ADMIN' && !pathname.startsWith('/admin')) {
			return NextResponse.redirect(new URL('/admin', request.url))
		}

		if (role === 'MANAGER' && !pathname.startsWith('/manage')) {
			return NextResponse.redirect(new URL('/manage', request.url))
		}

		if (role === 'EMPLOYEE' && !pathname.startsWith('/employee')) {
			return NextResponse.redirect(new URL('/employee', request.url))
		}
	}

	return response
}

export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}

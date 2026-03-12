// middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	const response = NextResponse.next({
		request: {
			headers: request.headers,
		},
	})

	if (pathname.startsWith('/api')) {
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

	// Refresh session
	const {
		data: { user },
	} = await supabase.auth.getUser()

	//Unauthorized user has to login to use the app
	if (!user && pathname !== '/login') {
		const loginUrl = new URL('/login', request.url)
		loginUrl.searchParams.set('redirectTo', pathname)
		return NextResponse.redirect(loginUrl)
	}

	if (user) {
		const { data: profile } = await supabase.from('User').select('role').eq('id', user.id).single()
		const role = profile?.role

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

// app/api/export/worklogs/[id]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma/prisma'
import { createClient } from '@/lib/supabase/server'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
	const supabase = await createClient()

	const { id } = await params

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		return NextResponse.redirect(new URL('/login'))
	}

	const profile = await prisma.user.findUnique({
		where: { id: user.id },
		select: { role: true, companyId: true },
	})

	if (profile?.role !== 'MANAGER' && profile?.role !== 'ADMIN') {
		return NextResponse.redirect('/employee')
	}

	const employee = await prisma.user.findUnique({
		where: {
			id: id,
		},
		select: { name: true, hourlyRate: true, companyId: true, role: true },
	})

	if (!employee || employee.companyId !== profile.companyId || employee.role !== 'EMPLOYEE') {
		return NextResponse.json({ error: 'Pracownik nie istnieje' }, { status: 404 })
	}

	const logs = await prisma.workLog.findMany({
		where: {
			userId: id,
			paid: false,
		},
		select: {
			date: true,
			hours: true,
		},
		orderBy: { date: 'desc' },
	})

	const BOM = '\uFEFF'

	const header = 'Imię;Data;Godziny;Stawka;Wypłata\n'
	const rows = logs
		.map(log => {
			const hourlyRate = employee?.hourlyRate ?? 0
			const payout = log.hours * hourlyRate
			return [
				`"${employee?.name}"`,
				new Date(log.date).toLocaleDateString('pl-PL'),
				String(log.hours).replace('.', ','),
				String(hourlyRate).replace('.', ','),
				payout.toFixed(2).replace('.', ','),
			].join(';')
		})
		.join('\n')

	const csv = BOM + header + rows

	const today = new Date()
		.toLocaleDateString('pl-PL', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		})
		.replace(/\./g, '-')

	const safeName = employee?.name?.replace(/\s+/g, '_') ?? 'pracownik'

	return new NextResponse(csv, {
		headers: {
			'Content-Type': 'text/csv; charset=utf-8',
			'Content-Disposition': `attachment; filename="spisGodzin-${safeName}-${today}.csv"`,
		},
	})
}

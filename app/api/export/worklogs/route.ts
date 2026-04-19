// app/api/export/worklogs/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma/prisma'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
	const supabase = await createClient()
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

	const logs = await prisma.workLog.findMany({
		where: {
			paid: false,
			user: { companyId: profile.companyId! },
		},
		include: {
			user: {
				select: { name: true, hourlyRate: true },
			},
		},
		orderBy: [{ user: { name: 'asc' } }, { date: 'desc' }],
	})

	const BOM = '\uFEFF' // ← Excel rozpoznaje kodowanie

	const header = 'Imię;Data;Godziny;Stawka;Wypłata\n'
	const rows = logs
		.map(log => {
			const hourlyRate = log.user.hourlyRate ?? 0
			const payout = log.hours * hourlyRate
			return [
				`"${log.user.name}"`,
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

	return new NextResponse(csv, {
		headers: {
			'Content-Type': 'text/csv; charset=utf-8',
			'Content-Disposition': `attachment; filename="spisGodzin-${today}.csv"`,
		},
	})
}

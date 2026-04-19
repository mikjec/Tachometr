import { unstable_cache } from 'next/cache'
import { prisma } from '@/lib/prisma/prisma'

export const getMonthlyStats = (companyId: string) =>
	unstable_cache(
		async () => {
			const months = Array.from({ length: 5 }, (_, i) => {
				const date = new Date()
				date.setMonth(date.getMonth() - i)
				return {
					year: date.getFullYear(),
					month: date.getMonth(),
					label: date.toLocaleDateString('pl-PL', { month: 'short' }),
				}
			}).reverse()

			return Promise.all(
				months.map(async ({ year, month, label }) => {
					const start = new Date(Date.UTC(year, month, 1))
					const end = new Date(Date.UTC(year, month + 1, 0))

					const result = await prisma.workLog.aggregate({
						where: {
							user: { companyId },
							date: { gte: start, lte: end },
						},
						_sum: { hours: true },
					})

					return { month: label, hours: result._sum.hours ?? 0 }
				}),
			)
		},
		[`monthly-stats-${companyId}`],
		{
			revalidate: 5,
			tags: [`monthly-stats-${companyId}`],
		},
	)()

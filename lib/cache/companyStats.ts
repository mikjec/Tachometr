import { unstable_cache } from 'next/cache'
import { prisma } from '@/lib/prisma/prisma'

export const getMonthlyStats = (companyId: string) =>
	unstable_cache(
		async () => {
			const now = new Date()
			const months = Array.from({ length: 5 }, (_, i) => {
				const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1))

				return {
					year: date.getUTCFullYear(),
					month: date.getUTCMonth(),
					label: date.toLocaleDateString('pl-PL', {
						month: 'short',
						timeZone: 'UTC',
					}),
				}
			}).reverse()

			return Promise.all(
				months.map(async ({ year, month, label }) => {
					const start = new Date(Date.UTC(year, month, 1))
					const end = new Date(Date.UTC(year, month + 1, 1))

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
			revalidate: 3600,
			tags: [`monthly-stats-${companyId}`],
		},
	)()

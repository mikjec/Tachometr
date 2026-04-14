import { unstable_cache } from 'next/cache'
import db from '@/lib/db'

export const getCachedMonthlyStats = (userId: string) => {
	// Tworzymy unikalną funkcję dla tego wywołania
	const fetcher = unstable_cache(
		async (id: string) => {
			console.log('--- STRZAŁ DO BAZY ---') // Zobaczysz to w konsoli tylko, gdy cache wygaśnie
			return await db.workLog.groupBy({
				by: ['month'],
				where: { userId: id },
				_sum: { hours: true },
			})
		},
		[`user-stats-${userId}`], // Klucz identyfikujący te konkretne dane
		{
			revalidate: 3600, // Automatyczne odświeżenie po godzinie
			tags: [`stats_${userId}`], // Tag do ręcznego czyszczenia
		},
	)

	return fetcher(userId)
}

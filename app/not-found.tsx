import Link from 'next/link'

export default function NotFound() {
	return (
		<main>
			<h2>404</h2>
			<p>Nie znaleziono strony</p>
			<Link href='/'>Powrót na stronę główną</Link>
		</main>
	)
}

import logo from '@/public/logo.png'
import Image from 'next/image'

export default function Logo({ ...props }) {
	return (
		<div>
			<Image
				src={logo}
				alt='Logo Dutly'
				width={100}
				height={100}
				{...props}
			/>
		</div>
	)
}

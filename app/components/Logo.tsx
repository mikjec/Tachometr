import logo from '@/public/logo.png'
import Image from 'next/image'

export default function Logo({ ...props }) {
	return (
		<div>
			<Image
				src={logo}
				alt='Logo Dutly'
				width={80}
				height={80}
				className='2xl:w-25'
				{...props}
			/>
		</div>
	)
}

import logoIcon from '@/public/logo-icon.png'

import Image from 'next/image'

export default function Logo({ ...props }) {
	return (
		<div>
			<Image
				src={logoIcon}
				alt='Logo Dutly'
				width={30}
				height={30}
				unoptimized={true}
				{...props}
			/>
		</div>
	)
}

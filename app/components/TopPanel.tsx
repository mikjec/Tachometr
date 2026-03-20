import React from 'react'

function TopPanel({ children }: { children: React.ReactNode }) {
	return (
		<div className='fixed  flex items-center justify-start top-0 w-full h-topPanel-height bg-white p-6 text-xl  z-40 border-gray-100 shadow-sm'>
			<span>{children}</span>
		</div>
	)
}

export default TopPanel

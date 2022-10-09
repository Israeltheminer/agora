import React from "react"
import Head from "next/head"
import Navbar from "./Navbar"
import Footer from "./Footer"

const Layout = ({ children }) => {
	return (
		<div className='relative overflow-x-clip bg-[#f6f6f6]'>
			<Head>
				<title>Agora</title>
			</Head>
			<header className='px-[3.5%] py-3 border-b bg-white border-[#eee]'>
				<Navbar />
			</header>
			<main className='main-container'>{children}</main>
			{/* The Value 110px below is used a false foooter to ensure the main footer is always at the lowest level on bigger screens*/}
			<div className='min-h-[110px] flex'></div>
			<div className='absolute bottom-0 left-[50%] translate-x-[-50%]'>
				<Footer />
			</div>
		</div>
	)
}

export default Layout

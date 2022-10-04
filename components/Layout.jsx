import React from "react"
import Head from "next/head"
import Navbar from "./Navbar"
import Footer from "./Footer"

const Layout = ({ children }) => {
	return (
		<div>
			<Head>
				<title>Agora</title>
			</Head>
			<header className='px-[3.5%] py-3 border-b border-[#eee]'>
				<Navbar />
			</header>
			<main className='main-container'>{children}</main>
			<Footer />
		</div>
	)
}

export default Layout

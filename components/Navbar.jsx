import Link from "next/link"
import React from "react"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { BiBookmarkHeart } from "react-icons/bi"
import { GiHamburgerMenu } from "react-icons/gi"
const Navbar = () => {
	return (
		<div className='navbar-container bg-white'>
			<p className='nav-text font-bold logo text-xl'>
				<Link href='/'>Agora</Link>
			</p>
			<div className='flex gap-8'>
				<p className='nav-text font-semibold flex items-center sm:hidden'>
					<Link href='/'>Join Us</Link>
				</p>
				<button type='button' className='navbar-icon sm:hidden' title='Wishlist'>
					<BiBookmarkHeart />
				</button>
				<button type='button' className='navbar-icon' title='Cart'>
					<AiOutlineShoppingCart />
					<span className='cart-item-qty'>1</span>
				</button>
				<button type='button' className='navbar-icon hidden sm:inline-block' title='Wishlist'>
					<GiHamburgerMenu />
				</button>
			</div>
		</div>
	)
}

export default Navbar

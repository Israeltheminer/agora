import Link from "next/link"
import React from "react"
import { AiOutlineShopping, AiOutlineHeart } from "react-icons/ai"

const Navbar = () => {
	return (
		<div className='navbar-container'>
			<p className='nav-text font-bold logo text-xl'>
				<Link href='/'>Agora</Link>
			</p>
			<div className='flex gap-8'>
				<p className='nav-text font-semibold flex items-center'>
					<Link href='/'>Join Us</Link>
				</p>
				<button type='button' className='navbar-icon' title='Wishlist'>
					<AiOutlineHeart />
				</button>
				<button type='button' className='navbar-icon' title='Cart'>
					<AiOutlineShopping />
					<span className='cart-item-qty'>1</span>
				</button>
			</div>
		</div>
	)
}

export default Navbar

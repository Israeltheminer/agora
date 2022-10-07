import Link from "next/link"
import React from "react"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { BiBookmarkHeart } from "react-icons/bi"
import { GiHamburgerMenu } from "react-icons/gi"
import { useStateContext } from "../context/StateContext"
import Cart from "./Cart"

const Navbar = () => {
	const { cartItems, showCart, totalQuantity, totalPrice, toogleCartVisibility } = useStateContext()
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
				<div className='relative flex items-center'>
					<button type='button' className='navbar-icon relative' title='Cart' onClick={() => toogleCartVisibility()}>
						<div className=''>
							<AiOutlineShoppingCart />
						</div>
						{totalQuantity > 0 && <span className='cart-item-qty'>{totalQuantity}</span>}
					</button>
					{showCart && totalQuantity > 0 && (
						<div className=' absolute top-8 right-6 bg-white shadow-lg z-50 rounded-xl w-80'>
							<Cart cartItems={cartItems} totalPrice={totalPrice} />
						</div>
					)}
					{showCart && totalQuantity == 0 && (
						<div className=' absolute top-8 right-6 bg-white z-50 shadow-2xl rounded-xl w-80 py-16 text-[#1f79e0]'>
							<div className='flex justify-center items-center text-[90px]'>
								<AiOutlineShoppingCart />
							</div>
							<span className=''>
								<p className='font-bold text-lg text-center mt-3'>Your shopping cart is empty</p>
							</span>
						</div>
					)}
				</div>
				<button type='button' className='navbar-icon hidden sm:inline-block cursor-pointer'>
					<GiHamburgerMenu />
				</button>
			</div>
		</div>
	)
}

export default Navbar

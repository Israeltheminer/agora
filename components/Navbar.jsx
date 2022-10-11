import Link from "next/link"
import React, { useEffect } from "react"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { BiBookmarkHeart } from "react-icons/bi"
import { GiHamburgerMenu } from "react-icons/gi"
import { useStateContext } from "../context/StateContext"
import Cart from "./Cart"
import { motion } from "framer-motion"

const Navbar = () => {
	const { cartItems, showCart, totalQuantity, totalPrice, toogleCartVisibility, setCartItems, setTotalPrice, setTotalQuantity } = useStateContext()
	useEffect(() => {
		const stringedCartItems = window?.localStorage?.getItem("cartItems")
		const localStorageTotalPrice = parseInt(window?.localStorage?.getItem("totalPrice"))
		const localStorageTotalQuantity = parseInt(window?.localStorage?.getItem("totalQuantity"))
		const localStorageCartItems = JSON.parse(stringedCartItems)
		localStorageCartItems?.length > 0 && setCartItems(localStorageCartItems)
		localStorageTotalPrice && setTotalPrice(localStorageTotalPrice)
		localStorageTotalQuantity && setTotalQuantity(localStorageTotalQuantity)
	}, [setCartItems, setTotalPrice, setTotalQuantity])
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
					<motion.div
						animate={showCart && totalQuantity > 0 ? { y: 0, opacity: 1 } : { y: -1000, opacity: 0 }}
						initial={showCart && totalQuantity > 0 && { y: -1000, opacity: 0 }}
						transition={{ type: "spring", stiffness: 80 }}
						className=' absolute top-8 right-6 bg-white shadow-lg z-50 rounded-xl w-80 sm:w-[310px] xs:right-[-76px]'>
						<Cart cartItems={cartItems} totalPrice={totalPrice} />
					</motion.div>
					<motion.div
						animate={showCart && totalQuantity == 0 ? { y: 0, opacity: 1 } : { y: -500, opacity: 0 }}
						initial={showCart && totalQuantity == 0 && { y: -500, opacity: 0 }}
						transition={{ type: "spring", stiffness: 80 }}
						className=' absolute top-8 right-6 bg-white z-50 shadow-2xl rounded-xl w-80 py-16 text-[#1f79e0] sm:w-72 xs:right-[-48px]'>
						<div className='flex justify-center items-center text-[90px] sm:text-[70px] xs:text-[60px]'>
							<AiOutlineShoppingCart />
						</div>
						<span className=''>
							<p className='font-bold text-lg text-center mt-3 sm:text-[16px] xs:text-[14px]'>Your shopping cart is empty</p>
						</span>
					</motion.div>
				</div>
				<button type='button' className='navbar-icon hidden sm:inline-block cursor-pointer'>
					<GiHamburgerMenu />
				</button>
			</div>
		</div>
	)
}

export default Navbar

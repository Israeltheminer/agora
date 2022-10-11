import React, { useState, useEffect } from "react"
import Link from "next/link"
import { BsBagCheckFill } from "react-icons/bs"
import { useRouter } from "next/router"
import { useStateContext } from "../context/StateContext"
const Success = () => {
	const { setCartItems, setTotalPrice, setTotalQuantity } = useStateContext()
	useEffect(() => {
		window?.localStorage?.clear()
		setCartItems([])
		setTotalPrice(0)
		setTotalQuantity(0)
	})
	return (
		<div className='success-wrapper bg-[#f6f6f6]'>
			<div className='success w-[1000px] lg:w-[800px] m:w-[600px] sm:w-[400px] xs:w-[300px]'>
				<p className='icon m:text-[50px]'>
					<BsBagCheckFill />
				</p>
				<h2 className='my-6 text-[40px] m:text-3xl xs:text-2xl text-center'>Thank you for your order</h2>
				<Link href='/'>
					<button type='button' width='300px' className='btn btn-blue py-2 px-6'>
						Back to store
					</button>
				</Link>
			</div>
		</div>
	)
}

export default Success

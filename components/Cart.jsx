import React from "react"
import { IoBagCheckOutline } from "react-icons/io5"
import { ImBin } from "react-icons/im"
import Image from "next/image"
import Link from "next/link"
import { urlFor } from "../lib/client"
import { useStateContext } from "../context/StateContext"

const Cart = ({ cartItems, totalPrice }) => {
	const { deleteFromCart } = useStateContext()
	return (
		<div className='pt-6 pb-4'>
			<div className='font-semibold mb-4 px-4'>Cart</div>
			<div className='max-h-[500px] overflow-y-auto'>
				{cartItems.map((cartItem) => (
					<div key={cartItem._id} className='py-3 px-4 border-t border-gray-300 flex justify-between'>
						<div className='text-md flex gap-4 items-start'>
							<div>
								<Link href={`/product/${cartItem.slug.current}`}>
									<div className='relative w-[60px] h-[60px] unselected-image small-image'>
										<Image src={`${urlFor(cartItem.image[0])}`} alt={cartItem.name} layout='fill' objectFit='cover' />
									</div>
								</Link>
							</div>
							<div className='text-[15px]'>
								<span className='opacity-90'>
									<p>{cartItem.name}</p>
								</span>
								<span className='flex mt-1 justify-between w-[130px]'>
									<span className='opacity-70'>
										${cartItem.price} x {cartItem.quantity}
									</span>
									<span className='font-semibold'>${cartItem.price * cartItem.quantity}</span>
								</span>
							</div>
						</div>
						<div className='text-red-500 self-center justify-items-end cursor-pointer' onClick={() => deleteFromCart(cartItem)}>
							<ImBin />
						</div>
					</div>
				))}
			</div>
			<div className='flex justify-center gap-8 mt-3 mb-0 font-bold px-4 bg-white'>
				<span>Total:</span>
				<span>${totalPrice}</span>
			</div>
			<div className='grid justify-center pt-3 bg-white'>
				<button className='btn btn-blue flex justify-between w-[200px] items-center gap-6 py-[10px] pl-10 pr-12 rounded-lg'>
					<div className='text-[18px] '>
						<IoBagCheckOutline />
					</div>
					<span className=''>Checkout</span>
				</button>
			</div>
		</div>
	)
}

export default Cart

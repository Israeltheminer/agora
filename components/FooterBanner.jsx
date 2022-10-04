import React from "react"
import Link from "next/link"
import Image from "next/image"
import { urlFor } from "../lib/client"
import { BsFillCreditCardFill } from "react-icons/bs"

const FooterBanner = ({ bottomBanner: { product, image, largeText1, buttonText, saleTime, description, midText, discount } }) => {
	return (
		<div className='footer-banner-container rounded-[30px] my-20 '>
			<div className='grid grid-cols-2'>
				<div className='left relative'>
					<p>{discount}</p>
					<h3 className='font-bold mt-8 text-[70px] important absolute top-0'>{largeText1}</h3>
				</div>
				<div className='right text-right'>
					<p className='text-[rgb(76, 76, 76)]'>{product}</p>
					<h3 className='font-semibold text-3xl mt-6'>{midText}</h3>
					<div className='max-w-[350px] ml-auto mt-2 relative'>
						<p className='leading-[1.2] absolute top-0 important'>{description}</p>
					</div>
					<Link href={`/product/${product}`}>
						<button className='btn btn-white shadow-md mt-24' type='button'>
							<span className='btn__visible flex items-center justify-start gap-4'>
								<BsFillCreditCardFill />
								{buttonText}
							</span>
							<span className='flex self-center justify-center btn__invisible'>{saleTime}!</span>
						</button>
					</Link>
				</div>
			</div>
			<div className='footer-banner-image hover:scale-[1.05] transition ease-in duration-150'>
				{urlFor(image) && <Image src={`${urlFor(image)}`} className='drop-shadow-md hover:drop-shadow-xl' alt='sale' layout='fill' />}
			</div>
		</div>
	)
}

export default FooterBanner

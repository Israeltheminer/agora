import React from "react"
import Link from "next/link"
import Image from "next/image"
import { urlFor } from "../lib/client"
import { BsFillCreditCardFill } from "react-icons/bs"

const FooterBanner = ({ bottomBanner: { product, image, largeText1, buttonText, saleTime, description, midText, discount } }) => {
	return (
		<div className='footer-banner-container rounded-[30px] my-20 xs:px-6'>
			<div className='grid grid-cols-2 md:block'>
				<div className='left relative'>
					<p className='xs:text-sm'>{discount}</p>
					<h3 className='font-bold mt-8 text-[70px] important absolute top-0 md:static md:text-right sm:text-left md:text-[60px] sm:text-[50px] xs:text-[38px] xs:mt-4'>
						{largeText1}
					</h3>
				</div>
				<div className='right text-right md:text-left md:mt-6'>
					<p className='text-[rgb(76, 76, 76)]'>{product}</p>
					<h3 className='font-semibold text-3xl mt-6'>{midText}</h3>
					<div className='mt-2 relative'>
						<p className='leading-[1.2] absolute top-0 right-0 max-w-[500px] important md:static'>{description}</p>
					</div>
					<Link href={`/product/${product}`}>
						<button className='btn btn-white shadow-md mt-24 md:ml-auto sm:mt-16 sm:mb-6 xs:text-[12px]' type='button'>
							<span className='btn__visible flex items-center justify-start gap-4 py-4 px-8 xs:py-3 xs:px-6'>
								<BsFillCreditCardFill />
								{buttonText}
							</span>
							<span className='flex self-center justify-center btn__invisible'>{saleTime}!</span>
						</button>
					</Link>
				</div>
			</div>
			<div className='footer-banner-image hover:scale-[1.05] transition ease-in duration-150 md:relative md:left-0 md:w-[458px] md:h-[215px] md:ml-auto sm:w-[100%] sm:aspect-video sm:h-auto'>
				{urlFor(image) && <Image src={`${urlFor(image)}`} className='drop-shadow-md hover:drop-shadow-xl' alt='sale' layout='fill' />}
			</div>
		</div>
	)
}

export default FooterBanner

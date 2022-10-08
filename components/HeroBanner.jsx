import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { urlFor } from "../lib/client"
import { BsFillCreditCardFill } from "react-icons/bs"

const HeroBanner = ({ heroBanner }) => {
	return (
		<div className='hero-banner-container rounded-[30px] my-16 z-10 xs:px-6'>
			<div>
				<h4 className='text-lg text-[#dcdcdc] opacity-70 xs:text-[16px]'>{heroBanner.product}</h4>
				<h3 className='text-3xl text-[rgb(62, 62, 62)] mt-2 font-bold opacity-60'>{heroBanner.midText}</h3>
				<div className='relative'>
					<h1 className='text-white absolute top-0 important text-[7em] left-0 font-bold uppercase w-[600px] mt-4 md:text-[5em] md:w-auto sm:static sm:text-[4em] xs:text-[3rem]'>
						{heroBanner.largeText1}
					</h1>
				</div>
				<div className='hero-banner-image md:static md:mt-10 md:flex md:justify-end sm:mt-6 sm:w-[100%] xs:w-[90%] xs:mx-auto'>
					{urlFor(heroBanner.image) && (
						<Image
							src={`${urlFor(heroBanner.image)}`}
							className='drop-shadow-md hover:drop-shadow-xl hover:scale-[1.05] transition ease-in duration-150'
							alt='sale'
							width={350}
							height={350}
						/>
					)}
				</div>
				<Link href=''>
					<button className='btn btn-blue shadow-md mt-40 md:mt-0 xs:text-[12px]' type='button'>
						<span className='btn__visible flex items-center justify-start gap-4 py-4 px-8 xs:py-3 xs:px-6'>
							<BsFillCreditCardFill />
							{heroBanner.buttonText}
						</span>
						<span className='flex self-center justify-center btn__invisible'>{heroBanner.saleTime}!</span>
					</button>
				</Link>
				<div className='desc w-[300px] xs:mt-6 xs:w-auto xs: xs:static xs:right-0'>
					<h5 className='mb-3 xs:pb-0 xs:mb-1'>Description</h5>
					<span className='xs:relative'>
						<p className='xs:text-sm xs:min-w-[250px] xs:absolute xs:right-0'>{heroBanner.description}</p>
					</span>
				</div>
			</div>
		</div>
	)
}

export default HeroBanner

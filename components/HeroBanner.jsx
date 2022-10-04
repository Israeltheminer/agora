import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { urlFor } from "../lib/client"
import { BsFillCreditCardFill } from "react-icons/bs"

const HeroBanner = ({ heroBanner }) => {
	const [videoAutoPlay] = useState(true)
	const [videoSound] = useState(false)
	return (
		<div className='hero-banner-container rounded-[30px] mt-12'>
			<div>
				<h3 className='text-xl text-[#dcdcdc] opacity-70'>{heroBanner.smallText}</h3>
				<h4 className='text-3xl text-[rgb(62, 62, 62)] mt-2 font-semibold opacity-70'>{heroBanner.midText}</h4>
				<h1 className='text-white text-[7em] top-[30%] left-0 font-semibold uppercase w-[600px] mt-4 video-text mix'>{heroBanner.largeText1}</h1>
				<div className='hero-banner-image'>
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
					<button className='btn shadow-md mt-8' type='button'>
						<span className='btn__visible flex items-center justify-start gap-4'>
							<BsFillCreditCardFill />
							{heroBanner.buttonText}
						</span>
						<span className='flex self-center justify-center btn__invisible'>{heroBanner.saleTime}!</span>
					</button>
				</Link>
				<div className='desc'>
					<h5 className=''>Description</h5>
					<p>{heroBanner.description}</p>
				</div>
			</div>
		</div>
	)
}

export default HeroBanner

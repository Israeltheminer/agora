import React from "react"
import Link from "next/link"
import Image from "next/image"
import { urlFor } from "../lib/client"
import shoeLoopVideo from "../public/shoe-loop.mp4"

const HeroBanner = ({ heroBanner }) => {
	return (
		<div className='hero-banner-container rounded-b-[30px]'>
			<div>
				<h3 className='text-xl text-[#dcdcdc] opacity-70'>{heroBanner.smallText}</h3>
				<h4 className='text-3xl text-[#dcdcdc] mt-2 font-semibold'>{heroBanner.midText}</h4>
				<div className='video-container'>
					<video autoplay loop>
						<source src='../public/shoe-loop.mp4' />
					</video>
					<h1 className='text-white text-[7em] font-blod uppercase w-[600px] mt-4 video-text'>AGORA</h1>
				</div>
				<div className='hero-banner-image'>
					{urlFor(heroBanner.image) && (
						<Image src={`${urlFor(heroBanner.image)}`} className='hero-banner-image' alt='sale' width={400} height={400} />
					)}
				</div>
				<Link href=''>
					<button className='btn px-6 py-3 bg-[#1F79E0] shadow-md mt-8' type='button'>
						{heroBanner.buttonText}
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

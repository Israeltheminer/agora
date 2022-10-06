import React from "react"
import Link from "next/link"
import Image from "next/image"
import { urlFor } from "../lib/client"

const Product = ({ product: { image, name, slug, price } }) => {
	return (
		<div className=''>
			<Link href={`/product/${slug.current}`}>
				<div className='product-card'>
					<div className='hover:scale-[1.2] transition ease-in-out product-image-wrapper duration-300 mb-6 grid justify-center'>
						<div className='product-image'>
							{urlFor(image) && <Image src={`${urlFor(image[0])}`} alt={slug} layout='fill' objectFit='cover' />}
						</div>
					</div>
				</div>
			</Link>
			<p className='product-name opacity-60'>{name}</p>
			<p className='product-price opacity-80'>${price}</p>
		</div>
	)
}

export default Product

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { urlFor, client } from "../../lib/client"
import { AiOutlineMinus, AiOutlinePlus, AiOutlineStar, AiFillStar, AiOutlineShoppingCart } from "react-icons/ai"
import { TbShoppingCartPlus } from "react-icons/tb"

const ProductDetails = ({ productData, allProductsData }) => {
	const { image, name, slug, price, details } = productData
	return (
		<div className='px-[5%] bg-[#f6f6f6] py-[80px] flex flex-col single-product-page mb-10'>
			<div className='product-detail-container justify-around'>
				<div>
					<div className='hover:scale-[1.01] transition ease-in-out duration-300'>
						<div className='product-detail-image relative'>
							{urlFor(image) && <Image src={`${urlFor(image[0])}`} alt={slug} layout='fill' objectFit='cover' />}
						</div>
					</div>
					<div className='small-images-container'>
						{image?.map((item, i) => (
							<div className='relative w-[95px] h-[95px] small-image' key={i}>
								<Image src={`${urlFor(item)}`} alt={i} layout='fill' objectFit='cover' />
							</div>
						))}
					</div>
				</div>
				<div className='product-detail-desc max-w-[475px] mt-12'>
					<h1 className='text-[38px] font-bold mb-6 leading-tight'>{name}</h1>
					<p className='mb-4 leading-normal opacity-70'>{details}</p>
					<div className='mb-2'>
						<p className='price font-bold text-[28px]'>${price}.00</p>
					</div>
					<div className='reviews mb-4'>
						<div className='flex gap-1 mr-2'>
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiOutlineStar />
						</div>
						<p>(20)</p>
					</div>
					<div className='flex gap-8 items-center'>
						<span className='quantity py-[8px] px-[10px]'>
							<span className='minus cursor-pointer'>
								<AiOutlineMinus />
							</span>
							<span className='num cursor-default font-bold text-black'>9</span>
							<span className='plus cursor-pointer'>
								<AiOutlinePlus />
							</span>
						</span>
						<div>
							<Link href={`/`}>
								<button className='add-to-cart btn-blue'>
									<span className='absolute right-[40px]'>Add to Cart</span>
									<div className='icon'>
										<TbShoppingCartPlus />
									</div>
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export async function getStaticPaths() {
	const slugQuery = `*[_type == "product"] { slug { current } }`
	const productSlug = await client.fetch(slugQuery)
	const paths = productSlug.map((product) => {
		return {
			params: {
				slug: product.slug.current
			}
		}
	})
	const fallback = "blocking"
	return { paths, fallback }
}

export async function getStaticProps({ params: { slug } }) {
	const productQuery = `*[_type == "product" && slug.current == "${slug}"][0]`
	const allProductsQuery = `*[_type == "product"]`
	const productData = await client.fetch(productQuery)
	const allProductsData = await client.fetch(allProductsQuery)
	return {
		props: { productData, allProductsData }
	}
}

export default ProductDetails

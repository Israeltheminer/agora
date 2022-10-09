import React, { useState, useRef } from "react"
import Image from "next/image"
import { urlFor, client } from "../../lib/client"
import { AiOutlineMinus, AiOutlinePlus, AiOutlineStar, AiFillStar } from "react-icons/ai"
import { TbShoppingCartPlus } from "react-icons/tb"
import { Product } from "../../components"
import { useStateContext } from "../../context/StateContext"
import { motion, useInView } from "framer-motion"

const ProductDetails = ({ productData, allProductsData }) => {
	const [imageIndex, setImageIndex] = useState(0)
	const { decreaseQty, increaseQty, qty, addToCart } = useStateContext()
	const { image, name, slug, price, details } = productData
	const topLeftRef = useRef(null)
	const topRightRef = useRef(null)
	const topLeftInView = useInView(topLeftRef)
	const topRightInView = useInView(topRightRef)
	return (
		<div className='px-[5%] bg-[#f6f6f6] py-[80px] flex flex-col single-product-page mb-10 overflow-x-clip'>
			<div className='product-detail-container justify-around m:flex-col'>
				<motion.div ref={topLeftRef}>
					<motion.div
						className='hover:scale-[1.01] transition ease-in-out duration-300'
						initial={!topLeftInView ? { x: 0 } : { x: "-100vw" }}
						animate={
							topLeftInView
								? {
										x: 0,
										transition: {
											type: "spring",
											stiffness: 80
										}
								  }
								: { x: "-100vw" }
						}>
						<motion.div className='product-detail-image relative md:w-[350px] md:h-[350px] m:mx-auto xs:w-[300px] xs:h-[300px]'>
							{urlFor(image) && <Image src={`${urlFor(image[imageIndex || 0])}`} alt={slug} layout='fill' objectFit='cover' />}
						</motion.div>
					</motion.div>
					<motion.div
						className='small-images-container md:gap-[15px] m:justify-center xs:gap-[10px]'
						initial={!topLeftInView ? { x: 0 } : { x: "-100vw" }}
						animate={
							topLeftInView
								? {
										x: 0,
										transition: {
											type: "spring",
											stiffness: 50,
											delayChildren: 1,
											when: "beforeChildren",
											staggerChildren: 0.5
										}
								  }
								: { x: "-100vw" }
						}>
						{image?.map((item, itemIndex) => (
							<motion.div
								animate={{
									opacity: 1
								}}
								initial={{
									opacity: 0
								}}
								className={
									itemIndex === imageIndex
										? "relative w-[95px] h-[95px] md:w-[65px] md:h-[65px] xs:w-[60px] xs:h-[60px] small-image selected-image"
										: "relative w-[95px] h-[95px] md:w-[65px] md:h-[65px] xs:w-[60px] xs:h-[60px] unselected-image small-image"
								}
								onMouseEnter={() => setImageIndex(itemIndex)}
								key={itemIndex}>
								<Image src={`${urlFor(item)}`} alt={itemIndex} layout='fill' objectFit='cover' />
							</motion.div>
						))}
					</motion.div>
				</motion.div>
				<motion.div ref={topRightRef}>
					<motion.div
						initial={!topRightInView ? { x: 0 } : { x: "100vw" }}
						animate={
							topRightInView
								? {
										x: 0,
										transition: {
											type: "spring",
											stiffness: 20
										}
								  }
								: { x: "100vw" }
						}
						className='product-detail-desc max-w-[475px] mt-12'>
						<h1 className='text-[38px] font-bold mb-6 leading-tight xs:text-[32px] xs:mb-3'>{name}</h1>
						<p className='mb-4 leading-normal opacity-70 xs:text-sm'>{details}</p>
						<div className='mb-2'>
							<p className='price font-bold text-[28px] xs:text-[24px]'>${price}.00</p>
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
						<div className='flex gap-8 items-center xs:gap-4 xs:text-sm xs:flex-col xs:justify-start'>
							<span className='quantity py-[8px] px-[10px] xs:self-start'>
								<span className='minus cursor-pointer' onClick={decreaseQty}>
									<AiOutlineMinus />
								</span>
								<span className='num cursor-default font-bold text-black select-none'>{qty}</span>
								<span className='plus cursor-pointer' onClick={increaseQty}>
									<AiOutlinePlus />
								</span>
							</span>
							<div className='xs:self-start'>
								<button className='add-to-cart btn-blue' onClick={() => addToCart(productData, qty)}>
									<span className='absolute right-[40px]'>Add to Cart</span>
									<div className='icon absolute flex items-center justify-center h-[2.2em] w-[2.2em] left-[40px] text-2xl'>
										<TbShoppingCartPlus />
									</div>
								</button>
							</div>
						</div>
					</motion.div>
				</motion.div>
			</div>
			<div className='maylike-products-wrapper'>
				<h2 className='text-3xl font-bold xs:text-2xl'>Popular items today</h2>
				<div className='marquee'>
					<div className='maylike-products-container track'>
						{allProductsData.map((item) => (
							<Product key={item._id} product={item} />
						))}
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

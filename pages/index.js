import React, { useState, useEffect } from "react"
import { FooterBanner, HeroBanner, Product } from "../components"
import { client } from "../lib/client.js"
import { motion } from "framer-motion"
import { useStateContext } from "../context/StateContext"
import Image from "next/image"

const Index = ({ productData, heroBannerData, bottomBannerData }) => {
	const [data, setData] = useState([])
	const { page, increasePage, decreasePage } = useStateContext()
	useEffect(() => {
		const firstDisplay = productData.filter((_, index) => index < 12)
		setData(firstDisplay)
	}, [productData])
	useEffect(() => {
		const startDisplay = 12 * page - 12
		const finishDisplay = 12 * page - 1
		const pageDisplay = productData.filter((_, index) => index >= startDisplay && index <= finishDisplay)
		setData(pageDisplay)
	}, [productData, page])
	const totalPages = Math.ceil(productData.length / 12)
	return (
		<>
			<div className=''>
				<motion.div className='px-[6%]' animate={{ x: 0 }} initial={{ x: "-100vw" }} transition={{ type: "spring", stiffness: 50 }}>
					<HeroBanner heroBanner={heroBannerData.length && heroBannerData[0]} />
				</motion.div>
				<motion.div
					whileInView={{ scale: 1 }}
					initial={{ scale: 0.6 }}
					viewport={{ once: true }}
					className='bg-[#f6f6f6] pt-12 pb-16 px-[6%] mt-16'>
					<div className='products-heading'>
						<h2 className='text-3xl xs:text-[24px]'>Shoes & Sneakers</h2>
						<p className='mt-4 opacity-80 xs:text-[14px]'>Nike | Adidas | Yeezy | Converse</p>
					</div>
					<div
						className='products-container grid grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1'
						transition={{ type: "spring", stiffness: 50, staggerChildren: 0.5, delayChildren: 1, when: "beforeChildren" }}>
						{productData?.map((product) => (
							<motion.div key={product._id} animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
								<Product product={product} />
							</motion.div>
						))}
					</div>
				</motion.div>
				{data.length > 12 && (
					<div className='flex justify-center items-center pt-16 pb-4 gap-3 text-[19px] font-bold'>
						{page > 1 && (
							<span
								className='h-5 hover:h-6 cursor-pointer animate-bounce'
								onClick={() => {
									if (page > 1) {
										increasePage()
										document.cookie = `page=${page - 1}`
									}
								}}>
								<Image src='/assets/left.svg' width='20' height='20' alt='left' />
							</span>
						)}
						<button className='opacity-70'>{page}</button>
						{page < totalPages && (
							<span
								className='h-5 hover:h-6 cursor-pointer animate-bounce'
								onClick={() => {
									if (page < totalPages) {
										decreasePage()
										document.cookie = `page=${page + 1}`
									}
								}}>
								<Image src='/assets/right.svg' width='20' height='20' alt='left' />
							</span>
						)}
					</div>
				)}
				<div className='px-[6%]'>
					<FooterBanner bottomBanner={bottomBannerData.length && bottomBannerData[0]} />
				</div>
			</div>
		</>
	)
}

const productQuery = `*[_type == "product"] | order(_createdAt desc)`
const heroBannerQuery = `*[_type == "banner"] | order(_createdAt desc)`
const bottomBannerQuery = `*[_type == "bottomBanner"] | order(_createdAt desc)`

export async function getStaticProps() {
	const productData = await client.fetch(productQuery)
	const heroBannerData = await client.fetch(heroBannerQuery)
	const bottomBannerData = await client.fetch(bottomBannerQuery)
	return {
		props: { productData, heroBannerData, bottomBannerData }
	}
}

export default Index

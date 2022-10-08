import React from "react"
import { Cart, FooterBanner, HeroBanner, Layout, Product, Navbar } from "../components"
import { client } from "../lib/client.js"

const index = ({ productData, heroBannerData, bottomBannerData }) => {
	return (
		<>
			<div className=''>
				<div className='px-[6%]'>
					<HeroBanner heroBanner={heroBannerData.length && heroBannerData[0]} />
				</div>
				<div className='bg-[#f6f6f6] pt-12 pb-16 px-[6%] mt-16'>
					<div className='products-heading'>
						<h2 className='text-3xl xs:text-[24px]'>Shoes & Sneakers</h2>
						<p className='mt-4 opacity-80 xs:text-[14px]'>Nike | Adidas | Yeezy | Converse</p>
					</div>
					<div className='products-container grid grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1'>
						{productData?.map((product) => (
							<Product key={product._id} product={product} />
						))}
					</div>
				</div>
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

export default index

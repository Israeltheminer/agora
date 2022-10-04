import React from "react"
import { Cart, FooterBanner, HeroBanner, Layout, Product, Navbar } from "../components"
import { client } from "../lib/client.js"

const index = ({ productData, heroBannerData, bottomBannerData }) => {
	return (
		<>
			<div className='smooth-scroll'>
				<HeroBanner heroBanner={heroBannerData.length && heroBannerData[0]} />
				<div className='products-heading mt-20'>
					<h2 className='text-xl'>Shoes & Sneakers</h2>
					<p className='mt-4 opacity-80'>Nike | Adidas | Yeezy | Converse</p>
				</div>
				<div className='products-container grid grid-cols-4 xl:grid-cols-3 lg:grid-cols-2'>
					{productData?.map((product) => (
						<Product key={product._id} product={product} />
					))}
				</div>
				<FooterBanner bottomBanner={bottomBannerData.length && bottomBannerData[0]} />
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

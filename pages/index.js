import React from "react"
import { Cart, FooterBanner, HeroBanner, Layout, Product, Navbar } from "../components"
import { client } from "../lib/client.js"

const index = ({ productData, bannerData }) => {
	return (
		<>
			<div className='smooth-scroll'>
				<HeroBanner heroBanner={bannerData.length && bannerData[0]} />
				<div className='products-heading'>
					<h2 className='text-xl'>Best Selling Products</h2>
					<p>Speakers of many variations</p>
				</div>
				<div className='products-container'>{productData?.map((product) => product.name)}</div>
				<FooterBanner />
			</div>
		</>
	)
}

const productQuery = `*[_type == "product"] | order(_createdAt desc)`
const bannerQuery = `*[_type == "banner"] | order(_createdAt desc)`

export async function getStaticProps() {
	const productData = await client.fetch(productQuery)
	const bannerData = await client.fetch(bannerQuery)
	return {
		props: { productData, bannerData }
	}
}

export default index

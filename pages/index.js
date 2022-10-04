import React from "react"
import { Cart, FooterBanner, HeroBanner, Layout, Product, Navbar } from "../components"
import { client } from "../lib/client.js"

const index = ({ productData, bannerData }) => {
	return (
		<>
			<div className='smooth-scroll px-[6%]'>
				<HeroBanner heroBanner={bannerData.length && bannerData[0]} />
				<div className='products-heading mt-20'>
					<h2 className='text-xl'>Shoes & Sneakers</h2>
					<p className='mt-4'>Nike | Adidas | Yeezy | Converse</p>
				</div>
				<div className='products-container grid grid-cols-3'>
					{console.log(productData)}
					{productData?.map((product) => (
						<Product key={product._id} product={product} />
					))}
				</div>
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

import sanityClient from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

export const client = sanityClient({
	dataset: "production",
	useCdn: process.env.NODE_ENV === "production",
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	apiVersion: "2022-10-01",
	token: process.env.NEXT_PUBLIC_SANITY_CLIENT_TOKEN
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)

import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
	if (req.method === "POST") {
		const cartItems = req.body
		try {
			const params = {
				submit_type: "pay",
				mode: "payment",
				billing_address_collection: "auto",
				shipping_options: [{ shipping_rate: "shr_1LqIcyHqb12BbEZ6c8KxLGFx" }, { shipping_rate: "shr_1LqIbdHqb12BbEZ6I0KAIVUN" }],
				line_items: cartItems.map((item) => {
					const imgRef = item.image[0].asset._ref
					const image = imgRef
						.replace("image-", "https://cdn.sanity.io/images/aizre4k3/production/")
						.replace("-jpg", ".jpg")
						.replace("-png", ".png")
						.replace("-webp", ".webp")
					return {
						price_data: {
							currency: "usd",
							product_data: {
								name: item.name,
								images: [image]
							},
							unit_amount: item.price * 100
						},
						adjustable_quantity: {
							enabled: true,
							minimum: 1
						},
						quantity: item.quantity
					}
				}),
				success_url: `${req.headers.origin}/?success=true`,
				cancel_url: `${req.headers.origin}/?canceled=true`
			}
			const session = await stripe.checkout.sessions.create(params)
			res.status(200).json(session)
		} catch (err) {
			res.status(err.statusCode || 500).json(err.message)
		}
	} else {
		res.setHeader("Allow", "POST")
		res.status(405).end("Method Not Allowed")
	}
}

import React from "react"
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai"
import { FaFacebookF } from "react-icons/fa"

const Footer = () => {
	return (
		<div className='footer-container'>
			<p>&copy;2022 Agora, Inc. All Rights Reserved</p>
			<p className='icons mt-4'>
				<AiFillInstagram />
				<AiOutlineTwitter />
				<FaFacebookF />
			</p>
		</div>
	)
}

export default Footer

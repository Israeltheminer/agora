import React, { useState, createContext, useContext, useEffect } from "react"
import { toast } from "react-hot-toast"

const Context = createContext()

export const StateContext = ({ children }) => {
	const [showCart, setShowCart] = useState(false)
	const [cartItems, setCartItems] = useState([])
	const [totalPrice, setTotalPrice] = useState(0)
	const [totalQuantity, setTotalQuantity] = useState(0)
	const [qty, setQty] = useState(1)
	const increaseQty = () => {
		setQty((prevQty) => prevQty + 1)
	}
	const decreaseQty = () => {
		setQty((prevQty) => {
			if (prevQty - 1 === 0) {
				return prevQty
			} else {
				return prevQty - 1
			}
		})
	}
	const addToCart = (product, quantity) => {
		const checkProductInCart = cartItems.find((cartItem) => cartItem._id === product._id)
		setTotalPrice((prevPrice) => prevPrice + product.price * quantity)
		setTotalQuantity((prevQuantity) => prevQuantity + quantity)
		if (checkProductInCart) {
			const updatedCartItems = cartItems.map((cartItem) => {
				if (cartItem._id === product._id) {
					return {
						...cartItem,
						quantity: cartItem.quantity + quantity
					}
				}
			})
			setCartItems(updatedCartItems)
		} else {
			const updatedCartItems = [...cartItems, { ...product, quantity }]
			setCartItems(updatedCartItems)
		}
		toast.success(`${quantity} ${product.name} added to cart.`)
	}
	const toogleCartVisibility = () => {
		setShowCart((prev) => {
			if (totalQuantity > 0) {
				return !prev
			}
		})
	}
	return (
		<Context.Provider value={{ showCart, cartItems, totalPrice, totalQuantity, qty, increaseQty, decreaseQty, addToCart, toogleCartVisibility }}>
			{children}
		</Context.Provider>
	)
}

export const useStateContext = () => useContext(Context)

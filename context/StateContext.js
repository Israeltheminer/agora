import React, { useState, createContext, useContext, useEffect } from "react"
import { toast } from "react-hot-toast"

const Context = createContext()

export const StateContext = ({ children }) => {
	const [showCart, setShowCart] = useState(false)
	const [cartItems, setCartItems] = useState([])
	const [totalPrice, setTotalPrice] = useState(0)
	const [totalQuantity, setTotalQuantity] = useState(0)
	const [page, setPage] = useState(1)
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
		setTotalPrice((prevPrice) => {
			window?.localStorage?.setItem("totalPrice", prevPrice + product.price * quantity)
			return prevPrice + product.price * quantity
		})
		setTotalQuantity((prevQuantity) => {
			window?.localStorage?.setItem("totalQuantity", prevQuantity + quantity)
			return prevQuantity + quantity
		})
		if (checkProductInCart) {
			const updatedCartItems = cartItems.map((cartItem) => {
				if (cartItem._id === product._id) {
					return {
						...cartItem,
						quantity: cartItem.quantity + quantity
					}
				} else {
					return cartItem
				}
			})
			setCartItems(updatedCartItems)
			window?.localStorage?.setItem("cartItems", JSON.stringify(updatedCartItems))
		} else {
			const updatedCartItems = [...cartItems, { ...product, quantity }]
			setCartItems(updatedCartItems)
			window?.localStorage?.setItem("cartItems", JSON.stringify(updatedCartItems))
		}
		toast.success(`${quantity} ${product.name} added to cart.`)
	}
	const deleteFromCart = (product) => {
		const updatedCartItems = cartItems.filter((cartItem) => {
			return cartItem._id !== product._id
		})
		setTotalPrice((prevPrice) => prevPrice - product.price * product.quantity)
		setTotalQuantity((prevQuantity) => prevQuantity - product.quantity)
		setCartItems(updatedCartItems)
	}
	const toogleCartVisibility = () => {
		setShowCart((prev) => {
			return !prev
		})
	}
	const hideCart = () => {
		setShowCart((prev) => false)
	}
	const increasePage = () => {
		setPage((prevPage) => prevPage + 1)
	}
	const decreasePage = () => {
		setPage((prevPage) => prevPage - 1)
	}
	return (
		<Context.Provider
			value={{
				showCart,
				cartItems,
				totalPrice,
				totalQuantity,
				qty,
				page,
				increaseQty,
				decreaseQty,
				addToCart,
				toogleCartVisibility,
				deleteFromCart,
				hideCart,
				setCartItems,
				setTotalPrice,
				setTotalQuantity,
				increasePage,
				decreasePage
			}}>
			{children}
		</Context.Provider>
	)
}

export const useStateContext = () => useContext(Context)

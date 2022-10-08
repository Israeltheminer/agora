/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		screens: {
			xl: { max: "1500px" },
			lg: { max: "1300px" },
			md: { max: "1000px" },
			m: { max: "850px" },
			sm: { max: "690px" },
			xs: { max: "425px" }
		},
		extend: {}
	},
	plugins: []
}

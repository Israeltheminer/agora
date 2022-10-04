/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		screens: {
			xl: { max: "1500px" },
			lg: { max: "1300px" },
			md: { max: "1000px" },
			sm: { max: "650px" },
			xs: { max: "375px" }
		},
		extend: {}
	},
	plugins: []
}

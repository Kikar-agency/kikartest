/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'kikar-blue': '#2563EB', // Example, will refine based on "neon blue/violet"
                'kikar-violet': '#7C3AED',
                'kikar-green': '#10B981',
                'kikar-dark': '#0a0a0a',
                'kikar-glass': 'rgba(255, 255, 255, 0.05)',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
        },
    },
    plugins: [],
}

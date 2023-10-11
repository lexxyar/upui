// noinspection JSFileReferences
import colors from "tailwindcss/colors.js";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: colors.blue,
                secondary: colors.gray,
                danger: colors.red,
                warning: colors.yellow,
                success: colors.green,
                info: colors.indigo,
            }
        },
    },
    plugins: [],
    darkMode: "class"
}


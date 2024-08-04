/** @type {import('tailwindcss').Config} */
import * as flowbite from "flowbite-react/tailwind";

export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx}",flowbite.content()],
  theme: {
    extend: {},
  },
  plugins: [
      flowbite.plugins()
  ],
}


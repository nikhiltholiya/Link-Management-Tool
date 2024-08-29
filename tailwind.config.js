import withMT from "@material-tailwind/react/utils/withMT";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default withMT({
   content: [
      "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
      "./storage/framework/views/*.php",
      "./resources/views/**/*.blade.php",
      "./resources/js/**/*.tsx",
   ],

   theme: {
      extend: {
         fontFamily: {
            sans: ["'Inter', sans-serif"],
         },
         colors: {
            gray: {
               25: "#FCFCFD",
               50: "#F9FAFB",
               100: "#F2F4F7",
               200: "#E4E7EC",
               300: "#D0D5DD",
               400: "#98A2B3",
               500: "#667085",
               600: "#475467",
               700: "#344054",
               800: "#1D2939",
               900: "#101828",
            },
         },
         boxShadow: {
            nav: "0px 4px 15px 0px rgba(0, 0, 0, 0.1)",
            card: "5px 0px 24px rgba(16, 24, 40, 0.05)",
            box: "0px 0px 16px -2px rgba(0, 0, 0, 0.08)",
            basic: "0px 6px 14px -6px rgb(24 39 75 / 12%), 0px 10px 32px -4px rgb(24 39 75 / 10%), inset 0px 0px 2px 1px rgb(24 39 75 / 5%)",
            carbon:
               "0px 6px 14px -6px rgb(24 39 75 / 12%), 0px 10px 32px -4px rgb(24 39 75 / 10%), inset 0px 0px 2px 1px rgb(255 255 255 / 5%)",
            glitch: "4px 4px 0 #222222",
            wlg: "0px 6px 14px -6px rgb(24 39 75 / 12%), 0px 10px 32px -4px rgb(24 39 75 / 10%), inset 0px 0px 2px 1px rgb(24 39 75 / 5%)",
            neon: "inset 0px 17.7895px 25.5438px -16.421px rgb(255 255 255 / 50%), inset 0px -5.92982px 4.10526px -6.38596px rgb(255 255 255 / 75%), inset 0px 3.19298px 5.01754px -1.82456px #ffffff, inset 0px -37.4035px 31.0175px -29.193px rgb(96 68 145 / 30%), inset 0px 44.7017px 45.614px -21.8947px rgb(202 172 255 / 30%), inset 0px 1.82456px 8.21052px rgb(154 146 210 / 30%), inset 0px 0.45614px 18.2456px rgb(227 222 255 / 20%)",
         },
         dropShadow: {
            avatar: "5px 9px 24px rgba(16, 24, 40, 0.05)",
         },
      },
   },

   plugins: [forms],
});

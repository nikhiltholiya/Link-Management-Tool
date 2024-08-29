import { SVGProps } from "react-html-props";

const Menu = (props: SVGProps) => {
   return (
      <svg
         width="16"
         height="16"
         viewBox="0 0 16 16"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         {...props}
      >
         <path
            d="M1 8H9.33333"
            stroke="#374151"
            strokeWidth="2"
            strokeLinecap="round"
         />
         <path
            d="M1 3L15 3M1 13H12.5"
            stroke="#374151"
            strokeWidth="2"
            strokeLinecap="round"
         />
      </svg>
   );
};

export default Menu;

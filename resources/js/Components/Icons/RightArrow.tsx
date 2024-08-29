import { SVGProps } from "react-html-props";

const RightArrow = (props: SVGProps) => {
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
            d="M10.7967 7.44335C11.0678 7.74991 11.0678 8.24561 10.7967 8.5489L6.18357 13.7701C5.91254 14.0766 5.47429 14.0766 5.20615 13.7701C4.93801 13.4635 4.93513 12.9678 5.20615 12.6645L9.32917 8.00102L5.20327 3.33424C4.93224 3.02769 4.93224 2.53199 5.20327 2.22869C5.47429 1.9254 5.91254 1.92214 6.18068 2.22869L10.7967 7.44335Z"
            fill="currentColor"
         />
      </svg>
   );
};

export default RightArrow;

import { SVGProps } from "react-html-props";

const ArrowDown = (props: SVGProps) => {
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
            d="M13.7451 6.29945L8.56292 10.7713C8.40609 10.9338 8.20153 11.0026 8.00038 11.0026C7.79923 11.0026 7.59535 10.9342 7.43784 10.7975L2.25567 6.29945C1.92735 6.01195 1.91371 5.53695 2.22362 5.23695C2.53489 4.93383 3.05481 4.92445 3.38074 5.20883L8.00038 9.2182L12.62 5.2057C12.946 4.92152 13.4638 4.93227 13.7771 5.235C14.086 5.53695 14.0724 6.01195 13.7451 6.29945Z"
            fill="currentColor"
         />
      </svg>
   );
};

export default ArrowDown;

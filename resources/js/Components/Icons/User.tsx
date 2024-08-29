import { SVGProps } from "react-html-props";

const User = (props: SVGProps) => {
   return (
      <svg
         width="20"
         height="20"
         viewBox="0 0 20 20"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         {...props}
      >
         <path
            d="M11.382 11.6881H7.91885C4.65067 11.6881 2 14.4164 2 17.7811C2 18.454 2.53007 19 3.18377 19H16.1178C16.7715 19.001 17.3009 18.4561 17.3009 17.7811C17.3009 14.4164 14.6506 11.6881 11.382 11.6881Z"
            fill="currentColor"
         />
         <path
            opacity="0.4"
            d="M14.0222 5.50026C14.0222 7.9856 12.0652 10.0005 9.65049 10.0005C7.23582 10.0005 5.27881 7.98595 5.27881 5.50026C5.27881 3.01457 7.23616 1 9.65049 1C12.0652 1 14.0222 3.01492 14.0222 5.50026Z"
            fill="currentColor"
         />
      </svg>
   );
};

export default User;

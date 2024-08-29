import { SVGProps } from "react-html-props";

const More = (props: SVGProps) => {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         height="1em"
         viewBox="0 0 512 512"
         {...props}
      >
         <path
            fill="currentColor"
            d="M256 384a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm0-96a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM224 160a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
         />
         <path
            fill="currentColor"
            style={{ opacity: 0.4 }}
            d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-64a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM224 160a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
         />
      </svg>
   );
};

export default More;

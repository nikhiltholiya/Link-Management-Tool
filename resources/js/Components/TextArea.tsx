import { TextAreaProps } from "@/types";
import { useEffect, useRef, useState } from "react";

const TextArea = (props: TextAreaProps) => {
   const {
      rows,
      cols,
      name,
      value,
      label,
      error,
      maxLength,
      onChange,
      fullWidth,
      placeholder,
      flexLabel,
      required,
   } = props;

   const [lengthOver, setLengthOver] = useState(false);
   useEffect(() => {
      maxLength && value && value.length >= maxLength
         ? setLengthOver(true)
         : setLengthOver(false);
   }, [value]);

   const textAreaRef = useRef<any>();
   useEffect(() => {
      if (maxLength && textAreaRef.current) {
         textAreaRef.current.maxLength = maxLength;
      }
   }, []);

   return (
      <div
         className={`relative flex flex-col items-start ${
            flexLabel && "md:flex-row md:items-center"
         } ${fullWidth && "w-full"}`}
      >
         {label && (
            <>
               {flexLabel ? (
                  <small className="max-w-[164px] w-full mb-1 whitespace-nowrap flex items-center font-medium text-gray-500">
                     <span className="mr-1">{label}</span>
                     {required && <span className="block text-red-500">*</span>}
                  </small>
               ) : (
                  <small className="w-full mb-1 whitespace-nowrap flex items-center font-medium text-gray-500">
                     <span className="mr-1">{label}</span>
                     {required && <span className="block text-red-500">*</span>}
                  </small>
               )}
            </>
         )}
         {maxLength && (
            <small className="absolute top-0 right-0 w-full text-end">
               {value ? value.length : 0}/{maxLength}
            </small>
         )}

         <textarea
            name={name}
            value={value}
            rows={rows || 3}
            cols={cols || 10}
            className={`rounded-md w-full text-sm px-2.5 py-2 focus:ring-0 border text-gray-800 font-normal placeholder:text-gray-400 ${
               lengthOver
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-blue-500"
            } ${fullWidth && "w-full"}`}
            placeholder={placeholder}
            onChange={onChange}
            required={required}
            ref={textAreaRef}
         ></textarea>

         {lengthOver && (
            <p className="text-sm text-red-500 mt-1">
               Max length should be less or equal {maxLength}
            </p>
         )}
         {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
   );
};

export default TextArea;

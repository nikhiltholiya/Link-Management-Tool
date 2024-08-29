import { InputProps } from "@/types";
import { useEffect, useState } from "react";

const Input = (props: InputProps) => {
   const {
      type,
      name,
      value,
      label,
      error,
      maxLength,
      fullWidth,
      onChange,
      className,
      placeholder,
      required,
      flexLabel,
      disabled,
      readOnly,
      ...restProps
   } = props;

   const [lengthOver, setLengthOver] = useState(false);
   useEffect(() => {
      value && maxLength && value.length >= maxLength
         ? setLengthOver(true)
         : setLengthOver(false);
   }, [value]);

   return (
      <div
         className={`flex flex-col items-start ${
            flexLabel ? "md:flex-row md:items-center" : ""
         } ${fullWidth ? "w-full" : ""}`}
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

         <div className="relative w-full">
            {maxLength && (
               <small className="absolute -top-5 right-0 w-full text-end">
                  {value ? value.length : 0}/{maxLength}
               </small>
            )}

            <input
               {...restProps}
               type={type}
               name={name}
               value={value ? value : ""}
               className={`${
                  lengthOver
                     ? "!border !border-red-500 focus:!border-red-500"
                     : "!border !border-gray-200 focus:!border-blue-500"
               } h-10 px-2.5 focus:outline-0 focus:ring-0 rounded-md w-full text-sm text-gray-800 font-normal placeholder:text-gray-400 ${className} ${
                  fullWidth ? "w-full" : ""
               }`}
               placeholder={placeholder}
               onChange={onChange}
               required={required}
               maxLength={maxLength}
               disabled={disabled}
               readOnly={readOnly}
            />

            {lengthOver && (
               <p className="text-sm text-red-500 mt-1">
                  Max length should be less or equal {maxLength}
               </p>
            )}
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
         </div>
      </div>
   );
};

export default Input;

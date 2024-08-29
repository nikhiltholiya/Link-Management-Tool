interface Props {
   name: string;
   label?: string;
   value?: string;
   onChange?: (e: any) => void;
   className?: string;
}

const ColorInput = (props: Props) => {
   const { name, label, value, onChange, className } = props;

   return (
      <div>
         {label && (
            <small className="w-full mb-1 whitespace-nowrap flex items-center font-medium text-gray-500">
               {label}
            </small>
         )}
         <input
            type="color"
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full p-0 h-11 ${className}`}
         />
      </div>
   );
};

export default ColorInput;

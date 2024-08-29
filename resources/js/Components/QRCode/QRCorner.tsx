interface Props {
   title: string;
   name: "0_outer" | "1_outer" | "2_outer" | "0_inner" | "1_inner" | "2_inner";
   onChange?: (e: any) => void;
   className?: string;
   state: { [key: string]: any };
}

const QRCorner = (props: Props) => {
   const { state, title, name, onChange, className } = props;

   //    return (
   //       <input
   //          min={0}
   //          max={50}
   //          type="range"
   //          name={name}
   //          value={value}
   //          onChange={onChange}
   //          className={`w-full ${className}`}
   //       />
   //    );

   const buildEyeRadiusInput = (name: string) => {
      return (
         <input
            min={0}
            max={50}
            type="range"
            name={name}
            value={state[name]}
            onChange={onChange}
            className="w-full"
         />
      );
   };

   return (
      <div>
         <small className="w-full mb-1 whitespace-nowrap flex items-center font-medium text-gray-500">
            {title}
         </small>
         {buildEyeRadiusInput(`eyeradius_${name}_0`)}
         {buildEyeRadiusInput(`eyeradius_${name}_1`)}
         {buildEyeRadiusInput(`eyeradius_${name}_2`)}
         {buildEyeRadiusInput(`eyeradius_${name}_3`)}
      </div>
   );
};

export default QRCorner;

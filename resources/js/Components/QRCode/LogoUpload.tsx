import { error } from "@/utils/toast";

interface Props {
   name: string;
   handleChange: (target: any) => void;
   className?: string;
}

const LogoUpload = (props: Props) => {
   const { name, className, handleChange } = props;

   const retrievePathFile = (files: any) => {
      const file = files[0];
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
         error("Only png and jpg/jpeg allowed.");
      } else {
         const target: any = {};
         const reader = new FileReader();
         reader.readAsDataURL(file);
         reader.onloadend = (e) => {
            target.name = name;
            target.value = reader.result;
            target.logoName = file.name;
            handleChange({ target });
         };
      }
   };

   return (
      <input
         type="file"
         name={name}
         accept="image/*"
         onChange={(e) => retrievePathFile(e.target.files)}
         className={`${className}`}
      />
   );
};

export default LogoUpload;

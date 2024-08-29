import { Button } from "@material-tailwind/react";
import { FC, ReactNode } from "react";

interface Props {
   Icon: any;
   title: string;
   className?: string;
   Component?: ReactNode;
}

const Breadcrumb: FC<Props> = ({ Icon, title, className, Component }) => {
   return (
      <div className={`flex items-center justify-between mb-10 ${className}`}>
         <div className="flex items-center">
            <Icon className="text-blue-500 h-6 w-6" />
            <p className="text-xl font-bold ml-2">{title}</p>
         </div>

         {Component}
      </div>
   );
};

export default Breadcrumb;

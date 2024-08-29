import { PageProps, ThemeProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { Fragment } from "react";

interface Props {
   title: string;
   theme?: ThemeProps;
}
const ThemeBadge = ({ title, theme }: Props) => {
   const { props } = usePage();
   const { auth } = props as PageProps;

   const themeAccessLock = (theme: ThemeProps): boolean => {
      if (auth.user.roles[0].name === "BASIC") {
         if (theme.type !== "Free") {
            return true;
         }
      } else if (auth.user.roles[0].name === "STANDARD") {
         if (theme.type === "Premium") {
            return true;
         }
      }

      return false;
   };

   auth.user.roles[0].name === "BASIC";

   const badgeHandler = () => {
      if (theme) {
         return themeAccessLock(theme);
      } else {
         return auth.user.roles[0].name === "BASIC" ? true : false;
      }
   };

   return (
      <Fragment>
         {badgeHandler() && (
            <div className="absolute top-0 left-0 w-full h-full bg-gray-900/60 rounded-md">
               <span className="text-xs bg-blue-50 text-blue-500 rounded-full absolute top-2 right-2 px-2 py-0.5">
                  {title}
               </span>
            </div>
         )}
      </Fragment>
   );
};

export default ThemeBadge;

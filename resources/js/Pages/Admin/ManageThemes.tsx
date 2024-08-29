import Breadcrumb from "@/Components/Breadcrumb";
import Palette from "@/Components/Icons/Palette";
import ThemeUpdate from "@/Components/ThemeUpdate";
import Dashboard from "@/Layouts/Dashboard";
import { PageProps, ThemeProps } from "@/types";
import { jsxStyle, stringToCss } from "@/utils/utils";
import { Head } from "@inertiajs/react";
import { ReactNode } from "react";

interface Props extends PageProps {
   themes: ThemeProps[];
}

const ManageThemes = (props: Props) => {
   const { themes } = props;
   const { app } = props.translate;

   return (
      <>
         <Head title={app.manage_themes} />
         <Breadcrumb Icon={Palette} title={app.manage_themes} />

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-x-6 gap-y-8">
            {themes.map((theme, ind) => {
               let bgStyle = jsxStyle(stringToCss(theme.background));
               if (theme.bg_image) {
                  bgStyle.backgroundImage = `url(/${theme.bg_image})`;
               }
               let btnStyle = jsxStyle(stringToCss(theme.button_style));

               return (
                  <div key={ind}>
                     <div
                        className="relative h-[220px] 2xl:h-[260px] p-4 py-8 2xl:py-12 rounded-lg flex flex-col justify-between border border-gray-300 hover:border-blue-500 cursor-pointer"
                        style={bgStyle}
                     >
                        <div className="absolute top-1 left-2">
                           <ThemeUpdate theme={theme} />
                        </div>
                        <span className="absolute top-2 right-2 text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-500">
                           {theme.type}
                        </span>
                        {[1, 2, 3, 4].map((item) => (
                           <button
                              key={item}
                              className="h-[30px] w-full"
                              style={btnStyle}
                           ></button>
                        ))}
                     </div>
                     <p className="font-medium text-center mt-1 mb-2">
                        {theme.name}
                     </p>
                  </div>
               );
            })}
         </div>
      </>
   );
};

ManageThemes.layout = (page: ReactNode) => <Dashboard children={page} />;

export default ManageThemes;

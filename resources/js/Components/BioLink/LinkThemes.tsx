import Camera from "../Icons/Camera";
import { error } from "@/utils/toast";
import { ChangeEvent } from "react";
import ThemeBadge from "./ThemeBadge";
import { jsxStyle, stringToCss } from "@/utils/utils";
import { LinkProps, PageProps, ThemeProps } from "@/types";
import { router, useForm, usePage } from "@inertiajs/react";
import CustomThemeCreate from "./CustomThemeCreate";
import hideProgress from "@/utils/hideProgress";

interface Props {
   link: LinkProps;
   themes: ThemeProps[];
}

const LinkThemes = ({ link, themes }: Props) => {
   const { props } = usePage();
   const { app, auth } = props as PageProps;

   const activeTheme = (theme: ThemeProps | null) => {
      if (!link.custom_theme_active && theme && theme.id === link.theme.id) {
         return "outline outline-1 outline-blue-500 !border-blue-500";
      }
   };

   const updateTheme = async (
      theme: ThemeProps,
      linkId: number
   ): Promise<void> => {
      if (auth.user.roles[0].name === "BASIC") {
         if (theme.type !== "Free") {
            return;
         }
      }
      if (auth.user.roles[0].name === "STANDARD") {
         if (theme.type === "Premium") {
            return;
         }
      }

      hideProgress();
      router.put(route("customize.update", { id: linkId }), {
         theme_id: theme.id,
      });
   };

   // Custom theme handler
   const { post, errors } = useForm({
      link_id: link.id,
      background: "background: #30425A;",
      background_type: "color",
      bg_color: "#30425A",
      text_color: "#ffffff",
      btn_type: "rounded",
      btn_transparent: false,
      btn_radius: "30px",
      btn_bg_color: "#ffffff",
      btn_text_color: "#1d2939",
      font_family: "Inter, sans-serif",
   });

   const customThemeHandler = async (link: LinkProps): Promise<void> => {
      if (auth.user.roles[0].name === "BASIC") {
         return;
      }

      hideProgress();
      if (link.custom_theme_id) {
         router.put(route("custom-theme.active", { id: link.id }));
      } else {
         post(route("custom-theme.store"));
      }
   };

   // link branding handler
   const brandingHandle = async (
      e: ChangeEvent<HTMLInputElement>
   ): Promise<void> => {
      if (auth.user.roles[0].name === "BASIC") {
         return;
      }

      const files = e.target.files;
      if (files && files[0]) {
         hideProgress();
         const formData: any = new FormData();
         formData.append("branding", files[0]);

         router.post(route("customize.logo", { id: link.id }), formData, {
            onError(e) {
               error(e.branding);
            },
         });
      }
   };

   return (
      <div>
         <div className="card grid grid-cols-2 md:grid-cols-3 gap-6 p-6">
            <div className="col-span-2 md:col-span-3">
               <h6 className="text-xl">Available Themes</h6>
            </div>
            {themes.map((theme, ind) => {
               let bgStyle = jsxStyle(stringToCss(theme.background));
               if (theme.bg_image) {
                  bgStyle.backgroundImage = `url(/${theme.bg_image})`;
               }
               let btnStyle = jsxStyle(stringToCss(theme.button_style));

               return (
                  <div key={ind}>
                     <div className="relative">
                        <div
                           onClick={() => updateTheme(theme, link.id)}
                           className={`h-[220px] 2xl:h-[260px] p-4 py-8 2xl:py-12 rounded-lg flex flex-col justify-between border border-gray-300 hover:border-blue-500 cursor-pointer ${activeTheme(
                              theme
                           )}`}
                           style={bgStyle}
                        >
                           {[1, 2, 3, 4].map((item) => (
                              <button
                                 key={item}
                                 className="h-[30px] w-full"
                                 style={btnStyle}
                              ></button>
                           ))}
                        </div>
                        <ThemeBadge title={theme.type} theme={theme} />
                     </div>
                     <p className="font-medium text-center mt-1 mb-2">
                        {theme.name}
                     </p>
                  </div>
               );
            })}

            <div>
               <div className="relative">
                  <div
                     onClick={() => customThemeHandler(link)}
                     className={`h-[220px] 2xl:h-[260px] p-4 py-8 2xl:py-12 rounded-lg flex items-center border border-gray-300 hover:border-blue-500 cursor-pointer ${
                        link.custom_theme_active &&
                        "outline outline-1 outline-blue-500 !border-blue-500"
                     }`}
                  >
                     <p className="text-center font-medium">
                        Create Custom Theme
                     </p>
                  </div>
                  <ThemeBadge title="Pro" />
               </div>
               <p className="font-medium text-center mt-1 mb-2">Custom Theme</p>
            </div>

            <div>
               <div className="relative">
                  <div
                     className={`h-[220px] 2xl:h-[260px] p-4 py-8 2xl:py-12 rounded-lg flex flex-col items-center justify-center border border-gray-300 hover:border-blue-500`}
                  >
                     <img
                        src={link.branding ?? app.logo}
                        className="w-20 h-20 rounded"
                        alt=""
                     />
                     <label
                        htmlFor="linkBranding"
                        className="cursor-pointer mt-4"
                     >
                        <Camera className="text-blue-500 w-7 h-7" />
                     </label>
                     <input
                        hidden
                        type="file"
                        onChange={brandingHandle}
                        id="linkBranding"
                     ></input>
                  </div>
                  <ThemeBadge title="Pro" />
               </div>

               <p className="font-medium text-center mt-1 mb-2">Change Logo</p>
            </div>
         </div>

         {link.custom_theme_id && <CustomThemeCreate link={link} />}
      </div>
   );
};

export default LinkThemes;

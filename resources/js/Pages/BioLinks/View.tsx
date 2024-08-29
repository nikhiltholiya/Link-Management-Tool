import SimpleBar from "simplebar-react";
import { jsxStyle, stringToCss } from "@/utils/utils";
import { LinkProps, PageProps } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import LinkBlock from "@/Components/BioLink/LinkBlock";
import UserCircle from "@/Components/Icons/UserCircle";
import { socialType } from "@/utils/data/socials-links";
import icons from "@/Components/Icons";

const View = (props: { link: LinkProps }) => {
   const { link } = props;
   const page = usePage();
   const { app, auth } = page.props as PageProps;

   let parsedStyle: any;
   let buttonStyle: any = new Object();

   if (link.custom_theme && link.custom_theme_active) {
      const theme = link.custom_theme;
      parsedStyle = jsxStyle(stringToCss(theme.background));
      parsedStyle.color = theme.text_color;
      parsedStyle.fontFamily = theme.font_family;

      buttonStyle = {
         color: theme.btn_text_color,
         borderRadius: theme.btn_radius,
         background: theme.btn_transparent
            ? theme.btn_transparent
            : theme.btn_bg_color,
      };
   } else {
      const { background, text_color, font_family, bg_image, button_style } =
         link.theme;
      parsedStyle = jsxStyle(stringToCss(background));
      parsedStyle.color = text_color;
      parsedStyle.fontFamily = font_family;
      if (bg_image) {
         parsedStyle.backgroundImage = `url(/${bg_image})`;
      }
      buttonStyle = jsxStyle(stringToCss(button_style));
   }

   let branding = "";
   if (auth.user.roles[0].name === "BASIC") {
      branding = app.logo;
   } else {
      if (link.branding) {
         branding = link.branding;
      } else {
         branding = app.logo;
      }
   }

   let socials: socialType[] = [];
   if (link.socials) {
      socials = JSON.parse(link.socials);
   }

   const socialColor = link.social_color ? link.social_color : "#101828";

   return (
      <div style={parsedStyle} className="bg-cover bg-center object-contain">
         <Head title="Bio Links" />
         <SimpleBar style={{ height: "100vh" }} className="px-4 py-5">
            <div className="max-w-[700px] w-full mx-auto min-h-[calc(100vh-40px)] flex flex-col justify-between">
               <div>
                  <div className="flex flex-col items-center">
                     {link.thumbnail ? (
                        <img
                           className="w-[100px] h-[100px] object-cover rounded-full"
                           src={link.thumbnail}
                           alt="linkdrop"
                        />
                     ) : (
                        <UserCircle className="w-[100px] h-[100px] text-gray-700" />
                     )}

                     <p className="text-xl font-medium mt-2">
                        {link.link_name}
                     </p>
                     <p className="font-medium text-justify mt-2 mb-4">
                        {link.short_bio}
                     </p>
                  </div>

                  {socials.length > 0 && (
                     <div className="flex items-center justify-center flex-wrap gap-4 mt-2 mb-8">
                        {socials.map((item, ind) => {
                           const Icon = icons[item.icon];

                           return (
                              <>
                                 {item.name === "email" ? (
                                    <a
                                       key={ind}
                                       href={("mailto:" + item.link) as any}
                                       className="mx-2"
                                    >
                                       <Icon
                                          className="w-6 h-6"
                                          style={{ color: socialColor }}
                                       />
                                    </a>
                                 ) : item.name === "telephone" ||
                                   item.name === "whatsapp" ? (
                                    <a
                                       key={ind}
                                       href={("tel:" + item.link) as any}
                                       className="mx-2"
                                    >
                                       <Icon
                                          className="w-6 h-6"
                                          style={{ color: socialColor }}
                                       />
                                    </a>
                                 ) : (
                                    <a
                                       key={ind}
                                       target="_blank"
                                       href={item.link as any}
                                       className="mx-2"
                                    >
                                       <Icon
                                          className="w-6 h-6"
                                          style={{ color: socialColor }}
                                       />
                                    </a>
                                 )}
                              </>
                           );
                        })}
                     </div>
                  )}

                  {link.items.map((item, ind) => (
                     <LinkBlock
                        key={ind}
                        item={item}
                        buttonStyle={buttonStyle}
                     />
                  ))}
               </div>

               <img src={branding} alt="" className="w-10 mx-auto" />
            </div>
         </SimpleBar>
      </div>
   );
};

export default View;

import { Fragment } from "react";
import SimpleBar from "simplebar-react";
import UserCircle from "../Icons/UserCircle";
import { LinkProps, PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import LinkBlock from "./LinkBlock";
import { socialType } from "@/utils/data/socials-links";
import icons from "../Icons";

const LinkPreview = (props: { link: LinkProps; buttonStyle: any }) => {
   const page = usePage();
   const { link, buttonStyle } = props;
   const { app, auth } = page.props as PageProps;

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
      <SimpleBar style={{ height: "100%" }} className="px-4 py-5">
         <div className="min-h-[calc(100vh-206px)] flex flex-col justify-between">
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
                  <p className="text-xl font-medium mt-2">{link.link_name}</p>
                  <p className="font-medium text-justify mt-2 mb-4">
                     {link.short_bio}
                  </p>
               </div>
               {socials.length > 0 && (
                  <div className="flex items-center justify-center flex-wrap gap-4 mt-2 mb-8">
                     {socials.map((item, ind) => {
                        const Icon = icons[item.icon];

                        return (
                           <Fragment key={ind}>
                              {item.name === "email" ? (
                                 <a
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
                           </Fragment>
                        );
                     })}
                  </div>
               )}

               {link.items.map((item) => (
                  <LinkBlock item={item} buttonStyle={buttonStyle} />
               ))}
            </div>

            <img
               className="w-10 mx-auto"
               src={link.branding ?? app.logo}
               alt=""
            />
         </div>
      </SimpleBar>
   );
};

export default LinkPreview;

import {
   Tab,
   Tabs,
   Button,
   TabsBody,
   TabPanel,
   TabsHeader,
} from "@material-tailwind/react";
import { Head } from "@inertiajs/react";
import Dashboard from "@/Layouts/Dashboard";
import AddBlocks from "@/Components/BioLink/AddBlocks";
import LinkThemes from "@/Components/BioLink/LinkThemes";
import LinkBlocks from "@/Components/BioLink/LinkBlocks";
import LinkProfile from "@/Components/BioLink/LinkProfile";
import LinkPreview from "@/Components/BioLink/LinkPreview";
import AddSocialLinks from "@/Components/BioLink/AddSocialLinks";
import { LinkProps, PageProps, SocialLinkProps, ThemeProps } from "@/types";
import { ReactNode, useEffect, useRef } from "react";
import { jsxStyle, stringToCss } from "@/utils/utils";

interface Props extends PageProps {
   link: LinkProps;
   themes: ThemeProps[];
   itemLastPosition: number;
   socialLinks: SocialLinkProps[];
}

const AddItem = (props: Props) => {
   const { link, themes, itemLastPosition } = props;

   const blockRaf = useRef<any>();
   const settingRaf = useRef<any>();

   const refHandler = (type: string) => {
      if (blockRaf.current && settingRaf.current) {
         if (type === "block") {
            blockRaf.current.classList.add("active");
         } else {
            blockRaf.current.classList.remove("active");
         }
         if (type === "setting") {
            settingRaf.current.classList.add("active");
         } else {
            settingRaf.current.classList.remove("active");
         }
      }
   };

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

   useEffect(() => {
      if (link.custom_theme && link.custom_theme_active) {
         const theme = link.custom_theme;
         parsedStyle = jsxStyle(stringToCss(link.custom_theme.background));
         parsedStyle.color = link.custom_theme.text_color;
         parsedStyle.fontFamily = link.custom_theme.font_family;

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
   }, [link]);

   return (
      <>
         <Head title="Bio Links" />
         <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="w-full lg:col-span-7">
               <Tabs value="settings">
                  <div className="flex items-center justify-between mb-7">
                     <TabsHeader className="p-0 bg-transparent tabs-header">
                        <Tab
                           ref={settingRaf}
                           value="settings"
                           onClick={() => refHandler("setting")}
                           className="py-[7px] px-3 md:px-4 active"
                        >
                           Settings
                        </Tab>
                        <Tab
                           ref={blockRaf}
                           value="blocks"
                           onClick={() => refHandler("block")}
                           className="py-[7px] px-3 md:px-4"
                        >
                           Blocks
                        </Tab>
                     </TabsHeader>
                     <div className="flex items-center">
                        <a href={`/${link.url_name}`} target="_blank">
                           <Button
                              variant="text"
                              color="white"
                              className="py-2 px-3 md:px-4 rounded-md bg-white active:bg-white hover:bg-white font-medium text-base shadow-sm shadow-white/20 active:opacity-[0.85] capitalize text-gray-800 mr-3"
                           >
                              <span className="hidden md:block">Preview</span>
                              <span className="block md:hidden">W</span>
                           </Button>
                        </a>

                        <AddBlocks
                           link={link}
                           itemPosition={itemLastPosition}
                        />
                     </div>
                  </div>

                  <TabsBody>
                     <TabPanel value="settings" className="p-0">
                        <LinkProfile link={link} />
                        <AddSocialLinks link={link} />
                        <LinkThemes link={link} themes={themes} />
                     </TabPanel>
                     <TabPanel value="blocks" className="p-0">
                        <LinkBlocks link={link} />
                     </TabPanel>
                  </TabsBody>
               </Tabs>
            </div>

            <div className="hidden lg:block col-span-12 lg:col-span-5 relative">
               <div
                  style={parsedStyle}
                  className="h-[calc(100vh-150px)] lg:fixed lg:w-[300px] xl:w-[360px] 2xl:w-[400px] rounded-3xl border-[8px] border-gray-800 overflow-y-auto bg-cover bg-center object-contain"
               >
                  <LinkPreview link={link} buttonStyle={buttonStyle} />
               </div>
            </div>
         </div>
      </>
   );
};

AddItem.layout = (page: ReactNode) => <Dashboard children={page} />;

export default AddItem;

import icons from "../Icons";
import Input from "../Input";
import Email2 from "../Icons/Email2";
import Telephone from "../Icons/Telephone";
import Telegram from "../Icons/Telegram";
import Whatsapp from "../Icons/Whatsapp2";
import Facebook from "../Icons/Facebook";
import Messenger from "../Icons/Messenger";
import Instagram from "../Icons/Instagram";
import Twitter from "../Icons/Twitter";
import TikTok from "../Icons/TikTok";
import YouTube from "../Icons/YouTube";
import SoundCloud from "../Icons/SoundCloud";
import Linkedin from "../Icons/Linkedin";
import Spotify from "../Icons/Spotify";
import Pinterest from "../Icons/Pinterest";
import Snapchat from "../Icons/Snapchat";
import Discord from "../Icons/Discord";
import { LinkProps } from "@/types";
import { getLink } from "@/utils/utils";
import CirclePlus from "../Icons/CirclePlus";
import ColorFillDrip from "../Icons/ColorFillDrip";
import { router, useForm } from "@inertiajs/react";
import { Button, Dialog } from "@material-tailwind/react";
import { FormEventHandler, useState, Fragment } from "react";
import { socialType, socialsLinks } from "@/utils/data/socials-links";
import hideProgress from "@/utils/hideProgress";

interface Props {
   link: LinkProps;
}

const AddSocialLinks = (props: Props) => {
   const { link } = props;

   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(!open);

   const { data, setData, errors } = useForm({
      email: getLink(link, "email"),
      telephone: getLink(link, "telephone"),
      telegram: getLink(link, "telegram"),
      whatsapp: getLink(link, "whatsapp"),
      facebook: getLink(link, "facebook"),
      messenger: getLink(link, "messenger"),
      instagram: getLink(link, "instagram"),
      twitter: getLink(link, "twitter"),
      tiktok: getLink(link, "tiktok"),
      youtube: getLink(link, "youtube"),
      soundcloud: getLink(link, "soundcloud"),
      linkedin: getLink(link, "linkedin"),
      spotify: getLink(link, "spotify"),
      pinterest: getLink(link, "pinterest"),
      snapchat: getLink(link, "snapchat"),
      discord: getLink(link, "discord"),
      social_color: "#101828",
   });

   const onHandleChange = (event: any) => {
      setData(event.target.name, event.target.value);
   };

   const submit: FormEventHandler = async (e) => {
      hideProgress();
      e.preventDefault();

      const socials: any[] = [];
      Object.entries(data).forEach(([key, value]) => {
         let social = socialsLinks.find((item) => item.name === key);
         if (social && value && value.length > 0) {
            social.link = value;
            socials.push(social);
         }
      });

      router.put(
         route("customize.socials", { id: link.id }),
         {
            socials: JSON.stringify(socials),
            social_color: data.social_color,
         },
         {
            onSuccess() {
               handleOpen();
            },
         }
      );
   };

   let socials: socialType[] = [];
   if (link.socials) {
      socials = JSON.parse(link.socials);
   }

   const socialColor = link.social_color ? link.social_color : "#101828";

   return (
      <div className="card flex items-center justify-center flex-wrap gap-4 p-6 mb-7">
         {socials.map((item, ind) => {
            const Icon = icons[item.icon];

            return (
               <Fragment key={ind}>
                  {item.name === "email" ? (
                     <a href={("mailto:" + item.link) as any} className="mx-2">
                        <Icon
                           className="w-7 h-7"
                           style={{ color: socialColor }}
                        />
                     </a>
                  ) : item.name === "telephone" || item.name === "whatsapp" ? (
                     <a href={("tel:" + item.link) as any} className="mx-2">
                        <Icon
                           className="w-7 h-7"
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
                           className="w-7 h-7"
                           style={{ color: socialColor }}
                        />
                     </a>
                  )}
               </Fragment>
            );
         })}

         <CirclePlus
            onClick={handleOpen}
            className="w-8 h-8 text-blue-500 cursor-pointer mx-2"
         />

         <Dialog
            open={open}
            size="sm"
            handler={handleOpen}
            className="p-6 max-h-[calc(100vh-80px)] overflow-y-auto"
         >
            <div className="flex items-center justify-between mb-6">
               <p className="text-xl font-medium">Social Links</p>
               <span
                  onClick={handleOpen}
                  className="text-3xl leading-none cursor-pointer"
               >
                  ×
               </span>
            </div>

            <form onSubmit={submit}>
               <p className="font-medium text-sm text-gray-700">
                  Social Icons Color
               </p>
               <div className="relative mb-7">
                  <label
                     htmlFor="textColor"
                     className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                  >
                     <ColorFillDrip className="w-6 h-6 text-blue-500" />
                  </label>
                  <input
                     type="color"
                     id="textColor"
                     value={data.social_color}
                     onChange={(e) => setData("social_color", e.target.value)}
                     className="h-[48px] w-full p-0"
                  />
               </div>

               <div className="mb-4 relative">
                  <Input
                     type="text"
                     name="email"
                     className="pl-12"
                     value={data.email}
                     onChange={onHandleChange}
                     placeholder="example@gmail.com"
                     fullWidth
                  />
                  <Email2 className="absolute top-1/2 -translate-y-1/2 left-4 h-4 w-4" />
               </div>

               <div className="mb-4 relative">
                  <Input
                     type="text"
                     name="telephone"
                     className="pl-12"
                     value={data.telephone}
                     onChange={onHandleChange}
                     placeholder="+00000000000"
                     fullWidth
                  />
                  <Telephone className="absolute top-1/2 -translate-y-1/2 left-4 h-4 w-4" />
               </div>

               <div className="mb-4 relative">
                  <Input
                     type="text"
                     name="telegram"
                     className="pl-12"
                     value={data.telegram}
                     onChange={onHandleChange}
                     placeholder="https://t.me/username"
                     fullWidth
                  />
                  <Telegram className="absolute top-1/2 -translate-y-1/2 left-4 h-4 w-4" />
               </div>

               <div className="mb-4 relative">
                  <Input
                     type="text"
                     name="whatsapp"
                     className="pl-12"
                     value={data.whatsapp}
                     onChange={onHandleChange}
                     placeholder="+00000000000"
                     fullWidth
                  />
                  <Whatsapp className="absolute top-1/2 -translate-y-1/2 left-4 h-4 w-4" />
               </div>

               <div className="mb-4 relative">
                  <Input
                     type="text"
                     name="facebook"
                     className="pl-12"
                     value={data.facebook}
                     onChange={onHandleChange}
                     placeholder="https://facebook.com/username"
                     fullWidth
                  />
                  <Facebook className="absolute top-1/2 -translate-y-1/2 left-4 h-4 w-4" />
               </div>

               <div className="mb-4 relative">
                  <Input
                     type="text"
                     name="messenger"
                     className="pl-12"
                     value={data.messenger}
                     onChange={onHandleChange}
                     placeholder="https://m.me/"
                     fullWidth
                  />
                  <Messenger className="absolute top-1/2 -translate-y-1/2 left-4 h-4 w-4" />
               </div>

               <div className="mb-4 relative">
                  <Input
                     type="text"
                     name="instagram"
                     className="pl-12"
                     value={data.instagram}
                     onChange={onHandleChange}
                     placeholder="https://instagram.com/"
                     fullWidth
                  />
                  <Instagram className="absolute top-1/2 -translate-y-1/2 left-4 h-4 w-4" />
               </div>

               <div className="mb-4 relative">
                  <Input
                     type="text"
                     name="twitter"
                     className="pl-12"
                     value={data.twitter}
                     onChange={onHandleChange}
                     placeholder="https://twitter.com/"
                     fullWidth
                  />
                  <Twitter className="absolute top-1/2 -translate-y-1/2 left-4 h-4 w-4" />
               </div>

               <div className="mb-4 relative">
                  <Input
                     type="text"
                     name="tiktok"
                     className="pl-12"
                     value={data.tiktok}
                     onChange={onHandleChange}
                     placeholder="https://tiktok.com/@username"
                     fullWidth
                  />
                  <TikTok className="absolute top-1/2 -translate-y-1/2 left-4 h-4 w-4" />
               </div>

               <div className="mb-4 relative">
                  <Input
                     type="text"
                     name="youtube"
                     className="pl-12"
                     value={data.youtube}
                     onChange={onHandleChange}
                     placeholder="https://youtube.com/channel/channelid"
                     fullWidth
                  />
                  <YouTube className="absolute top-1/2 -translate-y-1/2 left-4 h-4 w-4" />
               </div>

               <div className="mb-4 relative">
                  <Input
                     type="text"
                     name="soundcloud"
                     className="pl-12"
                     value={data.soundcloud}
                     onChange={onHandleChange}
                     placeholder="https://soundcloud.com/username"
                     fullWidth
                  />
                  <SoundCloud className="absolute top-1/2 -translate-y-1/2 left-4 h-4 w-4" />
               </div>

               <div className="mb-4 relative">
                  <Input
                     type="text"
                     name="linkedin"
                     className="pl-12"
                     value={data.linkedin}
                     onChange={onHandleChange}
                     placeholder="https://linkedin.com/profle"
                     fullWidth
                  />
                  <Linkedin className="absolute top-1/2 -translate-y-1/2 left-4 h-4 w-4" />
               </div>

               <div className="mb-4 relative">
                  <Input
                     type="text"
                     name="spotify"
                     className="pl-12"
                     value={data.spotify}
                     onChange={onHandleChange}
                     placeholder="https://open.spotify.com/artist/username"
                     fullWidth
                  />
                  <Spotify className="absolute top-1/2 -translate-y-1/2 left-4 h-4 w-4" />
               </div>

               <div className="mb-4 relative">
                  <Input
                     type="text"
                     name="pinterest"
                     className="pl-12"
                     value={data.pinterest}
                     onChange={onHandleChange}
                     placeholder="https://pinterest.com/username"
                     fullWidth
                  />
                  <Pinterest className="absolute top-1/2 -translate-y-1/2 left-4 h-4 w-4" />
               </div>

               <div className="mb-4 relative">
                  <Input
                     type="text"
                     name="snapchat"
                     className="pl-12"
                     value={data.snapchat}
                     onChange={onHandleChange}
                     placeholder="https://snapchat.com/add/username"
                     fullWidth
                  />
                  <Snapchat className="absolute top-1/2 -translate-y-1/2 left-4 h-4 w-4" />
               </div>

               <div className="mb-4 relative">
                  <Input
                     type="text"
                     name="discord"
                     className="pl-12"
                     value={data.discord}
                     onChange={onHandleChange}
                     placeholder="https://discord.gg/username"
                     fullWidth
                  />
                  <Discord className="absolute top-1/2 -translate-y-1/2 left-4 h-4 w-4" />
               </div>

               <div className="flex justify-end mt-4">
                  <Button
                     color="red"
                     variant="text"
                     onClick={handleOpen}
                     className="py-2 font-medium capitalize text-base mr-2"
                  >
                     <span>Cancel</span>
                  </Button>
                  <Button
                     type="submit"
                     color="blue"
                     variant="gradient"
                     className="py-2 font-medium capitalize text-base"
                  >
                     <span>Save Changes</span>
                  </Button>
               </div>
            </form>
         </Dialog>
      </div>
   );
};

export default AddSocialLinks;

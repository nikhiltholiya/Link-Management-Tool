import {
   Menu,
   Navbar,
   Avatar,
   ListItem,
   MenuList,
   MenuItem,
   IconButton,
   MenuHandler,
} from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { PageProps } from "@/types";
import MenuIcon from "@/Components/Icons/Menu";
import Expand from "@/Components/Icons/Expand";
import { Link, router, usePage } from "@inertiajs/react";
import UserCircle from "@/Components/Icons/UserCircle";
import { setOpenSidenav, setMobileSidenav } from "@/context/AppContext";
import { useAppContext } from "@/hooks/useAppContext";
import Globe from "@/Components/Icons/Globe";
import languages from "@/utils/languages";

const DashboardNavbar = () => {
   const { props } = usePage<PageProps>();
   const { app } = props.translate;

   const user = props.auth.user;
   const [state, dispatch] = useAppContext();
   const { openSidenav, mobileSidenav } = state;
   const [isFullscreen, setIsFullscreen] = useState(false);

   const logout = async () => {
      const res = await axios.post("/logout");
      if (res.status === 200) window.location.href = "/";
   };

   const handleFullscreenToggle = () => {
      if (!isFullscreen) {
         document.documentElement.requestFullscreen();
      } else {
         document.exitFullscreen();
      }
      setIsFullscreen(!isFullscreen);
   };

   const lanSelect = (lang: string): boolean => {
      if (props.translate.locale === lang) {
         return true;
      }
      return false;
   };

   const langs = props.translate.langs.map((item: any) => {
      const lang = languages.find((lang) => lang.code === item.code);
      return { ...lang, active: item.active };
   });

   return (
      <Navbar
         fullWidth
         blurred={false}
         color="white"
         className="rounded-lg transition-all sticky top-4 md:top-5 z-40 !shadow-box px-4 py-3"
      >
         <div className="flex justify-between gap-6 md:flex-row md:items-center">
            <div className="capitalize">
               <IconButton
                  variant="text"
                  color="blue-gray"
                  className="hidden lg:block"
                  onClick={() => setOpenSidenav(dispatch, !openSidenav)}
               >
                  <MenuIcon />
               </IconButton>
               <IconButton
                  variant="text"
                  color="blue-gray"
                  className="block lg:hidden"
                  onClick={() => setMobileSidenav(dispatch, !mobileSidenav)}
               >
                  <MenuIcon />
               </IconButton>
            </div>

            <div className="flex items-center">
               <IconButton
                  onClick={handleFullscreenToggle}
                  variant="text"
                  color="blue-gray"
                  className="rounded-full"
               >
                  <Expand className="h-[22px] w-[22px]" />
               </IconButton>

               <Menu placement="bottom-end">
                  <MenuHandler>
                     <IconButton
                        variant="text"
                        color="blue-gray"
                        className="rounded-full mr-2"
                     >
                        <Globe className="h-6 w-6 text-gray-700 cursor-pointer" />
                     </IconButton>
                  </MenuHandler>

                  <MenuList className="min-w-[140px]">
                     {langs.map(
                        (lang) =>
                           lang &&
                           lang.active && (
                              <ListItem
                                 key={lang.code}
                                 selected={lanSelect(lang.code as string)}
                                 onClick={() =>
                                    router.get(`/lang/${lang.code}`)
                                 }
                                 className="py-2"
                              >
                                 {lang.name}
                              </ListItem>
                           )
                     )}
                  </MenuList>
               </Menu>

               <Menu placement="bottom-end">
                  <MenuHandler>
                     <div>
                        {user && user.image ? (
                           <Avatar
                              size="xs"
                              alt="item-1"
                              src={user.image}
                              variant="circular"
                              className="h-9 w-9 lg:mr-1 cursor-pointer"
                           />
                        ) : (
                           <UserCircle className="h-10 w-10 text-blue-gray-500 lg:m-1 cursor-pointer" />
                        )}
                     </div>
                  </MenuHandler>

                  <MenuList className="min-w-[140px]">
                     <MenuItem>
                        <a href="/">{app.home}</a>
                     </MenuItem>
                     <MenuItem>
                        <Link href="/settings">{app.profile}</Link>
                     </MenuItem>
                     <MenuItem onClick={logout}>{app.log_out}</MenuItem>
                  </MenuList>
               </Menu>
            </div>
         </div>
      </Navbar>
   );
};

export default DashboardNavbar;

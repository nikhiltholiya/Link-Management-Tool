import axios from "axios";
import { PageProps } from "@/types";
import SimpleBar from "simplebar-react";
import { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { useAppContext } from "@/hooks/useAppContext";
import LeftArrow from "@/Components/Icons/LeftArrow";
import { setMobileSidenav } from "@/context/AppContext";
import { Avatar, Button, IconButton } from "@material-tailwind/react";
import Globe from "@/Components/Icons/Globe";
import icons from "@/Components/Icons";
import routes from "@/routes";

const MobileSidebar = () => {
   const { url, props } = usePage<PageProps>();
   const { user } = props.auth;
   const { logo, title } = props.app;
   const { app } = props.translate as any;
   const [open, setOpen] = useState<string | null>(null);
   const [state, dispatch] = useAppContext();
   const { mobileSidenav, openSidenav } = state;

   const dropDown = (name: string) => {
      if (open === name) {
         return true;
      } else {
         return false;
      }
   };

   useEffect(() => {
      const path = url.split("/");
      if (path.length > 2) {
         if (path[1] === "admin") {
            const activePath = `/${path[1]}/${path[2]}`;
            setOpen(activePath);
            dropDown(activePath);
         } else {
            const activePath = `/${path[1]}`;
            setOpen(activePath);
            dropDown(activePath);
         }
      }
   }, [url]);

   const logout = async () => {
      const res = await axios.post("/logout");
      if (res.status === 200) window.location.href = "/";
   };

   const routeHandler = (route: string) => {
      if (route === "/logout") {
         logout();
      } else {
         const page =
            route === "/dashboard/current-plan"
               ? `${route}/${user.pricing_plan_id}`
               : route;

         router.get(page);
      }
   };

   const sidebarWidth = mobileSidenav
      ? "w-[240px] absolute top-0 left-0"
      : openSidenav
      ? "w-[240px]"
      : "w-[0px]";

   return (
      <section
         className={`${
            openSidenav ? "max-w-[240px]" : "max-w-[0px]"
         } inset-0 z-50 h-full w-full transition-all duration-300 relative`}
      >
         <div
            className={`${sidebarWidth} overflow-x-hidden transition-all duration-300 h-full bg-white shadow-box`}
         >
            <div className="pt-6 flex items-center justify-between">
               <a href="/" className="flex items-center gap-2 pl-4 lg:pl-5">
                  <Avatar src={logo} size="sm" />
                  <p className="block text-xl font-bold whitespace-nowrap text-gray-700">
                     {title}
                  </p>
               </a>

               {!openSidenav && (
                  <IconButton
                     variant="text"
                     color="white"
                     className="bg-gray-200 hover:bg-gray-200 active:bg-gray-200 w-6 h-9 text-gray-500 rounded-r-none"
                     onClick={() => setMobileSidenav(dispatch, !mobileSidenav)}
                  >
                     <LeftArrow />
                  </IconButton>
               )}
            </div>

            <SimpleBar style={{ height: "calc(100vh - 66px)" }}>
               <div className="m-4 lg:m-5">
                  {routes.map(({ role, pages, slug }, key) => {
                     if (
                        user.roles[0].name !== "SUPER-ADMIN" &&
                        role === "SUPER-ADMIN"
                     )
                        return;

                     return (
                        <ul key={key} className="mb-4 flex flex-col gap-3">
                           <li className="block mx-3.5 lg:mx-[18px] mt-2 mb-4">
                              <small className=" font-medium">
                                 {app[slug]}
                              </small>
                           </li>
                           {pages.map(({ icon, path, slug }) => {
                              let Icon = Globe;
                              const entries = Object.entries(icons);

                              for (const [key, value] of entries) {
                                 if (key === icon) {
                                    Icon = value;
                                 }
                              }

                              return (
                                 <li key={slug}>
                                    <Button
                                       value="text"
                                       color="white"
                                       onClick={() => routeHandler(path)}
                                       className={`px-4 py-2 shadow-none hover:shadow-none flex items-center rounded text-gray-800 hover:text-blue-500 hover:bg-blue-50 ${
                                          path === url &&
                                          "bg-blue-50 text-blue-500"
                                       }`}
                                       fullWidth
                                    >
                                       <div className="w-4">
                                          <Icon className="w-4 h-4 text-inherit" />
                                       </div>
                                       <span className="font-normal capitalize text-sm ml-3 whitespace-nowrap">
                                          {app[slug]}
                                       </span>
                                    </Button>
                                 </li>
                              );
                           })}
                        </ul>
                     );
                  })}
               </div>
            </SimpleBar>
         </div>
      </section>
   );
};

export default MobileSidebar;

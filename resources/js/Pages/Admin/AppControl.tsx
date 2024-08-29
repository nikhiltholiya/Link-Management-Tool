import axios from "axios";
import Dashboard from "@/Layouts/Dashboard";
import { Head, router } from "@inertiajs/react";
import Breadcrumb from "@/Components/Breadcrumb";
import Control from "@/Components/Icons/Control";
import { Button } from "@material-tailwind/react";
import { ReactNode, useEffect, useState } from "react";
import { Dialog } from "@material-tailwind/react";
import { PageProps } from "@/types";

interface Props extends PageProps {
   version: string;
}
interface AppVersion extends Props {
   archive: string;
   description: {};
   update_available: boolean;
}

const AppControl = (props: Props) => {
   const { version } = props;
   const { app } = props.translate;

   const [appUpdate, setAppUpdate] = useState(false);
   const [appUpdating, setAppUpdating] = useState(false);
   const [appVersion, setAppVersion] = useState<AppVersion>();

   useEffect(() => {
      axios.get("/version/check").then(({ data }) => setAppVersion(data));
   }, []);

   const appUpdateHandler = () => {
      if (appVersion?.update_available) {
         setAppUpdate(false);
         setAppUpdating(true);
         router.get("/version/update");
      }
   };

   return (
      <>
         <Head title={app.app_control} />
         <div className="mb-14 flex flex-col md:flex-row items-center gap-20">
            <div>
               <Breadcrumb Icon={Control} title="Version Control" />
               <div className="">
                  <p className="font-medium">
                     {"Current installed version: "}
                     <span className="font-normal">{version}</span>
                  </p>
                  <p className="font-medium mt-4 mb-8">
                     {"Available latest version: "}
                     <span className="font-normal">
                        {appVersion?.version ?? "..."}
                     </span>
                  </p>

                  <Button
                     color="blue"
                     variant="gradient"
                     onClick={() => setAppUpdate(true)}
                     disabled={appVersion?.update_available ? false : true}
                     className="py-2 font-medium capitalize text-base mr-6"
                  >
                     <span>{app.update_app_version}</span>
                  </Button>
               </div>

               <Dialog
                  size="xs"
                  open={appUpdate}
                  handler={() => setAppUpdate(false)}
                  className="px-6 py-10 max-h-[calc(100vh-80px)] overflow-y-auto text-gray-800"
               >
                  <h6 className="text-red-500 text-center text-xl mb-10">
                     Are you sure to update the current version?
                  </h6>
                  <div className="flex items-center justify-center">
                     <Button
                        color="red"
                        variant="gradient"
                        className="py-2 font-medium capitalize text-base mr-6"
                        onClick={() => setAppUpdate(false)}
                     >
                        <span>{app.cancel}</span>
                     </Button>
                     <Button
                        color="blue"
                        variant="gradient"
                        onClick={appUpdateHandler}
                        className="py-2 font-medium capitalize text-base"
                     >
                        <span>{app.update}</span>
                     </Button>
                  </div>
               </Dialog>

               <Dialog
                  size="xs"
                  open={appUpdating}
                  handler={() => null}
                  className="bg-transparent border-none outline-none shadow-none"
               >
                  <div className="bg-orange-50 text-gray-900 p-4 rounded-md">
                     <p className="text-justify font-medium mb-6">
                        Your app is currently undergoing an automatic update.
                        This process will take a few minutes. Please don't
                        refresh your page or don't turn off your device. Just
                        stay with this process.
                     </p>
                     <div className="relative w-full bg-gray-200 rounded-full">
                        <div className="shim-blue top-0 h-4 w-full relative overflow-hidden bg-blue-500 rounded-full"></div>
                     </div>
                  </div>
               </Dialog>
            </div>

            <div>
               <Breadcrumb Icon={Control} title="Error Monitor" />

               <div>
                  <p className="text-sm max-w-[260px] mb-8">
                     From this monitor, you will see the overall app errors,
                     warnings, issues, etc for every interaction of your app.
                  </p>

                  <a href="/admin/log-viewer" target="_blank">
                     <Button
                        color="blue"
                        variant="gradient"
                        className="py-2 font-medium capitalize text-base mr-6"
                     >
                        <span>View Logs Dashboard</span>
                     </Button>
                  </a>
               </div>
            </div>
         </div>
      </>
   );
};

AppControl.layout = (page: ReactNode) => <Dashboard children={page} />;

export default AppControl;

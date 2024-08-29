import { ReactNode } from "react";
import { ProjectProps } from "@/types";
import { Head } from "@inertiajs/react";
import Dashboard from "@/Layouts/Dashboard";
import QRcode from "@/Components/Icons/QRcode";
import Breadcrumb from "@/Components/Breadcrumb";
import QRCodeDownloader2 from "@/Components/QRCode/QRCodeDownloader2";
import DeleteByInertia from "@/Components/DeleteByInertia";
import { IconButton } from "@material-tailwind/react";
import Delete from "@/Components/Icons/Delete";

interface Props {
   project: ProjectProps;
}

const QRCodes = ({ project }: Props) => {
   return (
      <>
         <Head title={project.project_name} />
         <Breadcrumb Icon={QRcode} title={project.project_name} />

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.qrcodes.map((qrcode) => (
               <div
                  key={qrcode.id}
                  className="card rounded-md overflow-hidden relative"
               >
                  <div className="absolute top-3 right-3">
                     <QRCodeDownloader2 imageBlogData={qrcode.img_data} />
                     <DeleteByInertia
                        apiPath={route("qrcodes.destroy", { id: qrcode.id })}
                        Component={
                           <IconButton
                              color="white"
                              variant="text"
                              className="w-7 h-7 rounded-full bg-red-50 hover:bg-red-50 active:bg-red-50 text-red-500 ml-2"
                           >
                              <Delete className="h-4 w-4" />
                           </IconButton>
                        }
                     />
                  </div>
                  <img src={qrcode.img_data} alt="" className="w-full" />
               </div>
            ))}
         </div>
      </>
   );
};

QRCodes.layout = (page: ReactNode) => <Dashboard children={page} />;

export default QRCodes;

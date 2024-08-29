import Page from "@/Components/Icons/Page";
import Dashboard from "@/Layouts/Dashboard";
import { Head, Link, router } from "@inertiajs/react";
import Delete from "@/Components/Icons/Delete";
import Breadcrumb from "@/Components/Breadcrumb";
import EditFill from "@/Components/Icons/EditPen";
import { Button, Card, IconButton } from "@material-tailwind/react";
import { CustomPageProps, PageProps } from "@/types";
import { ReactNode } from "react";

interface Props extends PageProps {
   custom_pages: CustomPageProps[];
}

const Show = ({ custom_pages, translate }: Props) => {
   const { app } = translate;

   return (
      <>
         <Head title={app.custom_page} />
         <Breadcrumb Icon={Page} title={app.custom_page} />

         <Card className="!shadow-card p-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
               <Link href={route("custom-page.create")}>
                  <Button
                     type="submit"
                     color="white"
                     className="float-right capitalize bg-blue-500 text-white text-sm !rounded-lg px-5"
                  >
                     {app.create_custom_page}
                  </Button>
               </Link>
            </div>

            {custom_pages.map((item) => (
               <div
                  key={item.id}
                  className="shadow-card relative p-6 mt-10 rounded-lg border border-gray-100"
               >
                  <div className="mb-4">
                     <Link href={route("custom-page.edit", item.id)}>
                        <IconButton
                           variant="text"
                           color="white"
                           className="w-7 h-7 rounded-full bg-blue-50 hover:bg-blue-50 text-blue-500"
                        >
                           <EditFill className="h-4 w-4" />
                        </IconButton>
                     </Link>

                     <IconButton
                        variant="text"
                        color="white"
                        className="w-7 h-7 rounded-full bg-red-50 hover:bg-red-50 text-red-500 ml-3"
                        onClick={() =>
                           router.delete(route("custom-page.destroy", item.id))
                        }
                     >
                        <Delete className="h-4 w-4" />
                     </IconButton>
                  </div>

                  <p className="text18 font-medium mb-1.5">{item.name}</p>
                  <small className="text-gray-500  dark:text-gray-300">
                     {item.route}
                  </small>
               </div>
            ))}
         </Card>
      </>
   );
};

Show.layout = (page: ReactNode) => <Dashboard children={page} />;

export default Show;

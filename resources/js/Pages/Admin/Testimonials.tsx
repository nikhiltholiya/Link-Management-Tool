import { ReactNode } from "react";
import { Head } from "@inertiajs/react";
import { PageProps, TestimonialProps } from "@/types";
import Dashboard from "@/Layouts/Dashboard";
import Breadcrumb from "@/Components/Breadcrumb";
import CreateTestimonial from "@/Components/Testimonial/CreateTestimonial";
import DeleteByInertia from "@/Components/DeleteByInertia";
import { IconButton } from "@material-tailwind/react";
import Delete from "@/Components/Icons/Delete";
import Chat from "@/Components/Icons/Chat";
import EditTestimonial from "@/Components/Testimonial/EditTestimonial";

interface Props extends PageProps {
   testimonials: TestimonialProps[];
}

const Testimonials = ({ testimonials, translate }: Props) => {
   const { app } = translate;

   return (
      <>
         <Head title={app.testimonials} />
         <Breadcrumb
            Icon={Chat}
            title={app.testimonials}
            Component={<CreateTestimonial />}
         />

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item) => (
               <div
                  key={item.id}
                  className="card relative mt-14 p-6 pt-16 text-center rounded-lg border border-gray-100"
               >
                  <div className="absolute top-3 right-3">
                     <EditTestimonial testimonial={item} />

                     <DeleteByInertia
                        apiPath={route("testimonials.destroy", { id: item.id })}
                        Component={
                           <IconButton
                              color="white"
                              variant="text"
                              className="w-7 h-7 rounded-full bg-red-50 hover:bg-red-50 active:bg-red-50 text-red-500 ml-3"
                           >
                              <Delete className="h-4 w-4" />
                           </IconButton>
                        }
                     />
                  </div>
                  <img
                     src={item.thumbnail}
                     className="w-[100px] h-[100px] border-2 border-white rounded-full absolute -top-[20%] left-1/2 transform -translate-x-1/2"
                     alt="customer-img"
                  />
                  <p>{item.testimonial}</p>

                  <div className="border-t border-gray-200 my-4"></div>

                  <p className="text-blue-500 font-bold text-lg">{item.name}</p>
                  <p className="text-sm">{item.title}</p>
               </div>
            ))}
         </div>
      </>
   );
};

Testimonials.layout = (page: ReactNode) => <Dashboard children={page} />;

export default Testimonials;

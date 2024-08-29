import { ReactNode, FC } from "react";
import SimpleBar from "simplebar-react";
import { usePage } from "@inertiajs/react";
import MobileSidebar from "./MobileSidebar";
import DashboardNavbar from "./DashboardNavbar";
import { error, warning, success } from "@/utils/toast";
import { PageProps } from "@/types";

interface Props {
   children: ReactNode;
}
const Dashboard: FC<Props> = ({ children }) => {
   const { props } = usePage<PageProps>();

   if (props.flash.error) error(props.flash.error);
   if (props.flash.warning) warning(props.flash.warning);
   if (props.flash.success) success(props.flash.success);

   return (
      <main className="h-screen bg-gray-50 flex">
         <MobileSidebar />
         <SimpleBar
            style={{ height: "100vh" }}
            className="p-4 md:p-5 overflow-x-auto w-full"
         >
            <DashboardNavbar />

            <div className="py-10 container">
               {props.next_payment && (
                  <div className="p-5 text-center bg-red-50 text-red-500 rounded-lg mb-6">
                     <p>
                        Yor subscription limit is over now. Please renew your
                        subscription or update your curren subscription plan.{" "}
                        <a
                           className=" underline"
                           href={`/current-plan/selected/${props.auth.user.pricing_plan_id}?type=${props.auth.user.recurring}`}
                        >
                           Click here
                        </a>
                     </p>
                  </div>
               )}
               {children}
            </div>
         </SimpleBar>
      </main>
   );
};

export default Dashboard;

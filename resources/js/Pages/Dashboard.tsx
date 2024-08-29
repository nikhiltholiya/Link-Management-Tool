import { ReactNode } from "react";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import Link from "@/Components/Icons/Link";
import QRcode from "@/Components/Icons/QRcode";
import DashboardLayout from "@/Layouts/Dashboard";
import AreaChart from "@/Components/Charts/AreaChart";
import LineChart from "@/Components/Charts/LineChart";
import ListCheck from "@/Components/Icons/ListCheck";

interface Props extends PageProps {
   links: number;
   qrcodes: number;
   projects: number;
   analytics: number;
   page_view: number[];
   visitors: number[];
}

const Dashboard = (props: Props) => {
   const { links, qrcodes, projects, analytics, page_view, visitors } = props;
   const { app } = props.translate;

   const overview = [
      {
         Icon: Link,
         title: app.total_links,
         total: links,
      },
      {
         Icon: Link,
         title: app.link_preview,
         total: analytics,
      },
      {
         Icon: ListCheck,
         title: app.total_projects,
         total: projects,
      },
      {
         Icon: QRcode,
         title: app.total_qr_codes,
         total: qrcodes,
      },
   ];

   const lastSevenDays: string[] = [];
   for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const countDay = date.toLocaleDateString("en-US", {
         day: "2-digit",
         month: "short",
         year: "2-digit",
      });
      lastSevenDays.push(countDay);
   }

   return (
      <>
         <Head title="Dashboard" />

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-7">
            {overview.map((item, ind) => (
               <div
                  key={ind}
                  className="card p-4 flex flex-col justify-between"
               >
                  <div className="w-7 h-7 bg-blue-50 rounded flex items-center justify-center">
                     <item.Icon className="w-4 h-4 text-blue-500" />
                  </div>
                  <p className="text-gray-500 font-medium mt-1">{item.title}</p>
                  <h6 className=" font-semibold">{item.total}</h6>
               </div>
            ))}
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 mb-7">
            <div className="shadow-box bg-white rounded-lg pr-2">
               <p className="font-medium text-gray-700 py-5 pl-5 right-3">
                  {app["monthly_activities"]}
               </p>
               <AreaChart
                  height={300}
                  data={[
                     {
                        name: app["total_view"],
                        data: visitors,
                     },
                  ]}
               />
            </div>
            <div className="shadow-box bg-white rounded-lg pr-2">
               <p className="font-medium text-gray-700 py-5 pl-5 right-3">
                  {app["daily_activities"]}
               </p>
               <LineChart
                  label={lastSevenDays}
                  height={300}
                  data={[
                     {
                        name: app["total_users"],
                        data: page_view,
                     },
                  ]}
               />
            </div>
         </div>
      </>
   );
};

Dashboard.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Dashboard;

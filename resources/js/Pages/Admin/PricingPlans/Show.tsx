import {
   Tab,
   Tabs,
   Button,
   TabsBody,
   TabPanel,
   TabsHeader,
} from "@material-tailwind/react";
import { ReactNode } from "react";
import { Head, Link } from "@inertiajs/react";
import Dashboard from "@/Layouts/Dashboard";
import Breadcrumb from "@/Components/Breadcrumb";
import Pricing from "@/Components/Icons/Pricing";
import { PageProps, PlanProps } from "@/types";
import BadgeCheck from "@/Components/Icons/BadgeCheck";

interface Props extends PageProps {
   plans: PlanProps[];
}

const Show = (props: Props) => {
   const { plans } = props;
   const { app } = props.translate;

   return (
      <>
         <Head title={app.pricing_plans} />
         <Breadcrumb
            Icon={Pricing}
            title={app.pricing_plans}
            Component={
               <Link href={route("pricing-plans.create")}>
                  <Button
                     color="blue"
                     variant="gradient"
                     className="py-2.5 px-5 rounded-md font-medium capitalize text-sm hover:shadow-md"
                  >
                     {app.create_pricing_plan}
                  </Button>
               </Link>
            }
         />

         <Tabs value="monthly">
            <TabsHeader
               className="bg-transparent max-w-[200px] w-full mx-auto mt-4 mb-3"
               indicatorProps={{ className: "bg-blue-500 text-white" }}
            >
               <Tab
                  value="monthly"
                  className="py-2 transition-colors duration-300"
                  activeClassName="text-white"
               >
                  {app.monthly}
               </Tab>
               <Tab
                  value="yearly"
                  className="py-2 transition-colors duration-300"
                  activeClassName="text-white"
               >
                  {app.yearly}
               </Tab>
            </TabsHeader>
            <TabsBody>
               <TabPanel value="monthly">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                     {plans.map((plan, ind) => {
                        const features = [
                           `${plan.biolinks} ${app.biolinks_create}`,
                           `${plan.biolink_blocks} ${app.biolink_blocks_access}`,
                           `${plan.shortlinks} ${app.shortlinks_create}`,
                           `${plan.projects} ${app.projects_create}`,
                           `${plan.qrcodes} ${app.qrcodes_create}`,
                           `${plan.themes} ${app.theme_access}`,
                           plan.custom_theme
                              ? app.custom_theme_create_allow
                              : app.custom_theme_create_not_allow,
                           `${plan.support} ${app.hours_support}`,
                        ];

                        let badgeStyle = "";
                        if (plan.name === "BASIC") {
                           badgeStyle = "bg-gray-100 text-gray-900";
                        } else if (plan.name === "STANDARD") {
                           badgeStyle = "bg-blue-100 text-blue-500";
                        } else {
                           badgeStyle = "bg-green-100 text-green-500";
                        }

                        return (
                           <div key={ind} className="card group">
                              <div className="p-6 border-b-2 border-gray-300">
                                 <span
                                    className={`text-xs px-2 py-0.5 font-medium rounded-full ${badgeStyle}`}
                                 >
                                    {plan.name}
                                 </span>

                                 {plan.name === "BASIC" ? (
                                    <p className="font-medium text-gray-700 mt-3 mb-2">
                                       <span className="text-[40px] font-bold text-gray-900">
                                          Free
                                       </span>
                                    </p>
                                 ) : (
                                    <>
                                       <p className="font-medium text-gray-700 mt-3 mb-2">
                                          <span className="text-[40px] font-bold text-gray-900">
                                             {plan.monthly_price}
                                          </span>
                                          {` ${plan.currency} ${app.monthly}`}
                                       </p>
                                    </>
                                 )}

                                 <p className="text-sm text-gray-700 mt-1">
                                    {plan.name === "BASIC"
                                       ? app.basic_plan
                                       : plan.name === "STANDARD"
                                       ? app.standard_plan
                                       : app.premium_plan}
                                 </p>
                              </div>

                              <div className="p-6">
                                 {features.map((item, ind) => (
                                    <div
                                       key={ind}
                                       className="flex items-center text-gray-700 mb-4 last:mb-0"
                                    >
                                       <BadgeCheck className="w-4 h-4 mr-2 text-blue-500" />
                                       <small>{item}</small>
                                    </div>
                                 ))}

                                 <Link
                                    href={route("pricing-plans.edit", {
                                       id: plan.id,
                                    })}
                                 >
                                    <Button
                                       color="blue"
                                       variant="gradient"
                                       className="w-full mt-4 py-2.5 px-1 rounded-md font-medium capitalize text-sm hover:shadow-md"
                                    >
                                       {app.edit_plan}
                                    </Button>
                                 </Link>
                              </div>
                           </div>
                        );
                     })}
                  </div>
               </TabPanel>

               <TabPanel value="yearly">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                     {plans.map((plan, ind) => {
                        const features = [
                           `${plan.biolinks} ${app.biolinks_create}`,
                           `${plan.biolink_blocks} ${app.biolink_blocks_access}`,
                           `${plan.shortlinks} ${app.shortlinks_create}`,
                           `${plan.projects} ${app.projects_create}`,
                           `${plan.qrcodes} ${app.qrcodes_create}`,
                           `${plan.themes} ${app.theme_access}`,
                           plan.custom_theme
                              ? app.custom_theme_create_allow
                              : app.custom_theme_create_not_allow,
                           `${plan.support} ${app.hours_support}`,
                        ];

                        let badgeStyle = "";
                        if (plan.name === "BASIC") {
                           badgeStyle = "bg-gray-100 text-gray-900";
                        } else if (plan.name === "STANDARD") {
                           badgeStyle = "bg-blue-100 text-blue-500";
                        } else {
                           badgeStyle = "bg-green-100 text-green-500";
                        }

                        return (
                           <div key={ind} className="card group">
                              <div className="p-6 border-b-2 border-gray-300">
                                 <span
                                    className={`text-xs px-2 py-0.5 font-medium rounded-full ${badgeStyle}`}
                                 >
                                    {plan.name}
                                 </span>

                                 {plan.name === "BASIC" ? (
                                    <p className="font-medium text-gray-700 mt-3 mb-2">
                                       <span className="text-[40px] font-bold text-gray-900">
                                          Free
                                       </span>
                                    </p>
                                 ) : (
                                    <>
                                       <p className="font-medium text-gray-700 mt-3 mb-2">
                                          <span className="text-[40px] font-bold text-gray-900">
                                             {plan.yearly_price}
                                          </span>
                                          {` ${plan.currency} ${app.yearly}`}
                                       </p>
                                    </>
                                 )}

                                 <p className="text-sm text-gray-700 mt-1">
                                    {plan.name === "BASIC"
                                       ? app.basic_plan
                                       : plan.name === "STANDARD"
                                       ? app.standard_plan
                                       : app.premium_plan}
                                 </p>
                              </div>

                              <div className="p-6">
                                 {features.map((item, ind) => (
                                    <div
                                       key={ind}
                                       className="flex items-center text-gray-700 mb-4 last:mb-0"
                                    >
                                       <BadgeCheck className="w-4 h-4 mr-2 text-blue-500" />
                                       <small>{item}</small>
                                    </div>
                                 ))}

                                 <Link
                                    href={`/admin/pricing-plans/update/${plan.id}`}
                                 >
                                    <Button
                                       color="blue"
                                       variant="gradient"
                                       className="w-full mt-4 py-2.5 px-1 rounded-md font-medium capitalize text-sm hover:shadow-md"
                                    >
                                       {app.edit_plan}
                                    </Button>
                                 </Link>
                              </div>
                           </div>
                        );
                     })}
                  </div>
               </TabPanel>
            </TabsBody>
         </Tabs>
      </>
   );
};

Show.layout = (page: ReactNode) => <Dashboard children={page} />;

export default Show;

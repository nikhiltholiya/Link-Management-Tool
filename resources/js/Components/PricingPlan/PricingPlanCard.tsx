import { PageProps, PlanProps } from "@/types";
import BadgeCheck from "../Icons/BadgeCheck";
import { Button } from "@material-tailwind/react";
import { usePage } from "@inertiajs/react";
import BasicPlanSelect from "./BasicPlanSelect";

interface Props {
   plan: PlanProps;
   type: "Monthly" | "Yearly";
}

const PricingPlanCard = (props: Props) => {
   const page = usePage<PageProps>();
   const { plan, type } = props;
   const { auth } = page.props;
   const { app } = page.props.translate;

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
      <div className="card group">
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
                        {type === "Monthly"
                           ? plan.monthly_price
                           : plan.yearly_price}
                     </span>
                     {type === "Monthly"
                        ? ` ${plan.currency} ${app.monthly}`
                        : ` ${plan.currency} ${app.yearly}`}
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

            {auth.user.roles[0].name === "SUPER-ADMIN" ? (
               <Button
                  color="blue"
                  variant="gradient"
                  className="w-full mt-4 py-2.5 px-1 rounded-md font-medium capitalize text-sm hover:shadow-md"
               >
                  {app.update_plan}
               </Button>
            ) : (
               <>
                  {plan.name === "BASIC" ? (
                     <BasicPlanSelect id={plan.id} />
                  ) : (
                     <a
                        href={`/current-plan/selected/${plan.id}?type=${
                           type === "Monthly" ? "monthly" : "yearly"
                        }`}
                     >
                        <Button
                           color="blue"
                           variant="gradient"
                           className="w-full mt-4 py-2.5 px-1 rounded-md font-medium capitalize text-sm hover:shadow-md"
                        >
                           {app.update_plan}
                        </Button>
                     </a>
                  )}
               </>
            )}
         </div>
      </div>
   );
};

export default PricingPlanCard;

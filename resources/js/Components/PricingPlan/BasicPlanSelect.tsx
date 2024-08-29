import { useState } from "react";
import { PageProps } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { Button, Dialog } from "@material-tailwind/react";

const BasicPlanSelect = (props: { id: number }) => {
   const page = usePage<PageProps>();
   const { app } = page.props.translate;
   const [open, setOpen] = useState(false);

   const handleOpen = () => {
      setOpen((prev) => !prev);
   };

   const basicPlanHandler = () => {
      handleOpen();
      router.post(route("current-plan.basic-plan", props.id));
   };

   return (
      <>
         <Button
            color="blue"
            variant="gradient"
            onClick={handleOpen}
            className="w-full mt-4 py-2.5 px-1 rounded-md font-medium capitalize text-sm hover:shadow-md"
         >
            {app.update_plan}
         </Button>

         <Dialog
            size="xs"
            open={open}
            handler={handleOpen}
            className="px-6 py-10 max-h-[calc(100vh-80px)] overflow-y-auto text-gray-800"
         >
            <h6 className="text-red-500 text-center text-xl mb-10">
               Are you sure to change your current pricing plan to the basic
               plan?
            </h6>
            <div className="flex items-center justify-center">
               <Button
                  color="blue"
                  variant="gradient"
                  onClick={handleOpen}
                  className="py-2 font-medium capitalize text-base mr-6"
               >
                  <span>{app.cancel}</span>
               </Button>
               <Button
                  color="red"
                  variant="gradient"
                  className="py-2 font-medium capitalize text-base"
                  onClick={basicPlanHandler}
               >
                  <span>{app.submit}</span>
               </Button>
            </div>
         </Dialog>
      </>
   );
};

export default BasicPlanSelect;

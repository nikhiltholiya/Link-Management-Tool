import { useState } from "react";
import { router } from "@inertiajs/react";
import { Button, Dialog } from "@material-tailwind/react";

interface Props {
   apiPath: string;
   Component: any;
}

const DeleteByInertia = (props: Props) => {
   const { apiPath, Component } = props;
   const [open, setOpen] = useState(false);

   const handleOpen = () => {
      setOpen((prev) => !prev);
   };

   const modifiedComponent = (
      <Component.type {...Component.props} onClick={handleOpen} />
   );

   const deleteHandler = () => {
      handleOpen();
      router.delete(apiPath);
   };

   return (
      <>
         {modifiedComponent}

         <Dialog
            size="xs"
            open={open}
            handler={handleOpen}
            className="px-6 py-10 max-h-[calc(100vh-80px)] overflow-y-auto text-gray-800"
         >
            <h6 className="text-red-500 text-center text-xl mb-10">
               Are you sure to delete?
            </h6>
            <div className="flex items-center justify-center">
               <Button
                  color="blue"
                  variant="gradient"
                  onClick={handleOpen}
                  className="py-2 font-medium capitalize text-base mr-6"
               >
                  <span>Cancel</span>
               </Button>
               <Button
                  color="red"
                  variant="gradient"
                  className="py-2 font-medium capitalize text-base"
                  onClick={deleteHandler}
               >
                  <span>Delete</span>
               </Button>
            </div>
         </Dialog>
      </>
   );
};

export default DeleteByInertia;

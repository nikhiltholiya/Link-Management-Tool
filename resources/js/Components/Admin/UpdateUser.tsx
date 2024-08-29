import EditPen from "../Icons/EditPen";
import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import { PageProps, UserProps } from "@/types";
import { Button, Dialog, IconButton } from "@material-tailwind/react";
import InputDropdown from "../InputDropdown";

interface Props {
   user: UserProps;
}

const UpdateUser = (props: Props) => {
   const { user } = props;
   const page = usePage<PageProps>();
   const { app, input } = page.props.translate;
   const [open, setOpen] = useState(false);
   const [statusError, setStatusError] = useState<string | null>(null);

   const handleOpen = () => {
      setOpen((prev) => !prev);
   };

   const { put, setData } = useForm({
      status: user.status,
   });

   const submit: FormEventHandler = async (e) => {
      e.preventDefault();
      setStatusError(null);

      put(route("users.update", { id: user.id }), {
         onSuccess() {
            handleOpen();
         },
      });
   };

   return (
      <>
         <IconButton
            variant="text"
            color="white"
            onClick={handleOpen}
            className="w-7 h-7 rounded-full bg-blue-50 hover:bg-blue-50 active:bg-blue-50 text-blue-500"
         >
            <EditPen className="h-4 w-4" />
         </IconButton>

         <Dialog
            size="sm"
            open={open}
            handler={handleOpen}
            className="p-6 max-h-[calc(100vh-80px)] overflow-y-auto text-gray-800"
         >
            <div className="flex items-center justify-between mb-6">
               <p className="text-xl font-medium">{app.update_user}</p>
               <span
                  onClick={handleOpen}
                  className="text-3xl leading-none cursor-pointer"
               >
                  ×
               </span>
            </div>

            <form onSubmit={submit}>
               <InputDropdown
                  required
                  fullWidth
                  name="status"
                  error={statusError as string}
                  defaultValue={user.status}
                  itemList={[
                     { key: "Active", value: "active" },
                     { key: "Deactive", value: "deactive" },
                  ]}
                  onChange={(e: any) => setData("status", e.value)}
                  label={input.user_status}
               />

               <div className="flex justify-end mt-8">
                  <Button
                     color="red"
                     variant="text"
                     onClick={handleOpen}
                     className="py-2 font-medium capitalize text-base mr-2"
                  >
                     <span>{app.cancel}</span>
                  </Button>
                  <Button
                     type="submit"
                     color="blue"
                     variant="gradient"
                     className="py-2 font-medium capitalize text-base"
                  >
                     <span>{app.save_changes}</span>
                  </Button>
               </div>
            </form>
         </Dialog>
      </>
   );
};

export default UpdateUser;

import EditPen from "@/Components/Icons/EditPen";
import { PageProps, ThemeProps } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import { Button, Dialog, IconButton } from "@material-tailwind/react";
import InputDropdown from "@/Components/InputDropdown";

interface Props {
   theme: ThemeProps;
}

const ThemeUpdate = (props: Props) => {
   const page = usePage<PageProps>();
   const { app, input } = page.props.translate;
   const [open, setOpen] = useState(false);
   const handleOpen = () => {
      setOpen((prev) => !prev);
   };

   const { data, setData, put, errors } = useForm({
      type: props.theme.type,
   });

   const submit: FormEventHandler = async (e) => {
      handleOpen();
      e.preventDefault();

      put(route("manage-themes.type", { id: props.theme.id }));
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
               <p className="text-xl font-medium">{app.update_theme}</p>
               <span
                  onClick={handleOpen}
                  className="text-3xl leading-none cursor-pointer"
               >
                  ×
               </span>
            </div>

            <form onSubmit={submit}>
               <div className="mb-4">
                  <InputDropdown
                     fullWidth
                     name="type"
                     label={input.theme_type}
                     error={errors.type}
                     defaultValue={data.type}
                     onChange={(e: any) => setData("type", e.value)}
                     itemList={[
                        { key: "Free", value: "Free" },
                        { key: "Standard", value: "Standard" },
                        { key: "Premium", value: "Premium" },
                     ]}
                  />
               </div>

               <div className="flex justify-end pt-4">
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

export default ThemeUpdate;

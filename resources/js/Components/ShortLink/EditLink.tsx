import Input from "../Input";
import EditPen from "../Icons/EditPen";
import { LinkProps, PageProps } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import { Button, Dialog, IconButton } from "@material-tailwind/react";

interface Props {
   link: LinkProps;
}

const EditLink = (props: Props) => {
   const page = usePage<PageProps>();
   const { app, input } = page.props.translate;
   const { link } = props;
   const [open, setOpen] = useState(false);

   const handleOpen = () => {
      setOpen((prev) => !prev);
   };

   const { put, data, setData, errors } = useForm({
      link_name: link.link_name,
      link_type: "shortlink",
      external_url: link.external_url || "",
   });

   const onHandleChange = (event: any) => {
      setData(event.target.name, event.target.value);
   };

   const submit: FormEventHandler = async (e) => {
      e.preventDefault();

      put(route("short-links.update", { id: link.id }), {
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
               <p className="text-xl font-medium">{app.update_link}</p>
               <span
                  onClick={handleOpen}
                  className="text-3xl leading-none cursor-pointer"
               >
                  ×
               </span>
            </div>

            <form onSubmit={submit}>
               <div className="mb-4">
                  <Input
                     type="text"
                     name="link_name"
                     label={input.short_link_name}
                     value={data.link_name}
                     error={errors.link_name}
                     onChange={onHandleChange}
                     placeholder={input.short_link_name_placeholder}
                     fullWidth
                     required
                  />
               </div>
               <div className="mb-4">
                  <Input
                     type="url"
                     name="external_url"
                     label={input.external_url}
                     value={data.external_url}
                     error={errors.external_url}
                     onChange={onHandleChange}
                     placeholder={input.external_url_placeholder}
                     fullWidth
                     required
                  />
               </div>

               <div className="flex justify-end mt-4">
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

export default EditLink;

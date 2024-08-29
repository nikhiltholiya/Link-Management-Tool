import Input from "@/Components/Input";
import { LinkProps, PageProps } from "@/types";
import EditPen from "@/Components/Icons/EditPen";
import { FormEventHandler, useState } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import { Button, Dialog, IconButton } from "@material-tailwind/react";

interface Props {
   link: LinkProps;
}

const EditLink = (props: Props) => {
   const page = usePage<PageProps>();

   const { link } = props;
   const { app, input } = page.props.translate;
   const [open, setOpen] = useState(false);

   const handleOpen = () => {
      setOpen((prev) => !prev);
   };

   const { put, data, errors, setData } = useForm({
      link_name: link.link_name,
      link_type: "biolink",
      url_name: link.url_name,
      new_url: false,
   });

   const onHandleChange = (event: any) => {
      setData(event.target.name, event.target.value);
   };

   const newUrlHandler = (event: any) => {
      if (event.target.value === link.url_name) {
         setData("new_url", false);
      } else {
         setData("new_url", true);
      }
   };

   const submit: FormEventHandler = async (e) => {
      e.preventDefault();

      put(route("bio-links.update", { id: link.id }), {
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
                     label={input.bio_link_name}
                     value={data.link_name}
                     error={errors.link_name}
                     onChange={onHandleChange}
                     placeholder={input.bio_link_name_placeholder}
                     fullWidth
                     required
                  />
               </div>
               <div className="mb-4">
                  <Input
                     type="text"
                     name="url_name"
                     label={input.link_username}
                     value={data.url_name}
                     error={errors.url_name}
                     onBlur={newUrlHandler}
                     onChange={onHandleChange}
                     placeholder={input.link_username_placeholder}
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

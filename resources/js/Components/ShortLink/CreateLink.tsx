import Input from "../Input";
import { PageProps } from "@/types";
import { Button, Dialog } from "@material-tailwind/react";
import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";

const CreateLink = () => {
   const { props } = usePage<PageProps>();
   const { app, input } = props.translate;
   const [open, setOpen] = useState(false);

   const handleOpen = () => {
      setOpen((prev) => !prev);
   };

   const { data, setData, post, errors, reset, clearErrors } = useForm({
      link_name: "",
      link_slug: "",
      external_url: "",
      link_type: "shortlink",
   });

   const onHandleChange = (event: any) => {
      setData(event.target.name, event.target.value);
   };

   const submit: FormEventHandler = async (e) => {
      clearErrors();
      e.preventDefault();

      post(route("short-links.store"), {
         onSuccess() {
            reset();
            handleOpen();
         },
      });
   };

   return (
      <>
         <Button
            color="blue"
            variant="gradient"
            onClick={handleOpen}
            className="py-2.5 px-5 rounded-md font-medium capitalize text-sm hover:shadow-md flex"
         >
            {app.create_link}
         </Button>

         <Dialog
            size="sm"
            open={open}
            handler={handleOpen}
            className="p-6 max-h-[calc(100vh-80px)] overflow-y-auto text-gray-800"
         >
            <div className="flex items-center justify-between mb-6">
               <p className="text-xl font-medium">{app.create_link}</p>
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
                     type="text"
                     name="link_slug"
                     label={input.short_link_slug}
                     value={data.link_slug}
                     error={errors.link_slug}
                     onChange={onHandleChange}
                     placeholder={input.short_link_slug_placeholder}
                     fullWidth
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

export default CreateLink;

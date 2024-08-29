import Input from "../Input";
import { PageProps } from "@/types";
import { FormEventHandler, useState } from "react";
import { Button, Dialog } from "@material-tailwind/react";
import { useForm, usePage } from "@inertiajs/react";

const CreateProject = () => {
   const { props } = usePage<PageProps>();
   const { app, input } = props.translate;
   const [open, setOpen] = useState(false);

   const handleOpen = () => {
      setOpen((prev) => !prev);
   };

   const { data, setData, post, errors, reset, clearErrors } = useForm({
      user_id: props.auth.user.id,
      project_name: "",
   });

   const onHandleChange = (event: any) => {
      setData(event.target.name, event.target.value);
   };

   const submit: FormEventHandler = async (e) => {
      clearErrors();
      e.preventDefault();

      post(route("projects.store"), {
         onSuccess() {
            reset();
            handleOpen();
         },
      });
   };

   return (
      <>
         <Button
            variant="text"
            color="white"
            onClick={handleOpen}
            className="py-2 px-5 rounded-md bg-blue-500 active:bg-blue-500 hover:bg-blue-500 font-medium text-base shadow-md hover:shadow-lg hover:shadow-blue-500/40 shadow-blue-500/20 transition-all active:opacity-[0.85] capitalize"
         >
            {app.create_project}
         </Button>

         <Dialog
            size="sm"
            open={open}
            handler={handleOpen}
            className="p-6 max-h-[calc(100vh-80px)] overflow-y-auto text-gray-800"
         >
            <div className="flex items-center justify-between mb-6">
               <p className="text-xl font-medium">{app.create_project}</p>
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
                     name="project_name"
                     label={input.project_name}
                     value={data.project_name}
                     error={errors.project_name}
                     onChange={onHandleChange}
                     placeholder={input.project_name_placeholder}
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
                     <span>{app.create}</span>
                  </Button>
               </div>
            </form>
         </Dialog>
      </>
   );
};

export default CreateProject;

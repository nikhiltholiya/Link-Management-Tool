import Input from "../Input";
import EditPen from "../Icons/EditPen";
import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import { PageProps, ProjectProps } from "@/types";
import { Button, Dialog, IconButton } from "@material-tailwind/react";

interface Props {
   project: ProjectProps;
}

const EditProject = (props: Props) => {
   const page = usePage<PageProps>();
   const { app, input } = page.props.translate;
   const { project } = props;
   const [open, setOpen] = useState(false);

   const handleOpen = () => {
      setOpen((prev) => !prev);
   };

   const { put, data, errors, setData } = useForm({
      project_name: project.project_name,
   });

   const onHandleChange = (event: any) => {
      setData(event.target.name, event.target.value);
   };

   const submit: FormEventHandler = async (e) => {
      e.preventDefault();

      put(route("projects.update", { id: project.id }), {
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
               <p className="text-xl font-medium">{app.update_project}</p>
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
                     onChange={onHandleChange}
                     placeholder={input.project_name_placeholder}
                     error={errors.project_name}
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

export default EditProject;
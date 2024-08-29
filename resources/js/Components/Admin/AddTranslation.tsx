import { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { Button, Dialog } from "@material-tailwind/react";
import InputDropdown from "../InputDropdown";
import languages from "@/utils/languages";
import { PageProps } from "@/types";

const AddTranslation = () => {
   const { props } = usePage<PageProps>();
   const { app, input } = props.translate;
   const [open, setOpen] = useState(false);

   const handleOpen = () => {
      setOpen((prev) => !prev);
   };

   const { data, setData, post, errors, clearErrors } = useForm({
      local: "af",
   });

   const submit = (e: React.FormEvent) => {
      e.preventDefault();
      clearErrors();
      post("/lang/add");
   };

   const langs = languages.map((lang) => {
      return { key: lang.name, value: lang.code };
   });

   return (
      <>
         <Button
            color="blue"
            variant="gradient"
            onClick={handleOpen}
            className="py-2.5 px-5 rounded-md font-medium capitalize text-sm hover:shadow-md flex"
         >
            {app.add_languages}
         </Button>

         <Dialog
            size="sm"
            open={open}
            handler={handleOpen}
            className="p-6 max-h-[calc(100vh-80px)] overflow-y-auto text-gray-800"
         >
            <div className="flex items-center justify-between mb-6">
               <p className="text-xl font-medium">{app.add_languages}</p>
               <span
                  onClick={handleOpen}
                  className="text-3xl leading-none cursor-pointer"
               >
                  ×
               </span>
            </div>

            <form
               onSubmit={submit}
               className="h-full flex flex-col justify-between"
            >
               <InputDropdown
                  required
                  fullWidth
                  name="local"
                  defaultValue={data.local}
                  itemList={langs}
                  onChange={(e: any) => setData("local", e.value)}
                  label={input.user_status}
               />

               <div className="flex justify-end mt-[200px]">
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

export default AddTranslation;

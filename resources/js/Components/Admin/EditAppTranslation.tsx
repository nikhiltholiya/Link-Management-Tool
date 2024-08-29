import Input from "@/Components/Input";
import { useForm } from "@inertiajs/react";
import { ChangeEvent, FormEvent } from "react";
import { Button } from "@material-tailwind/react";

interface Props {
   app: any;
   local: string;
}

const EditAppTranslation = ({ app, local }: Props) => {
   const { data, setData, put } = useForm(app);

   const onHandleChange = (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => {
      const target = event.target as HTMLInputElement;
      setData({
         ...data,
         [target.name]: target.value,
      });
   };

   const submit = (e: FormEvent) => {
      e.preventDefault();
      put(`/lang/update/${local}/app`);
   };

   return (
      <div className="card max-w-[800px] w-full mx-auto p-6 mb-8">
         <p className="text-lg font-bold text-gray-900 border-b border-b-gray-200 mb-4 pb-2">
            {app.app_translation}
         </p>
         <form onSubmit={submit} className="flex flex-col gap-6">
            {Object.entries(app).map(([key, value]) => {
               return (
                  <Input
                     fullWidth
                     type="text"
                     name={key}
                     placeholder="Translate by your language"
                     onChange={onHandleChange}
                     label={value as string}
                     value={data[key]}
                  />
               );
            })}

            <Button
               type="submit"
               color="blue"
               variant="gradient"
               className="py-2.5 px-5 rounded-md font-medium capitalize text-sm hover:shadow-md"
            >
               {app.save_changes}
            </Button>
         </form>
      </div>
   );
};

export default EditAppTranslation;

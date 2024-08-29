import { PageProps } from "@/types";
import Input from "@/Components/Input";
import { useForm, usePage } from "@inertiajs/react";
import { Button } from "@material-tailwind/react";
import { FormEventHandler } from "react";

const ChangeEmail = () => {
   const { props } = usePage<PageProps>();
   const { email } = props.auth.user;
   const { app, input } = props.translate;

   const { data, setData, post, errors, clearErrors } = useForm({
      current_email: email,
      new_email: "",
   });

   const onHandleChange = (event: any) => {
      setData(event.target.name, event.target.value);
   };

   const submit: FormEventHandler = (e) => {
      e.preventDefault();
      clearErrors();
      post(route("change.email"));
   };

   return (
      <div className="card max-w-[1000px] w-full mx-auto">
         <div className="px-7 pt-7 pb-4 border-b border-b-gray-200">
            <p className="text18 font-bold text-gray-900">{app.change_email}</p>
         </div>
         <form onSubmit={submit} className="p-7">
            <div className="mb-7">
               <Input
                  fullWidth
                  type="email"
                  name="current_email"
                  value={data.current_email}
                  error={errors.current_email}
                  placeholder={input.current_email_placeholder}
                  onChange={onHandleChange}
                  label={input.current_email}
                  flexLabel
                  required
               />
            </div>

            <div className="mb-7">
               <Input
                  fullWidth
                  type="email"
                  name="new_email"
                  value={data.new_email}
                  error={errors.new_email}
                  placeholder={input.new_email_placeholder}
                  onChange={onHandleChange}
                  label={input.new_email}
                  flexLabel
                  required
               />
            </div>

            <div className="flex items-center mt-6 md:pl-[164px]">
               <Button
                  type="submit"
                  color="blue"
                  variant="gradient"
                  className="py-2.5 px-5 rounded-md font-medium capitalize text-sm hover:shadow-md"
               >
                  {app.email_change_link}
               </Button>
            </div>
         </form>
      </div>
   );
};

export default ChangeEmail;

import React from "react";
import Input from "@/Components/Input";
import { useForm, usePage } from "@inertiajs/react";
import { Button } from "@material-tailwind/react";
import Switch from "@/Components/Switch";
import { PageProps, SocialLoginProps } from "@/types";

const GoogleAuthSettings = (props: { google: SocialLoginProps }) => {
   const page = usePage<PageProps>();
   const { app, input } = page.props.translate;
   const { active, client_id, client_secret, redirect_url } = props.google;

   const { data, setData, patch, errors, clearErrors } = useForm({
      active: Boolean(active),
      client_id: client_id,
      client_secret: client_secret,
      redirect_url: redirect_url,
   });

   const onHandleChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => {
      const target = event.target as HTMLInputElement;

      setData({
         ...data,
         [target.name]:
            target.type === "checkbox" ? target.checked : target.value,
      });
   };

   const submit = (e: React.FormEvent) => {
      e.preventDefault();
      clearErrors();

      patch(route("settings.google"));
   };

   return (
      <div className="card max-w-[1000px] w-full mx-auto my-7">
         <div className="px-7 pt-7 pb-4 border-b border-b-gray-200">
            <p className="text18 font-bold text-gray-900">
               {app.google_auth_settings}
            </p>
         </div>

         <form onSubmit={submit} className="p-7">
            <div className="mb-7 md:pl-[164px]">
               <Switch
                  switchId="google"
                  name="active"
                  label={input.allow_google_login}
                  onChange={onHandleChange}
                  defaultChecked={data.active}
               />
            </div>

            <div className="mb-7">
               <Input
                  fullWidth
                  type="password"
                  name="client_id"
                  value={data.client_id}
                  error={errors.client_id}
                  placeholder={input.google_client_id_placeholder}
                  onChange={onHandleChange}
                  label={input.google_client_id}
                  flexLabel
                  required
               />
            </div>

            <div className="mb-7">
               <Input
                  fullWidth
                  type="password"
                  name="client_secret"
                  value={data.client_secret}
                  error={errors.client_secret}
                  placeholder={input.google_client_secret_placeholder}
                  onChange={onHandleChange}
                  label={input.google_client_secret}
                  flexLabel
                  required
               />
            </div>

            <div className="mb-7">
               <Input
                  type="text"
                  fullWidth
                  name="redirect_url"
                  value={data.redirect_url}
                  error={errors.redirect_url}
                  placeholder={input.google_redirect_url_placeholder}
                  onChange={onHandleChange}
                  label={input.google_redirect_url}
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
                  {app.save_changes}
               </Button>
            </div>
         </form>
      </div>
   );
};

export default GoogleAuthSettings;

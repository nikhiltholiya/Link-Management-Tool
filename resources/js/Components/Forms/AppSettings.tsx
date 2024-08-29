import Input from "@/Components/Input";
import { useForm, usePage } from "@inertiajs/react";
import { useState, ChangeEvent, FormEvent } from "react";
import { Avatar, Button } from "@material-tailwind/react";
import UserCircle from "@/Components/Icons/UserCircle";
import { AppSettingProps, PageProps } from "@/types";
import TextArea from "../TextArea";

const AppSettings = (props: { app: AppSettingProps }) => {
   const page = usePage<PageProps>();
   const { app, input } = page.props.translate;

   const { title, logo, description, copyright } = props.app;
   const [imageUrl, setImageUrl] = useState(logo === "/null" ? null : logo);

   const { data, setData, post, errors, clearErrors } = useForm({
      title,
      logo: null,
      description,
      copyright,
   });

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
      clearErrors();
      post(route("settings.app"));
   };

   const handleImageChange = (e: any) => {
      const files = e.target.files;
      if (files && files[0]) {
         setData("logo", files[0]);
         setImageUrl(URL.createObjectURL(files[0]));
      }
   };

   return (
      <div className="card max-w-[1000px] w-full mx-auto">
         <div className="px-7 pt-7 pb-4 border-b border-b-gray-200">
            <p className="text18 font-bold text-gray-900">
               {app.global_settings}
            </p>
         </div>

         <form onSubmit={submit} className="p-7">
            <div className="grid grid-cols-1 gap-7">
               <div className="flex flex-col md:flex-row">
                  <p className="max-w-[164px] w-full font-medium text-gray-500 mb-1">
                     {input.app_logo}
                  </p>
                  <div>
                     {imageUrl ? (
                        <Avatar
                           src={imageUrl}
                           alt="item-1"
                           size="xs"
                           variant="circular"
                           className="h-[100px] w-[100px]"
                        />
                     ) : (
                        <UserCircle className="h-[100px] w-[100px] text-blue-gray-500" />
                     )}
                     <div className="mt-1 flex items-center">
                        <label
                           htmlFor="formFileSm"
                           className="text12 font-medium text-gray-900 px-2.5 py-1.5 border border-gray-700 bg-gray-100 whitespace-nowrap"
                        >
                           Choose Photo
                        </label>
                        <input
                           hidden
                           id="formFileSm"
                           type="file"
                           onChange={handleImageChange}
                        />
                        <small className="ml-3 text-gray-500">
                           JPG, JPEG, PNG, SVG File, Maximum 2MB
                        </small>
                     </div>
                     {errors.logo && (
                        <p className="text-sm text-red-500 mt-1">
                           {errors.logo}
                        </p>
                     )}
                  </div>
               </div>
               <Input
                  required
                  flexLabel
                  fullWidth
                  type="text"
                  name="title"
                  label={input.app_title}
                  value={data.title}
                  error={errors.title}
                  onChange={onHandleChange}
                  placeholder={input.app_title_placeholder}
               />

               <Input
                  type="text"
                  name="copyright"
                  label={input.app_copyright}
                  value={data.copyright}
                  error={errors.copyright}
                  onChange={onHandleChange}
                  placeholder={input.app_copyright_placeholder}
                  fullWidth
                  flexLabel
                  required
               />

               <TextArea
                  rows={3}
                  cols={10}
                  name="description"
                  label={input.app_description}
                  value={data.description}
                  error={errors.description}
                  onChange={onHandleChange}
                  placeholder={input.app_description_placeholder}
                  fullWidth
                  flexLabel
                  required
               />
            </div>

            <div className="flex items-center mt-7 md:pl-[164px]">
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

export default AppSettings;

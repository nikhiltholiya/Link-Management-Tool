import Input from "../Input";
import { FormEventHandler, useEffect, useState } from "react";
import { Avatar, Button, Dialog } from "@material-tailwind/react";
import { useForm, usePage } from "@inertiajs/react";
import UserCircle from "../Icons/UserCircle";
import TextArea from "../TextArea";
import { PageProps } from "@/types";

const CreateTestimonial = () => {
   const { props } = usePage<PageProps>();
   const { app, input } = props.translate;
   const [open, setOpen] = useState(false);
   const [imageUrl, setImageUrl] = useState<any>();

   const handleOpen = () => {
      setOpen((prev) => !prev);
   };

   const { data, setData, post, errors, wasSuccessful, clearErrors } = useForm({
      name: "",
      title: "",
      testimonial: "",
      thumbnail: null,
   });

   const onHandleChange = (event: any) => {
      setData(event.target.name, event.target.value);
   };

   const submit: FormEventHandler = async (e) => {
      clearErrors();
      e.preventDefault();

      post(route("testimonials.store"));
   };

   const handleImageChange = (e: any) => {
      const files = e.target.files;
      if (files && files[0]) {
         setData("thumbnail", files[0]);
         setImageUrl(URL.createObjectURL(files[0]));
      }
   };

   useEffect(() => {
      if (wasSuccessful) {
         handleOpen();
      }
   }, [wasSuccessful]);

   return (
      <>
         <Button
            color="blue"
            variant="gradient"
            onClick={handleOpen}
            className="py-2.5 px-5 rounded-md font-medium capitalize text-sm hover:shadow-md"
         >
            {app.create_testimonials}
         </Button>

         <Dialog
            size="sm"
            open={open}
            handler={handleOpen}
            className="p-6 max-h-[calc(100vh-80px)] overflow-y-auto text-gray-800"
         >
            <div className="flex items-center justify-between mb-6">
               <p className="text-xl font-medium">{app.create_testimonials}</p>
               <span
                  onClick={handleOpen}
                  className="text-3xl leading-none cursor-pointer"
               >
                  ×
               </span>
            </div>

            <form onSubmit={submit}>
               <div className="flex flex-col items-center mb-4">
                  {imageUrl ? (
                     <Avatar
                        size="xs"
                        alt="item-1"
                        src={imageUrl}
                        variant="circular"
                        className="h-[120px] w-[120px]"
                     />
                  ) : (
                     <UserCircle className="h-[120px] w-[120px] text-blue-gray-500" />
                  )}
                  <div className="mt-4 flex items-center">
                     <label
                        htmlFor="formFileSm"
                        className="text-sm font-medium text-gray-900 px-2.5 py-1.5 border border-gray-700 bg-gray-100 whitespace-nowrap"
                     >
                        Choose Photo
                     </label>
                     <input
                        hidden
                        required
                        type="file"
                        onChange={handleImageChange}
                        id="formFileSm"
                     />
                  </div>
                  <small className="text-gray-500 py-4">
                     JPG, JPEG, PNG, SVG File, Maximum 2MB
                  </small>
                  {errors.thumbnail && (
                     <p className="text-sm text-red-500">{errors.thumbnail}</p>
                  )}
               </div>

               <div className="mb-4">
                  <Input
                     type="text"
                     name="name"
                     label={input.name}
                     value={data.name}
                     error={errors.name}
                     onChange={onHandleChange}
                     placeholder={input.full_name_placeholder}
                     fullWidth
                     required
                  />
               </div>
               <div className="mb-4">
                  <Input
                     type="text"
                     name="title"
                     label={input.description}
                     value={data.title}
                     error={errors.title}
                     onChange={onHandleChange}
                     placeholder={input.description_placeholder}
                     fullWidth
                     required
                  />
               </div>
               <div className="mb-4">
                  <TextArea
                     rows={3}
                     cols={10}
                     name="testimonial"
                     label={input.testimonial}
                     value={data.testimonial}
                     error={errors.testimonial}
                     onChange={onHandleChange}
                     placeholder={input.testimonial_placeholder}
                     maxLength={180}
                     fullWidth
                     required
                  />
               </div>

               <div className="flex justify-end pt-4">
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

export default CreateTestimonial;

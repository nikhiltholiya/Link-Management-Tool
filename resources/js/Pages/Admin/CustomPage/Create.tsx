import { useState } from "react";
import "katex/dist/katex.min.css";
import "react-quill/dist/quill.snow.css";
import Page from "@/Components/Icons/Page";
import Dashboard from "@/Layouts/Dashboard";
import Breadcrumb from "@/Components/Breadcrumb";
import Input from "@/Components/Input";
import { Head, useForm } from "@inertiajs/react";
import { Button, Card } from "@material-tailwind/react";
import ReactQuill from "react-quill";
import { formats } from "@/utils/utils";
import CustomToolbar from "@/Components/CustomToolbar";
import katex from "katex";
import { PageProps } from "@/types";
window.katex = katex;

const Create = (props: PageProps) => {
   const { app, input } = props.translate;
   const [validRoute, setValidRoute] = useState(true);
   const modules = { toolbar: { container: "#toolbar" } };

   const { data, setData, post, errors, clearErrors } = useForm({
      name: "",
      route: "",
      content: "",
   });

   const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      if (name === "route") {
         setData(name, value);

         if (value.length > 0) {
            // Input validation for characters and hyphen
            const regex = /^[a-z]+(-[a-z]+)*$/;
            const isValidInput = regex.test(value);

            setValidRoute(isValidInput);
         } else {
            setValidRoute(true);
         }
      } else {
         setData(name as "name" | "content", value);
      }
   };

   const submit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (validRoute) {
         clearErrors();
         post(route("custom-page.store"));
      }
   };

   return (
      <>
         <Head title={app.create_custom_page} />
         <Breadcrumb Icon={Page} title={app.create_custom_page} />

         <Card className="max-w-[1200px] w-full mx-auto">
            <div className="px-7 pt-7 pb-4 border-b border-b-gray-200">
               <p className="text18 font-bold text-gray-900">
                  {app.create_custom_page}
               </p>
            </div>
            <form onSubmit={submit} className="p-7">
               <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Input
                     type="text"
                     fullWidth
                     name="name"
                     value={data.name}
                     error={errors.name}
                     placeholder={input.full_name_placeholder}
                     onChange={onHandleChange}
                     label={input.full_name}
                     required
                  />

                  <Input
                     type="text"
                     fullWidth
                     name="route"
                     value={data.route}
                     error={
                        errors.route ?? !validRoute
                           ? "Route should be characters and you can use hyphen(-) for separation"
                           : ""
                     }
                     placeholder={input.page_route_placeholder}
                     onChange={onHandleChange}
                     label={input.page_route}
                     required
                  />
               </div>

               <div>
                  <small className="w-full mb-1 whitespace-nowrap flex items-center font-medium text-gray-500">
                     <span className="mr-1">{input.page_content}</span>
                     <span className="block text-red-500">*</span>
                  </small>
                  <div className="border border-gray-300 rounded-md">
                     <CustomToolbar />
                     <ReactQuill
                        modules={modules}
                        formats={formats}
                        value={data.content}
                        onChange={(html) => setData("content", html)}
                        className="page-create border-0"
                     />
                  </div>
               </div>

               <Button
                  type="submit"
                  variant="text"
                  color="white"
                  disabled={!validRoute}
                  className="mt-10 text-sm bg-blue-500 hover:bg-blue-500 active:bg-blue-500 font-medium capitalize rounded-md"
               >
                  {app.create_custom_page}
               </Button>
            </form>
         </Card>
      </>
   );
};

Create.layout = (page: React.ReactNode) => <Dashboard children={page} />;

export default Create;

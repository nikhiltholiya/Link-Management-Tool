import { ReactNode } from "react";
import { PageProps } from "@/types";
import Switch from "@/Components/Switch";
import languages from "@/utils/languages";
import Dashboard from "@/Layouts/Dashboard";
import Globe from "@/Components/Icons/Globe";
import Breadcrumb from "@/Components/Breadcrumb";
import EditPen from "@/Components/Icons/EditPen";
import { IconButton } from "@material-tailwind/react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AddTranslation from "@/Components/Admin/AddTranslation";

const Show = () => {
   const { props } = usePage<PageProps>();
   const { app } = props.translate;

   const langs = props.translate.langs.map((item: any) => {
      const lang = languages.find((lang) => lang.code === item.code);
      return { ...lang, active: item.active };
   });

   const enLang = langs.find((lang: any) => lang.code === "en");

   return (
      <>
         <Head title={app.translation} />
         <Breadcrumb
            Icon={Globe}
            title={app.translation}
            Component={<AddTranslation />}
         />

         <div className="card max-w-[1000px] w-full mx-auto p-6">
            <p className="text-lg font-bold text-gray-900 border-b border-b-gray-200 mb-4 pb-2">
               {app.available_languages}
            </p>

            <div className="flex flex-col gap-5">
               {enLang && (
                  <div
                     key={enLang.code}
                     className="flex items-center justify-between p-5 rounded-md border border-gray-300 mb-5"
                  >
                     <h6 className="text-xl">{enLang.name}</h6>

                     <div className="flex items-center">
                        <span className="font-medium text-sm bg-blue-50 px-2 py-0.5 rounded-full mr-4">
                           {app.default}
                        </span>
                        <Link
                           href={route("translation.edit", {
                              id: enLang.code as string,
                           })}
                        >
                           <IconButton
                              variant="text"
                              color="white"
                              className="w-7 h-7 rounded-full bg-blue-50 hover:bg-blue-50 active:bg-blue-50 text-blue-500 mr-3"
                           >
                              <EditPen className="h-4 w-4" />
                           </IconButton>
                        </Link>
                        <Switch
                           checked
                           switchId={enLang.code as string}
                           name={enLang.code as string}
                           onChange={(e) => e}
                        />
                     </div>
                  </div>
               )}

               {langs.map(
                  (lang) =>
                     lang &&
                     lang.code !== "en" && (
                        <div
                           key={lang.code}
                           className="flex items-center justify-between p-5 rounded-md border border-gray-300"
                        >
                           <h6 className="text-xl">{lang.name}</h6>

                           <div className="flex items-center">
                              <Link
                                 href={route("translation.edit", {
                                    id: lang.code as string,
                                 })}
                              >
                                 <IconButton
                                    variant="text"
                                    color="white"
                                    className="w-7 h-7 rounded-full bg-blue-50 hover:bg-blue-50 active:bg-blue-50 text-blue-500 mr-3"
                                 >
                                    <EditPen className="h-4 w-4" />
                                 </IconButton>
                              </Link>

                              <Switch
                                 switchId={lang.code as string}
                                 name={lang.code as string}
                                 onChange={() =>
                                    router.put(`/lang/status/${lang.code}`)
                                 }
                                 defaultChecked={lang.active}
                              />
                           </div>
                        </div>
                     )
               )}
            </div>
         </div>
      </>
   );
};

Show.layout = (page: ReactNode) => <Dashboard children={page} />;

export default Show;

import { ReactNode } from "react";
import { Head } from "@inertiajs/react";
import Dashboard from "@/Layouts/Dashboard";
import Globe from "@/Components/Icons/Globe";
import Breadcrumb from "@/Components/Breadcrumb";
import EditAppTranslation from "@/Components/Admin/EditAppTranslation";
import EditInputTranslation from "@/Components/Admin/EditInputTranslation";

interface Props {
   appTrans: any;
   inputTrans: any;
   local: string;
}

const Update = ({ appTrans, inputTrans, local }: Props) => {
   return (
      <>
         <Head title={appTrans["add_languages"]} />
         <Breadcrumb Icon={Globe} title={appTrans["add_languages"]} />

         <EditAppTranslation app={appTrans} local={local} />
         <EditInputTranslation
            app={appTrans}
            input={inputTrans}
            local={local}
         />
      </>
   );
};

Update.layout = (page: ReactNode) => <Dashboard children={page} />;

export default Update;

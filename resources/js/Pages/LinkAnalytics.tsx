import { ReactNode } from "react";
import { Head } from "@inertiajs/react";
import Dashboard from "@/Layouts/Dashboard";
import Breadcrumb from "@/Components/Breadcrumb";
import ChartLineUp from "@/Components/Icons/ChartLineUp";
import Devices from "@/Components/LinkAnalytics/Devices";
import Countries from "@/Components/LinkAnalytics/Countries";
import Referrers from "@/Components/LinkAnalytics/Referrers";
import Operating from "@/Components/LinkAnalytics/Operating";
import Languages from "@/Components/LinkAnalytics/Languages";
import Browsers from "@/Components/LinkAnalytics/Browsers";

interface Props {
   languages: any;
   analytics: any;
}

const LinkAnalytics = (props: Props) => {
   const { languages, analytics } = props;

   return (
      <>
         <Head title="Link Visitors Analytics" />
         <Breadcrumb Icon={ChartLineUp} title="Link Visitors Analytics" />

         <div className="max-w-[1000px] mx-auto flex flex-col gap-6">
            <Countries analytics={analytics} />
            <Languages analytics={analytics} languages={languages} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Referrers analytics={analytics} />
               <Browsers analytics={analytics} />
            </div>
            <Devices analytics={analytics} />
            <Operating analytics={analytics} />
         </div>
      </>
   );
};

LinkAnalytics.layout = (page: ReactNode) => <Dashboard children={page} />;

export default LinkAnalytics;

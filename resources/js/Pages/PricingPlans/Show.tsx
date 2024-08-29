import { ReactNode } from "react";
import Dashboard from "@/Layouts/Dashboard";

const Show = () => {
   return (
      <div>
         <h1>Show</h1>
      </div>
   );
};

Show.layout = (page: ReactNode) => <Dashboard children={page} />;

export default Show;

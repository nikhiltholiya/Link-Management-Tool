import { ReactNode } from "react";
import Dashboard from "@/Layouts/Dashboard";

const Create = () => {
   return (
      <div>
         <h1>Create</h1>
      </div>
   );
};

Create.layout = (page: ReactNode) => <Dashboard children={page} />;

export default Create;

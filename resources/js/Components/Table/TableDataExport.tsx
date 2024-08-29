import {
   Menu,
   Button,
   MenuItem,
   MenuList,
   MenuHandler,
} from "@material-tailwind/react";
import SimpleBar from "simplebar-react";
import FileExport from "../Icons/FileExport";
import { fileExporter } from "@/utils/utils";

interface Props {
   route: string;
   className?: string;
}

const TableDataExport = (props: Props) => {
   const { className, route } = props;

   const dataExport = () => {
      fileExporter(route);
   };

   return (
      <div className={`ml-3 relative ${className}`}>
         <Menu placement="bottom-end">
            <MenuHandler>
               <Button
                  ripple={false}
                  variant="text"
                  color="white"
                  className="text-start p-0 w-11 h-10 rounded-md border border-gray-200 hover:border-blue-500 flex items-center justify-center group"
               >
                  <FileExport className="w-4 h-4 text-gray-700 group-hover:text-blue-500" />
               </Button>
            </MenuHandler>
            <MenuList className="max-h-[200px] min-w-[72px] p-0 overflow-hidden">
               <SimpleBar style={{ maxHeight: "198px" }}>
                  <MenuItem
                     value="csv"
                     onClick={dataExport}
                     className="text-center"
                  >
                     CSV
                  </MenuItem>
               </SimpleBar>
            </MenuList>
         </Menu>
      </div>
   );
};

export default TableDataExport;

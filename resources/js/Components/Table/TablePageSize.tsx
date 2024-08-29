import {
   Menu,
   Button,
   MenuItem,
   MenuList,
   MenuHandler,
} from "@material-tailwind/react";
import NProgress from "nprogress";
import SimpleBar from "simplebar-react";
import ArrowDown from "../Icons/ArrowDown";
import { router } from "@inertiajs/react";
import { PaginationProps } from "@/types";

interface Props {
   className?: string;
   pageData: PaginationProps;
   dropdownList: number[];
}

const TablePageSize = (props: Props) => {
   const { pageData, dropdownList, className } = props;
   const { path, per_page, current_page } = pageData;

   const gotoPage = (current: number, size: number) => {
      router.on("start", () => NProgress.remove());
      router.on("finish", () => NProgress.remove());

      router.get(`${path}?page=${current}&per_page=${size}`);
   };

   return (
      <div className={`relative ${className}`}>
         <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
            <ArrowDown className="w-3 h-3 text-gray-700" />
         </span>
         <Menu placement="bottom-end">
            <MenuHandler>
               <Button
                  ripple={false}
                  variant="text"
                  color="white"
                  className="text-start py-0 px-4 w-[72px] h-10 rounded-md text-gray-700 border border-gray-200 hover:border-blue-500"
               >
                  {per_page}
               </Button>
            </MenuHandler>
            <MenuList className="max-h-[200px] min-w-[72px] p-0 overflow-hidden">
               <SimpleBar style={{ maxHeight: "198px" }}>
                  {dropdownList.map((item) => (
                     <MenuItem
                        key={item}
                        value={item}
                        onClick={() => gotoPage(current_page, item)}
                        className={`text-center ${
                           per_page === item && "bg-gray-100"
                        }`}
                     >
                        {item}
                     </MenuItem>
                  ))}
               </SimpleBar>
            </MenuList>
         </Menu>
      </div>
   );
};

export default TablePageSize;

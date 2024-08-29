import NProgress from "nprogress";
import debounce from "@/utils/debounce";
import queryValue from "@/utils/queryValue";
import Search from "@/Components/Icons/Search";
import TableDataExport from "./TableDataExport";
import { router, usePage } from "@inertiajs/react";
import { PageProps, PaginationProps } from "@/types";
import { ReactNode, useEffect, useRef } from "react";
import TablePageSize from "@/Components/Table/TablePageSize";

interface Props {
   data: PaginationProps;
   title: string;
   component?: ReactNode;
   globalSearch: boolean;
   tablePageSizes: number[];
   searchPath?: string;
   exportPath?: string;
}

const TableNav = (props: Props) => {
   const {
      data,
      title,
      component,
      globalSearch,
      tablePageSizes,
      searchPath,
      exportPath,
   } = props;
   const page = usePage();
   const searchRef = useRef<HTMLInputElement>(null);
   const { auth } = page.props as PageProps;

   const searchHandler = debounce(async (e: any) => {
      const query = e.target.value;
      router.on("start", () => NProgress.remove());
      router.on("finish", () => NProgress.remove());

      router.get(
         `${searchPath}?page=1&per_page=${data.per_page}&search=${query}`
      );
   }, 300);

   useEffect(() => {
      if (queryValue("search", page.url) && searchRef.current) {
         searchRef.current.focus();
      }
   }, [props]);

   return (
      <div className="p-7 md:flex items-center justify-between">
         {title && (
            <p className="mb-4 md:mb-0 text18 font-bold text-gray-900">
               {title}
            </p>
         )}
         <div className="flex justify-end items-center">
            {globalSearch && (
               <div className="w-full md:max-w-[260px] relative">
                  <input
                     type="text"
                     ref={searchRef}
                     placeholder="Search"
                     onChange={searchHandler}
                     className="h-10 pl-12 pr-4 py-[15px] border border-gray-200 rounded-md w-full focus:ring-0 focus:outline-0 focus:border-blue-500 text-sm font-normal text-gray-500"
                     defaultValue={queryValue("search", page.url) ?? ""}
                  />
                  <Search className="absolute w-4 h-4 top-3 left-4 text-gray-700 z-10" />
               </div>
            )}

            <TablePageSize
               pageData={data}
               dropdownList={tablePageSizes}
               className="ml-3"
            />

            {auth.user.roles[0].name === "SUPER-ADMIN" && exportPath && (
               <TableDataExport route={exportPath} />
            )}

            {component && component}
         </div>
      </div>
   );
};

export default TableNav;

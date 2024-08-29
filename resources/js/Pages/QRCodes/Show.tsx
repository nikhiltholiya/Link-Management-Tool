import { pageChange } from "@/utils/utils";
import { parseISO, format } from "date-fns";
import Dashboard from "@/Layouts/Dashboard";
import QRcode from "@/Components/Icons/QRcode";
import Delete from "@/Components/Icons/Delete";
import { Head, router } from "@inertiajs/react";
import { qrCodesHead } from "@/utils/table-head";
import Breadcrumb from "@/Components/Breadcrumb";
import { useTable, useSortBy } from "react-table";
import TableNav from "@/Components/Table/TableNav";
import LimitWarning from "@/Components/LimitWarning";
import { PageProps, PaginationProps } from "@/types";
import TableHead from "@/Components/Table/TableHead";
import { Button, IconButton } from "@material-tailwind/react";
import { ReactNode, useMemo, useState, useEffect } from "react";
import TablePagination from "@/Components/Table/TablePagination";
import QRCodeDownloader2 from "@/Components/QRCode/QRCodeDownloader2";
import DeleteByInertia from "@/Components/DeleteByInertia";

interface Props extends PageProps {
   qrcodes: PaginationProps;
   limit: boolean | string;
}

const Show = (props: Props) => {
   const { app } = props.translate;
   const [qrcodes, setQRcodes] = useState(props.qrcodes);
   const data = useMemo(() => qrcodes.data, [qrcodes]);
   const columns = useMemo(() => qrCodesHead, []);

   const { rows, getTableProps, getTableBodyProps, headerGroups, prepareRow } =
      useTable({ columns, data }, useSortBy);

   const stringToDate = (str: string) => {
      const time = format(parseISO(str), "hh:mm aa");
      const date = format(parseISO(str), "dd MMM, yyyy");
      return { date, time };
   };

   useEffect(() => {
      const change = pageChange(props.qrcodes, qrcodes);
      if (change) {
         setQRcodes(props.qrcodes);
      }
   }, [props]);

   return (
      <>
         <Head title={app.qr_codes} />
         <Breadcrumb
            Icon={QRcode}
            title={app.qr_codes}
            Component={
               <Button
                  variant="text"
                  color="white"
                  onClick={() => router.get(route("qrcodes.create"))}
                  className="py-2 px-5 rounded-md bg-blue-500 active:bg-blue-500 hover:bg-blue-500 font-medium text-base shadow-md hover:shadow-lg hover:shadow-blue-500/40 shadow-blue-500/20 transition-all active:opacity-[0.85] capitalize"
               >
                  {app.create_qr_code}
               </Button>
            }
         />
         <LimitWarning limit={props.limit} />

         <div className="card">
            <TableNav
               data={qrcodes}
               globalSearch={false}
               tablePageSizes={[10, 15, 20, 25]}
               title={app.qr_codes}
            />

            <div className="overflow-x-auto">
               <table {...getTableProps()} className="w-full min-w-[800px]">
                  <thead>
                     <TableHead justifyHead headerGroups={headerGroups} />
                  </thead>
                  <tbody {...getTableBodyProps()}>
                     {rows.map((row) => {
                        prepareRow(row);
                        return (
                           <tr
                              {...row.getRowProps()}
                              className="border-b border-gray-200 dark:border-neutral-500"
                           >
                              {row.cells.map((cell) => {
                                 const { row, column } = cell;
                                 const {
                                    id,
                                    link,
                                    link_id,
                                    project,
                                    img_data,
                                    project_id,
                                    created_at,
                                 }: any = row.original;
                                 const { date, time } =
                                    stringToDate(created_at);

                                 return (
                                    <td
                                       {...cell.getCellProps()}
                                       className="px-7 py-[18px] text-start last:text-end text-gray-700 font-medium"
                                    >
                                       {column.id === "qrcode" ? (
                                          <img
                                             src={img_data}
                                             className="w-10 h-10"
                                             alt=""
                                          />
                                       ) : column.id === "project" ? (
                                          <p className="text-sm flex justify-center">
                                             {project && project_id ? (
                                                project.project_name
                                             ) : (
                                                <span>empty</span>
                                             )}
                                          </p>
                                       ) : column.id === "link" ? (
                                          <p className="text-sm text-center">
                                             {link && link_id
                                                ? link.link_name
                                                : "empty"}
                                          </p>
                                       ) : column.id === "action" ? (
                                          <div className="flex justify-end items-center">
                                             <QRCodeDownloader2
                                                imageBlogData={img_data}
                                             />
                                             <DeleteByInertia
                                                apiPath={route(
                                                   "qrcodes.destroy",
                                                   { id }
                                                )}
                                                Component={
                                                   <IconButton
                                                      color="white"
                                                      variant="text"
                                                      className="w-7 h-7 rounded-full bg-red-50 hover:bg-red-50 active:bg-red-50 text-red-500 ml-3"
                                                   >
                                                      <Delete className="h-4 w-4" />
                                                   </IconButton>
                                                }
                                             />
                                          </div>
                                       ) : (
                                          column.id === "created" && (
                                             <p className="text-sm text-center">
                                                <span className="font-medium">
                                                   {date}
                                                </span>
                                                <br />
                                                <span className="text-xs">
                                                   {time}
                                                </span>
                                             </p>
                                          )
                                       )}
                                    </td>
                                 );
                              })}
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
            </div>

            <TablePagination paginationInfo={qrcodes} className="p-7" />
         </div>
      </>
   );
};

Show.layout = (page: ReactNode) => <Dashboard children={page} />;

export default Show;

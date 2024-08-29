import { Head } from "@inertiajs/react";
import Dashboard from "@/Layouts/Dashboard";
import Breadcrumb from "@/Components/Breadcrumb";
import { useTable, useSortBy } from "react-table";
import TableNav from "@/Components/Table/TableNav";
import TableHead from "@/Components/Table/TableHead";
import { ReactNode, useMemo, useState } from "react";
import { PageProps, PaginationProps } from "@/types";
import { subscriptionsHead } from "@/utils/table-head";
import TablePagination from "@/Components/Table/TablePagination";
import IdCard from "@/Components/Icons/IdCard";
import { parseISO, format } from "date-fns";

interface Props extends PageProps {
   subscriptions: PaginationProps;
}

const Subscriptions = (props: Props) => {
   const { app } = props.translate;
   const [subscriptions, setSubscriptions] = useState(props.subscriptions);
   const data = useMemo(() => subscriptions.data, [subscriptions]);
   const columns = useMemo(() => subscriptionsHead, []);

   const { rows, getTableProps, getTableBodyProps, headerGroups, prepareRow } =
      useTable({ columns, data }, useSortBy);

   const stringToDate = (str: string) => {
      const time = format(parseISO(str), "hh:mm aa");
      const date = format(parseISO(str), "dd MMM, yyyy");
      return { date, time };
   };

   return (
      <>
         <Head title={app.subscriptions} />
         <Breadcrumb Icon={IdCard} title={app.subscriptions} />

         <div className="card">
            <TableNav
               title={app.subscriptions}
               data={subscriptions}
               globalSearch={true}
               tablePageSizes={[10, 15, 20, 25]}
               searchPath={route("subscriptions.index")}
               exportPath={route("subscriptions.export")}
            />

            <div className="overflow-x-auto">
               <table {...getTableProps()} className="w-full min-w-[1000px]">
                  <thead>
                     <TableHead headerGroups={headerGroups} />
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
                                    total_price,
                                    currency,
                                    created_at,
                                 }: any = row.original;

                                 const { date, time } =
                                    stringToDate(created_at);

                                 return (
                                    <td
                                       {...cell.getCellProps()}
                                       className="px-7 py-[18px] text-start last:text-end text-gray-700 font-medium"
                                    >
                                       {column.id === "price" ? (
                                          <p className="text-sm">
                                             {`${total_price} ${currency}`}
                                          </p>
                                       ) : column.id === "created" ? (
                                          <p className="text-sm">
                                             <span>{date}</span>
                                             <br />
                                             <span className="text-xs">
                                                {time}
                                             </span>
                                          </p>
                                       ) : (
                                          <span className="text-sm">
                                             {cell.render("Cell")}
                                          </span>
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

            <TablePagination paginationInfo={subscriptions} className="p-7" />
         </div>
      </>
   );
};

Subscriptions.layout = (page: ReactNode) => <Dashboard children={page} />;

export default Subscriptions;

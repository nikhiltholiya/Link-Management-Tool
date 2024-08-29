import { ReactNode, useMemo } from "react";
import Dashboard from "@/Layouts/Dashboard";
import { Head, Link } from "@inertiajs/react";
import Delete from "@/Components/Icons/Delete";
import Breadcrumb from "@/Components/Breadcrumb";
import { useTable, useSortBy } from "react-table";
import { projectsHead } from "@/utils/table-head";
import TableNav from "@/Components/Table/TableNav";
import TableHead from "@/Components/Table/TableHead";
import { IconButton } from "@material-tailwind/react";
import ProjectsIcon from "@/Components/Icons/Projects";
import DeleteByInertia from "@/Components/DeleteByInertia";
import { PageProps, PaginationProps, ProjectProps } from "@/types";
import TablePagination from "@/Components/Table/TablePagination";
import CreateProject from "@/Components/Project/CreateProject";
import EditProject from "@/Components/Project/EditProject";
import LimitWarning from "@/Components/LimitWarning";
import { parseISO, format } from "date-fns";

interface Props extends PageProps {
   projects: PaginationProps;
   limit: boolean | string;
}

const Projects = (props: Props) => {
   const { app } = props.translate;
   const projects = props.projects;
   const data = useMemo(() => props.projects.data, [props]);
   const columns = useMemo(() => projectsHead, []);

   const { rows, getTableProps, getTableBodyProps, headerGroups, prepareRow } =
      useTable({ columns, data }, useSortBy);

   const stringToDate = (str: string) => {
      const time = format(parseISO(str), "hh:mm aa");
      const date = format(parseISO(str), "dd MMM, yyyy");
      return { date, time };
   };

   return (
      <>
         <Head title={app.projects} />
         <Breadcrumb
            Icon={ProjectsIcon}
            title={app.projects}
            Component={<CreateProject />}
         />
         <LimitWarning limit={props.limit} />

         <div className="card">
            <TableNav
               data={projects}
               globalSearch={true}
               tablePageSizes={[10, 15, 20, 25]}
               searchPath={route("projects.index")}
               exportPath={route("projects.export")}
               title={app.projects}
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
                                    qrcodes,
                                    created_at,
                                    project_name,
                                 }: any = row.original;
                                 const { date, time } =
                                    stringToDate(created_at);

                                 return (
                                    <td
                                       {...cell.getCellProps()}
                                       className="px-7 py-[18px] text-start last:text-end text-gray-700"
                                    >
                                       {column.id === "name" ? (
                                          <p className="text-sm font-medium">
                                             {project_name}
                                          </p>
                                       ) : column.id === "qrcodes" ? (
                                          <p className="text-center font-medium">
                                             {qrcodes.length}
                                          </p>
                                       ) : column.id === "view" ? (
                                          <>
                                             {qrcodes.length > 0 ? (
                                                <div className="flex justify-center">
                                                   <Link
                                                      href={route(
                                                         "projects.show",
                                                         { id }
                                                      )}
                                                      className="text-sm w-20 py-0.5 flex items-center justify-center bg-gray-100 rounded whitespace-nowrap font-medium"
                                                   >
                                                      View QR
                                                   </Link>
                                                </div>
                                             ) : (
                                                <div className="flex justify-center">
                                                   <span className="text-sm w-20 py-0.5 flex items-center justify-center bg-gray-100 rounded whitespace-nowrap font-medium">
                                                      Empty
                                                   </span>
                                                </div>
                                             )}
                                          </>
                                       ) : column.id === "action" ? (
                                          <div className="flex justify-end items-center">
                                             <EditProject
                                                project={
                                                   row.original as ProjectProps
                                                }
                                             />

                                             <DeleteByInertia
                                                apiPath={route(
                                                   "projects.destroy",
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

            <TablePagination paginationInfo={projects} className="p-7" />
         </div>
      </>
   );
};

Projects.layout = (page: ReactNode) => <Dashboard children={page} />;

export default Projects;

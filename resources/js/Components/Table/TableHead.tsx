import DoubleArrow from "@/Components/Icons/DoubleArrow";

interface Props {
   className?: string;
   centerHead?: boolean;
   justifyHead?: boolean;
   headerGroups: any[];
}

const TableHead = (props: Props) => {
   const { className, centerHead, justifyHead, headerGroups } = props;
   let headStyle = "text-start last:text-end";
   if (centerHead) {
      headStyle = "text-center";
   }
   if (justifyHead) {
      headStyle = "text-center first:text-start last:text-end";
   }

   return (
      <>
         {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
               {headerGroup.headers.map((column: any) => (
                  <th
                     {...column.getHeaderProps(column.getSortByToggleProps())}
                     className={`px-7 py-4 bg-gray-50 text-sm text-gray-500 font-bold ${headStyle} ${className}`}
                  >
                     <span className="whitespace-nowrap relative pr-4">
                        {column.render("Header")}
                        <DoubleArrow className="w-3 h-3 ml-1 absolute right-0 top-1/2 transform -translate-y-1/2" />
                     </span>
                  </th>
               ))}
            </tr>
         ))}
      </>
   );
};

export default TableHead;

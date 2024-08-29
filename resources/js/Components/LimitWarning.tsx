import { Link } from "@inertiajs/react";

const LimitWarning = ({ limit }: { limit: boolean | string }) => {
   return (
      <>
         {limit && (
            <div className="p-4 rounded-md bg-red-50 mb-10">
               <p className="text-red-500 text-center">
                  {limit}{" "}
                  <Link href="/current-plan" className=" underline">
                     Click Here
                  </Link>
               </p>
            </div>
         )}
      </>
   );
};

export default LimitWarning;

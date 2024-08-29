import Dashboard from "@/Layouts/Dashboard";
import { Head, router } from "@inertiajs/react";
import { Button } from "@material-tailwind/react";
import { ReactNode } from "react";

const VerifyEmail = () => {
   return (
      <>
         <Head title="Verify Email" />
         <div className="mt-10 flex items-center justify-center">
            <div className="max-w-[600px] card p-5">
               <p className="text-justify">
                  We have sent an email verification link to your registered
                  email. Please check your email to verify your email address.
                  Otherwise you can't access any feature.
               </p>

               <Button
                  color="blue"
                  variant="gradient"
                  onClick={() => router.post(route("verification.send"))}
                  className="mt-6 py-2.5 px-5 w-full rounded-md font-medium capitalize text-sm hover:shadow-md"
               >
                  Resend Verification Link
               </Button>
            </div>
         </div>
      </>
   );
};

VerifyEmail.layout = (page: ReactNode) => <Dashboard children={page} />;

export default VerifyEmail;

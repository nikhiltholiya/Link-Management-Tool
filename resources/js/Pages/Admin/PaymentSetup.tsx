import { ReactNode } from "react";
import { PageProps, PaymentProps } from "@/types";
import { Head } from "@inertiajs/react";
import Dashboard from "@/Layouts/Dashboard";
import Breadcrumb from "@/Components/Breadcrumb";
import StripeSettings from "@/Components/Forms/StripeSettings";
import RazorpaySettings from "@/Components/Forms/RazorpaySettings";
import PaypalSettings from "@/Components/Forms/PaypalSettings";
import MollieSettings from "@/Components/Forms/MollieSettings";
import PaystackSettings from "@/Components/Forms/PaystackSettings";
import PaymentSettings from "@/Components/Icons/PaymentSettings";

interface Props extends PageProps {
   stripe: PaymentProps;
   razorpay: PaymentProps;
   paypal: PaymentProps;
   mollie: PaymentProps;
   paystack: PaymentProps;
}

const PaymentSetup = (props: Props) => {
   const { stripe, razorpay, paypal, mollie, paystack } = props;
   const { app } = props.translate;

   return (
      <>
         <Head title={app.payments_setup} />
         <Breadcrumb Icon={PaymentSettings} title={app.payments_setup} />

         <StripeSettings stripe={stripe} />
         <RazorpaySettings razorpay={razorpay} />
         <PaypalSettings paypal={paypal} />
         <MollieSettings mollie={mollie} />
         <PaystackSettings paystack={paystack} />
      </>
   );
};

PaymentSetup.layout = (page: ReactNode) => <Dashboard children={page} />;

export default PaymentSetup;

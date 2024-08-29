import Input from "@/Components/Input";
import Switch from "@/Components/Switch";
import { useForm, usePage } from "@inertiajs/react";
import { Button } from "@material-tailwind/react";
import { PageProps, PaymentProps } from "@/types";

const PaystackSettings = (props: { paystack: PaymentProps }) => {
   const page = usePage<PageProps>();
   const { app, input } = page.props.translate;
   const { id, active, key, secret } = props.paystack;

   const { data, setData, patch, errors, clearErrors } = useForm({
      active: Boolean(active),
      key: key,
      secret: secret,
   });

   const onHandleChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => {
      const target = event.target as HTMLInputElement;

      setData({
         ...data,
         [target.name]:
            target.type === "checkbox" ? target.checked : target.value,
      });
   };

   const submit = (e: React.FormEvent) => {
      e.preventDefault();
      clearErrors();
      patch(route("payments-setup.update", { id }));
   };

   return (
      <div className="card max-w-[1000px] w-full mx-auto mt-7">
         <div className="px-7 pt-7 pb-4 border-b border-b-gray-200">
            <p className="text18 font-bold text-gray-900">
               {app.paystack_payment_gateway}
            </p>
         </div>

         <form onSubmit={submit} className="p-7">
            <div className="mb-7 md:pl-[164px]">
               <Switch
                  name="active"
                  switchId="paystack"
                  label={input.allow_paystack}
                  onChange={onHandleChange}
                  defaultChecked={data.active}
               />
            </div>

            <div className="mb-7">
               <Input
                  fullWidth
                  type="password"
                  name="key"
                  value={data.key}
                  error={errors.key}
                  placeholder={input.paystack_client_key_placeholder}
                  onChange={onHandleChange}
                  label={input.paystack_client_key}
                  flexLabel
                  required
               />
            </div>

            <div className="mb-7">
               <Input
                  fullWidth
                  type="password"
                  name="secret"
                  value={data.secret}
                  error={errors.secret}
                  placeholder={input.paypal_client_secret_placeholder}
                  onChange={onHandleChange}
                  label={input.paypal_client_secret}
                  flexLabel
                  required
               />
            </div>

            <div className="flex items-center mt-6 md:pl-[164px]">
               <Button
                  type="submit"
                  color="blue"
                  variant="gradient"
                  className="py-2.5 px-5 rounded-md font-medium capitalize text-sm hover:shadow-md"
               >
                  {app.save_changes}
               </Button>
            </div>
         </form>
      </div>
   );
};

export default PaystackSettings;

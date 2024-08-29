<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>2Checkout Payment</title>

    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div class="max-w-[1220px] w-full h-[100vh] mx-auto flex items-center justify-center">
        <div class="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-7 text-center mt-6">
            <div class="card-body">
                <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight mb-4">
                    {{ __('Two Checkout Form') }}
                </h2>
                
                <form type="post" id="payment-form">
                    {{-- <input type="hidden" name="plan_id" value="{{$plan->id}}">
                    <input type="hidden" name="billing_type" value="{{$billing_type}}"> --}}
                    
                    <div class="!text-start">
                        <label >Name</label>
                        <input placeholder="Card Holder Name" type="text" id="name" class="field w-full border border-gray-300 px-2 py-1.5">
                    </div>
                  
                    <div id="card-element">
                      <!-- A TCO IFRAME will be inserted here. -->
                    </div>
                  
                    <button 
                        type="submit"
                        class="btn btn-primary mt-4 bg-blue-500 rounded-md px-6 py-1.5 w-full text-white" 
                    >
                        Generate token
                    </button>
                  </form>
            </div>
        </div>
    </div>

    <script>
        window.addEventListener('load', function() {
            // Initialize the JS Payments SDK client.
            let jsPaymentClient = new  TwoPayClient("{{config('twocheckout.sellerId')}}");
            
            // Create the component that will hold the card fields.
            let component = jsPaymentClient.components.create('card');
            
            // Mount the card fields component in the desired HTML tag. This is where the iframe will be located.
            component.mount('#card-element');

            // Handle form submission.
            document.getElementById('payment-form').addEventListener('submit', (event) => {
                event.preventDefault();
                
                // Extract the Name field value
                const billingDetails = {
                    name: document.querySelector('#name').value
                };

                // Call the generate method using the component as the first parameter
                // and the billing details as the second one
                jsPaymentClient.tokens.generate(component, billingDetails).then((response) => {
                    // console.log(response.token);
                    fetch("{{route('twocheckout.payment')}}", {
                        method: 'POST',
                        body: JSON.stringify({
                            ess_token: response.token,
                            plan_id: '{{$plan->id}}',
                            billing_type: '{{$billing_type}}',
                            "_token": "{{ csrf_token() }}"
                        }),
                        headers: { 'Content-Type': 'application/json' }
                    })
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch(error => console.log(error));
                }).catch((error) => {
                    console.log(error);
                });
            });
        });
    </script>

    <script type="text/javascript" src="https://2pay-js.2checkout.com/v1/2pay.js"></script>
</body>
</html>
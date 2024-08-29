<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
</head>

 <body style="height: 100vh; background-color: #EDF2F7; padding: 1.5rem !important;">
   <h4 
      style="
         margin-top: 0; 
         margin-bottom: 1rem; 
         text-align: center; 
         font-size: 1.25rem;
         line-height: 1.75rem;
         font-weight: 500;
         color: #0f172a;
      "
   >
      {{$app->title}}
   </h4>

   <div
      style="
         margin-left: auto;
         margin-right: auto;
         max-width: 32rem;
         border-radius: 0.5rem;
         background-color: white;
         padding: 1.5rem !important;
      "
   >
      <h6 
         style="
            margin-top: 0;
            margin-bottom: 0.5rem;
            font-size: 1.125rem;
            line-height: 1.75rem;
            font-weight: 500;
            color: #0f172a;
         "
      >
         Hello!
      </h6>
      <p style="padding-bottom: 1rem; color: #64748b;">
         Please click the button below to verify your email address.
      </p>
         
      @component('mail::button', ['url' => $url])
         Verify Email Address
      @endcomponent

      <p style="padding-top: 1rem; padding-bottom: 1rem; color: #64748b;">
         If you did not create an account, no further action is required.
      </p>
      <p style="margin-bottom: 0.5rem; color: #64748b;">Regards,</p>
      <p style="color: #64748b;">{{$app->title}}</p>
   </div>

   <p 
      style="
         padding-bottom: 24px; 
         text-align: center; 
         font-size: 0.75rem;
         line-height: 1rem;
         color: #94a3b8;
         margin-top: 1.5rem;
      "
   >
      © 2023 {{$app->title}}. All rights reserved.
   </p>
</body>
</html>
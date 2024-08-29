@if (session('success'))
   <div class="rounded-md text-center text-sm px-5 py-3 mb-4 bg-green-100 text-green-500">
         {{ session('success') }}
   </div>
@endif

@if (session('error'))
   <div class="rounded-md text-center text-sm px-5 py-3 mb-4 bg-red-100 text-red-500">
         {{ session('error') }}
   </div>
@endif
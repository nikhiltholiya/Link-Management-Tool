<div
  data-dialog-backdrop="{{$dialog}}"
  data-dialog-backdrop-close="true"
  class="pointer-events-none fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 hidden backdrop-blur-sm transition-opacity duration-300 p-4"
>
   <div
      data-dialog="{{$dialog}}"
      class="relative min-w-[300px] max-w-[460px] w-full max-h-[calc(100vh-100px)] overflow-y-auto rounded-lg bg-white font-sans text-base leading-relaxed antialiased shadow-2xl p-4"
   >
      <form method="POST" action="{{route('current-plan.basic-plan', ['id'=>$plan->id])}}">
         @csrf

         <p class="text-red-500 text-center py-8 text-lg font-medium">
            {{__('Are you sure to change your current pricing plan to the basic plan?')}}
         </p>

         <div class="flex items-center justify-center gap-6 pb-8">
            <button
               type="button"
               data-ripple-dark="true"
               data-dialog-close="true"
               class="middle none center rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none border border-red-500"
            >
               Cancel
            </button>
            <button
               type="submit"
               data-ripple-light="true"
               class="middle none center rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
               Agree
            </button>
         </div>
      </form>
   </div>
</div>
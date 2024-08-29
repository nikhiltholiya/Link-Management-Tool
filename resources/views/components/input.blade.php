
<div class="flex flex-col items-start @if($flexLabel) md:flex-row md:items-center @endif @if($fullWidth) w-full @endif">
   @if ($label)
      @if ($flexLabel)
         <small class="max-w-[164px] w-full mb-1 whitespace-nowrap flex items-center font-medium text-gray-500">
            <span class="mr-1">{{$label}}</span>
            @if ($required)
               <span class="block text-red-500">*</span>
            @endif
         </small>
      @else
         <small class="w-full mb-1 whitespace-nowrap flex items-center font-medium text-gray-500">
            <span class="mr-1">{{$label}}</span>
            @if ($required)
               <span class="block text-red-500">*</span>
            @endif
         </small>
      @endif       
   @endif

   <div class="relative w-full">
      <input
         id="{{$id}}"
         type="{{$type}}"
         name="{{$name}}"
         value="{{$value}}"
         class="!border !border-gray-300 focus:!border-blue-500 h-10 px-2.5 focus:outline-0 focus:ring-0 rounded-md text-sm w-full {{$className}}"
         placeholder="{{$placeholder}}"
         @if($required) required @endif
         @if($disabled) disabled @endif
      />


      @if ($error)
         <p class="text-sm text-red-500 mt-1">{{$error}}</p>
      @endif
   </div>
</div>

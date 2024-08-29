@props([
   'id', 
   'type' => 'text', 
   'name', 
   'value' => '', 
   'label' => '',
   'required' => true,
   'flexLabel' => false,
   'disabled' => false,
   'readonly' => false,
   'error' => '',
   'className' => '',
   'placeholder' => '',
])

<div class="flex flex-col items-start">
   @if ($label)
      <p class="w-full mb-1 whitespace-nowrap flex items-center font-medium text-gray-500">
         <span class="mr-1">{{$label}}</span>
         @if ($required)
            <span class="block text-red-500">*</span>
         @endif
      </p>   
   @endif

   <div class="relative w-full">
      <input
         id="{{$id}}"
         type="{{$type}}"
         name="{{$name}}"
         value="{{$value}}"
         class="!border !border-gray-300 focus:!border-orange-500 placeholder:text-gray-400 text-gray-700 px-4 py-3 focus:outline-0 focus:ring-0 rounded-md text-sm w-full {{$className}}"
         placeholder="{{$placeholder}}"
         @required($required ?? false)
         @disabled($disabled ?? false)
         @readonly($readonly ?? false)
      />

      @if ($error)
         <p class="text-sm text-red-500 mt-1">{{$error}}</p>
      @endif
   </div>
</div>

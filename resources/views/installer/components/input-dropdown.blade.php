@props([
   'id', 
   'name', 
   'label' => '',
   'required' => false,
   'error' => '',
   'default' => '',
   'elements',
])


<div class="w-full flex flex-col items-start">
    @if ($label)
        <p class="w-full mb-1 whitespace-nowrap flex items-center font-medium text-gray-500">
            <span class="mr-1">{{$label}}</span>
            @if ($required)
                <span class="block text-red-500">*</span>
            @endif
        </p>
    @endif

    <div class="relative w-full">
        <select
            id="{{$id}}"
            name="{{$name}}"
            class="block px-4 py-3 rounded-md w-full text-sm font-normal text-gray-700 outline outline-1 outline-gray-300 appearance-none focus:outline-orange-500 dark:focus:outline-orange-500 peer"
        >
            @foreach ($elements as $element)
                <option 
                    value="{{$element['key']}}" 
                    @if($default === $element['key']) selected @endif
                >
                    {{$element['title']}}
                </option>
            @endforeach
        </select>

        <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            xmlns="http://www.w3.org/2000/svg" 
            class="absolute top-0 bottom-0 right-2 my-auto w-[10px] h-[10px] fill-gray-500 mr-2"
        >
            <path d="M7.99953 13C7.74367 13 7.48768 12.9023 7.29269 12.707L1.29296 6.70703C0.902348 6.31641 0.902348 5.68359 1.29296 5.29297C1.68356 4.90234 2.31635 4.90234 2.70696 5.29297L7.99953 10.5875L13.293 5.29375C13.6837 4.90312 14.3164 4.90312 14.707 5.29375C15.0977 5.68437 15.0977 6.31719 14.707 6.70781L8.70731 12.7078C8.51201 12.9031 8.25577 13 7.99953 13Z"/>
        </svg>
    </div>

    @if ($error)
        <p class="text-sm text-red-500 mt-1">{{$error}}</p>
    @endif
</div>
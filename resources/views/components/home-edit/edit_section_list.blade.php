<div
   data-dialog-backdrop="{{$dialog}}"
   data-dialog-backdrop-close="true"
   class="pointer-events-none fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 hidden backdrop-blur-sm transition-opacity duration-300 p-4"
>
   <div
      data-dialog="{{$dialog}}"
      class="relative min-w-[300px] max-w-[600px] w-full max-h-[calc(100vh-100px)] rounded-lg bg-white font-sans text-base font-light leading-relaxed antialiased shadow-2xl p-4 overflow-auto"
   >
      <div class="flex items-center justify-between mb-8">
         <p class="text-lg font-medium">Update {{$sections->name}} Section List</p>
         <span class=" text-3xl leading-none cursor-pointer" data-dialog-close="true">×</span>
      </div>
      
      <form 
         method="POST" 
         action="{{route('home-section.list', ['id' => $sections->id])}}"
      >
         @csrf
         @method('PUT')
         
         <?php $counter = 0; ?>
         @foreach(json_decode($sections->section_list) as $list)
            <?php
               $counter++;
               $encode = json_encode($list);
               $item = json_decode($encode, true);
            ?>
            
            @if($item['content'] && $item['url'])
               <div class="mb-3 text-start">
                  <div class="border border-gray-200 rounded-md flex items-center overflow-hidden">
                     <span class="max-w-[86px] py-2 px-3 bg-gray-100">
                        {{__('Content')}}
                     </span>
                     <input 
                        required 
                        name="content{{$counter}}"
                        value="{{$item['content']}}"
                        class="w-full p-2 focus:outline-0"
                     >
                  </div>

                  <input hidden name="icon{{$counter}}" value="{{$item['icon']}}">

                  <div class="border border-gray-200 rounded-md flex items-center overflow-hidden">
                     <span class="max-w-[86px] py-2 px-3 bg-gray-100 whitespace-nowrap">
                        {{__('Link Url')}}
                     </span>
                     <input 
                        required 
                        name="url{{$counter}}"
                        value="{{$item['url']}}"
                        class="w-full p-2 focus:outline-0"
                     >
                  </div>

                  @error('section_title') 
                     <small class="text-xs text-red-500">{{$message }}</small>
                  @enderror
               </div>
             @else
               @if($item['url'])
                  <div class="mb-3 text-start">
                     <div class="border border-gray-200 rounded-md flex items-center overflow-hidden">
                        <span class="max-w-[86px] py-2 px-3 bg-gray-100 whitespace-nowrap">
                           {{__('Link Url')}}
                        </span>
                        <input 
                           required 
                           name="url{{$counter}}"
                           value="{{$item['url']}}"
                           class="w-full p-2 focus:outline-0"
                        >
                     </div>

                     <input hidden name="icon{{$counter}}" value="{{$item['icon']}}">
                     <input hidden name="content{{$counter}}" value="{{$item['content']}}">
                     @error('section_title') 
                        <small class="text-xs text-red-500">{{$message }}</small>
                     @enderror
                  </div>
               @else
                  <div class="mb-3 text-start">
                     <div class="border border-gray-200 rounded-md flex items-center overflow-hidden">
                        <span class="max-w-[86px] py-2 px-3 bg-gray-100">
                           {{__('Content')}}
                        </span>
                        <input 
                           required 
                           name="content{{$counter}}"
                           value="{{$item['content']}}"
                           class="w-full p-2 focus:outline-0"
                        >
                     </div>

                     <input hidden name="icon{{$counter}}" value="{{$item['icon']}}" />
                     <input hidden name="url{{$counter}}" value="{{$item['url']}}" />
                     @error('section_title') 
                        <small class="text-xs text-red-500">{{$message }}</small>
                     @enderror
                  </div>
               @endif
            @endif
         @endforeach

         <button type="submit" class="mt-3 text-white form-control btn btn-primary">
             {{__('Update')}}
         </button>

         <div class="flex shrink-0 flex-wrap items-center justify-end">
            <button
               type="button"
               data-ripple-dark="true"
               data-dialog-close="true"
               class="middle none center mr-1 rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
               Cancel
            </button>
            <button
               type="submit"
               data-ripple-light="true"
               class="middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
               Save Changes
            </button>
         </div>
      </form>
   </div>
</div>
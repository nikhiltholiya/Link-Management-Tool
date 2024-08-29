<div
  data-dialog-backdrop="{{$dialog}}"
  data-dialog-backdrop-close="true"
  class="pointer-events-none fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 hidden backdrop-blur-sm transition-opacity duration-300 p-4"
>
   <div
      data-dialog="{{$dialog}}"
      class="relative min-w-[300px] max-w-[600px] w-full max-h-[calc(100vh-100px)] overflow-y-auto rounded-lg bg-white font-sans text-base leading-relaxed antialiased shadow-2xl p-4"
   >
      <div class="flex items-center justify-between mb-8">
         <p class="text-lg font-medium">Update {{$sections->name}} Section</p>
         <span class=" text-3xl leading-none cursor-pointer" data-dialog-close="true">×</span>
      </div>

      <form 
         method="POST" 
         enctype="multipart/form-data"
         action="{{route('home-section.update', ['id' => $sections->id])}}" 
      >
         @csrf
         @method('PUT')
         
         <div class="mb-4">
            <label>{{__('Section Title')}}</label>
            <input 
               required 
               name="title"
               placeholder="Section Tiltle" 
               value="{{$sections->title}}"
               class="w-full py-1.5 px-2 mt-2 border border-gray-200 focus:border-blue-500 focus:outline-0 rounded-md"
            >
            @error('title')
               <small class="text-xs text-red-500">
                  {{ $message }}
               </small>
            @enderror
         </div>

         @if($sections->description)
            <div class="mb-4">
               <label>{{__('Section Description')}}</label>
               <textarea 
                  rows="3" 
                  required 
                  name="description"
                  placeholder="Section Tiltle" 
                  class="w-full px-2 rounded-md"
               >{{$sections->description}}</textarea>

               @error('description')
                  <small class="text-xs text-red-500">
                     {{ $message }}
                  </small>
               @enderror
            </div>
         @endif

         @if($sections->thumbnail)
            <div class="mb-4">
               <img 
                  alt=""
                  width="100%" 
                  id="currentThumbnail{{$sections->id}}" 
                  src="{{asset($sections->thumbnail)}}" 
               >

               <label class="block mb-2 mt-3">
                  {{__('Change Thumbnail')}}
               </label>
               
               <input 
                  type="file" 
                  name="thumbnail" 
                  id="newThumbnail{{$sections->id}}" 
               >

               @error('thumbnail')
                  <small class="text-xs text-red-500">
                     {{ $message }}
                  </small>
               @enderror
            </div>
         @endif

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
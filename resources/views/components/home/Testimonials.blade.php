 <section id="testimonials" class="max-w-[1200px] w-full mx-auto overflow-hidden px-4 py-20">
   <div class="max-w-[1248px] w-full mx-auto overflow-x-hidden">
      <div
         data-aos="fade-up" 
         data-aos-duration="1500" 
         data-aos-anchor-placement="center-bottom"
         class="text-center pb-12"
      >
         <h4 class="font-bold mb-3">
            @lang('app.testimonials')
         </h4>
         <p>@lang('app.testimonial_subtitle')</p>
      </div>

      <div class="swiper-container px-3">
         <div class="swiper-wrapper pb-12 pt-[60px]">
            @foreach ($testimonials as $item)
               <div class="swiper-slide shadow-card relative p-6 pt-16 text-center rounded-lg border border-gray-100">
                  <img 
                     src="{{asset($item->thumbnail)}}" 
                     class="w-[100px] h-[100px] border-2 border-white rounded-full absolute -top-[20%] left-1/2 transform -translate-x-1/2" 
                     alt="customer-img"
                  >
                  <p>{{$item->testimonial}}</p>

                  <div class="border-t border-gray-200 my-4"></div>

                  <p class="text-blue-500 font-bold text-lg">
                     {{$item->name}}
                  </p>
                  <p class="text-sm">{{$item->title}}</p>
               </div>
            @endforeach
         </div>
         <div class="swiper-pagination" style="position: initial !important"></div>
      </div>
   </div>
</section>
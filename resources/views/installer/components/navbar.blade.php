@props(['step1' => '', 'step2' => '', 'step3' => '', 'step4' => '', 'step5' => ''])

<div class="flex items-center mb-20 px-6">
   <div class="nav-circle-box {{$step1}}">
       <div class="nav-circle"></div>
       <p class="nav-text">{{__('SERVER')}}</p>
   </div>

   <div class="nav-separator {{$step2}}"></div>
   <div class="nav-circle-box {{$step2}}">
       <div class="nav-circle"></div>
       <p class="nav-text">{{__('SETTINGS')}}</p>
   </div>

   <div class="nav-separator {{$step3}}"></div>
   <div class="nav-circle-box {{$step3}}">
       <div class="nav-circle"></div>
       <p class="nav-text">{{__('DATABASE')}}</p>
   </div>

   <div class="nav-separator {{$step4}}"></div>
   <div class="nav-circle-box {{$step4}}">
       <div class="nav-circle"></div>
       <p class="nav-text">{{__('ADMIN')}}</p>
   </div>
   
   <div class="nav-separator {{$step5}}"></div>
   <div class="nav-circle-box {{$step5}}">
       <div class="nav-circle"></div>
       <p class="nav-text">{{__('SUMMARY')}}</p>
   </div>
</div>
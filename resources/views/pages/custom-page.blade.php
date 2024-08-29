<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>{{$app->name}}</title>

        {{-- vites --}}
        @viteReactRefresh
        @vite(['resources/js/app.tsx'])

        <!-- Styles -->
        <link href="{{asset('style/katex.min.css')}}" rel="stylesheet">
        <link href="{{asset('style/quill.snow.css')}}" rel="stylesheet">
    </head>

    <body>
        <main class="min-h-screen flex flex-col justify-between">
            <div>
                <nav id="navbar" class="block w-full max-w-full transition-all sticky top-0 z-40 px-6 bg-gray-100">
                    <div class="max-w-[1200px] w-full mx-auto overflow-hidden px-4 py-2 lg:py-4">
                        <div class="flex items-center text-gray-900">
                            <div class="flex items-center">
                                <img width="48px" height="48px" class="rounded" src="{{asset($app->logo)}}" alt="">
                                <p class="ml-2 text-lg font-medium text-gray-700">
                                    <a href="/">{{$app->title}}</a>
                                </p>
                            </div>
                
                            <ul class="ml-auto mr-8 hidden items-center gap-6 lg:flex">
                                <li>
                                    @if (auth()->user())
                                        <a
                                            href="/register"
                                            data-ripple-light="true"
                                            class="py-2.5 px-5 rounded bg-blue-500 font-medium text-white shadow-md hover:shadow-lg hover:shadow-blue-500/40  shadow-blue-500/20 transition-all active:opacity-[0.85]"
                                        >
                                            {{__('Dashboard')}}
                                        </a>
                                    @else
                                        <a
                                            href="/login"
                                            data-ripple-light="true"
                                            class="py-2.5 px-5 rounded bg-gray-100 font-medium text-gray-900 transition-all active:opacity-[0.85] mr-3 border border-gray-200"
                                        >
                                            {{__('Log In')}}
                                        </a>
                                        <a
                                            href="/register"
                                            data-ripple-light="true"
                                            class="py-2.5 px-5 rounded bg-blue-500 font-medium text-white shadow-md hover:shadow-lg hover:shadow-blue-500/40  shadow-blue-500/20 transition-all active:opacity-[0.85]"
                                        >
                                            {{__('Sign up for free')}}
                                        </a>
                                    @endif
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
        
                <div class="quill max-w-[1200px] w-full mx-auto">
                    <div class="ql-container ql-snow">
                        <div class="ql-editor">
                            {!! $currentPage->content !!}
                        </div>
                    </div>
                </div>
            </div>

            <section class="bg-gray-100 overflow-hidden">
                <div class="max-w-[1200px] w-full mx-auto px-4 overflow-hidden py-12" >
                    <div class="grid grid-cols-12 gap-6">
                        <div class="col-span-12 lg:col-span-5 text-center lg:text-start">
                            <div class="flex items-center justify-center lg:justify-start">
                                <img 
                                    alt=""
                                    width="48px" 
                                    height="48px" 
                                    class="rounded-xl " 
                                    src="{{ asset($app->logo) }}" 
                                >
                                <h6 class="ms-4 font-bold">
                                    {{$app->title}}
                                </h6>
                            </div>
                            <p class="pt-4 pb-5 text-gray-400">
                                {{$app->description}}
                            </p>
            
                            <div>
                                <?php
                                    $sections = null;
                                    foreach ($appSections as $item) {
                                        if ($item->name == 'Follow On') {
                                            $sections = $item;
                                        }
                                    };
                                ?>
                                <p class="font-medium mb-4">{{ $sections->title }}</p>
                                <div class="flex justify-center lg:justify-start">
                                    @foreach (json_decode($sections->section_list) as $list)
                                        <?php
                                            $encode = json_encode($list);
                                            $item = json_decode($encode, true);
                                        ?>
                                        <a target="_blank" href="{{ $item['url'] }}">
                                            @include("components.icons.".$item['icon'], ['class'=>'w-4 h-4 mr-4 text-gray-400'])
                                        </a>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                        <div class="col-span-12 lg:col-span-1"></div>
            
                        <div class="col-span-12 lg:col-span-3 text-center lg:text-start">
                            <?php
                                $sections = null;
                                foreach ($appSections as $item) {
                                    if ($item['name'] == 'Address') {
                                        $sections = $item;
                                    }
                                };
                            ?>
                            <p class="font-medium text-lg my-5">{{ $sections->title }}</p>
                            <ul class="text-gray-500">
                                @foreach (json_decode($sections->section_list) as $list)
                                    <?php
                                        $encode = json_encode($list);
                                        $item = json_decode($encode, true);
                                    ?>
                                    <li class="mb-4 last:mb-0">
                                        <a href="{{ $item['url'] }}">
                                            {{ $item['content'] }}
                                        </a>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
            
                        <div class="col-span-12 lg:col-span-3 text-center lg:text-start">
                            <p class="font-medium text-lg my-5">{{__('Company')}}</p>
                            <ul class="text-gray-500">
                                @foreach ($customPages as $page)
                                    <li class="mb-4 last:mb-0">
                                        <a href="/app/{{ $page->route }}">
                                            {{ $page->name }}
                                        </a>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                    </div>
                </div>
            
                <div class="max-w-[1200px] w-full mx-auto px-4 py-8 text-center border-t border-t-gray-200">
                    <p class="text-gray-500">{{$app->copyright}}</p>
                </div>
            </section>
        </main>


        <script>
            let currentScroll = 0;
            const navbar = document.getElementById("navbar");

            window.addEventListener("scroll", function () {
                currentScroll = window.pageYOffset;
                if (navbar && currentScroll > 100) {
                    navbar.classList.add("shadow-card", "bg-white");
                } else {
                    navbar.classList.remove("shadow-card", "bg-white");
                }
            });
        </script>
        <script src="{{asset('script/tw-elements.min.js')}}"></script>
    </body>
</html>
<nav id="navbar" class="fixed z-10 block h-max w-full max-w-full rounded-none bg-transparent py-0.5">
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
                    <a href="#home">
                        @lang('app.home')
                    </a>
                </li>
                <li class="mr-2 xl:mr-6">
                    <a href="#create-link">
                        @lang('app.link')
                    </a>
                </li>
                <li class="mr-2 xl:mr-6">
                    <a href="#create-block">
                        @lang('app.block')
                    </a>
                </li>
                <li class="mr-2 xl:mr-6">
                    <a href="#create-qrcode">
                        @lang('app.qr_code')
                    </a>
                </li>
                <li class="mr-2 xl:mr-6">
                    <a href="#pricing">
                        @lang('app.pricing')
                    </a>
                </li>
                <li class="mr-8 xl:mr-14">
                    <a data-scroll href="#testimonials">
                        @lang('app.testimonials')
                    </a>
                </li>
                <li>
                    @if (auth()->user())
                        @if ($SA)
                            @if ($customize)
                                <a
                                    href="/"
                                    data-ripple-light="true"
                                    class="py-2.5 px-5 rounded font-medium border border-blue-500 text-blue-500 mr-4"
                                >
                                    @lang('app.view')
                                </a>
                            @else
                                <a
                                    href="?customize=intro"
                                    data-ripple-light="true"
                                    class="py-2.5 px-5 rounded font-medium border border-blue-500 text-blue-500 mr-4"
                                >
                                    @lang('app.customize')
                                </a>
                            @endif
                        @endif
                        
                        <a
                            href="/register"
                            data-ripple-light="true"
                            class="py-2.5 px-5 rounded bg-blue-500 font-medium text-white shadow-md hover:shadow-lg hover:shadow-blue-500/40  shadow-blue-500/20 transition-all active:opacity-[0.85]"
                        >
                            @lang('app.dashboard')
                        </a>
                    @else
                        <a
                            href="/login"
                            data-ripple-light="true"
                            class="py-2.5 px-5 rounded bg-gray-100 font-medium text-gray-900 transition-all active:opacity-[0.85] mr-3 border border-gray-200"
                        >
                            @lang('app.log_in')
                        </a>
                        <a
                            href="/register"
                            data-ripple-light="true"
                            class="py-2.5 px-5 rounded bg-blue-500 font-medium text-white shadow-md hover:shadow-lg hover:shadow-blue-500/40  shadow-blue-500/20 transition-all active:opacity-[0.85]"
                        >
                            @lang('app.sign_up_button')
                        </a>
                    @endif
                </li>
            </ul>

            <button
                id="navbar-menu"
                class="middle none relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] rounded-lg text-center font-sans text-xs font-medium uppercase text-blue-gray-500 transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
                data-collapse-target="sticky-navar"
            >
                <span class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transform">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </span>
            </button>
        </div>
        
        <div
            id="mobile-nav"
            data-collapse="sticky-navar"
            class="block h-0 w-full basis-full overflow-hidden text-blue-gray-900 transition-all duration-300 ease-in lg:hidden"
        >
            <ul class="flex flex-col gap-4 pt-6 pb-5">
                <li>
                    <a href="#home">
                        @lang('app.home')
                    </a>
                </li>
                <li>
                    <a href="#create-link">
                        @lang('app.link')
                    </a>
                </li>
                <li>
                    <a href="#create-link">
                        @lang('app.block')
                    </a>
                </li>
                <li>
                    <a href="#create-project">
                        @lang('app.qr_code')
                    </a>
                </li>
                <li>
                    <a href="#pricing">
                        @lang('app.pricing')
                    </a>
                </li>
                <li>
                    <a data-scroll href="#testimonials">
                        @lang('app.testimonials')
                    </a>
                </li>
                
                @if (auth()->user())
                    @if ($SA)
                        @if ($customize)
                            <a
                                href="/"
                                data-ripple-light="true"
                                class="py-2.5 px-5 rounded font-medium border border-blue-500 text-blue-500"
                            >
                                @lang('app.view')
                            </a>
                        @else
                            <a
                                href="?customize=intro"
                                data-ripple-light="true"
                                class="py-2.5 px-5 rounded font-medium border border-blue-500 text-blue-500"
                            >
                                @lang('app.customize')
                            </a>
                        @endif
                    @endif
                    
                    <a
                        href="/register"
                        data-ripple-light="true"
                        class="py-2.5 px-5 rounded bg-blue-500 font-medium text-white shadow-md hover:shadow-lg hover:shadow-blue-500/40  shadow-blue-500/20 transition-all active:opacity-[0.85]"
                    >
                        @lang('app.dashboard')
                    </a>
                @else
                    <a
                        href="/login"
                        data-ripple-light="true"
                        class="py-2.5 px-5 rounded bg-gray-100 font-medium text-gray-900 transition-all active:opacity-[0.85] mr-3 border border-gray-200"
                    >
                        @lang('app.log_in')
                    </a>
                    <a
                        href="/register"
                        data-ripple-light="true"
                        class="py-2.5 px-5 rounded bg-blue-500 font-medium text-white shadow-md hover:shadow-lg hover:shadow-blue-500/40  shadow-blue-500/20 transition-all active:opacity-[0.85]"
                    >
                        @lang('app.sign_up_button')
                    </a>
                @endif
            </ul>
        </div>
    </div>
</nav>

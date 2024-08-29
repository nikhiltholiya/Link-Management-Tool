<?php
    $sections = [];
    foreach ($appSections as $item) {
        if ($item['name'] == 'Header') {
            $sections = $item;
            break;
        }
    }
?>

<div id="home"class="bg-[url('/assets/header-bg.svg')] bg-no-repeat bg-cover bg-center pt-[100px]">
    <div class="max-w-[1200px] w-full mx-auto overflow-hidden px-4 pt-8 @if($customize) home-edit @endif">
        @if ($customize)
            @include('components.icons.edit-pen', ['class'=>'w-8 h-8', 'dialog'=>'homeSection'])
        @endif
        
        <div class="max-w-[760px] w-full mx-auto text-center">
            <div
                data-aos="fade-up" 
                data-aos-duration="1500" 
                data-aos-anchor-placement="center-bottom" 
            >
                <h1 class="font-bold relative slogan-text">
                    {{ $sections->title }}
                </h1>

                @if (auth()->user())
                    <a href="/bio-links" class="my-8 py-2.5 px-5 lg:px-8 hidden lg:inline-block rounded bg-blue-500 font-medium text-white shadow-md hover:shadow-lg hover:shadow-blue-500/40  shadow-blue-500/20 transition-all active:opacity-[0.85] whitespace-nowrap">
                        @lang('app.get_another_link')
                    </a>
                @else
                    <div class="max-w-[570px] mx-auto border border-blue-500 rounded-md flex items-center p-1 pl-6 my-8">
                        <span class="input-group-text linkPrefix border-0">
                            /
                        </span>
                        <input 
                            required 
                            id="linkname" 
                            name="linkname" 
                            placeholder="yourname or linkname"
                            class="w-full bg-transparent border-0 focus:outline-0 focus:border-0 focus:ring-0"
                        />
                        <button
                            type="button"
                            id="submitLinkname"
                            data-ripple-light="true"
                            class="py-2.5 px-5 lg:px-8 hidden lg:inline-block rounded bg-blue-500 font-medium text-white shadow-md hover:shadow-lg hover:shadow-blue-500/40  shadow-blue-500/20 transition-all active:opacity-[0.85] whitespace-nowrap"
                        >
                            @lang('app.get_your_link')
                        </button>
                    </div>
                @endif
            </div>

            <div 
                data-aos="fade-up" 
                data-aos-duration="1500" 
                data-aos-anchor-placement="center-bottom"  
                class="@if($customize) home-edit @endif"
            >
                @if ($customize)
                    @include('components.icons.edit-pen', ['class'=>'w-[18px] h-[18px]', 'dialog'=>'homeSectionList'])
                @endif

                <div class="grid grid-cols-2 lg:grid-cols-4">
                    @foreach (json_decode($sections->section_list) as $list)
                        <?php
                            $encode = json_encode($list);
                            $item = json_decode($encode, true);
                        ?>
                        <div class="font-medium text-gray-700 px-2 pt-2">
                            <p class="pl-4 lg:pl-0 flex items-center">
                                @include('components.icons.'.$item['icon'], ['class'=>'text-blue-500 mr-1'])
                                {{ $item['content'] }}
                            </p>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>

        <img 
            class="mt-10" 
            width="100%" 
            src="{{ asset($sections->thumbnail) }}" 
            data-aos="fade-up" 
            data-aos-duration="1500" 
            data-aos-anchor-placement="center-bottom"  
            alt=""
        >
    </div>

    @include('components.home-edit.edit_section', ['dialog'=>'homeSection'])
    @include('components.home-edit.edit_section_list', ['dialog'=>'homeSectionList'])

    <script>
        document
            .getElementById("submitLinkname")
            ?.addEventListener("click", function(e) {
                let value = document.getElementById("linkname").value;
                window.open(`/register?linkname=${value.toLowerCase()}`, '_self');
            });
    </script>
</div>

<?php
    $sections = [];
    foreach ($appSections as $item) {
        if ($item['name'] == 'Add Blocks') {
            $sections = $item;
            break;
        }
    }
?>
<div id="create-block" class="max-w-[1200px] w-full mx-auto overflow-hidden px-4 py-20">
    <div class="@if($customize) home-edit @endif">
        @if ($customize)
            @include('components.icons.edit-pen', ['class'=>'w-8 h-8', 'dialog'=>'blocksSection'])
        @endif

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div 
                data-aos="fade-up" 
                data-aos-duration="1500" 
                data-aos-anchor-placement="center-bottom" 
                class="flex flex-col justify-center items-start"
            >
                <h4 class="font-bold">
                    {{ $sections->title }}
                </h4>
                <p class="pt-6 pb-4">
                    {{ $sections->description }}
                </p>

                <div class="ml-0 lg:ml-4 mb-5 @if($customize) home-edit @endif">
                    @if ($customize)
                        @include('components.icons.edit-pen', ['class'=>'w-[18px] h-[18px]', 'dialog'=>'blocksSectionList'])
                    @endif

                    <ul>
                        @foreach (json_decode($sections->section_list) as $list)
                            <?php
                                $encode = json_encode($list);
                                $item = json_decode($encode, true);
                            ?>
                            <li class="py-2 flex items-center">
                                @include('components.icons.double-check', ['class'=>'w-6 h-6 mr-2 text-blue-500'])
                                {{ $item['content'] }}
                            </li>
                        @endforeach
                    </ul>
                </div>

                <a
                    href="/bio-links"
                    data-ripple-light="true"
                    class="py-3 px-10 rounded bg-gray-100 font-medium text-gray-900 transition-all active:opacity-[0.85] border border-gray-200"
                >
                    @lang('app.create_link')
                </a>
            </div>

            <img 
                data-aos="fade-up" 
                data-aos-duration="1500" 
                data-aos-anchor-placement="center-bottom" 
                class="w-100 h-100 pb-5 pb-lg-0" 
                src="{{ asset($sections->thumbnail) }}" 
                alt=""
            >
        </div>
    </div>
</div>

@if ($customize)
    @include('components.home-edit.edit_section', ['dialog'=>'blocksSection'])
    @include('components.home-edit.edit_section_list', ['dialog'=>'blocksSectionList'])
@endif
<?php
    function getSection($appSections, $name)
    {
        foreach ($appSections as $item) {
            if ($item['name'] == $name) {
                return $item;
            }
        }
        return [];
    }
?>
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
                        $sections = getSection($appSections, 'Follow On');
                    ?>
                    <p class="font-medium mb-4">{{ $sections->title }}</p>
                    <div class="@if($customize) home-edit @endif">
                        @if ($customize)
                            @include('components.icons.edit-pen', ['class'=>'w-[18px] h-[18px]', 'dialog'=>'footerFollowList'])
                            @include('components.home-edit.edit_section_list', ['dialog'=>'footerFollowList'])
                        @endif
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
            </div>
            <div class="col-span-12 lg:col-span-1"></div>

            <div class="col-span-12 lg:col-span-3 text-center lg:text-start">
                <?php
                    $sections = getSection($appSections, 'Address');
                ?>
                <p class="font-medium text-lg my-5">{{ $sections->title }}</p>
                <div class="@if($customize) home-edit @endif">
                    @if ($customize)
                        @include('components.icons.edit-pen', ['class'=>'w-[18px] h-[18px]', 'dialog'=>'footerAddressList'])
                        @include('components.home-edit.edit_section_list', ['dialog'=>'footerAddressList'])
                    @endif

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
            </div>

            <div class="col-span-12 lg:col-span-3 text-center lg:text-start">
                <p class="font-medium text-lg my-5">{{__('Company')}}</p>
                <ul class="text-gray-500">
                    @if (count($customPages) > 0)
                        @foreach ($customPages as $page)
                            <li class="mb-4 last:mb-0">
                                <a href="/app/{{ $page->route }}">
                                    {{ $page->name }}
                                </a>
                            </li>
                        @endforeach
                    @else
                        <li class="mb-4 last:mb-0">
                            {{__('Here will show custom created pages from dashboard')}}
                        </li>
                    @endif
                </ul>
            </div>
        </div>
    </div>

    <div class="max-w-[1200px] w-full mx-auto px-4 py-8 text-center border-t border-t-gray-200">
        <p class="text-gray-500">{{$app->copyright}}</p>
    </div>
</section>


@if ($customize)
    @include('components.home-edit.edit_section', ['dialog'=>'createQRSection'])
    @include('components.home-edit.edit_section_list', ['dialog'=>'createQRSectionList'])
@endif
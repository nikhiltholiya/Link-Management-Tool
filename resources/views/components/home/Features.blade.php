<?php
    $features = [
        ['name' => 'Bio Links', 'icon' => 'components.icons.palette'], 
        ['name' => 'Free Features', 'icon' => 'components.icons.palette'], 
        ['name' => '19+ Themes', 'icon' => 'components.icons.palette'], 
        ['name' => 'Visitor Status Tracking', 'icon' => 'components.icons.palette'], 
        ['name' => 'Full Customizing Option', 'icon' => 'components.icons.palette']
    ];

    $sections = [];
    foreach ($appSections as $item) {
        if ($item['name'] == 'Features') {
            $sections = $item;
            break;
        }
    }
?>
<div id="features" class="max-w-[1200px] w-full mx-auto overflow-hidden px-4 py-20">
    <h4
        data-aos="fade-up" 
        data-aos-duration="1500" 
        data-aos-anchor-placement="center-bottom" 
        class="font-bold text-center mb-5"
    >
        @lang('app.features')
    </h4>

    <div class="@if($customize) home-edit @endif">
        @if ($customize)
            @include('components.icons.edit-pen', ['class'=>'w-8 h-8', 'dialog'=>'featuresSectionList'])
            @include('components.home-edit.edit_section_list', ['dialog'=>'featuresSectionList'])
        @endif

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
            @foreach (json_decode($sections->section_list) as $list)
                <?php
                    $encode = json_encode($list);
                    $item = json_decode($encode, true);
                ?>
                <div 
                    data-aos="fade-up" 
                    data-aos-duration="1500" 
                    data-aos-anchor-placement="center-bottom" 
                    class="card border-0 text-center shadow-card rounded-lg py-9 px-6 flex flex-col justify-center items-center"
                >
                    @include('components.icons.'.$item['icon'], ['class'=>'w-8 h-8 mb-4 text-blue-500'])
                    <p>{{ $item['content'] }}</p>
                </div>
            @endforeach
        </div>
    </div>
</div>

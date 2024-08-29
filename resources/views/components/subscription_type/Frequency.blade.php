<?php
   $frequency = array(
      array(
         'name'=>'Monthly Payments',
         'price'=>$plan->monthly_price,
         'class'=>'active-frequency',
         'id'=>'monthly',
         'planId'=>$planId,
      ),
      array(
         'name'=>'Yearly Payments',
         'price'=>$plan->yearly_price,
         'class'=>'',
         'id'=>'yearly',
         'planId'=>$planId,
      ),
   );
?>

<div class="mb-3" >
    @foreach($frequency as $item)
        @if ($item['price'] > 0)
            <div 
                id="{{$item['id']}}" 
                class="card p-4 mb-3 frequency {{$item['class']}}"
                onclick="frequencyHandler('{{json_encode($item)}}')"
            >
                <div class="d-flex align-items-center justify-content-between" >
                    <p>{{$item['name']}}</p>
                    <div class="d-flex align-items-end">
                        <h2>{{$item['price']}}</h2>
                        <span class="ms-1">USD</span>
                    </div>
                </div>
            </div>           
        @endif
    @endforeach
</div>
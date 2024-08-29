<?php
   $text = '';
   $background = '';

   switch ($toastType) {
      case 'error':
         $text = '#842029';
         $background = '#f8d7da';
         break;

      case 'success':
         $text = '#0f5132';
         $background = '#d1e7dd';
         break;

      case 'warning':
         $text = '#664d03';
         $background = '#fff3cd';
         break;
      
      default:
         $text = '#0f5132';
         $background = '#d1e7dd';
         break;
   }
?>
<style>
   .toastMessage { color: {{$text}} }
   .toastMessage .toast-close { color: {{$text}} }
</style>

<script>
   Toastify({
       text: "{{$message}}",
       className: "toastMessage",
       duration: 6000,
       newWindow: true,
       close: true,
       gravity: "top", // `top` or `bottom`
       position: "center", // `left`, `center` or `right`
       stopOnFocus: true, // Prevents dismissing of toast on hover
       backgroundColor: '{{$background}}',
       onClick: function(){} // Callback after click
   }).showToast();
</script>
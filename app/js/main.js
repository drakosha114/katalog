;(function($){

    $(document).ready(function(){
       $('.js-owl-small').owlCarousel({
           loop:true,
           margin:10,
           nav:false,
           responsive:{
               0:{
                   items:1
               },
               600:{
                   items:2
               },
               900:{
                   items:3
               },
               1200: {
                   items: 4
               },
               1600: {
                   items: 6
               }
           }
       });
    });

}(jQuery));
"use strict";
(() => {
   new SmoothScroll('a[href*="#"]', {
      speed: 300, // scroll speed in milliseconds
      easing: "easeInOutCubic", // easing function
      offset: 80, // distance between the top of the page and the target element
   });

   let currentScroll = 0;
   const navbar = document.getElementById("navbar");
   const navbarMenu = document.getElementById("navbar-menu");
   const mobileNav = document.getElementById("mobile-nav");

   window.addEventListener("scroll", function () {
      currentScroll = window.pageYOffset;
      const mobileNavHeight = parseInt(mobileNav.style.height);

      if (!mobileNavHeight) {
         if (currentScroll > 100) {
            navbar.classList.add(
               "shadow-nav",
               "bg-white",
               "backdrop-blur-2xl",
               "backdrop-saturate-200"
            );
         } else {
            navbar.classList.remove(
               "shadow-nav",
               "bg-white",
               "backdrop-blur-2xl",
               "backdrop-saturate-200"
            );
         }
      }
   });

   if (navbarMenu) {
      navbarMenu.addEventListener("click", () => {
         currentScroll = window.pageYOffset;
         const isNav = navbar.classList.contains("shadow-nav");
         if (currentScroll < 100) {
            if (!isNav) {
               navbar.classList.add(
                  "shadow-nav",
                  "bg-white",
                  "backdrop-blur-2xl",
                  "backdrop-saturate-200"
               );
            } else {
               setTimeout(
                  () =>
                     navbar.classList.remove(
                        "shadow-nav",
                        "bg-white",
                        "backdrop-blur-2xl",
                        "backdrop-saturate-200"
                     ),
                  300
               );
            }
         }
      });
   }

   // Templates slider
   new Swiper(".swiper-1", {
      // Optional parameters
      direction: "horizontal",
      loop: true,
      slidesPerView: 3,
      spaceBetween: 30,
      autoplay: {
         delay: 0,
         disableOnInteraction: false,
      },
      speed: 6000,
      freeMode: true,

      // Navigation arrows
      navigation: {
         nextEl: ".swiper-button-next",
         prevEl: ".swiper-button-prev",
      },
   });

   new Swiper(".swiper-container", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 30,
      speed: 2000,
      freeMode: true,
      pagination: {
         el: ".swiper-pagination",
         clickable: true,
      },
      autoplay: {
         delay: 2000,
         disableOnInteraction: false,
      },
      breakpoints: {
         768: {
            slidesPerView: 2,
         },
         1024: {
            slidesPerView: 3,
         },
      },
   });
})();

const swiper = new Swiper(".swiper", {
  loop: true,
  grabCursor: true,
  spaceBetween: 30,

  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    525: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    992: {
      slidesPerView: 3,
    },
  },

  pagination: {
    el: ".swiper-pagination",
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

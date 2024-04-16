// Function to initialize configuration of Swiper
function initializeSwiper() {
  const swiper = new Swiper(".swiper", {
    loop: true,
    grabCursor: true,
    spaceBetween: 30,
    a11y: {
      enabled: true,
      containerRoleDescriptionMessage: "list",
      slideRole: "listitem",
    },
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
}

// Function to check if Swiper is loaded and then initialize it
function checkAndInitializeSwiper() {
  if (typeof Swiper !== "undefined") {
    initializeSwiper();
  } else {
    // Retry after 100 milliseconds
    setTimeout(checkAndInitializeSwiper, 100);
  }
}

// Load Swiper script asynchronously
const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
script.async = true;

script.addEventListener("load", function () {
  checkAndInitializeSwiper();
});

document.body.appendChild(script);

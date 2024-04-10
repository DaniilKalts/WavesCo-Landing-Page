// Open/close navigation menu

const burgerButton = document.getElementById("burgerButton");
const mobileNavigationMenu = document.getElementById("mobileNavigationMenu");

burgerButton.addEventListener("click", () => {
  burgerButton.classList.toggle("is-active");
  mobileNavigationMenu.classList.toggle("is-visible");
  document.body.style.overflowY = mobileNavigationMenu.classList.contains(
    "is-visible"
  )
    ? "hidden"
    : "auto";
});

const resetNavigationMenu = () => {
  burgerButton.classList.remove("is-active");
  mobileNavigationMenu.classList.remove("is-visible");
  document.body.style.overflowY = mobileNavigationMenu.classList.contains(
    "is-visible"
  )
    ? "hidden"
    : "auto";
};

mobileNavigationMenu.addEventListener("click", (e) => {
  if (e.target === mobileNavigationMenu) {
    resetNavigationMenu();
  }
});

// Change header color on scroll

const headerNavbar = document.querySelector(".header");

window.addEventListener("scroll", (event) => {
  event.preventDefault();
  if (
    window.scrollY >= 20 &&
    !headerNavbar.classList.contains("header--filled")
  ) {
    headerNavbar.classList.add("header--filled");
  } else if (
    window.scrollY < 20 &&
    headerNavbar.classList.contains("header--filled") &&
    !mobileNavigationMenu.classList.contains("is-visible")
  ) {
    headerNavbar.classList.remove("header--filled");
  }
});

// Close navigation menu, when click on navigation menu link

const navigationMobileLinks = document.querySelectorAll(
  ".navigation-mobile__link"
);

navigationMobileLinks.forEach((item) => {
  item.addEventListener("click", resetNavigationMenu);
});
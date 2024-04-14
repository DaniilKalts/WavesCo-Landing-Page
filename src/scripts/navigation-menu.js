const navigationDesktopLinks = document.querySelectorAll(".header__menu-link");
const navigationMobileLinks = document.querySelectorAll(
  ".navigation-mobile__link"
);

// Change active link on desktop
navigationDesktopLinks.forEach((link, id) =>
  link.addEventListener("click", () => {
    navigationDesktopLinks.forEach((desktopLink, idx) => {
      desktopLink.classList.remove("is-current");
      navigationMobileLinks[idx].classList.remove("is-current");
    });

    link.classList.add("is-current");
    navigationMobileLinks[id].classList.add("is-current");
  })
);

// Open/close mobile navigation menu

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

// Close mobile navigation menu, when click on navigation menu link

navigationMobileLinks.forEach((link, id) => {
  link.addEventListener("click", () => {
    navigationMobileLinks.forEach((mobileLink, idx) => {
      mobileLink.classList.remove("is-current");
      navigationDesktopLinks[idx].classList.remove("is-current");
    });

    link.classList.add("is-current");
    navigationDesktopLinks[id].classList.add("is-current");
    resetNavigationMenu();
  });
});

// Change header color on scroll

const headerNavbar = document.querySelector(".header");

window.addEventListener("scroll", () => {
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

// Set active link on page load

const sections = Array.from(document.querySelectorAll(".section")).filter(
  (element) => element.id
);

for (let i = 0; i < navigationDesktopLinks.length; i++) {
  if (!window.location.hash) {
    navigationDesktopLinks[0].classList.add("is-current");
    navigationMobileLinks[0].classList.add("is-current");
    break;
  } else if (window.location.hash === "#" + sections[i].id) {
    navigationDesktopLinks[i].classList.add("is-current");
    navigationMobileLinks[i].classList.add("is-current");
  } else {
    navigationDesktopLinks[i].classList.remove("is-current");
    navigationMobileLinks[i].classList.remove("is-current");
  }
}

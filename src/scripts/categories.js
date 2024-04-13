const searchField = document.getElementById("soundEffect");

function onCategoryClick(category) {
  window.scrollTo(0, 0);
  searchField.value = category + " sound effect";
  searchField.style.color = "var(--color-deep-blue)";
  setTimeout(() => {
    searchField.style.color = "var(--color-gray-alt)";
  }, 3000);
}

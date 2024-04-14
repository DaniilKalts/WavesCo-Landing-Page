const searchField = document.getElementById("searchInput");

/* When clicking on a category, the page scrolls to the top.
The category text is then copied into the search input field,
and the input's background color changes for 3 seconds to indicate the action. */

function onCategoryClick(category) {
  window.scrollTo(0, 0);
  searchField.value = category + " sound effect";
  searchField.style.color = "var(--color-deep-blue)";
  setTimeout(() => {
    searchField.style.color = "var(--color-gray-alt)";
  }, 3000);
}

/* JG Construction — renders the gallery grid from js/photos.js */

(function () {
  const CATEGORIES = ["Roofing", "Electrical & Cameras", "Decks", "Remodeling"];
  const grid = document.getElementById("gallery-grid");
  const filterBar = document.getElementById("filter-bar");

  function placeholderCard(category) {
    const div = document.createElement("div");
    div.className = "placeholder-card";
    div.dataset.category = category;
    div.innerHTML = `<div class="icon">📷</div><p>${category} photos coming soon</p>`;
    return div;
  }

  function photoCard(photo) {
    const div = document.createElement("div");
    div.className = "photo-card";
    div.dataset.category = photo.category;
    div.innerHTML = `
      <img src="${photo.src}" alt="${photo.caption}" loading="lazy">
      <div class="caption">
        <div class="cat">${photo.category}</div>
        <p>${photo.caption}</p>
      </div>`;
    return div;
  }

  function render(filter) {
    grid.innerHTML = "";
    const cats = filter === "All" ? CATEGORIES : [filter];

    cats.forEach((cat) => {
      const photosInCat = PHOTOS.filter((p) => p.category === cat);
      if (photosInCat.length === 0) {
        grid.appendChild(placeholderCard(cat));
      } else {
        photosInCat.forEach((p) => grid.appendChild(photoCard(p)));
      }
    });
  }

  filterBar.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;
    filterBar.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");
    render(e.target.dataset.filter);
  });

  render("All");
})();

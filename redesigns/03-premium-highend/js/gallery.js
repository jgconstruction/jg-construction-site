/* JG Construction — renders the gallery grid from js/photos.js */

(function () {
  const CATEGORIES = ["Roofing", "Electrical & Cameras", "Decks", "Remodeling"];
  const grid = document.getElementById("gallery-grid");
  const filterBar = document.getElementById("filter-bar");

  const CAMERA_ICON = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 8.5h2.6l1.2-2h8.4l1.2 2H20a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a1 1 0 0 1 1-1Z"/>
      <circle cx="12" cy="13" r="3.4"/>
    </svg>`;

  function placeholderCard(category, index) {
    const div = document.createElement("div");
    div.className = "placeholder-card reveal reveal-" + ((index % 6) + 1);
    div.dataset.category = category;
    div.innerHTML = `
      <div class="icon-badge">${CAMERA_ICON}</div>
      <p>${category} photos coming soon</p>`;
    return div;
  }

  function photoCard(photo, index) {
    const div = document.createElement("div");
    div.className = "photo-card reveal reveal-" + ((index % 6) + 1);
    div.dataset.category = photo.category;
    div.innerHTML = `
      <div class="frame-inner">
        <img src="${photo.src}" alt="${photo.caption}" loading="lazy">
      </div>
      <div class="caption">
        <div class="cat">${photo.category}</div>
        <p>${photo.caption}</p>
      </div>`;
    return div;
  }

  function render(filter) {
    grid.innerHTML = "";
    const cats = filter === "All" ? CATEGORIES : [filter];
    let i = 0;

    cats.forEach((cat) => {
      const photosInCat = PHOTOS.filter((p) => p.category === cat);
      if (photosInCat.length === 0) {
        grid.appendChild(placeholderCard(cat, i++));
      } else {
        photosInCat.forEach((p) => grid.appendChild(photoCard(p, i++)));
      }
    });

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
      );
      grid.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    } else {
      grid.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    }
  }

  filterBar.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;
    filterBar.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");
    render(e.target.dataset.filter);
  });

  render("All");
})();

/* JG Construction — renders the gallery grid from js/photos.js
   Minimalist Editorial variant: pastel category tags, bordered cards,
   dashed placeholders, scroll-reveal on newly rendered cards. */

(function () {
  const CATEGORIES = ["Roofing", "Electrical & Cameras", "Decks", "Remodeling"];
  const CATEGORY_COLOR = {
    "Roofing": "yellow",
    "Electrical & Cameras": "blue",
    "Decks": "green",
    "Remodeling": "red"
  };

  const grid = document.getElementById("gallery-grid");
  const filterBar = document.getElementById("filter-bar");

  const PLACEHOLDER_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M8 6l1.5-2.5h5L16 6"/><circle cx="12" cy="13" r="3.2"/></svg>`;

  function placeholderCard(category) {
    const div = document.createElement("div");
    div.className = "placeholder-card reveal";
    div.dataset.category = category;
    div.innerHTML = `${PLACEHOLDER_ICON}<p>${category} photos coming soon</p>`;
    return div;
  }

  function photoCard(photo) {
    const div = document.createElement("div");
    const color = CATEGORY_COLOR[photo.category] || "yellow";
    div.className = "photo-card reveal";
    div.dataset.category = photo.category;
    div.innerHTML = `
      <div class="img-wrap">
        <img src="${photo.src}" alt="${photo.caption}" loading="lazy">
      </div>
      <div class="caption">
        <span class="tag ${color}">${photo.category}</span>
        <p>${photo.caption}</p>
      </div>`;
    return div;
  }

  function observeReveals(root) {
    const els = root.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach((el) => io.observe(el));
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

    observeReveals(grid);
  }

  filterBar.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;
    filterBar.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");
    render(e.target.dataset.filter);
  });

  render("All");
})();

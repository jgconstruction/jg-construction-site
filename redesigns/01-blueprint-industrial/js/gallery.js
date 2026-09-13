/* JG Construction — renders the blueprint-style gallery grid from js/photos.js */

(function () {
  const CATEGORIES = ["Roofing", "Electrical & Cameras", "Decks", "Remodeling"];
  const CODES = {
    "Roofing": "RF",
    "Electrical & Cameras": "CC",
    "Decks": "DK",
    "Remodeling": "RM"
  };

  const grid = document.getElementById("gallery-grid");
  const filterBar = document.getElementById("filter-bar");
  const plateCount = document.getElementById("plate-count");

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function placeholderCard(category) {
    const div = document.createElement("div");
    div.className = "placeholder-card";
    div.dataset.category = category;
    div.innerHTML = `<div class="glyph">[ NO DATA ]</div><p>No plates filed — ${category}</p>`;
    return div;
  }

  function photoCard(photo, index) {
    const div = document.createElement("div");
    div.className = "photo-card";
    div.dataset.category = photo.category;
    const code = CODES[photo.category] || "GH";
    div.innerHTML = `
      <div class="plate-head">
        <span>PLATE ${pad(index)} — ${code}</span>
        <span class="cat">${photo.category}</span>
      </div>
      <div class="frame">
        <img src="${photo.src}" alt="${photo.caption}" loading="lazy">
        <span class="corner tl">+</span>
        <span class="corner tr">+</span>
        <span class="corner bl">+</span>
        <span class="corner br">+</span>
      </div>
      <div class="caption">
        <p>${photo.caption}</p>
      </div>`;
    return div;
  }

  function render(filter) {
    grid.innerHTML = "";
    const cats = filter === "All" ? CATEGORIES : [filter];
    let shown = 0;
    let plateIndex = 0;

    cats.forEach((cat) => {
      const photosInCat = PHOTOS.filter((p) => p.category === cat);
      if (photosInCat.length === 0) {
        grid.appendChild(placeholderCard(cat));
      } else {
        photosInCat.forEach((p) => {
          plateIndex += 1;
          shown += 1;
          grid.appendChild(photoCard(p, plateIndex));
        });
      }
    });

    if (plateCount) {
      plateCount.textContent = `${pad(shown)} PLATE${shown === 1 ? "" : "S"} ON FILE`;
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

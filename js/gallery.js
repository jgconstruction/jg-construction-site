/* JG Construction — renders the gallery grid from js/photos.js (grouped by project) */

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

  function projectCard(project, index) {
    const div = document.createElement("div");
    div.className = "project-card reveal reveal-" + ((index % 6) + 1);
    div.dataset.category = project.category;

    const images = project.images
      .map(
        (img) => `
      <div class="project-img">
        <span class="tag">${img.label}</span>
        <img src="${img.src}" alt="${project.title} — ${img.label}" loading="lazy">
      </div>`
      )
      .join("");

    div.innerHTML = `
      <div class="project-head">
        <div class="cat">${project.category}</div>
        <h3>${project.title}</h3>
        <p>${project.summary}</p>
      </div>
      <div class="project-images">${images}</div>`;
    return div;
  }

  function render(filter) {
    grid.innerHTML = "";
    const cats = filter === "All" ? CATEGORIES : [filter];
    let i = 0;

    cats.forEach((cat) => {
      const projectsInCat = PROJECTS.filter((p) => p.category === cat);
      if (projectsInCat.length === 0) {
        grid.appendChild(placeholderCard(cat, i++));
      } else {
        projectsInCat.forEach((p) => grid.appendChild(projectCard(p, i++)));
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

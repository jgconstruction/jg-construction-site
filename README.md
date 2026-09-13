# JG Construction — Website

Static 3-page site for John Garcia / JG Construction (Vernon, NJ — serving North Jersey).
No build step, no framework — plain HTML/CSS/JS, ready for GitHub Pages.

## Pages
- `index.html` — Home
- `work.html` — Project gallery (filterable by category)
- `contact.html` — Contact info

## Adding real project photos
1. Drop image files into the `images/` folder (JPG/PNG, keep each under ~1–2MB — resize/compress large phone photos first so the site loads fast).
2. Open `js/photos.js` and add one entry per photo:
   ```js
   {
     src: "images/deck-rebuild-1.jpg",
     category: "Decks", // one of: "Roofing", "Electrical", "Decks", "Remodeling"
     caption: "Full deck rebuild — Franklin Lakes, NJ"
   },
   ```
3. Save and refresh `work.html` — the placeholder card for that category is replaced automatically.

## Deploying to GitHub Pages
1. Create a new repo on GitHub (e.g. `jg-construction-site`).
2. From this folder:
   ```
   git remote add origin git@github.com:<your-username>/jg-construction-site.git
   git branch -M main
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source → Deploy from branch → main / (root)**.
4. Site goes live at `https://<your-username>.github.io/jg-construction-site/`.
5. (Optional) Add a custom domain in the same Pages settings once John has one.

## Still to add
- License/insurance line on the Home page — add once confirmed by John.
- Real project photos (see above).
- An email address, if he wants one listed alongside the phone number.

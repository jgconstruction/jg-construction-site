/*
  JG Construction — project photos
  ---------------------------------
  Photos are grouped into PROJECTS so before/after (or build/finished) shots
  from the same job stay together as one card instead of scattering through
  the grid individually.

  Each project:
    category  — one of: "Roofing", "Electrical", "Decks", "Remodeling"
    title     — short project name
    summary   — one line describing the work
    images    — [{ src, label }], label is a short tag like "Before" / "After" /
                "Build" / "Finished" shown on each thumbnail

  A category with zero projects shows a "coming soon" placeholder automatically.
*/

const PROJECTS = [
  {
    category: "Remodeling",
    title: "Dining Room → Home Office",
    summary: "Full conversion: barn doors, built-in cabinetry, refinished floors.",
    images: [
      { src: "images/dining-to-office-before.jpg", label: "Before" },
      { src: "images/dining-to-office-before-2.jpg", label: "Before" },
      { src: "images/dining-to-office-after.jpg", label: "After" },
    ],
  },
  {
    category: "Decks",
    title: "Full Deck Rebuild",
    summary: "New multi-level composite deck with aluminum railing, framed and finished for everyday outdoor living.",
    images: [
      { src: "images/deck-rebuild-new-1.jpg", label: "Build" },
      { src: "images/deck-rebuild-new-2.jpg", label: "Build" },
      { src: "images/deck-rebuild-finished-1.jpg", label: "Finished" },
      { src: "images/deck-rebuild-finished-2.jpg", label: "Finished" },
    ],
  },
  {
    category: "Remodeling",
    title: "Bathroom Renovation",
    summary: "Full bathroom refresh — updated flooring, shower, and fixtures.",
    images: [
      { src: "images/bathroom-remodel-before.jpg", label: "Before" },
      { src: "images/bathroom-remodel-after.jpg", label: "After" },
    ],
  },
];

# Project detail pages — images to add

Clicking any card (or service) on the homepage opens a full project page with a
hero, copy, and an auto-sliding gallery. Until you add the gallery images, each
slot shows an elegant placeholder, so every page is already presentable.

## Two kinds of image per project

1. **Cover** — the homepage card + the page hero (most already added).
2. **Gallery (5 images)** — shown on the detail page + the auto-slider.
   Save them in the project's own folder, named **01.jpg → 05.jpg**.

Path pattern: `assets/images/projects/<project-id>/01.jpg` … `05.jpg`

Recommended: landscape or portrait JPGs, ~1600px on the long edge, < 500 KB each.

---

## Per-project list  (cover → folder for the 5 gallery images)

| Project (page) | Cover file | Gallery folder (add 01.jpg … 05.jpg) |
| --- | --- | --- |
| Azure Villa | `projects/azure-villa.jpg` | `projects/azure-villa/` |
| The Grand Living | `projects/grand-living.jpg` | `projects/the-grand-living/` |
| Sunset Penthouse | `projects/sunset-penthouse.jpg` | `projects/sunset-penthouse/` |
| The Signature Kitchen | `projects/atelier-kitchen.jpg` | `projects/stone-kitchen/` |
| Spa Sanctuary | `projects/spa-bath.jpg` | `projects/spa-bath/` |
| Courtyard Pool House | `projects/courtyard-pool.jpg` | `projects/courtyard-pool/` |
| ONYX Residences (Construction) | `projects/onyx-residences.jpg` | `projects/onyx-residences/` |
| Skyline Apartments (Architecture) | `projects/skyline-apartments.jpg` | `projects/skyline-apartments/` |
| Hillside Lounge | `gallery/living.jpg` | `projects/hillside-lounge/` |
| Culinary Studio | `gallery/kitchen.jpg` | `projects/culinary-studio/` |
| Floating Stair | `gallery/stairs.jpg` | `projects/floating-stair/` |
| Stone Bath | `gallery/bath.jpg` | `projects/stone-bath/` |
| Dining Pavilion | `gallery/dining.jpg` | `projects/dining-pavilion/` |
| Sky Terrace | `gallery/balcony.jpg` | `projects/sky-terrace/` |
| ONYX Heights (Construction) | `projects/onyx-heights.jpg` | `projects/onyx-heights/` |

### Example — Azure Villa needs:
```
assets/images/projects/azure-villa.jpg        ← cover/hero (already added)
assets/images/projects/azure-villa/01.jpg
assets/images/projects/azure-villa/02.jpg
assets/images/projects/azure-villa/03.jpg
assets/images/projects/azure-villa/04.jpg
assets/images/projects/azure-villa/05.jpg
```

## Want a clip instead of an image on a page?
Tell me which project and I'll swap that slot to a `<video>` (drop the clip at
`assets/videos/<project-id>.mp4`). Same as the homepage hero.

## Editing the text
All page copy (intro, body, services) lives in `client/src/data/content.js`.

# Master image checklist — every slot the site uses

Save files at the exact paths below (all under `client/public/assets/`).
Missing files show an elegant placeholder, so the site never looks broken.

Legend: ✅ already added · ⬜ still needed

---

## 1. Hero video carousel (homepage)  — 6 clips
Muted `.mp4` (H.264), 6–15s, < 8 MB each.

| Slot | Path | Status |
|---|---|---|
| Clip 1 | `videos/video1.mp4` | ✅ |
| Clip 2 | `videos/video2.mp4` | ✅ |
| Clip 3 | `videos/video3.mp4` | ✅ |
| Clip 4 | `videos/video4.mp4` | ✅ |
| Clip 5 | `videos/video5.mp4` | ✅ |
| Clip 6 | `videos/video6.mp4` | ✅ |

---

## 2. Project covers (homepage grid + page hero)  — 15
Landscape or portrait JPG, ~1600px long edge, < 500 KB.

| Project | Path |
|---|---|
| Azure Villa | `images/projects/azure-villa.jpg` ✅ |
| The Grand Living | `images/projects/grand-living.jpg` ✅ |
| Sunset Penthouse | `images/projects/sunset-penthouse.jpg` ✅ |
| The Signature Kitchen | `images/projects/atelier-kitchen.jpg` ✅ |
| Spa Sanctuary | `images/projects/spa-bath.jpg` ✅ |
| Courtyard Pool House | `images/projects/courtyard-pool.jpg` ✅ |
| ONYX Residences (Construction) | `images/projects/onyx-residences.jpg` ✅ |
| Skyline Apartments (Architecture) | `images/projects/skyline-apartments.jpg` ✅ |
| Hillside Lounge | `images/gallery/living.jpg` ✅ |
| Culinary Studio | `images/gallery/kitchen.jpg` ✅ |
| Floating Stair | `images/gallery/stairs.jpg` ✅ |
| Stone Bath | `images/gallery/bath.jpg` ✅ |
| Dining Pavilion | `images/gallery/dining.jpg` ✅ |
| Sky Terrace | `images/gallery/balcony.jpg` ✅ |
| ONYX Heights (Construction) | `images/projects/onyx-heights.jpg` ✅ |

---

## 3. Showcase strip (homepage horizontal scroll)  — 6
| Subject | Path |
|---|---|
| Living | `images/gallery/living.jpg` ✅ |
| Kitchen | `images/gallery/kitchen.jpg` ✅ |
| Staircase | `images/gallery/stairs.jpg` ✅ |
| Bath | `images/gallery/bath.jpg` ✅ |
| Dining | `images/gallery/dining.jpg` ✅ |
| Balcony | `images/gallery/balcony.jpg` ✅ |

---

## 4. Project DETAIL-PAGE galleries  — 5 per project (75 total) ⬜
This is the main thing still needed for each page to feel unique. Each project's
folder takes **5 images named `01.jpg`–`05.jpg`**. (Right now pages reuse the
covers/showcase, so they look full — these replace that with unique shots.)

| Project | Folder | What kind of images |
|---|---|---|
| Azure Villa | `images/projects/azure-villa/` | villa exterior + interior angles |
| The Grand Living | `images/projects/the-grand-living/` | double-height living, staircase, details |
| Sunset Penthouse | `images/projects/sunset-penthouse/` | skyline living, balcony, dusk |
| The Signature Kitchen | `images/projects/stone-kitchen/` | kitchen island + cabinetry angles |
| Spa Sanctuary | `images/projects/spa-bath/` | warm marble bathroom angles |
| Courtyard Pool House | `images/projects/courtyard-pool/` | pool, pergola, outdoor lounge |
| ONYX Residences | `images/projects/onyx-residences/` | construction stages + finished build |
| Skyline Apartments | `images/projects/skyline-apartments/` | apartment façade + units |
| Hillside Lounge | `images/projects/hillside-lounge/` | lounge / living angles |
| Culinary Studio | `images/projects/culinary-studio/` | kitchen angles |
| Floating Stair | `images/projects/floating-stair/` | staircase angles |
| Stone Bath | `images/projects/stone-bath/` | bathroom angles |
| Dining Pavilion | `images/projects/dining-pavilion/` | dining room angles |
| Sky Terrace | `images/projects/sky-terrace/` | balcony / terrace angles |
| ONYX Heights | `images/projects/onyx-heights/` | building exterior + construction |

Each = `01.jpg, 02.jpg, 03.jpg, 04.jpg, 05.jpg` inside that folder.

---

## 5. Sponsor / press logos (optional)  — up to 6 ⬜
Transparent PNG/SVG, ~300px wide. Until added, elegant serif wordmarks show.
`images/sponsors/ad.png`, `elle-decor.png`, `beautiful-homes.png`,
`casa-vogue.png`, `design-trust.png`, `the-address.png`

---

### Totals
- ✅ Done: 6 hero clips, 15 covers, 6 showcase images
- ⬜ Needed for unique detail pages: **75** (5 × 15 projects) — or fewer if you
  prefer 3 each (45). Optional: 6 sponsor logos.

# GBR Auto — site 41 of 46

A concept site built entirely from this dealership's own published material.
**Not affiliated with GBR Auto, and not an official site.**

- **Live:** https://gbr-auto-site.vercel.app
- **Repo:** [gbr-auto-site](https://github.com/omaralaa0707/gbr-auto-site)

## What this page is about

Every site in this series is built around something true and checkable about
the dealer's own account — a pattern in what they publish, a contradiction
between two of their channels, or a fact about their showroom — rather than
around a generic template. The palette, type, 3D piece and motion below were
all chosen to serve that finding.

## Design record

**Palette**
: **The first olive-khaki ground in the set** — #4E463A, the lit forecourt stone of their own building, measured off the night frontage that sits inside their own greeting artwork (L*≈36), a value between the dark cluster (L*≤25) and 40's neutral mid-grey; with ink #F2ECE2, panels at #16150F, and their real gold demoted to #C99A62 for the sign, the rules and the mark alone — gold-on-black as a whole identity belongs to 02 and is benched here for the eighth time

**Type pairing**
: Khand + Rethink Sans / Rakkas + Almarai (AR)

**3D / signature technique**
: **The Angle**: an *anamorphic* reconstruction of their GBR mark — ~2,400 instanced fragments scattered through depth along the rays from one fixed viewpoint, so the logotype resolves perfectly from that angle and collapses into unreadable debris from any other, with an alignment read-out and a slow drift back into register. The technique is the argument: an account you cannot see unless you are standing in exactly the right place

**Motion language**
: **The register**: content arrives out of register on both axes and snaps onto its guides, the way a misprinted plate is pulled back into alignment — a hard translate snap with no blur and no clip-path

## Sources

Everything on the page was sourced from:

- Instagram: https://www.instagram.com/gbr_auto.eg/
- Facebook: https://www.facebook.com/gbrauto1/
- Google Maps: https://www.google.com/maps/place/GBR+AUTO/data=!4m2!3m1!1s0x0:0x166c86cfb0da7872

Photography belongs to the dealership (or, where their frames are watermarked
by an outside studio, to that studio) and is used here only to document their
own published material. No figure on the page is invented: anything the dealer
did not publish is marked as unpublished rather than estimated.

## Running it

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build — must pass before shipping
pnpm lint     # eslint, zero warnings
```

Requires `node-linker=hoisted` in `.npmrc` (already present) or three.js peer
deps fail to resolve.

## Structure

```
src/content/media.ts      verified facts and figures — the data layer
src/content/en.ts|ar.ts   all copy, both locales, identical shapes
src/content/schema-ext.ts the page-specific content contract
src/components/webgl/     the 3D piece
src/components/site/      the page composition
src/app/globals.css       palette tokens, type, RTL overrides, motion
```

Arabic/English toggle with full RTL. All CSS direction overrides key off
`[dir="rtl"]` (never `[lang]`) and live outside `@layer`. Every Latin or
numeric fragment inside Arabic copy is wrapped in `.latin` for correct bidi.

---

Part of a 46-site series. See the [top-level README](../README.md) for the full
index and [`TRACKING.md`](../TRACKING.md) for the differentiation log.

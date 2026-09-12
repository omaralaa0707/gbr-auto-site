import type { SiteContentExt } from "./schema-ext";
import { SALES_PHONE, MAPS_URL, IG_URL, FB_URL } from "./media";

export const en: SiteContentExt = {
  locale: "en",
  dir: "ltr",
  brand: {
    name: "GBR Auto",
    shortName: "GBR",
    tagline: "New Cairo",
  },
  nav: [
    { label: "About", href: "#about" },
    { label: "The cars", href: "#showroom" },
    { label: "The mark", href: "#mark" },
    { label: "Visit", href: "#contact" },
  ],
  hero: {
    eyebrow: "{brand} — New Cairo",
    headline: "Mercedes-Benz and premium cars in New Cairo.",
    sub: "We deal in Mercedes-Benz and other premium marques, including electric cars, from our showroom at District 90 Mall on 90th Street. Call our sales line, or drop by and see the cars for yourself.",
    primaryCta: "See the cars",
    secondaryCta: "Call sales",
    imageAlt: "The GBR Auto showroom entrance lit up at night, cars parked in front.",
  },
  about: {
    heading: "About us",
    body: [
      "{brand} is a car showroom at District 90 Mall, on 90th Street in New Cairo.",
    ],
  },
  services: {
    heading: "What we deal in",
    items: [
      {
        title: "Mercedes-Benz & premium cars",
        body: "We deal in Mercedes-Benz and other premium marques, including electric models.",
      },
    ],
  },
  gallery: {
    heading: "The showroom",
    intro: "Our showroom, and the cars we deal in.",
    items: [
      {
        src: "/media/frontage-wide.jpg",
        alt: "The GBR Auto showroom frontage at night, with cars parked along the forecourt.",
      },
      {
        src: "/media/cover-render.jpg",
        alt: "GBR Auto brand artwork: the logo set over a lineup of premium cars.",
      },
    ],
  },
  contact: {
    heading: "Visit",
    intro: "Come see the cars in person, or call ahead.",
    addressLabel: "Address",
    address: "District 90 Mall, North Teseen — New Cairo",
    phoneLabel: "Sales",
    phones: [SALES_PHONE],
    mapsUrl: MAPS_URL,
    instagramUrl: IG_URL,
    facebookUrl: FB_URL,
    cta: "Call sales",
  },
  footer: {
    rights: "© {year} {brand}. All rights reserved.",
  },
  a11y: {
    toggleLanguage: "Switch to Arabic",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },

  mark: {
    heading: "The mark, in focus",
    body: [
      "Our logotype, taken apart into thousands of small pieces set at different depths in front of you.",
      "From one exact spot they line up and the mark reads whole. Drag to see it scatter, and settle back into register.",
    ],
    hint: "Drag to bring the mark into register.",
    alignedLabel: "In register",
    driftLabel: "Out of register",
  },
};

export default en;

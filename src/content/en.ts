import type { SiteContentExt } from "./schema-ext";
import { PHONES, MAPS_URL, IG_URL, FB_URL } from "./media";

export const en: SiteContentExt = {
  locale: "en",
  dir: "ltr",
  brand: {
    name: "GBR Auto",
    shortName: "GBR",
    tagline: "New Cairo",
  },
  nav: [
    { label: "The empty grid", href: "#absence" },
    { label: "A calendar", href: "#calendar" },
    { label: "One car", href: "#only-car" },
    { label: "The frontage", href: "#frontage" },
    { label: "Five labels", href: "#labels" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    eyebrow: "{brand} — New Cairo",
    headline: "A calendar, not a catalogue.",
    sub: "Instagram states {stated} posts and opens none of them. Everything this page could reach — {images} images, {captions} caption, {cars} car ever named — comes from Facebook, from two profile bios, and from a map pin. {greetings} of those {images} images are holiday greetings.",
    primaryCta: "See what is reachable",
    secondaryCta: "Call sales",
  },
  about: {
    heading: "What could be reached",
    body: [
      "{brand} sells cars from a unit in the mall on 90 Street, New Cairo. That sentence is close to the whole of what its own channels state outright, and this page is built from nothing else.",
      "Instagram carries {stated} posts and returns {reachable} of them to a visitor who is not logged in — not a thinned grid, an empty one. Facebook fills the gap only partly: {images} images and {captions} caption in total. A young dealership with little published material is an ordinary thing, and this page does not speculate beyond what it can see.",
      "So the page is arranged around the shape of the record rather than around an inventory. Where it quotes, it quotes verbatim. Where it reads something into the material, it says so in the sentence.",
    ],
  },
  services: {
    heading: "What the material evidences",
    intro:
      "No list of services is published anywhere. What follows is only what the {images} reachable images actually show.",
    items: [
      {
        title: "Sales of high-end cars",
        body: "One model is named in the whole record, and the story highlights add a marque, a powertrain and a status. That is the extent of the published inventory: a marque, a segment, and a single car.",
      },
      {
        title: "A showroom on 90 Street",
        body: "One plate announces the opening and prints the address. Behind its lettering sits the only real photograph they have published — their own lit frontage at night, on a stepped forecourt.",
      },
      {
        title: "Hiring",
        body: "One plate advertises two roles, an accountant and sales staff, asks for nought to three years, and prefers — without requiring — prior experience with luxury marques. It carries a number printed nowhere else.",
      },
      {
        title: "Greetings, on both calendars",
        body: "{greetings} of the {images} images mark a holiday: Eid al-Adha, Eid, and Easter. Muslim and Christian dates alike. This is the page's spine, and it is what the account mostly does.",
      },
    ],
  },
  gallery: {
    heading: "The published plates",
    intro:
      "All {images} reachable images, whole and uncropped. Every one is the dealership's own designed artwork — a poster, a logotype or a render — and none is a photograph of a showroom.",
    items: [
      {
        src: "/media/cover-render.jpg",
        alt: "Designed cover artwork: a manufacturer-style composite render of a car, with the GBR AUTO logotype set over it.",
        caption: "The cover. A composite render in the manner of a manufacturer's own press image, not a car on their floor.",
      },
      {
        src: "/media/poster-glc200.jpg",
        alt: "Designed poster artwork naming a Mercedes GLC 200, with the GBR AUTO logotype.",
        caption: "The one plate that names a car.",
      },
      {
        src: "/media/poster-open.jpg",
        alt: "Designed announcement poster reading GBR AUTO NOW AT 90 DISTRICT MALL, set over a night photograph of the dealership's own frontage.",
        caption: "The opening announcement. The photograph behind the lettering is their premises.",
      },
      {
        src: "/media/poster-hiring.jpg",
        alt: "Designed recruitment poster reading WE'RE HIRING, listing an accountant and sales roles in Arabic, with an address and a contact number.",
        caption: "Two roles, and the only appearance of the recruitment number.",
      },
      {
        src: "/media/poster-eid-adha.jpg",
        alt: "Designed greeting artwork reading Eid Adha Mubarak in English and Arabic.",
        caption: "Eid al-Adha.",
      },
      {
        src: "/media/poster-eid.jpg",
        alt: "Designed greeting artwork reading Eid Mubarak in Arabic, set over a night photograph of the dealership's frontage.",
        caption: "Eid, over the frontage at night.",
      },
      {
        src: "/media/poster-easter.jpg",
        alt: "Designed greeting artwork reading HAPPY EASTER in English and Arabic, set over a night photograph of the dealership's frontage.",
        caption: "Easter, greeted in both languages.",
      },
      {
        src: "/media/mark-white.jpg",
        alt: "The GBR AUTO logotype in white on a dark plate.",
        caption: "The logotype alone.",
      },
      {
        src: "/media/mark-gold.jpg",
        alt: "The GBR AUTO logotype in gold on a dark plate.",
        caption: "The same mark in gold — their own colour for it.",
      },
    ],
  },
  contact: {
    heading: "Contact",
    intro:
      "Two numbers, each published for a different job and never printed together. Three addresses for one unit, all of them theirs. Nothing below is corrected.",
    addressLabel: "Address",
    address: "District 90 Mall, North Teseen — New Cairo",
    phoneLabel: "Numbers",
    phones: PHONES.map((p) => p.number),
    hoursLabel: "Opening hours",
    hours: "Not published on any of their channels.",
    mapsUrl: MAPS_URL,
    instagramUrl: IG_URL,
    facebookUrl: FB_URL,
    cta: "Call sales",
  },
  footer: {
    disclaimer:
      "This is an unofficial concept design, made as a portfolio exercise. It is not affiliated with, endorsed by, or operated by {brand}. All artwork, photography and quoted text remain the dealership's own.",
    rights: "Concept design. Artwork and photography: {brand}.",
  },
  a11y: {
    toggleLanguage: "Switch to Arabic",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },

  absence: {
    heading: "{stated} posts, and not one of them opens",
    body: [
      "Instagram's own header states {stated} posts. To a visitor who is not logged in the grid returns {reachable} — repeatedly, across separate attempts, on a profile that is public and not private. Two earlier dealerships in this series gave up two posts out of forty-seven and six out of a hundred and sixty-two. This one gives up none.",
      "That is the finding, and it is stated here rather than worked around. What follows was assembled instead from Facebook, from the Instagram and Facebook bios, and from the map pin their own Facebook page links to: {images} images and {captions} caption in total.",
      "Nothing here reads the empty grid as a sign about the business. A dealership that has not published much yet has not published much yet.",
    ],
    statLabels: {
      stated: "posts stated on Instagram",
      reachable: "open to a logged-out visitor",
      images: "images reachable on Facebook",
      captions: "caption in the whole record",
    },
    emptyLabel: "no post returned",
    gridCaption:
      "A grid of {stated} cells, one for each stated Instagram post. Every cell is empty because no post renders to a logged-out visitor.",
    sourcesLabel: "What the page is built from",
    sources: [
      "Facebook — {images} images, {captions} caption",
      "Instagram bio — the sales number and one address",
      "Facebook bio — the page category, as left at its default",
      "Google Maps — reached through the link on their own Facebook page",
    ],
  },

  calendar: {
    heading: "A calendar, not a catalogue",
    intro:
      "The {images} images, sorted by what each one is actually for. {greetings} of them mark a holiday; {cars} names a car.",
    body: [
      "Sort the reachable images by purpose and the account's habit is plain. Two are the logotype on its own. One is a composite render used as the cover. One announces the address. One advertises jobs. One names a car. The remaining {greetings} are greetings: Eid al-Adha, Eid, and Easter — the Muslim and Christian calendars both observed, in Arabic and in English.",
      "So the page they run is a calendar. It marks the dates that matter to the people who walk past the unit, and it does not run a stock list. That reading is this page's own; the account never explains itself, and there is no caption anywhere that would.",
      "Every plate below is shown whole, as the piece of design it is. None has been cropped to pass for a photograph of a showroom.",
    ],
    kindLabels: {
      car: "Car",
      job: "Hiring",
      address: "Address",
      greeting: "Greeting",
      mark: "Logotype",
      render: "Cover render",
    },
    pieceNotes: {
      glc200:
        "The only model named anywhere in the reachable record. A designed plate rather than a photograph of a car on their floor.",
      hiring:
        "Two roles — an accountant and sales staff — nought to three years, prior experience with luxury marques preferred and not required. It prints the recruitment number, which appears in no other piece.",
      open:
        "The opening announcement, and the only plate that prints an address. The night photograph behind the lettering is their own frontage.",
      "eid-adha":
        "Eid al-Adha, greeted in English and Arabic together. No car, no address, no number.",
      eid: "Eid, the lettering set over their frontage at night.",
      easter:
        "Easter. The account keeps both calendars, and greets each in both languages.",
      "mark-white":
        "The logotype alone, white on a dark plate. Nothing else is stated on it.",
      "mark-gold":
        "The same logotype in gold — their own colour for the mark, and the source of the accent used sparingly on this page.",
      cover:
        "A manufacturer-style composite render, used as the page's cover image. A studio construction, not their showroom.",
    },
    printedLabel: "Printed on the artwork",
    carriesFrontageLabel: "carries the real frontage",
    artworkNote:
      "Every image in this section is the dealership's own designed artwork and is presented as artwork. The only real photography they have published sits inside three of these plates.",
  },

  onlyCar: {
    heading: "One car, named once",
    body: [
      "Across {stated} stated posts and {images} reachable images, exactly {cars} car is named: a plate that prints a marque and a model and nothing else — no year, no paint, no price, no mileage, no specification.",
      "The story highlights add a little around it — a marque, a powertrain, a status — but no second model name appears anywhere. Alongside it sits the single caption Facebook returns, an opening blessing rather than a listing.",
    ],
    label: "The only model named",
    captionLabel: "The only caption",
    captionGloss:
      "An opening blessing — roughly, may God make it an opening of good fortune. The rendering is this page's, not theirs.",
  },

  frontage: {
    heading: "The premises, from inside their own artwork",
    body: [
      "They have published one real photograph, and it is not published as a photograph. It sits behind the lettering on three of the greeting plates: a curved, colonnaded mall frontage at night, warm amber uplighting across sandy stone, an illuminated GBR AUTO sign over the entrance, and a red glow inside the showroom glass.",
      "In front of it, an arc of cars stands on a stepped forecourt with lights set into the steps. That forecourt stone, lit, is where this page's colours come from: the olive-khaki ground, the amber of the sign, the red behind the glass.",
    ],
    credit:
      "Both crops are taken from inside the dealership's own greeting artwork, where this photograph sits behind the lettering. Neither was made for this page, and neither is a showroom photograph.",
    captions: [
      "The entrance at night: the sign lit over the doors, red light inside the glass.",
      "The wider frontage: the colonnade, the stepped forecourt, and the arc of parked cars.",
    ],
  },

  labels: {
    heading: "Five highlights, five different axes",
    intro:
      "Instagram renders {n} story highlights. No two of them sort on the same thing.",
    axisLabel: "Sorts by",
    note:
      "A marque, a status, a powertrain, the brand itself, and everything. Read strictly, the set overlaps at every point: the Mercedes-Benz cars are inside All Cars, the sold ones may be in either, and GBR contains whatever the shop wants it to. This page reads that as five separate attempts at the same shelf rather than one taxonomy — but that is a reading, and the account never labels its labels.",
    axisNames: {
      marque: "marque",
      status: "status",
      powertrain: "powertrain",
      "the brand itself": "the brand itself",
      everything: "everything",
    },
  },

  contactExt: {
    heading: "Two numbers, three addresses",
    intro:
      "The sales line {salesPhone} appears in the Instagram bio. The recruitment line {recruitPhone} appears on the hiring plate. Neither channel prints the two together, and neither number appears twice.",
    roleLabels: { sales: "Sales", recruitment: "Recruitment" },
    whereLabels: {
      "instagram-bio": "printed in the Instagram bio",
      "hiring-poster": "printed on the hiring plate",
    },
    addressHeading: "Three addresses for one unit",
    addressNote:
      "The bio, their own announcement plate and the map pin each write the address differently. All three are published by the dealership or by the link it points at, so all three are kept here and none is corrected.",
    addressTexts: {
      "instagram-bio": "District 90 Mall, North Teseen — New Cairo",
      "their own announcement poster": "90 District Mall",
      "google-maps, via the link on their own Facebook page":
        "St 90, in front of Maxim Mall, New Cairo 1, Cairo Governorate 4742040",
    },
    sourceLabels: {
      "instagram-bio": "Instagram bio",
      "their own announcement poster": "Their own announcement plate",
      "google-maps, via the link on their own Facebook page":
        "Google Maps, via the link on their Facebook page",
    },
    categoryLabel: "Facebook category",
    categoryNote:
      "The page is still filed under {category} — the generic default, never changed to Car dealership.",
  },

  mark: {
    heading: "Out of register",
    body: [
      "The logotype is the one thing they published twice: once in white, once in gold, on plates that state nothing else. It is the closest thing to a fixed asset in the whole record.",
      "Here it is set out of register and brought back onto its guides, the way a misprinted plate is pulled into alignment. The letters are theirs; the misalignment is this page's, and it resolves.",
    ],
    hint: "Drag to pull the plates apart.",
    alignedLabel: "In register",
    driftLabel: "Out of register",
  },

  counts: {
    heading: "The whole record, counted",
    intro: "Everything this page could reach, in full.",
    items: [
      { value: "{stated}", label: "posts stated on Instagram" },
      { value: "{reachable}", label: "of them open to a logged-out visitor" },
      { value: "{images}", label: "images reachable on Facebook" },
      { value: "{captions}", label: "caption in the whole record" },
      { value: "{cars}", label: "car named anywhere" },
      { value: "{greetings}", label: "of the images are holiday greetings" },
      { value: "{igFollowers}", label: "Instagram followers" },
      { value: "{fbFollowers}", label: "Facebook followers" },
    ],
  },

  register: {
    noscript:
      "Motion is off, so this page arrives already in register. Nothing below depends on it.",
    reducedMotion:
      "Reduced motion is set, so the page arrives aligned rather than snapping into place.",
  },
};

export default en;

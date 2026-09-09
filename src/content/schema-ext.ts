import type { SiteContent } from "@/i18n/schema";
import type { Kind } from "./media";

/**
 * GBR Auto — the page-specific copy layer.
 *
 * Nothing here restates a figure that `media.ts` already holds. Where a number
 * belongs inside a sentence, the sentence carries a `{token}` and the section
 * substitutes it — in Arabic the substitution MUST be rendered inside
 * `<span className="latin">…</span>` so a Latin digit run keeps its own font and
 * does not get reordered against the Arabic around it. Never store a function in
 * this object: it crosses the server → client boundary.
 *
 * TOKENS (identical in both locales, so one substitution path serves both):
 *   {brand}        brand.name                 "GBR Auto"
 *   {stated}       IG_POSTS_STATED            62
 *   {reachable}    IG_POSTS_REACHABLE         0
 *   {images}       IMAGES_REACHABLE           9
 *   {captions}     CAPTIONS_REACHABLE         1
 *   {cars}         CARS_NAMED                 1
 *   {greetings}    GREETINGS                  4
 *   {igFollowers}  IG_FOLLOWERS               "1,596"
 *   {fbFollowers}  FB_FOLLOWERS               "867"
 *   {category}     FB_CATEGORY                "Vehicle, aircraft and boat"
 *   {salesPhone}   PHONES sales number        "01222278858"
 *   {recruitPhone} PHONES recruitment number  "01116661512"
 *   {n}            a local count supplied by the row being rendered
 *
 * Verbatim dealer text (the caption, the printed lines, the highlight labels)
 * is quoted as published in BOTH locales and is never translated.
 */

/** Multi-paragraph body copy. One string per paragraph, in order. */
export type Paragraphs = string[];

/** The 62-stated / 0-reachable finding. This page's opening premise. */
export type AbsenceCopy = {
  heading: string;
  /** Uses {stated}, {reachable}, {images}, {captions}. */
  body: Paragraphs;
  /** Labels for the four counters that sit beside the empty grid. */
  statLabels: {
    /** Beside {stated}. */
    stated: string;
    /** Beside {reachable}. */
    reachable: string;
    /** Beside {images}. */
    images: string;
    /** Beside {captions}. */
    captions: string;
  };
  /** Printed inside each empty cell of the unreachable grid. */
  emptyLabel: string;
  /** Screen-reader summary for that grid. Uses {stated}. */
  gridCaption: string;
  /** Where the rest of the page's material actually came from. */
  sourcesLabel: string;
  sources: string[];
};

/** The nine pieces, read as a calendar rather than a catalogue. */
export type CalendarCopy = {
  heading: string;
  /** Uses {images}, {greetings}. */
  intro: string;
  /** Uses {images}, {greetings}, {cars}, {captions}. */
  body: Paragraphs;
  /** One label per Piece.kind. */
  kindLabels: Record<Kind, string>;
  /** Keyed by Piece.id: glc200, hiring, open, eid-adha, eid, easter, mark-white, mark-gold, cover. */
  pieceNotes: Record<string, string>;
  /** Heads the verbatim `printed` lines of a piece. */
  printedLabel: string;
  /** Badge on a piece whose artwork carries the real frontage photograph. */
  carriesFrontageLabel: string;
  /** The standing integrity note: every piece is designed artwork, shown whole. */
  artworkNote: string;
};

/** One model name in the whole reachable record, and one caption. */
export type OnlyCarCopy = {
  heading: string;
  /** Uses {cars}, {images}, {stated}. */
  body: Paragraphs;
  /** Sits above the model name itself. */
  label: string;
  /** Sits above the one quoted caption. */
  captionLabel: string;
  /** Plain gloss of that caption, marked as this page's rendering of it. */
  captionGloss: string;
};

/** The real premises, cropped out of their own greeting artwork. */
export type FrontageCopy = {
  heading: string;
  body: Paragraphs;
  /** The standing credit line: this photograph is theirs, and where it sits. */
  credit: string;
  /** One caption per entry in FRONTAGE, in the same order. */
  captions: string[];
};

/** Five story highlights, each labelled on a different axis. */
export type LabelsCopy = {
  heading: string;
  /** Uses {n} for the highlight count. */
  intro: string;
  /** Column/row head for the axis a label sorts on. */
  axisLabel: string;
  /** This page's own reading, marked as such. */
  note: string;
  /** Keyed by HIGHLIGHTS[].axis: marque, status, powertrain, "the brand itself", everything. */
  axisNames: Record<string, string>;
};

/** Two numbers for two different jobs, and three published addresses. */
export type ContactExtCopy = {
  heading: string;
  /** Uses {salesPhone}, {recruitPhone}. */
  intro: string;
  roleLabels: { sales: string; recruitment: string };
  /** Keyed by PHONES[].where: "instagram-bio", "hiring-poster". */
  whereLabels: Record<string, string>;
  addressHeading: string;
  /** Three addresses, all theirs, none corrected. */
  addressNote: string;
  /** Keyed by ADDRESSES[].source — the localised address line for that source. */
  addressTexts: Record<string, string>;
  /** Keyed by ADDRESSES[].source — where it was published. */
  sourceLabels: Record<string, string>;
  /** Heads the Facebook category row. */
  categoryLabel: string;
  /** Uses {category}. */
  categoryNote: string;
};

/** The logotype taken off its guides and brought back — the WebGL piece. */
export type MarkCopy = {
  heading: string;
  body: Paragraphs;
  /** Pointer affordance, shown only where a pointer exists. */
  hint: string;
  /** State label once the plates have settled onto their guides. */
  alignedLabel: string;
  /** State label while the plates are still off their guides. */
  driftLabel: string;
};

export type CountsCopy = {
  heading: string;
  intro: string;
  /** `value` is a token string resolved from media.ts; `label` is the prose. */
  items: { value: string; label: string }[];
};

/** Copy for the arrival motion — the misprint snapping back into register. */
export type RegisterCopy = {
  /** Shown inside <noscript>. */
  noscript: string;
  /** Shown where prefers-reduced-motion is set. */
  reducedMotion: string;
};

export type SiteContentExt = SiteContent & {
  absence: AbsenceCopy;
  calendar: CalendarCopy;
  onlyCar: OnlyCarCopy;
  frontage: FrontageCopy;
  labels: LabelsCopy;
  contactExt: ContactExtCopy;
  mark: MarkCopy;
  counts: CountsCopy;
  register: RegisterCopy;
};

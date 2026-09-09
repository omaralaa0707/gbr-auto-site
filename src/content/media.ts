/**
 * GBR Auto — sourced facts.
 *
 * This is the thinnest source in the whole series, and the thinness is the
 * finding rather than an obstacle to work around.
 *
 * Instagram (@gbr_auto.eg) states 62 posts. **Not one of them renders to a
 * logged-out visitor** — the grid returns zero post links across repeated
 * attempts, where site 29 managed two of forty-seven and site 31 six of
 * one-hundred-and-sixty-two. Everything below therefore comes from Facebook,
 * from the two profile bios, and from Google Maps.
 *
 * Facebook (GBR AUTO, 867 followers) yields nine reachable images and exactly
 * one caption. Of those nine: two are plain logo plates, one is a
 * manufacturer-style composite render used as the cover, one names a car, one
 * advertises two jobs, one announces the address — and four are calendar
 * greetings. The account publishes a calendar, not a catalogue.
 *
 * Every image here is the dealer's own designed artwork, and is presented as
 * artwork. The only real photography they have published sits *inside* that
 * artwork — a night view of their frontage behind the greeting lettering —
 * and is credited as such rather than passed off as a showroom photograph.
 */

export type Kind = "car" | "job" | "address" | "greeting" | "mark" | "render";

export type Piece = {
  id: string;
  kind: Kind;
  image: string;
  /** Text set in the artwork itself, transcribed verbatim. */
  printed: string[];
  /** True where the piece carries a real photograph of their own premises. */
  carriesFrontage: boolean;
};

export const PIECES: Piece[] = [
  {
    id: "glc200",
    kind: "car",
    image: "/media/poster-glc200.jpg",
    printed: ["MERCEDES GLC 200"],
    carriesFrontage: false,
  },
  {
    id: "hiring",
    kind: "job",
    image: "/media/poster-hiring.jpg",
    printed: [
      "WE'RE HIRING",
      "محاسب",
      "مسؤولين مبيعات",
      "يُفضل الخبرة السابقة بمجال السيارات الفارهة",
      "PRIOR EXPERIENCE WITH LUXURY AUTOMOTIVE BRANDS IS PREFERRED.",
      "EXPERIENCE REQUIRED: 0-3 YEARS OF EXPERIENCE",
      "DISTRICT 90 MALL, NEW CAIRO",
      "CONTACT 0111 6661512",
    ],
    carriesFrontage: false,
  },
  {
    id: "open",
    kind: "address",
    image: "/media/poster-open.jpg",
    printed: ["GBR AUTO", "NOW", "AT 90 DISTRICT MALL"],
    carriesFrontage: true,
  },
  {
    id: "eid-adha",
    kind: "greeting",
    image: "/media/poster-eid-adha.jpg",
    printed: ["Eid Adha Mubarak", "عيد الأضحى"],
    carriesFrontage: false,
  },
  {
    id: "eid",
    kind: "greeting",
    image: "/media/poster-eid.jpg",
    printed: ["عيد مبارك"],
    carriesFrontage: true,
  },
  {
    id: "easter",
    kind: "greeting",
    image: "/media/poster-easter.jpg",
    printed: ["HAPPY EASTER", "عيد قيامة مجيد"],
    carriesFrontage: true,
  },
  {
    id: "mark-white",
    kind: "mark",
    image: "/media/mark-white.jpg",
    printed: ["GBR", "AUTO"],
    carriesFrontage: false,
  },
  {
    id: "mark-gold",
    kind: "mark",
    image: "/media/mark-gold.jpg",
    printed: ["GBR", "AUTO"],
    carriesFrontage: false,
  },
  {
    id: "cover",
    kind: "render",
    image: "/media/cover-render.jpg",
    printed: ["GBR", "AUTO"],
    carriesFrontage: false,
  },
];

/** The one and only model name anywhere in the reachable material. */
export const ONLY_CAR = "Mercedes GLC 200";

/** The one and only caption Facebook returns, verbatim. */
export const ONLY_CAPTION = "ربنا يجعلها فتحت خير";

/** The real frontage, cropped out of their own greeting artwork. */
export const FRONTAGE = ["/media/frontage-night.jpg", "/media/frontage-wide.jpg"];

/**
 * Two numbers, each published for a different job and never together.
 * `where` is where it was actually printed.
 */
export const PHONES: { number: string; role: "sales" | "recruitment"; where: string }[] = [
  { number: "01222278858", role: "sales", where: "instagram-bio" },
  { number: "01116661512", role: "recruitment", where: "hiring-poster" },
];

/**
 * Two addresses for one business, both published by the dealer's own
 * channels. Neither is corrected here.
 */
export const ADDRESSES: { text: string; source: string }[] = [
  { text: "District 90 Mall, North Teseen — New Cairo", source: "instagram-bio" },
  { text: "90 District Mall", source: "their own announcement poster" },
  {
    text: "St 90, in front of Maxim Mall, New Cairo 1, Cairo Governorate 4742040",
    source: "google-maps, via the link on their own Facebook page",
  },
];

/** The five story highlights Instagram renders — five different kinds of label. */
export const HIGHLIGHTS: { label: string; axis: string }[] = [
  { label: "Mercedes-Benz", axis: "marque" },
  { label: "Sold Cars", axis: "status" },
  { label: "Electric", axis: "powertrain" },
  { label: "GBR", axis: "the brand itself" },
  { label: "All Cars", axis: "everything" },
];

export const IG_HANDLE = "gbr_auto.eg";
export const IG_FOLLOWERS = "1,596";
export const IG_FOLLOWING = 1;
export const IG_POSTS_STATED = 62;
export const IG_POSTS_REACHABLE = 0;
export const FB_NAME = "GBR AUTO";
export const FB_FOLLOWERS = "867";
export const FB_FOLLOWING = 1;
export const FB_REVIEWS = 1;
/** Facebook's generic default, never changed to "Car dealership". */
export const FB_CATEGORY = "Vehicle, aircraft and boat";

export const IMAGES_REACHABLE = PIECES.length;
export const CAPTIONS_REACHABLE = 1;
export const CARS_NAMED = 1;
export const GREETINGS = PIECES.filter((p) => p.kind === "greeting").length;

export const MAPS_URL =
  "https://maps.app.goo.gl/oZzV7Z8QqzmsTqj56";
export const IG_URL = "https://www.instagram.com/gbr_auto.eg/";
export const FB_URL = "https://www.facebook.com/gbrauto1/";

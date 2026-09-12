import type { SiteContentExt } from "./schema-ext";
import { SALES_PHONE, MAPS_URL, IG_URL, FB_URL } from "./media";

export const ar: SiteContentExt = {
  locale: "ar",
  dir: "rtl",
  brand: {
    name: "GBR Auto",
    shortName: "GBR",
    tagline: "التجمع الخامس",
  },
  nav: [
    { label: "عن المعرض", href: "#about" },
    { label: "العربيات", href: "#showroom" },
    { label: "الشعار", href: "#mark" },
    { label: "زورنا", href: "#contact" },
  ],
  hero: {
    eyebrow: "{brand} — التجمع الخامس",
    headline: "مرسيدس وعربيات فاخرة في التجمع.",
    sub: "عندنا مرسيدس وماركات فاخرة تانية، وفيها عربيات كهربا كمان، في معرضنا بديستريكت 90 مول على شارع التسعين. اتصل بالمبيعات، أو تعالى شوف العربيات بنفسك.",
    primaryCta: "شوف العربيات",
    secondaryCta: "اتصل بينا",
    imageAlt: "مدخل معرض جي بي آر أوتو مضاء ليلاً، وعربيات واقفة قدامه.",
  },
  about: {
    heading: "عن المعرض",
    body: [
      "معرض {brand} في ديستريكت 90 مول، على شارع التسعين في التجمع الخامس.",
    ],
  },
  services: {
    heading: "بنتعامل في إيه",
    items: [
      {
        title: "مرسيدس وعربيات فاخرة",
        body: "بنتعامل في مرسيدس وماركات فاخرة تانية، وفيها عربيات كهربا كمان.",
      },
    ],
  },
  gallery: {
    heading: "المعرض",
    intro: "شوية صور من المعرض والعربيات اللي بنتعامل فيها.",
    items: [
      {
        src: "/media/frontage-wide.jpg",
        alt: "واجهة معرض جي بي آر أوتو ليلاً، وعربيات واقفة قدامه.",
      },
      {
        src: "/media/cover-render.jpg",
        alt: "تصميم لهوية جي بي آر أوتو، والشعار فوق صف عربيات.",
      },
    ],
  },
  contact: {
    heading: "زورنا",
    intro: "تعالى شوف العربيات بنفسك، أو اتصل بينا الأول.",
    addressLabel: "العنوان",
    address: "ديستريكت 90 مول، شارع التسعين، التجمع الخامس",
    phoneLabel: "المبيعات",
    phones: [SALES_PHONE],
    mapsUrl: MAPS_URL,
    instagramUrl: IG_URL,
    facebookUrl: FB_URL,
    cta: "اتصل بالمبيعات",
  },
  footer: {
    rights: "© {year} {brand}. كل الحقوق محفوظة.",
  },
  a11y: {
    toggleLanguage: "التبديل إلى الإنجليزية",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
  },

  mark: {
    heading: "شعارنا بيتظبط قدامك",
    body: [
      "ده شعارنا، مقسّم لآلاف القطع الصغيرة، كل واحدة على عمق مختلف قدامك.",
      "من زاوية واحدة بالظبط بيتظبطوا كلهم ويبان الشعار كامل. اسحب تشوفه يتبعتر، وبعدين يرجع يتظبط.",
    ],
    hint: "اسحب لحد ما الشعار يبقى مضبوط.",
    alignedLabel: "مضبوط",
    driftLabel: "لسه مش مضبوط",
  },
};

export default ar;

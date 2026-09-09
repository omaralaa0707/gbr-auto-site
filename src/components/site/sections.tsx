"use client";

/**
 * GBR Auto — New Cairo. Site 41 of the series.
 *
 * The thinnest source in the set, and the thinness is the subject: Instagram
 * states 62 posts and opens none of them, so the whole page is built from nine
 * Facebook images, two bios and a map pin. Every one of those nine images is
 * the dealer's own designed artwork and is presented as artwork — never cropped
 * to pass for a photograph of a showroom.
 *
 * Arrival motion is "the register": content lands off its guides on both axes
 * and snaps back, the way a misprinted plate is re-seated. The offsets are
 * hashed from the item index, never Math.random, so nothing depends on a random
 * seed agreeing between server and client.
 */

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import { LocaleProvider, useLocale } from "@/i18n/locale-provider";
import { Anamorph } from "@/components/webgl/anamorph";
import { en } from "@/content/en";
import { ar } from "@/content/ar";
import type { SiteContentExt } from "@/content/schema-ext";
import {
  ADDRESSES,
  CAPTIONS_REACHABLE,
  CARS_NAMED,
  FB_CATEGORY,
  FB_FOLLOWERS,
  FB_FOLLOWING,
  FB_NAME,
  FB_REVIEWS,
  FRONTAGE,
  GREETINGS,
  HIGHLIGHTS,
  IG_FOLLOWERS,
  IG_FOLLOWING,
  IG_HANDLE,
  IG_POSTS_REACHABLE,
  IG_POSTS_STATED,
  IMAGES_REACHABLE,
  ONLY_CAPTION,
  ONLY_CAR,
  PHONES,
  PIECES,
  type Kind,
  type Piece,
} from "@/content/media";

/* ------------------------------------------------------------------ tokens */

const SALES = PHONES.find((p) => p.role === "sales")?.number ?? "";
const RECRUIT = PHONES.find((p) => p.role === "recruitment")?.number ?? "";

const TOKENS: Record<string, string> = {
  brand: "GBR Auto",
  stated: String(IG_POSTS_STATED),
  reachable: String(IG_POSTS_REACHABLE),
  images: String(IMAGES_REACHABLE),
  captions: String(CAPTIONS_REACHABLE),
  cars: String(CARS_NAMED),
  greetings: String(GREETINGS),
  igFollowers: IG_FOLLOWERS,
  fbFollowers: FB_FOLLOWERS,
  category: FB_CATEGORY,
  salesPhone: SALES,
  recruitPhone: RECRUIT,
};

/**
 * Substitutes {token}s and wraps every substituted value in `.latin`. A bare
 * digit run sitting between two Arabic words has no strong direction of its own
 * and is reordered independently under RTL, so every Latin fragment has to be
 * isolated rather than interpolated as raw text.
 */
function T({ s, v }: { s: string; v?: Record<string, string | number> }) {
  const map: Record<string, string> = { ...TOKENS };
  if (v) for (const k of Object.keys(v)) map[k] = String(v[k]);
  const parts = s.split(/(\{[a-zA-Z]+\})/g);
  return (
    <>
      {parts.map((p, i) => {
        const m = /^\{([a-zA-Z]+)\}$/.exec(p);
        if (!m || map[m[1]] === undefined) return <span key={i}>{p}</span>;
        return (
          <span key={i} className="latin">
            {map[m[1]]}
          </span>
        );
      })}
    </>
  );
}

/** A Latin/numeric fragment sitting inside copy of either locale. */
function L({ children }: { children: ReactNode }) {
  return <span className="latin">{children}</span>;
}

const ARABIC = /[؀-ۿݐ-ݿ]/;

/**
 * A line lifted verbatim off the dealer's own artwork. Arabic lines are
 * isolated right-to-left even when the page is running left-to-right, so the
 * quote reads the way it is printed in both locales.
 */
function Verbatim({ line, className = "" }: { line: string; className?: string }) {
  if (ARABIC.test(line)) {
    return (
      <bdi dir="rtl" className={`font-ar ${className}`}>
        {line}
      </bdi>
    );
  }
  return <span className={`latin ${className}`}>{line}</span>;
}

/* ------------------------------------------------------------ the register */

/**
 * A deterministic two-axis offset for item `i` of block `seed`. Hashed, never
 * random: the same index always lands on the same misregistration.
 */
function offset(i: number, seed: number): { rx: number; ry: number } {
  let h = Math.imul((i + 1) ^ Math.imul(seed + 1, 0x9e37), 2246822519);
  h = Math.imul(h ^ (h >>> 13), 3266489917);
  h = (h ^ (h >>> 16)) >>> 0;
  const rx = (((h & 15) - 7) * 1.7) | 0;
  const ry = ((((h >>> 6) & 7) + 3) * 1.9 * ((h >>> 11) & 1 ? 1 : -1)) | 0;
  return { rx, ry };
}

/**
 * Writes `data-seen` from the observer rather than setting state — the kit's
 * lint fails `react-hooks/set-state-in-effect`, and an attribute is all the CSS
 * needs. Never animate clip-path on this element: it collapses the intersection
 * rect and the reveal then silently never fires.
 */
function Block({
  children,
  className,
  seed = 0,
  id,
}: {
  children: ReactNode;
  className?: string;
  seed?: number;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Items belonging to a nested block are that block's to stagger, not ours.
    const items = Array.from(
      el.querySelectorAll<HTMLElement>("[data-reg-item]")
    ).filter((it) => it.closest("[data-reg]") === el);
    items.forEach((it, i) => {
      const { rx, ry } = offset(i, seed);
      it.style.setProperty("--rx", `${rx}px`);
      it.style.setProperty("--ry", `${ry}px`);
      it.style.setProperty("--reg-i", String(Math.min(i, 7)));
    });
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-seen", "");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seed]);
  return (
    <div ref={ref} id={id} data-reg="" className={className}>
      {children}
    </div>
  );
}

function Item({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  return (
    <Tag data-reg-item="" className={className}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ pieces */

function Mark({ className = "h-7 w-auto" }: { className?: string }) {
  // An <img> cannot inherit currentColor, so the traced mark is used as a mask
  // and takes its colour from the surrounding text instead.
  return (
    <span
      role="img"
      aria-label="GBR Auto"
      className={className}
      style={{
        display: "inline-block",
        aspectRatio: "151.38 / 100",
        background: "currentColor",
        WebkitMaskImage: "url(/logo-mark.svg)",
        maskImage: "url(/logo-mark.svg)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}

/** A printer's registration cross — the page's one recurring ornament. */
function Cross({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className} fill="none">
      <path d="M8 0v16M0 8h16" stroke="currentColor" strokeWidth="1" />
      <circle cx="8" cy="8" r="4" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/**
 * Every image carries its own definite box: an aspect ratio and an object-fit
 * on the <img> itself, inside an overflow-hidden parent. An image sized by
 * height:100% against an auto-height parent renders 0×0 until it scrolls into
 * view, which breaks CLS and makes scrollHeight lie to any screenshot script.
 */
function Plate({
  src,
  alt,
  ratio = "aspect-[4/5]",
  fit = "object-contain",
  className = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw",
  priority = false,
  w = 1200,
  h = 1500,
}: {
  src: string;
  alt: string;
  ratio?: string;
  fit?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  w?: number;
  h?: number;
}) {
  return (
    <div className={`overflow-hidden bg-panel ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={w}
        height={h}
        sizes={sizes}
        priority={priority}
        className={`${ratio} w-full ${fit}`}
      />
    </div>
  );
}

function Head({
  n,
  eyebrow,
  children,
}: {
  n: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-10 sm:mb-14">
      <div className="mb-4 flex items-center gap-3">
        <Cross className="h-3 w-3 shrink-0 text-amber" />
        <span className="fine text-amber">
          <L>{n}</L>
        </span>
        {eyebrow ? (
          <span className="fine min-w-0 text-muted">{eyebrow}</span>
        ) : null}
      </div>
      <h2 className="display max-w-[22ch] text-[clamp(2rem,5.4vw,3.6rem)] text-ink">
        {children}
      </h2>
      <span className="plate mt-6 max-w-[20rem]" />
    </div>
  );
}

/* ------------------------------------------------------------- the header */

function Header() {
  const { content, locale, toggleLocale } = useLocale();
  const c = content as SiteContentExt;
  return (
    <header className="sticky top-0 z-40 border-b border-ink/12 bg-ground/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[80rem] items-center gap-4 px-5 py-3 sm:px-8">
        <a href="#top" className="flex items-center gap-3 text-ink">
          <Mark className="h-4 w-auto" />
          <span className="fine hidden sm:inline">
            <L>{c.brand.name}</L>
          </span>
        </a>
        <nav className="ms-auto hidden items-center gap-6 lg:flex">
          {c.nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="fine text-muted transition-colors hover:text-ink"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <button
          onClick={toggleLocale}
          className="chip ms-auto border-ink/35 text-ink transition-colors hover:border-amber hover:text-amber lg:ms-0"
          aria-label={c.a11y.toggleLanguage}
        >
          {locale === "ar" ? "EN" : "ع"}
        </button>
      </div>
    </header>
  );
}

/* ---------------------------------------------------------------- 1 · hero */

function Hero() {
  const c = useLocale().content as SiteContentExt;
  return (
    <section
      id="top"
      className="mx-auto max-w-[80rem] px-5 pt-14 pb-16 sm:px-8 sm:pt-24 sm:pb-24"
    >
      <Block seed={1}>
        <Item>
          <div className="flex flex-wrap items-end gap-x-6 gap-y-4 text-ink">
            <Mark className="h-10 w-auto sm:h-14" />
            <div className="min-w-0">
              <p className="fine text-amber">
                <T s={c.hero.eyebrow ?? ""} />
              </p>
              <p className="fine mt-2 text-muted">
                <L>{`@${IG_HANDLE}`}</L>
                <span className="mx-2 text-ink/30">/</span>
                <L>{FB_NAME}</L>
              </p>
            </div>
          </div>
        </Item>

        <Item>
          <h1 className="display mt-10 max-w-[20ch] text-[clamp(2.4rem,8vw,5.4rem)] text-ink">
            <T s={c.hero.headline} />
          </h1>
        </Item>

        <Item>
          <span className="plate mt-8 max-w-[34rem]" />
        </Item>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <Item className="min-w-0">
            <p className="max-w-[54ch] text-[0.98rem] leading-relaxed text-muted">
              <T s={c.hero.sub} />
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#absence"
                className="chip border-ink bg-ink text-panel transition-colors hover:bg-amber hover:border-amber"
              >
                {c.hero.primaryCta}
              </a>
              <a
                href={`tel:+20${SALES.replace(/^0/, "")}`}
                className="chip border-ink/40 text-ink transition-colors hover:border-amber hover:text-amber"
              >
                {c.hero.secondaryCta}
              </a>
            </div>
          </Item>

          {/* The thesis, as two numbers on one rule. */}
          <Item className="min-w-0">
            <div className="grid grid-cols-2 items-end gap-6 border-t border-ink/15 pt-6">
              <div className="min-w-0">
                <p className="display text-[clamp(3rem,10vw,5rem)] leading-[0.8] text-ink">
                  <L>{IG_POSTS_STATED}</L>
                </p>
                <p className="mt-3 text-[0.78rem] leading-snug text-muted">
                  {c.absence.statLabels.stated}
                </p>
              </div>
              <div className="min-w-0">
                <p className="display text-[clamp(3rem,10vw,5rem)] leading-[0.8] text-amber">
                  <L>{IG_POSTS_REACHABLE}</L>
                </p>
                <p className="mt-3 text-[0.78rem] leading-snug text-muted">
                  {c.absence.statLabels.reachable}
                </p>
              </div>
            </div>
          </Item>
        </div>
      </Block>
    </section>
  );
}

/* ----------------------------------------------------------- 2 · the angle */

function MarkSection() {
  const c = useLocale().content as SiteContentExt;
  return (
    <section id="mark" className="border-y border-ink/12 bg-panel">
      <div className="mx-auto max-w-[80rem] px-5 pt-20 sm:px-8 sm:pt-28">
        <Block seed={2}>
          <Item>
            <Head n="00" eyebrow={c.mark.driftLabel}>
              {c.mark.heading}
            </Head>
          </Item>
          <div className="grid gap-8 md:grid-cols-2 md:gap-14">
            {c.mark.body.map((p, i) => (
              <Item key={i} className="min-w-0">
                <p className="max-w-[56ch] text-[0.94rem] leading-relaxed text-muted">
                  <T s={p} />
                </p>
              </Item>
            ))}
          </div>
        </Block>
      </div>

      {/* Full-bleed: the canvas runs the width of the band. */}
      <Block seed={3} className="mt-12 sm:mt-16">
        <Item className="min-w-0">
          <Anamorph hint={c.mark.hint} alignedLabel={c.mark.alignedLabel} />
        </Item>
      </Block>

      <div className="mx-auto max-w-[80rem] px-5 pt-5 pb-20 sm:px-8 sm:pb-28">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="fine text-muted">{c.mark.driftLabel}</span>
          <span className="plate max-w-[10rem] flex-1" />
          <span className="fine text-amber">{c.mark.alignedLabel}</span>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------- 3 · what was not reached */

function Absence() {
  const c = useLocale().content as SiteContentExt;
  const stats: { value: string; label: string; hot?: boolean }[] = [
    { value: String(IG_POSTS_STATED), label: c.absence.statLabels.stated },
    {
      value: String(IG_POSTS_REACHABLE),
      label: c.absence.statLabels.reachable,
      hot: true,
    },
    { value: String(IMAGES_REACHABLE), label: c.absence.statLabels.images },
    { value: String(CAPTIONS_REACHABLE), label: c.absence.statLabels.captions },
  ];
  const profile = [
    { k: `@${IG_HANDLE}`, v: `${IG_FOLLOWERS} / ${IG_FOLLOWING}` },
    { k: FB_NAME, v: `${FB_FOLLOWERS} / ${FB_FOLLOWING}` },
    { k: "reviews", v: String(FB_REVIEWS) },
  ];
  return (
    <section
      id="absence"
      className="mx-auto max-w-[80rem] px-5 py-20 sm:px-8 sm:py-28"
    >
      <Block seed={4}>
        <Item>
          <Head n="01" eyebrow={c.absence.sourcesLabel}>
            <T s={c.absence.heading} />
          </Head>
        </Item>
        <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-16">
          <div className="min-w-0">
            {c.absence.body.map((p, i) => (
              <Item key={i}>
                <p className="mb-4 max-w-[58ch] text-[0.95rem] leading-relaxed text-muted">
                  <T s={p} />
                </p>
              </Item>
            ))}
          </div>
          <Item className="min-w-0">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
              {stats.map((s) => (
                <div key={s.label} className="min-w-0 border-t border-ink/15 pt-4">
                  <dt className="sr-only">{s.label}</dt>
                  <dd
                    className={`display text-[clamp(1.9rem,5vw,3rem)] leading-none ${
                      s.hot ? "text-amber" : "text-ink"
                    }`}
                  >
                    <L>{s.value}</L>
                  </dd>
                  <p className="mt-3 text-[0.78rem] leading-snug text-muted">
                    {s.label}
                  </p>
                </div>
              ))}
            </dl>
          </Item>
        </div>
      </Block>

      {/* 62 stated posts, drawn as 62 empty slots. */}
      <Block seed={5} className="mt-16">
        <Item>
          <div
            role="img"
            aria-label={c.absence.gridCaption.replace(
              "{stated}",
              String(IG_POSTS_STATED)
            )}
            className="grid grid-cols-8 gap-1.5 sm:grid-cols-12 lg:grid-cols-[repeat(16,minmax(0,1fr))]"
          >
            {Array.from({ length: IG_POSTS_STATED }, (_, i) => (
              <span
                key={i}
                className="grid aspect-square place-items-center border border-dashed border-ink/20 text-[0.55rem] text-muted/55"
              >
                <span className="latin">{i + 1}</span>
              </span>
            ))}
          </div>
        </Item>
        <Item>
          <p className="fine mt-5 text-muted">
            <span className="text-amber">{"×"}</span>
            {" "}
            {c.absence.emptyLabel}
          </p>
        </Item>
      </Block>

      <Block seed={6} className="mt-16 grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
        <Item className="min-w-0">
          <p className="fine text-muted">{c.absence.sourcesLabel}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {profile.map((p) => (
              <li key={p.k} className="chip border-ink/25 text-muted">
                <L>{p.k}</L>
                <span className="text-ink/30">{"·"}</span>
                <L>{p.v}</L>
              </li>
            ))}
          </ul>
        </Item>
        <ul className="min-w-0">
          {c.absence.sources.map((s, i) => (
            <Item as="li" key={i} className="border-t border-ink/15">
              <p className="py-3 text-[0.88rem] leading-relaxed text-muted">
                <T s={s} />
              </p>
            </Item>
          ))}
        </ul>
      </Block>
    </section>
  );
}

/* -------------------------------------------------------- the record counted */

function Counts() {
  const c = useLocale().content as SiteContentExt;
  return (
    <section className="border-y border-ink/12 bg-ground-2">
      <div className="mx-auto max-w-[80rem] px-5 py-14 sm:px-8 sm:py-20">
        <Block seed={7}>
          <Item>
            <div className="mb-10 flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <h2 className="display text-[clamp(1.4rem,3vw,2.1rem)] text-ink">
                {c.counts.heading}
              </h2>
              <p className="text-[0.85rem] text-muted">{c.counts.intro}</p>
            </div>
          </Item>
          <div className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-4">
            {c.counts.items.map((it, i) => (
              <Item key={i} className="min-w-0 border-t border-ink/15 pt-4">
                <p className="display text-[clamp(1.6rem,4vw,2.4rem)] leading-none text-ink">
                  <T s={it.value} />
                </p>
                <p className="mt-3 text-[0.78rem] leading-snug text-muted">
                  {it.label}
                </p>
              </Item>
            ))}
          </div>
        </Block>
      </div>
    </section>
  );
}

/* ------------------------------------------------- what the material shows */

function Evidence() {
  const c = useLocale().content as SiteContentExt;
  return (
    <section
      id="evidence"
      className="mx-auto max-w-[80rem] px-5 py-20 sm:px-8 sm:py-28"
    >
      <Block seed={8}>
        <Item>
          <Head n="02" eyebrow={c.services.heading}>
            {c.about.heading}
          </Head>
        </Item>
        <div className="grid gap-8 md:grid-cols-3 md:gap-12">
          {c.about.body.map((p, i) => (
            <Item key={i} className="min-w-0">
              <p className="text-[0.92rem] leading-relaxed text-muted">
                <T s={p} />
              </p>
            </Item>
          ))}
        </div>
      </Block>

      <Block seed={9} className="mt-16">
        <Item>
          <p className="mb-8 max-w-[62ch] text-[0.88rem] leading-relaxed text-muted">
            <T s={c.services.intro ?? ""} />
          </p>
        </Item>
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {c.services.items.map((s, i) => (
            <Item key={s.title} className="min-w-0 border-t border-ink/15 pt-5">
              <div className="mb-3 flex items-center gap-3">
                <span className="fine text-amber">
                  <L>{String(i + 1).padStart(2, "0")}</L>
                </span>
                <h3 className="text-[0.95rem] font-semibold text-ink">{s.title}</h3>
              </div>
              <p className="max-w-[48ch] text-[0.88rem] leading-relaxed text-muted">
                <T s={s.body} />
              </p>
            </Item>
          ))}
        </div>
      </Block>
    </section>
  );
}

/* ------------------------------------------------ 4 · a calendar, not a list */

/** Greetings first: the spine of the account, and four of the nine plates. */
const KIND_ORDER: Kind[] = ["greeting", "car", "address", "job", "mark", "render"];

function orderedPieces(): Piece[] {
  return KIND_ORDER.flatMap((k) => PIECES.filter((p) => p.kind === k));
}

function Calendar() {
  const c = useLocale().content as SiteContentExt;
  const alts = new Map(c.gallery.items.map((g) => [g.src, g.alt]));
  const tally = KIND_ORDER.map((k) => ({
    kind: k,
    n: PIECES.filter((p) => p.kind === k).length,
  }));
  const pieces = orderedPieces();
  return (
    <section id="calendar" className="border-y border-ink/12 bg-panel">
      <div className="mx-auto max-w-[80rem] px-5 py-20 sm:px-8 sm:py-28">
        <Block seed={10}>
          <Item>
            <Head n="03" eyebrow={c.gallery.heading}>
              {c.calendar.heading}
            </Head>
          </Item>
          <Item>
            <p className="mb-10 max-w-[62ch] text-[0.95rem] leading-relaxed text-ink/85">
              <T s={c.calendar.intro} />
            </p>
          </Item>

          {/* The shape of the finding, before the plates themselves. */}
          <Item className="min-w-0">
            <ul className="grid grid-cols-2 gap-px overflow-hidden border border-ink/12 bg-ink/12 sm:grid-cols-3 lg:grid-cols-6">
              {tally.map((t) => (
                <li
                  key={t.kind}
                  className={`min-w-0 bg-panel p-4 ${
                    t.kind === "greeting" ? "text-amber" : "text-ink"
                  }`}
                >
                  <p className="display text-[1.9rem] leading-none">
                    <L>{t.n}</L>
                  </p>
                  <p className="mt-2 text-[0.75rem] leading-snug text-muted">
                    {c.calendar.kindLabels[t.kind]}
                  </p>
                </li>
              ))}
            </ul>
          </Item>

          <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-12">
            {c.calendar.body.map((p, i) => (
              <Item key={i} className="min-w-0">
                <p className="text-[0.9rem] leading-relaxed text-muted">
                  <T s={p} />
                </p>
              </Item>
            ))}
          </div>
        </Block>

        <Block seed={11} className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {pieces.map((p) => (
            <Item as="article" key={p.id} className="flex min-w-0 flex-col">
              <Plate
                src={p.image}
                alt={alts.get(p.image) ?? p.printed.join(" — ")}
                ratio="aspect-[4/5]"
                fit="object-contain"
                className="min-h-[14rem] border border-ink/12 bg-panel-2"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
              />
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span
                  className={`chip ${
                    p.kind === "greeting"
                      ? "border-amber/60 text-amber"
                      : "border-ink/25 text-muted"
                  }`}
                >
                  {c.calendar.kindLabels[p.kind]}
                </span>
                {p.carriesFrontage ? (
                  <span className="chip border-red/70 text-muted">
                    {c.calendar.carriesFrontageLabel}
                  </span>
                ) : null}
              </div>
              <p className="mt-3 text-[0.85rem] leading-relaxed text-muted">
                {c.calendar.pieceNotes[p.id]}
              </p>
              <p className="fine mt-5 text-muted">{c.calendar.printedLabel}</p>
              <ul className="mt-2 border-t border-ink/12">
                {p.printed.map((line, li) => (
                  <li key={li} className="border-b border-ink/12 py-1.5">
                    <Verbatim
                      line={line}
                      className="text-[0.78rem] leading-snug text-ink"
                    />
                  </li>
                ))}
              </ul>
            </Item>
          ))}
        </Block>

        <Block seed={12} className="mt-14">
          <Item>
            <p className="max-w-[70ch] border-s-2 border-amber/60 ps-5 text-[0.85rem] leading-relaxed text-muted">
              {c.calendar.artworkNote}
            </p>
          </Item>
        </Block>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- 5 · one car */

function OnlyCar() {
  const c = useLocale().content as SiteContentExt;
  const piece = PIECES.find((p) => p.id === "glc200");
  const alt =
    c.gallery.items.find((g) => g.src === piece?.image)?.alt ?? ONLY_CAR;
  return (
    <section
      id="only-car"
      className="mx-auto max-w-[80rem] px-5 py-20 sm:px-8 sm:py-28"
    >
      <Block seed={13}>
        <Item>
          <Head n="04" eyebrow={c.onlyCar.label}>
            {c.onlyCar.heading}
          </Head>
        </Item>
      </Block>

      <Block seed={14} className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
        <Item className="min-w-0">
          {piece ? (
            <Plate
              src={piece.image}
              alt={alt}
              ratio="aspect-[4/5]"
              fit="object-contain"
              className="border border-ink/12"
              sizes="(max-width: 768px) 100vw, 36vw"
              w={787}
              h={1400}
            />
          ) : null}
        </Item>

        <div className="min-w-0">
          <Item>
            <p className="fine text-amber">{c.onlyCar.label}</p>
            <p className="display mt-4 text-[clamp(2.4rem,7vw,4.6rem)] leading-[0.92] text-ink">
              <L>{ONLY_CAR}</L>
            </p>
            <span className="plate mt-6 max-w-[24rem]" />
          </Item>
          {c.onlyCar.body.map((p, i) => (
            <Item key={i}>
              <p className="mt-5 max-w-[54ch] text-[0.94rem] leading-relaxed text-muted">
                <T s={p} />
              </p>
            </Item>
          ))}
          <Item>
            <div className="mt-10 border-t border-ink/15 pt-6">
              <p className="fine text-muted">{c.onlyCar.captionLabel}</p>
              <bdi
                dir="rtl"
                // inline-block, so the quote sits at the start of the column in
                // either locale rather than being flung to the right-hand edge
                // of an otherwise left-to-right page.
                className="font-ar-display mt-4 inline-block text-[clamp(1.7rem,4.6vw,2.8rem)] leading-[1.5] text-amber"
              >
                {ONLY_CAPTION}
              </bdi>
              <p className="mt-4 max-w-[52ch] text-[0.84rem] leading-relaxed text-muted">
                {c.onlyCar.captionGloss}
              </p>
            </div>
          </Item>
        </div>
      </Block>
    </section>
  );
}

/* ------------------------------------------------------------- 6 · frontage */

function Frontage() {
  const c = useLocale().content as SiteContentExt;
  const dims = [
    { w: 1045, h: 749 },
    { w: 1045, h: 693 },
  ];
  return (
    <section id="frontage" className="border-y border-ink/12 bg-ground-2">
      <div className="mx-auto max-w-[80rem] px-5 py-20 sm:px-8 sm:py-28">
        <Block seed={15}>
          <Item>
            <Head n="05" eyebrow={c.calendar.carriesFrontageLabel}>
              {c.frontage.heading}
            </Head>
          </Item>
          <div className="grid gap-8 md:grid-cols-2 md:gap-14">
            {c.frontage.body.map((p, i) => (
              <Item key={i} className="min-w-0">
                <p className="max-w-[56ch] text-[0.94rem] leading-relaxed text-muted">
                  <T s={p} />
                </p>
              </Item>
            ))}
          </div>
        </Block>

        <Block seed={16} className="mt-12 grid gap-8 md:grid-cols-2">
          {FRONTAGE.map((src, i) => (
            <Item key={src} className="min-w-0">
              <Plate
                src={src}
                alt={c.frontage.captions[i] ?? c.frontage.heading}
                ratio="aspect-[3/2]"
                fit="object-cover"
                className="border border-ink/12"
                sizes="(max-width: 768px) 100vw, 44vw"
                w={dims[i]?.w ?? 1045}
                h={dims[i]?.h ?? 749}
              />
              <p className="mt-3 text-[0.82rem] leading-snug text-muted">
                {c.frontage.captions[i]}
              </p>
            </Item>
          ))}
        </Block>

        <Block seed={17} className="mt-10">
          <Item>
            <p className="max-w-[74ch] border-s-2 border-red ps-5 text-[0.86rem] leading-relaxed text-muted">
              {c.frontage.credit}
            </p>
          </Item>
        </Block>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- 7 · labels */

function Labels() {
  const c = useLocale().content as SiteContentExt;
  return (
    <section
      id="labels"
      className="mx-auto max-w-[80rem] px-5 py-20 sm:px-8 sm:py-28"
    >
      <Block seed={18}>
        <Item>
          <Head n="06" eyebrow={c.labels.axisLabel}>
            {c.labels.heading}
          </Head>
        </Item>
        <Item>
          <p className="mb-10 max-w-[58ch] text-[0.95rem] leading-relaxed text-muted">
            <T s={c.labels.intro} v={{ n: HIGHLIGHTS.length }} />
          </p>
        </Item>
      </Block>

      <Block seed={19} className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
        <ul className="min-w-0">
          {HIGHLIGHTS.map((h, i) => (
            <Item as="li" key={h.label} className="border-t border-ink/15">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 py-5">
                <span className="fine w-8 shrink-0 text-amber">
                  <L>{String(i + 1).padStart(2, "0")}</L>
                </span>
                <span className="display min-w-0 flex-1 text-[clamp(1.3rem,3.4vw,2rem)] leading-none text-ink">
                  <L>{h.label}</L>
                </span>
                <span className="flex items-center gap-2 text-[0.78rem] text-muted">
                  <span className="fine text-muted/80">{c.labels.axisLabel}</span>
                  <span className="chip border-ink/25 text-ink">
                    {c.labels.axisNames[h.axis] ?? h.axis}
                  </span>
                </span>
              </div>
            </Item>
          ))}
          <Item as="li">
            <span className="plate mt-1 block" />
          </Item>
        </ul>
        <Item className="min-w-0">
          <p className="max-w-[46ch] text-[0.9rem] leading-relaxed text-muted">
            <T s={c.labels.note} />
          </p>
        </Item>
      </Block>
    </section>
  );
}

/* -------------------------------------------------------------- 8 · contact */

function Contact() {
  const c = useLocale().content as SiteContentExt;
  const links = [
    { href: c.contact.mapsUrl, label: "Google Maps" },
    { href: c.contact.instagramUrl, label: "Instagram" },
    { href: c.contact.facebookUrl, label: "Facebook" },
  ].filter((l) => !!l.href);
  return (
    <section id="contact" className="border-t border-ink/12 bg-panel">
      <div className="mx-auto max-w-[80rem] px-5 py-20 sm:px-8 sm:py-28">
        <Block seed={20}>
          <Item>
            <Head n="07" eyebrow={c.contact.heading}>
              {c.contactExt.heading}
            </Head>
          </Item>
          <Item>
            <p className="mb-12 max-w-[64ch] text-[0.95rem] leading-relaxed text-muted">
              <T s={c.contactExt.intro} />
            </p>
          </Item>
        </Block>

        {/* Two numbers, each tagged with its job and where it was printed. */}
        <Block seed={21} className="grid gap-8 sm:grid-cols-2">
          {PHONES.map((p) => (
            <Item key={p.number} className="min-w-0 border-t border-ink/15 pt-5">
              <div className="flex items-center gap-3">
                <Cross className="h-3 w-3 shrink-0 text-amber" />
                <span className="fine text-amber">
                  {p.role === "sales"
                    ? c.contactExt.roleLabels.sales
                    : c.contactExt.roleLabels.recruitment}
                </span>
              </div>
              <a
                href={`tel:+20${p.number.replace(/^0/, "")}`}
                className="display mt-4 block text-[clamp(1.6rem,4.6vw,2.6rem)] leading-none text-ink transition-colors hover:text-amber"
              >
                <L>{p.number}</L>
              </a>
              <p className="mt-4 text-[0.82rem] leading-snug text-muted">
                {c.contactExt.whereLabels[p.where] ?? p.where}
              </p>
            </Item>
          ))}
        </Block>

        {/* Three published addresses, kept side by side and none corrected. */}
        <Block seed={22} className="mt-16">
          <Item>
            <h3 className="display text-[clamp(1.3rem,3vw,2rem)] text-ink">
              {c.contactExt.addressHeading}
            </h3>
          </Item>
          <Item>
            <p className="mt-4 max-w-[64ch] text-[0.88rem] leading-relaxed text-muted">
              {c.contactExt.addressNote}
            </p>
          </Item>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {ADDRESSES.map((a) => (
              <Item key={a.source} className="min-w-0 border-t border-ink/15 pt-5">
                <p className="fine text-muted">
                  {c.contactExt.sourceLabels[a.source] ?? a.source}
                </p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink">
                  {c.contactExt.addressTexts[a.source] ?? a.text}
                </p>
              </Item>
            ))}
          </div>
        </Block>

        <Block seed={23} className="mt-16 grid gap-10 md:grid-cols-[1fr_1fr]">
          <Item className="min-w-0 border-t border-ink/15 pt-5">
            <p className="fine text-muted">{c.contactExt.categoryLabel}</p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink">
              <L>{FB_CATEGORY}</L>
            </p>
            <p className="mt-3 max-w-[46ch] text-[0.84rem] leading-relaxed text-muted">
              <T s={c.contactExt.categoryNote} />
            </p>
          </Item>
          <Item className="min-w-0 border-t border-ink/15 pt-5">
            <p className="fine text-muted">{c.contact.hoursLabel}</p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink">
              {c.contact.hours}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chip border-ink/35 text-ink transition-colors hover:border-amber hover:text-amber"
                >
                  <L>{l.label}</L>
                </a>
              ))}
            </div>
          </Item>
        </Block>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- 9 · foot */

function Footer() {
  const c = useLocale().content as SiteContentExt;
  return (
    <footer className="bg-panel-2 text-ink">
      <div className="mx-auto max-w-[80rem] px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-4">
            <Mark className="h-8 w-auto" />
            <div>
              <p className="fine text-muted">
                <L>{c.brand.name}</L>
              </p>
              <p className="fine mt-2 text-amber">{c.brand.tagline}</p>
            </div>
          </div>
          <p className="max-w-[58ch] text-[0.78rem] leading-relaxed text-muted">
            <T s={c.footer.disclaimer} />
          </p>
        </div>
        <p className="mt-10 border-t border-ink/12 pt-6 text-[0.72rem] text-muted/80">
          <T s={c.footer.rights} />
        </p>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------- page */

function Body() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MarkSection />
        <Absence />
        <Counts />
        <Evidence />
        <Calendar />
        <OnlyCar />
        <Frontage />
        <Labels />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export function Page() {
  return (
    <LocaleProvider dictionaries={{ en, ar }} defaultLocale="en">
      <Body />
    </LocaleProvider>
  );
}

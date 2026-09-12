"use client";

/**
 * GBR Auto — New Cairo. An evergreen landing page for the dealership.
 */

import Image from "next/image";
import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { LocaleProvider, useLocale } from "@/i18n/locale-provider";
import { Anamorph } from "@/components/webgl/anamorph";
import { en } from "@/content/en";
import { ar } from "@/content/ar";
import type { SiteContentExt } from "@/content/schema-ext";
import { SALES_PHONE } from "@/content/media";

/* ------------------------------------------------------------------ tokens */

const YEAR = String(new Date().getFullYear());

const TOKENS: Record<string, string> = {
  brand: "GBR Auto",
  year: YEAR,
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

/* ------------------------------------------------------------------ motion */

/**
 * The page's one arrival: opacity 0→1 with a small upward settle, once, eased
 * out. Fires a little before the section is fully in view (a positive bottom
 * margin grows the observed area early) so it never reads as a pop. With
 * `prefers-reduced-motion` nothing animates and the content is simply there.
 *
 * `data-reveal` is a plain DOM attribute (not a style), so a `<noscript>` rule
 * and a reduced-motion media rule in globals.css can force the visible state
 * with no dependency on JS ever running.
 */
function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      data-reveal=""
      className={className}
      initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px 180px 0px" }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
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
  fit = "object-cover",
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
        loading={priority ? undefined : "lazy"}
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
      {/* Visible on first paint — the hero never waits for a reveal. */}
      <div className="flex flex-wrap items-end gap-x-6 gap-y-4 text-ink">
        <Mark className="h-10 w-auto sm:h-14" />
        <div className="min-w-0">
          <p className="fine text-amber">
            <T s={c.hero.eyebrow ?? ""} />
          </p>
        </div>
      </div>

      <h1 className="display mt-10 max-w-[20ch] text-[clamp(2.4rem,8vw,5.4rem)] text-ink">
        {c.hero.headline}
      </h1>

      <span className="plate mt-8 max-w-[34rem] block" />

      <div className="mt-10 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16 md:items-center">
        <div className="min-w-0">
          <p className="max-w-[54ch] text-[0.98rem] leading-relaxed text-muted">
            {c.hero.sub}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#showroom"
              className="chip border-ink bg-ink text-panel transition-colors hover:bg-amber hover:border-amber"
            >
              {c.hero.primaryCta}
            </a>
            <a
              href={`tel:+20${SALES_PHONE.replace(/^0/, "")}`}
              className="chip border-ink/40 text-ink transition-colors hover:border-amber hover:text-amber"
            >
              {c.hero.secondaryCta}
            </a>
          </div>
        </div>

        <div className="min-w-0">
          <Plate
            src="/media/frontage-night.jpg"
            alt={c.hero.imageAlt ?? c.hero.headline}
            ratio="aspect-[3/2]"
            fit="object-cover"
            className="border border-ink/12"
            sizes="(max-width: 768px) 100vw, 44vw"
            priority
            w={1440}
            h={960}
          />
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- 2 · about */

function About() {
  const c = useLocale().content as SiteContentExt;
  return (
    <section
      id="about"
      className="mx-auto max-w-[80rem] px-5 py-20 sm:px-8 sm:py-28"
    >
      <Reveal>
        <Head n="01" eyebrow={c.brand.tagline}>
          {c.about.heading}
        </Head>
        <div className="grid gap-8 md:grid-cols-2 md:gap-14">
          <div className="min-w-0">
            {c.about.body.map((p, i) => (
              <p
                key={i}
                className="mb-4 max-w-[56ch] text-[0.98rem] leading-relaxed text-muted"
              >
                <T s={p} />
              </p>
            ))}
          </div>
          <div className="min-w-0 border-t border-ink/15 pt-6">
            <p className="fine text-amber">{c.services.heading}</p>
            {c.services.items.map((s) => (
              <div key={s.title} className="mt-4">
                <h3 className="text-[1rem] font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 max-w-[48ch] text-[0.9rem] leading-relaxed text-muted">
                  <T s={s.body} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------ 3 · showroom */

function Showroom() {
  const c = useLocale().content as SiteContentExt;
  return (
    <section id="showroom" className="border-y border-ink/12 bg-panel">
      <div className="mx-auto max-w-[80rem] px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <Head n="02">{c.gallery.heading}</Head>
          {c.gallery.intro ? (
            <p className="mb-10 -mt-4 max-w-[58ch] text-[0.95rem] leading-relaxed text-muted">
              {c.gallery.intro}
            </p>
          ) : null}
          <div className="grid gap-8 sm:grid-cols-2">
            {c.gallery.items.map((g) => (
              <figure key={g.src} className="min-w-0">
                <Plate
                  src={g.src}
                  alt={g.alt}
                  ratio="aspect-[4/3]"
                  fit="object-cover"
                  className="border border-ink/12"
                  sizes="(max-width: 640px) 100vw, 38vw"
                />
                {g.caption ? (
                  <figcaption className="mt-3 text-[0.82rem] leading-snug text-muted">
                    {g.caption}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- 4 · the mark */

function MarkSection() {
  const c = useLocale().content as SiteContentExt;
  return (
    <section id="mark" className="border-b border-ink/12 bg-panel-2">
      <div className="mx-auto max-w-[80rem] px-5 pt-20 sm:px-8 sm:pt-28">
        <Reveal>
          <Head n="03" eyebrow={c.mark.driftLabel}>
            {c.mark.heading}
          </Head>
          <div className="grid gap-8 md:grid-cols-2 md:gap-14">
            {c.mark.body.map((p, i) => (
              <p
                key={i}
                className="max-w-[56ch] text-[0.94rem] leading-relaxed text-muted"
              >
                <T s={p} />
              </p>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Full-bleed: the canvas runs the width of the band. */}
      <div className="mt-12 sm:mt-16">
        <Anamorph hint={c.mark.hint} alignedLabel={c.mark.alignedLabel} />
      </div>

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

/* -------------------------------------------------------------- 5 · visit */

function Contact() {
  const c = useLocale().content as SiteContentExt;
  const links = [
    { href: c.contact.mapsUrl, label: "Google Maps" },
    { href: c.contact.instagramUrl, label: "Instagram" },
    { href: c.contact.facebookUrl, label: "Facebook" },
  ].filter((l) => !!l.href);
  return (
    <section id="contact" className="bg-ground-2">
      <div className="mx-auto max-w-[80rem] px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <Head n="04">{c.contact.heading}</Head>
          {c.contact.intro ? (
            <p className="mb-10 -mt-4 max-w-[58ch] text-[0.95rem] leading-relaxed text-muted">
              {c.contact.intro}
            </p>
          ) : null}

          <div className="grid gap-10 sm:grid-cols-2">
            <div className="min-w-0 border-t border-ink/15 pt-5">
              <div className="flex items-center gap-3">
                <Cross className="h-3 w-3 shrink-0 text-amber" />
                <span className="fine text-amber">{c.contact.phoneLabel}</span>
              </div>
              {c.contact.phones.map((p) => (
                <a
                  key={p}
                  href={`tel:+20${p.replace(/^0/, "")}`}
                  className="display mt-4 block text-[clamp(1.6rem,4.6vw,2.6rem)] leading-none text-ink transition-colors hover:text-amber"
                >
                  <L>{p}</L>
                </a>
              ))}
            </div>

            <div className="min-w-0 border-t border-ink/15 pt-5">
              <p className="fine text-amber">{c.contact.addressLabel}</p>
              <p className="mt-4 max-w-[36ch] text-[1.05rem] leading-relaxed text-ink">
                {c.contact.address}
              </p>
              {c.contact.hours ? (
                <>
                  <p className="fine mt-6 text-amber">{c.contact.hoursLabel}</p>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-ink">
                    {c.contact.hours}
                  </p>
                </>
              ) : null}
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
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- 6 · foot */

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
        <About />
        <Showroom />
        <MarkSection />
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

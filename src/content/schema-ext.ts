import type { SiteContent } from "@/i18n/schema";

/** Multi-paragraph body copy. One string per paragraph, in order. */
export type Paragraphs = string[];

/** Copy for the 3D piece: the dealer's own mark, reconstructed in depth. */
export type MarkCopy = {
  heading: string;
  body: Paragraphs;
  /** Pointer affordance, shown only where a pointer exists. */
  hint: string;
  /** State label once the fragments have settled into the mark. */
  alignedLabel: string;
  /** State label while the fragments are still scattered. */
  driftLabel: string;
};

export type SiteContentExt = SiteContent & {
  mark: MarkCopy;
};

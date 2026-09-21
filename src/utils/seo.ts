import { ALL_FLAGSHIP_CASE_STUDIES } from "../data/caseStudies";

export const SITE_ORIGIN = "https://deepak-prasad.ai.studio";
export const DEFAULT_TITLE =
  "Deepak Prasad — Senior Product Manager | AI, 0→1 & Product Strategy";
export const DEFAULT_DESC =
  "Senior Product Manager building AI, B2B and B2C products across marketplaces, subscription platforms, connected products and workflow automation.";

export interface RouteMetadata {
  title: string;
  description: string;
  canonical: string;
  ogType: string;
  ogUrl: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
  is404: boolean;
}

const STATIC_ROUTES: Record<
  string,
  { title: string; description: string; ogType?: string }
> = {
  "/": {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    ogType: "website",
  },
  "/work": {
    title: "Selected Work — Deepak Prasad",
    description:
      "Flagship product work across marketplaces, AI coaching, subscriptions and connected fitness hardware.",
    ogType: "website",
  },
  "/about": {
    title: "About — Deepak Prasad",
    description:
      "Seven years building products across marketplaces, AI and subscription platforms. How I work and what I care about.",
    ogType: "profile",
  },
  "/resume": {
    title: "Résumé — Deepak Prasad",
    description:
      "Senior Product Manager. Experience, impact and the systems I have shipped.",
    ogType: "profile",
  },
  "/contact": {
    title: "Contact — Deepak Prasad",
    description:
      "Get in touch about product roles, advisory work or a conversation.",
    ogType: "website",
  },
  "/writing/product-jury": {
    title:
      "Product Jury: a decision workspace that argues back — Deepak Prasad",
    description:
      "How I built a multi-agent critique engine that grades every claim by the evidence behind it, and declines when it cannot establish an answer.",
    ogType: "article",
  },
};

const CASE_STUDY_NAMES: Record<string, string> = {
  reshamandi: "ReshaMandi",
  "ai-coach": "Sportstech AI Coach",
  subscription: "Sportstech Subscription",
  "performance-score": "Performance Score",
  "ai-localization": "AI Localization",
  "behind-ai-copilot": "Behind the AI Copilot",
};

export const CANONICAL_CASE_STUDY_SLUGS = [
  "reshamandi",
  "ai-coach",
  "subscription",
  "performance-score",
  "ai-localization",
  "behind-ai-copilot",
];

export function getRouteMetadata(rawPath: string): RouteMetadata {
  const cleanPath = rawPath.replace(/\/+$/, "") || "/";

  if (STATIC_ROUTES[cleanPath]) {
    const s = STATIC_ROUTES[cleanPath];
    const canonical =
      cleanPath === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${cleanPath}`;
    return {
      title: s.title,
      description: s.description,
      canonical,
      ogType: s.ogType || "website",
      ogUrl: canonical,
      ogTitle: s.title,
      ogDescription: s.description,
      twitterTitle: s.title,
      twitterDescription: s.description,
      is404: false,
    };
  }

  if (cleanPath.startsWith("/work/")) {
    const slug = cleanPath.replace("/work/", "").toLowerCase();
    const matched = ALL_FLAGSHIP_CASE_STUDIES.find(
      (c) => c.slug.toLowerCase() === slug || c.id.toLowerCase() === slug
    );

    if (matched) {
      const shortName = CASE_STUDY_NAMES[matched.slug] || matched.title;
      const title = `${shortName} — Deepak Prasad Case Study`;
      const description =
        matched.subtitle || matched.description || DEFAULT_DESC;
      const canonical = `${SITE_ORIGIN}/work/${matched.slug}`;

      return {
        title,
        description,
        canonical,
        ogType: "article",
        ogUrl: canonical,
        ogTitle: title,
        ogDescription: description,
        twitterTitle: title,
        twitterDescription: description,
        is404: false,
      };
    }
  }

  // 404 Fallback
  return {
    title: "Page Not Found — Deepak Prasad",
    description: "The requested page could not be found.",
    canonical: `${SITE_ORIGIN}${cleanPath}`,
    ogType: "website",
    ogUrl: `${SITE_ORIGIN}${cleanPath}`,
    ogTitle: "Page Not Found — Deepak Prasad",
    ogDescription: "The requested page could not be found.",
    twitterTitle: "Page Not Found — Deepak Prasad",
    twitterDescription: "The requested page could not be found.",
    is404: true,
  };
}

export function injectMetadataIntoHtml(
  html: string,
  meta: RouteMetadata
): string {
  const escapeAttr = (str: string) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  const escapeText = (str: string) =>
    str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  let result = html;

  // Replace <title>...</title>
  result = result.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeText(meta.title)}</title>`
  );

  // Replace <meta name="description" content="..." />
  result = result.replace(
    /<meta\s+name=["']description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`
  );

  // Replace <link rel="canonical" href="..." />
  result = result.replace(
    /<link\s+rel=["']canonical["']\s+href=["'][\s\S]*?["']\s*\/?>/i,
    `<link rel="canonical" href="${escapeAttr(meta.canonical)}" />`
  );

  // Replace og:type
  result = result.replace(
    /<meta\s+property=["']og:type["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta property="og:type" content="${escapeAttr(meta.ogType)}" />`
  );

  // Replace og:url
  result = result.replace(
    /<meta\s+property=["']og:url["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta property="og:url" content="${escapeAttr(meta.ogUrl)}" />`
  );

  // Replace og:title
  result = result.replace(
    /<meta\s+property=["']og:title["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta property="og:title" content="${escapeAttr(meta.ogTitle)}" />`
  );

  // Replace og:description
  result = result.replace(
    /<meta\s+property=["']og:description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta property="og:description" content="${escapeAttr(meta.ogDescription)}" />`
  );

  // Replace twitter:title
  result = result.replace(
    /<meta\s+name=["']twitter:title["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeAttr(meta.twitterTitle)}" />`
  );

  // Replace twitter:description
  result = result.replace(
    /<meta\s+name=["']twitter:description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeAttr(meta.twitterDescription)}" />`
  );

  return result;
}

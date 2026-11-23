// Real client work only. Nothing here is invented: TheTickSuit is a Kenstera
// client, and the screenshot is of their live site (theticksuit.com).
export const THETICKSUIT = {
  name: "TheTickSuit",
  url: "https://theticksuit.com",
  caseStudyHref: "/case-studies/theticksuit",
  image: "/images/clients/theticksuit-home.webp",
  summary: "A modern website, A/B tested for conversion, with a 24/7 customer chat, a review pipeline, and ongoing SEO.",
  work: ["Website redesign", "A/B testing", "24/7 customer chat", "Review pipeline", "SEO and AI search"],
  about: "TheTickSuit makes a one-piece barrier suit that protects people from ticks while they garden, hike, or work outdoors.",
} as const;

// MassimiLaw: a New York City civil rights and employment law firm. Kenstera
// migrated its website to WordPress as the CMS, with an accessible Next.js front end.
// Screenshots are of the live site (massimilaw.com).
export const MASSIMILAW = {
  name: "MassimiLaw",
  url: "https://www.massimilaw.com",
  caseStudyHref: "/case-studies/massimilaw",
  image: "/images/clients/massimilaw-home.webp",
  summary: "A migration to WordPress with an accessible Next.js front end, for a New York City civil rights and employment law firm.",
  work: ["WordPress migration", "Accessible Next.js front end"],
  about: "MassimiLaw is a New York City civil rights and employment law firm representing people harmed by workplace violations and police misconduct.",
} as const;

// TheDavidImage: the fine-art photography portfolio of David Reibman. Kenstera migrated it from
// Squarespace to a custom Payload CMS site. Screenshots are of the live site (thedavidimage.com).
export const THEDAVIDIMAGE = {
  name: "TheDavidImage",
  url: "https://thedavidimage.com",
  caseStudyHref: "/case-studies/thedavidimage",
  image: "/images/clients/thedavidimage-home.webp",
  summary: "A custom CMS migration from Squarespace to Payload CMS for a fine-art photography portfolio.",
  work: ["Custom CMS", "Payload CMS migration"],
  about: "TheDavidImage is the online portfolio of photographer David Reibman: panoramic fine-art photography, with galleries, a shop and films.",
} as const;

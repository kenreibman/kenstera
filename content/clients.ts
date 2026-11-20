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
// migrated its website to WordPress, with a focus on front-end accessibility.
// Screenshots are of the live site (massimilaw.com).
export const MASSIMILAW = {
  name: "MassimiLaw",
  url: "https://www.massimilaw.com",
  caseStudyHref: "/case-studies/massimilaw",
  image: "/images/clients/massimilaw-home.webp",
  summary: "A WordPress migration for a New York City civil rights and employment law firm, with a focus on front-end accessibility.",
  work: ["WordPress migration", "Accessible front end"],
  about: "MassimiLaw is a New York City civil rights and employment law firm representing people harmed by workplace violations and police misconduct.",
} as const;

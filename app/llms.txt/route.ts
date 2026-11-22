// llms.txt: a plain-text map of the site for AI assistants and answer engines.
// Keep it factual and in sync with the site; it states nothing the pages don't.
const BODY = `# Kenstera

> Kenstera builds high-converting websites, voice and text automation, and marketing systems that drive predictable growth for businesses. Contact: contact@kenstera.com

Kenstera is a business-growth company. It designs and builds websites, answers calls with a voice receptionist, texts back missed calls, runs review funnels, runs marketing campaigns, and manages local SEO and AI search discovery.

## What Kenstera does

- Custom websites: conversion-optimized, high-performance websites, A/B tested for conversion.
- Missed-call text back: texts back missed calls from the business number so leads book instead of calling the next business.
- Voice receptionist: answers calls the business can't, asks what's going on, and gets the details to the team.
- Review funnel: automatic review requests after each finished job to build real social proof.
- Marketing campaigns: targeted paid and email campaigns.
- Local SEO and AI search: search optimization and visibility in AI search tools.

## Pages

- [Home](https://kenstera.com/): overview of all services
- [Services](https://kenstera.com/services): intake and scheduling, custom development, support automation
- [Industries](https://kenstera.com/industries): law firms, healthcare, real estate
- [HVAC shops](https://kenstera.com/hvac): missed-call text back and review requests for HVAC businesses, with an optional voice receptionist
- [Case studies](https://kenstera.com/case-studies): real client work
- [TheTickSuit case study](https://kenstera.com/case-studies/theticksuit): website redesign on Shopify (Liquid) with ShipHero for inventory management, A/B tested UI, 24/7 customer chat, review pipeline, and ongoing SEO and AI search management
- [TheDavidImage case study](https://kenstera.com/case-studies/thedavidimage): a custom CMS migration from Squarespace to Payload CMS for a fine-art photography portfolio
- [MassimiLaw case study](https://kenstera.com/case-studies/massimilaw): a WordPress migration for a New York City civil rights and employment law firm, with a focus on front-end accessibility
- [Pricing](https://kenstera.com/pricing): Scale, Business, and Partner plans
- [Team](https://kenstera.com/team): Ken Reibman (founder), Francisco Banda and Kousay Jebir (software engineers)
- [Contact and booking](https://kenstera.com/contact): book a call or email contact@kenstera.com

## Contact

- Email: contact@kenstera.com
- Book a call: https://kenstera.com/contact
`;

export const dynamic = "force-static";

export function GET() {
  return new Response(BODY, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}

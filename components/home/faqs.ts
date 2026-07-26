// Home-page FAQ copy. Kept in a plain module (not the "use client" component)
// so the server page can also read it to emit FAQPage structured data.
export interface HomeFaq {
  question: string;
  answer: string;
  bullets?: string[];
  outro?: string;
}

export const HOME_FAQS: HomeFaq[] = [
  {
    question: "When am I going to start seeing results?",
    answer:
      "This will completely depend on what else you're doing for advertising, how long you've been in business, the quality of your work, and of course that you commit to using our system. If you think you're going to close your eyes and pay us $397 a month to solve all your problems, we're probably not the right fit for you. We cannot stress this enough — you have to be doing multiple forms of advertising. Kenstera is meant to provide you a simple, yet extremely effective foundational marketing system to help grow and expand your business. We're here to build your online business foundation, not perform miracles.",
  },
  {
    question: "Can you explain how you help me grow my business?",
    answer: "Do you believe that…",
    bullets: [
      "having more 5-star reviews will attract more customers?",
      "being able to be found online and having a professional website that actually works will help you convert more leads into paying customers?",
      "instantly following up with incoming leads will make you look more professional and reduce the chances of missing high-quality leads, leading to more business?",
      "making the most of every customer you work with by putting them into automated re-marketing campaigns will make them more likely to work with you again?",
      "using automation and AI could free you from repeating the same basic tasks in your business, giving you more time for other things?",
      "having these systems in place is important to grow your business?",
    ],
    outro:
      "If you believe any of those things can grow your business, that's exactly what we can help you with.",
  },
  {
    question: "Why is your pricing so cheap?",
    answer:
      "Our only interest is keeping you for 10+ years. We believe the best way to do that is to be priced affordably. We believe if we don't overcharge and provide you with excellent service, you'll never have a reason to leave.",
  },
  {
    question: "Do I have to commit or sign a contract?",
    answer:
      "Of course not. We would be sad to see you go, but you can cancel anytime.",
  },
  {
    question: "Can people find my website on Google?",
    answer:
      "We make sure every website made by Kenstera is set up with the best SEO practices. This includes keyword research, adding alt tags, meta tags, and header titles, securing an SSL certificate, optimizing for high site performance scores, and providing regular updates. Your Google ranking will depend on how long your site's been live, local competition, and factors like your Google My Business reviews. We also offer blogging to boost your content. While we don't handle off-page backlinks beyond your social media, our ongoing updates keep your site in great shape — unlike some developers who set up your site and then forget about it.",
  },
  {
    question:
      "Why should I spend on a website when word of mouth is already pulling in business?",
    answer:
      "We might be a bit biased, but here's the deal: it's not just a website, it's the whole package. If each of your customers brings in about $500 a year, getting just 2–4 new customers from your website will pay off. We know you'll see great value from your site. It will help you attract new customers, make it easier for existing customers to refer you, allow you to run ads if you want, and attract bigger clients who value professionalism.",
  },
];

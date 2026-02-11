"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ } from "@/lib/industry-content";

const defaultFaqs: FAQ[] = [
  {
    question: "Can I integrate Kenstera Conversational AI into my own app?",
    answer:
      "Yes, Kenstera provides APIs and SDKs that allow you to seamlessly integrate our Conversational AI into your existing applications, websites, or custom platforms.",
  },
  {
    question: "How many agents can I create?",
    answer:
      "The number of agents you can create depends on your plan. Business plans offer unlimited agent creation, while starter plans include up to 5 agents.",
  },
  {
    question: "What LLMs can I use with my voice agents?",
    answer:
      "Kenstera supports multiple LLM providers including OpenAI, Anthropic Claude, and custom fine-tuned models. You can choose the model that best fits your use case.",
  },
  {
    question: "Can my agent make API calls to external services?",
    answer:
      "Absolutely. Kenstera agents can be configured to make external API calls, enabling them to fetch data, update records, or trigger actions in your existing systems.",
  },
  {
    question: "How can I make and receive phone calls with Conversational AI?",
    answer:
      "Kenstera provides telephony integration out of the box. You can provision phone numbers, configure inbound call routing, and enable outbound calling capabilities for your agents.",
  },
];

interface BlogPost {
  slug: string;
  title: string;
}

interface IndustriesFaqBlogProps {
  faqs?: FAQ[];
  blogPosts?: BlogPost[];
}

export function IndustriesFaqBlog({
  faqs = defaultFaqs,
  blogPosts = [],
}: IndustriesFaqBlogProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Take only the first 5 blog posts
  const displayPosts = blogPosts.slice(0, 5);

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* FAQ Column */}
          <div>
            <h2 className="text-2xl font-medium text-gray-900 mb-8">
              Frequently asked questions
            </h2>

            <div className="space-y-0">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200">
                  <button
                    type="button"
                    aria-expanded={openIndex === index}
                    onClick={() => toggleFaq(index)}
                    className="flex items-center justify-between w-full py-4 text-left"
                  >
                    <p className="text-sm text-gray-900 pr-4">{faq.question}</p>
                    {openIndex === index ? (
                      <Minus className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    ) : (
                      <Plus className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-gray-500 pb-4 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <Link
              href="/contact-sales"
              className="inline-flex items-center justify-center px-5 py-2.5 mt-8 border border-gray-300 text-sm font-medium text-gray-900 rounded-full hover:bg-gray-50 transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Blog Column */}
          <div>
            <h2 className="text-2xl font-medium text-gray-900 mb-8">
              Latest Blogs
            </h2>

            <div className="space-y-0">
              {displayPosts.map((post, index) => (
                <Link
                  key={index}
                  href={`/blog/${post.slug}`}
                  className="flex items-center justify-between py-4 border-b border-gray-200 group"
                >
                  <p className="text-sm text-gray-900 pr-4 group-hover:text-gray-600 transition-colors">
                    {post.title}
                  </p>
                  <ArrowUpRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </Link>
              ))}
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center justify-center px-5 py-2.5 mt-8 border border-gray-300 text-sm font-medium text-gray-900 rounded-full hover:bg-gray-50 transition-colors"
            >
              View Blog
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IndustriesFaqBlog;

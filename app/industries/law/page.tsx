'use client'

import Link from "next/link";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { useState } from "react";

/* ============================================
   FLOWING WAVE SVG HEADER
============================================ */
function WaveHeader() {
  return (
    <div className="absolute top-0 left-0 right-0 h-[400px] overflow-hidden pointer-events-none">
      <svg
        viewBox="0 0 1440 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1800px] min-w-full"
        preserveAspectRatio="xMidYMin slice"
      >
        <defs>
          <linearGradient id="law-wave-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e0e7ff" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#c7d2fe" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ddd6fe" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="law-wave-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#c4b5fd" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#a5b4fc" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <path
          d="M0 150 Q 200 80 400 150 T 800 120 T 1200 160 T 1440 100 L 1440 0 L 0 0 Z"
          fill="url(#law-wave-1)"
        />
        <path
          d="M0 180 Q 300 100 500 180 T 900 140 T 1200 190 T 1440 130 L 1440 0 L 0 0 Z"
          fill="url(#law-wave-2)"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}

/* ============================================
   HERO SECTION
============================================ */
function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28">
      <WaveHeader />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600 text-xs font-medium mb-6">
            For Law Firms
          </div>

          <h1 className="text-[2.5rem] sm:text-5xl lg:text-[3.5rem] font-medium tracking-[-0.02em] text-gray-900 leading-[1.1] mb-6">
            The firm that responds first wins the case
          </h1>

          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8 leading-relaxed">
            Stop losing leads to slow response times. Kenstera captures every inquiry,
            qualifies potential clients instantly, and books consultations—even at 2am.
          </p>

          <div className="flex items-center justify-center gap-3">
            <Link
              href="/contact-sales"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Get started
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center justify-center px-5 py-2.5 text-gray-600 text-sm font-medium hover:text-gray-900 transition-colors"
            >
              See how it works
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   STATS SECTION
============================================ */
function Stats() {
  const stats = [
    { value: "78%", label: "of clients hire the first firm to respond" },
    { value: "47hrs", label: "average law firm response time" },
    { value: "35%", label: "of calls go to voicemail after hours" },
  ];

  return (
    <section className="py-16 lg:py-20 border-y border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl sm:text-5xl font-medium text-gray-900 mb-2">
                {stat.value}
              </div>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   FEATURES SECTION
============================================ */
function Features() {
  return (
    <section id="features" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Visual */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 p-8 lg:p-12">
              {/* Mockup card */}
              <div className="bg-white rounded-xl shadow-xl p-5 max-w-sm mx-auto">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-semibold text-indigo-600">
                    JD
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">John Davis</p>
                    <p className="text-xs text-gray-500">Personal Injury</p>
                  </div>
                  <span className="ml-auto px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                    Qualified
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Case Type</span>
                    <span className="text-gray-900">Auto Accident</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Timeline</span>
                    <span className="text-gray-900">Within 30 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Location</span>
                    <span className="text-gray-900">Los Angeles, CA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Text */}
          <div className="order-1 lg:order-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
              Lead capture
            </p>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-gray-900 mb-6">
              Capture and qualify every lead automatically
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Whether leads come from your website, Google LSA, or a late-night phone call,
              Kenstera captures them all and qualifies based on your criteria—case type,
              timeline, location, and more.
            </p>

            <ul className="space-y-3">
              {[
                "24/7 lead capture from all channels",
                "Custom qualification questions",
                "Instant routing to your team",
                "CRM integration included",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <Check className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   BOOKING SECTION
============================================ */
function Booking() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Text */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
              Consultation booking
            </p>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-gray-900 mb-6">
              Book consultations without the back-and-forth
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Qualified leads book directly on your calendar based on your availability.
              They show up prepared, you show up ready to sign them.
            </p>

            <ul className="space-y-3">
              {[
                "Direct calendar integration",
                "Automated confirmation emails",
                "Reminder SMS reduces no-shows",
                "Reschedule handling built-in",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <Check className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Visual */}
          <div>
            <div className="relative rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-cyan-600 p-8 lg:p-12">
              <div className="bg-white rounded-xl shadow-xl p-5 max-w-sm mx-auto">
                <div className="text-center mb-4">
                  <p className="text-sm font-semibold text-gray-900">Consultation Scheduled</p>
                  <p className="text-xs text-gray-500">with John Davis</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">Date</span>
                    <span className="text-sm font-medium text-gray-900">Jan 28, 2026</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Time</span>
                    <span className="text-sm font-medium text-gray-900">2:30 PM</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-emerald-600 text-sm">
                  <Check className="w-4 h-4" />
                  <span>Confirmation sent</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   HOW IT WORKS
============================================ */
function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Lead comes in",
      description: "Phone, web form, chat, Google LSA—Kenstera captures it all.",
    },
    {
      number: "02",
      title: "AI qualifies instantly",
      description: "Smart questions determine case type, urgency, and fit.",
    },
    {
      number: "03",
      title: "Consultation booked",
      description: "Qualified leads book directly on your calendar.",
    },
  ];

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            How it works
          </p>
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-gray-900">
            From lead to consultation in minutes
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-sm font-semibold text-gray-900">{step.number}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-500">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   FAQ SECTION
============================================ */
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How quickly does Kenstera respond to leads?",
      answer: "Kenstera responds instantly—within seconds. Whether it's a phone call, web form, or chat, prospects get an immediate response 24/7.",
    },
    {
      question: "Can Kenstera handle different practice areas?",
      answer: "Yes. Configure for any practice area—personal injury, family law, criminal defense, and more. Each can have custom qualification questions.",
    },
    {
      question: "Does this integrate with my existing CRM?",
      answer: "Kenstera integrates with Clio, MyCase, PracticePanther, and more. Leads sync automatically.",
    },
    {
      question: "What happens to leads that don't qualify?",
      answer: "Non-qualifying leads can be declined politely or routed to referral partners. You set the criteria.",
    },
    {
      question: "How long does setup take?",
      answer: "Most firms are live within a week. We handle setup and train your team.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-gray-900">
            Frequently asked questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-sm font-medium text-gray-900">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5">
                  <p className="text-sm text-gray-500">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   FINAL CTA
============================================ */
function FinalCTA() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-gray-900 mb-4">
            Stop losing leads to slow response times
          </h2>
          <p className="text-gray-500 mb-8">
            See how Kenstera can help your firm capture more leads, book more consultations, and sign more clients.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/contact-sales"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Book a demo
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-5 py-2.5 text-gray-600 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              View pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   MAIN PAGE
============================================ */
export default function LawFirmsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Stats />
      <Features />
      <Booking />
      <HowItWorks />
      <FAQ />
      <FinalCTA />
    </main>
  );
}

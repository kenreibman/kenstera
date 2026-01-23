'use client'

import Link from "next/link";
import { Check, ChevronDown } from "lucide-react";
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
          <linearGradient id="health-wave-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d1fae5" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#a7f3d0" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#99f6e4" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="health-wave-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#5eead4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#67e8f9" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <path
          d="M0 150 Q 200 80 400 150 T 800 120 T 1200 160 T 1440 100 L 1440 0 L 0 0 Z"
          fill="url(#health-wave-1)"
        />
        <path
          d="M0 180 Q 300 100 500 180 T 900 140 T 1200 190 T 1440 130 L 1440 0 L 0 0 Z"
          fill="url(#health-wave-2)"
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
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-600 text-xs font-medium mb-6">
            For Healthcare
          </div>

          <h1 className="text-[2.5rem] sm:text-5xl lg:text-[3.5rem] font-medium tracking-[-0.02em] text-gray-900 leading-[1.1] mb-6">
            Patient intake that patients actually love
          </h1>

          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8 leading-relaxed">
            Reduce no-shows, eliminate phone tag, and give patients the modern scheduling
            experience they expect. Kenstera automates intake so your staff can focus on care.
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
    { value: "30%", label: "average patient no-show rate" },
    { value: "8hrs", label: "staff time lost weekly to phone tag" },
    { value: "67%", label: "of patients prefer self-scheduling" },
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
            <div className="relative rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-8 lg:p-12">
              <div className="bg-white rounded-xl shadow-xl p-5 max-w-sm mx-auto">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-sm font-semibold text-emerald-600">
                    SM
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Sarah Miller</p>
                    <p className="text-xs text-gray-500">New Patient</p>
                  </div>
                  <span className="ml-auto px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                    Confirmed
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Appointment</span>
                    <span className="text-gray-900">Annual Checkup</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date & Time</span>
                    <span className="text-gray-900">Jan 28, 2:30 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Provider</span>
                    <span className="text-gray-900">Dr. Johnson</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Text */}
          <div className="order-1 lg:order-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
              Patient scheduling
            </p>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-gray-900 mb-6">
              Self-service scheduling that patients prefer
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Let patients book, reschedule, and cancel appointments online—24/7.
              No phone calls, no waiting on hold. Just the modern experience they expect.
            </p>

            <ul className="space-y-3">
              {[
                "24/7 online booking",
                "Automated SMS & email reminders",
                "Easy rescheduling and cancellations",
                "Integrates with your EHR/PM system",
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
   COMPLIANCE SECTION
============================================ */
function Compliance() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Text */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
              Security & Compliance
            </p>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-gray-900 mb-6">
              HIPAA compliant by design
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Enterprise-grade security and full HIPAA compliance. Patient data is encrypted
              in transit and at rest. We sign BAAs with all healthcare clients.
            </p>

            <ul className="space-y-3">
              {[
                "Full HIPAA compliance",
                "SOC 2 Type II certified",
                "End-to-end encryption",
                "Business Associate Agreements",
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
            <div className="relative rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 p-8 lg:p-12">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <p className="text-white font-medium mb-1">HIPAA Compliant</p>
                <p className="text-white/60 text-sm">Enterprise-grade security</p>
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
      title: "Patient reaches out",
      description: "Website, phone, or referral—Kenstera captures every inquiry.",
    },
    {
      number: "02",
      title: "Self-service scheduling",
      description: "Patients pick their time and complete intake forms online.",
    },
    {
      number: "03",
      title: "Automated follow-up",
      description: "Reminders go out automatically. No-shows drop dramatically.",
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
            From inquiry to appointment—automated
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
      question: "Is Kenstera HIPAA compliant?",
      answer: "Yes. Kenstera is fully HIPAA compliant with enterprise-grade security. All patient data is encrypted, and we sign BAAs with all healthcare clients.",
    },
    {
      question: "Can patients book appointments 24/7?",
      answer: "Yes. Patients can self-schedule anytime through your website or a direct booking link. No more phone tag.",
    },
    {
      question: "Does this integrate with our EHR/PM system?",
      answer: "Kenstera integrates with Epic, Cerner, athenahealth, and many others. Appointments sync automatically.",
    },
    {
      question: "How do automated reminders work?",
      answer: "Patients receive SMS and email reminders before appointments. They can confirm, reschedule, or cancel with one tap.",
    },
    {
      question: "What about intake forms?",
      answer: "Kenstera sends digital intake forms before appointments. Patients complete them online—no more clipboard paperwork.",
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
            Give patients the experience they expect
          </h2>
          <p className="text-gray-500 mb-8">
            See how Kenstera can help your practice reduce no-shows, save staff time, and deliver modern patient intake.
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
export default function HealthcarePage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Stats />
      <Features />
      <Compliance />
      <HowItWorks />
      <FAQ />
      <FinalCTA />
    </main>
  );
}

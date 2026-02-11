import { Hero } from "@/components/sections/Hero";
import { IntakeCall } from "@/components/sections/IntakeCall";
import { IntakeBooking } from "@/components/sections/IntakeBooking";
import { IntakeSetup } from "@/components/sections/IntakeSetup";
import { CRMIntegrations } from "@/components/sections/CRMIntegrations";
import { SecurityCompliance } from "@/components/sections/SecurityCompliance";
import { DashboardPreview } from "@/components/sections/DashboardPreview";
import { IndustriesFaqBlog } from "@/components/industries";
import { getAllPosts } from "@/lib/blog";
import { FinalCTA } from "@/components/sections/FinalCTA";

const faqs = [
  {
    question: 'How long does setup take?',
    answer: 'Most firms are live within 1-2 weeks. That includes configuring your intake scripts, integrating with your CRM and calendar, setting up routing rules, and testing. We handle the technical work. Your team just provides input on qualification criteria and preferences.'
  },
  {
    question: 'Does the AI give legal advice?',
    answer: 'No. The AI is designed to gather information, qualify leads, and book consultations. It does not provide legal advice or opinions. All legal guidance is provided by your attorneys during scheduled consultations.'
  },
  {
    question: 'What CRM and practice management systems do you integrate with?',
    answer: 'We integrate with Clio, Litify, Filevine, Salesforce, HubSpot, and most other legal CRMs. For calendar booking, we work with Calendly, Acuity, Microsoft Bookings, and Google Calendar. If you use something else, we can usually build a custom integration.'
  },
  {
    question: 'Can we customize the intake questions and qualification criteria?',
    answer: 'Yes, completely. We work with you to build intake scripts specific to your case types: auto accidents, slip-and-fall, medical malpractice, and more. Qualification criteria, routing rules, and escalation triggers are all configured based on your firm\'s specific requirements.'
  },
  {
    question: 'What happens if a caller wants to speak to a real person?',
    answer: 'They can. You define when calls get transferred to live staff, whether that\'s on request, for specific case types, or based on qualification score. The system can also take a message and have your team call back within whatever timeframe you set.'
  },
];

export default function Home() {
  const posts = getAllPosts();
  const blogPosts = posts.map(post => ({ slug: post.slug, title: post.title }));

  return (
    <main className="">
      <Hero />
      <IntakeCall />
      <IntakeBooking />
      <IntakeSetup />
      <CRMIntegrations />
      <SecurityCompliance />
      <DashboardPreview />
      <IndustriesFaqBlog faqs={faqs} blogPosts={blogPosts} />
      <FinalCTA />
    </main>
  );
}

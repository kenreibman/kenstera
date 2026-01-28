'use client'

export function Objections() {
  return (
    <section className="relative py-20">
      <div className="w-full max-w-7xl mx-auto px-5">
        <p className="text-[13px] font-semibold tracking-wide uppercase text-sky-600 mb-3">
          Common concerns
        </p>
        <h2 className="text-[clamp(28px,5vw,42px)] font-bold leading-[1.15] mb-5 text-gray-900">
          &ldquo;But What About...&rdquo;
        </h2>
        <p className="text-lg text-gray-500 max-w-[600px] leading-relaxed mb-12">
          Fair concerns. Straight answers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-7">
            <h3 className="text-[17px] font-semibold text-gray-900 mb-3 leading-snug">
              &ldquo;Will leads know they&apos;re not talking to a person?&rdquo;
            </h3>
            <p className="text-[15px] leading-relaxed text-gray-500">
              Modern conversational AI sounds natural—not robotic or scripted. Most callers can&apos;t tell the difference, and more importantly, they don&apos;t care. They want their questions answered and an appointment booked. That happens instantly, every time.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-7">
            <h3 className="text-[17px] font-semibold text-gray-900 mb-3 leading-snug">
              &ldquo;What happens with complex or sensitive cases?&rdquo;
            </h3>
            <p className="text-[15px] leading-relaxed text-gray-500">
              You define escalation rules. High-value cases, complex situations, or any scenario you specify gets immediately routed to a live person. The system handles the volume; your team handles the exceptions.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-7">
            <h3 className="text-[17px] font-semibold text-gray-900 mb-3 leading-snug">
              &ldquo;We already have intake staff.&rdquo;
            </h3>
            <p className="text-[15px] leading-relaxed text-gray-500">
              This isn&apos;t about replacing your team—it&apos;s about extending their reach. Your staff can&apos;t answer 10 calls simultaneously at 2am. The system handles overflow, after-hours, and peak times while your team focuses on high-touch cases.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-7">
            <h3 className="text-[17px] font-semibold text-gray-900 mb-3 leading-snug">
              &ldquo;What if it qualifies leads incorrectly?&rdquo;
            </h3>
            <p className="text-[15px] leading-relaxed text-gray-500">
              The qualification criteria come from you. We configure the system based on your firm&apos;s specific case preferences, then refine based on actual performance. You get full visibility into every interaction.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-7">
            <h3 className="text-[17px] font-semibold text-gray-900 mb-3 leading-snug">
              &ldquo;Is it expensive?&rdquo;
            </h3>
            <p className="text-[15px] leading-relaxed text-gray-500">
              Less than one full-time intake coordinator. More importantly: if you&apos;re currently losing cases to slow response, the system pays for itself with the first few cases it saves. We can show you the math on your specific numbers.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-7">
            <h3 className="text-[17px] font-semibold text-gray-900 mb-3 leading-snug">
              &ldquo;We tried something like this before.&rdquo;
            </h3>
            <p className="text-[15px] leading-relaxed text-gray-500">
              Most &ldquo;intake solutions&rdquo; are glorified voicemail or clunky IVR menus. This is different: natural conversation, real-time qualification, and direct booking. The technology has changed dramatically. Book a demo and judge for yourself.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

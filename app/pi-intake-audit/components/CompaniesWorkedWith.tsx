import Image from 'next/image'

const companies = [
  { name: 'Reibman & Weiner', logo: '/images/firm1.webp' },
  { name: 'MassimiLaw', logo: '/images/firm2.webp' },
]

export function CompaniesWorkedWith() {
  return (
    <section className="py-6 px-5 bg-white">
      <div className="max-w-2xl mx-auto">
        {/* Company Logos */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {companies.map((company) => (
            <Image
              key={company.name}
              src={company.logo}
              alt={company.name}
              width={140}
              height={48}
              className="h-10 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

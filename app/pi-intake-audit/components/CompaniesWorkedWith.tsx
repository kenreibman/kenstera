import Image from 'next/image'

const companies = [
  { name: 'Firm 1', logo: '/images/firm1.webp' },
  { name: 'Firm 2', logo: '/images/firm2.svg' },
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
              className="h-10 w-auto object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'
import { ArrowLeft, ChevronDown } from 'lucide-react'
import { FormData } from './IntakeWizard'

const roleOptions = [
  { value: '', label: 'Select your role' },
  { value: 'owner-partner', label: 'Owner / Partner' },
  { value: 'marketing-director', label: 'Marketing Director' },
  { value: 'office-manager', label: 'Office Manager' },
  { value: 'other', label: 'Other' },
]

interface ContactFormProps {
  initialData: FormData
  onSubmit: (data: Partial<FormData>) => void
  onBack: () => void
}

function ProgressIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`h-1 w-12 rounded-full transition-colors ${
            i < currentStep ? 'bg-black' : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  )
}

export function ContactForm({ initialData, onSubmit, onBack }: ContactFormProps) {
  const [formData, setFormData] = useState({
    fullName: initialData.fullName || '',
    email: initialData.email || '',
    website: initialData.website || '',
    role: initialData.role || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const isFormComplete =
    formData.fullName.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.website.trim() !== '' &&
    formData.role !== ''

  return (
    <>
      {/* Header */}
      <h2 className="text-xl font-bold text-black text-center mb-6">
        Almost there. Where should we send your audit results?
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="fullName" className="text-sm font-medium text-black/80">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            placeholder="John Smith"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-4 border border-gray-200 rounded-xl text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-all"
          />
        </div>

        {/* Business Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-black/80">
            Business Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="john@lawfirm.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-4 border border-gray-200 rounded-xl text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-all"
          />
        </div>

        {/* Company Website */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="website" className="text-sm font-medium text-black/80">
            Company Website
          </label>
          <input
            id="website"
            type="text"
            name="website"
            placeholder="lawfirm.com"
            value={formData.website}
            onChange={handleChange}
            required
            className="w-full px-4 py-4 border border-gray-200 rounded-xl text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-all"
          />
        </div>

        {/* Role */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="role" className="text-sm font-medium text-black/80">
            Your Role
          </label>
          <div className="relative">
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-4 border border-gray-200 rounded-xl text-black bg-white focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-all appearance-none"
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value} disabled={option.value === ''}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black pointer-events-none" />
          </div>
        </div>

        {/* Button row */}
        <div className="flex items-center justify-between mt-2">
          <button
            type="button"
            onClick={onBack}
            className="p-3 bg-gray-100 text-black/60 rounded-full hover:bg-gray-200 transition-all"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            type="submit"
            disabled={!isFormComplete}
            className={`px-6 py-3 font-semibold rounded-xl transition-all ${
              isFormComplete
                ? 'bg-blue-950 text-white hover:bg-blue-900'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            See Available Times
          </button>
        </div>

        {/* Progress */}
        <div className="flex justify-center mt-4">
          <ProgressIndicator currentStep={2} totalSteps={3} />
        </div>
      </form>

      {/* Footer */}
      <div className="text-center mt-6 space-y-1">
        <p className="text-sm text-black">
          🔒 Your information is secure.
        </p>
      </div>
    </>
  )
}

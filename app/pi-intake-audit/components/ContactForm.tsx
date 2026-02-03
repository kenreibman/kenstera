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
            i < currentStep ? 'bg-blue-950' : 'bg-gray-200'
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
      <p className="text-xs text-center text-gray-500">No commitment. No pitch deck.</p>
      <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
        Book Your Intake Audit:
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
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
            className="w-full px-4 py-4 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Business Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
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
            className="w-full px-4 py-4 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Company Website */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="website" className="text-sm font-medium text-gray-700">
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
            className="w-full px-4 py-4 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Role */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="role" className="text-sm font-medium text-gray-700">
            Your Role
          </label>
          <div className="relative">
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-4 border border-gray-200 rounded-xl text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value} disabled={option.value === ''}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Button row */}
        <div className="flex items-center justify-between mt-2">
          <button
            type="button"
            onClick={onBack}
            className="p-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all"
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
            Continue →
          </button>
        </div>

        {/* Progress */}
        <div className="flex justify-center mt-4">
          <ProgressIndicator currentStep={2} totalSteps={3} />
        </div>
      </form>

      {/* Footer */}
      <div className="text-center mt-6 space-y-1">
        <p className="text-sm text-gray-500">
          🔒 Your information is secure.
        </p>
      </div>
    </>
  )
}

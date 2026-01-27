'use client'

import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

export interface FormData {
  email: string
  website: string
  role: string
  inboundLeads: string
}

interface QualifierFormProps {
  onSubmit: (data: FormData, isQualified: boolean) => void
  initialData?: FormData | null
}

const STORAGE_KEY = 'intake-audit-form'

const roleOptions = [
  { value: '', label: 'Select your role' },
  { value: 'owner-partner', label: 'Owner / Partner' },
  { value: 'marketing-director', label: 'Marketing Director' },
  { value: 'office-manager', label: 'Office Manager' },
  { value: 'other', label: 'Other' },
]

const leadsOptions = [
  { value: '', label: 'Select inbound leads/mo' },
  { value: '0-20', label: '0 - 20 leads' },
  { value: '20-60', label: '20 - 60 leads' },
  { value: '60-150', label: '60 - 150 leads' },
  { value: '150+', label: '150+ leads' },
]

const emptyFormData: FormData = {
  email: '',
  website: '',
  role: '',
  inboundLeads: '',
}

function ProgressIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="hidden md:flex items-center gap-1.5">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`h-1 w-16 rounded-full transition-colors ${
            i < currentStep ? 'bg-gray-900' : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  )
}

function SelectField({
  label,
  name,
  value,
  options,
  onChange,
  required = true,
}: {
  label: string
  name: string
  value: string
  options: { value: string; label: string }[]
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}{required && <span className="text-rose-400 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full px-4 py-3 appearance-none border border-white/60 rounded-xl text-gray-900 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent focus:bg-white/70 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
    </div>
  )
}

function InputField({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = true,
}: {
  label: string
  name: string
  type?: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}{required && <span className="text-rose-400 ml-0.5">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 border border-white/60 rounded-xl text-gray-900 bg-white/50 backdrop-blur-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent focus:bg-white/70 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
      />
    </div>
  )
}

export default function QualifierForm({ onSubmit, initialData }: QualifierFormProps) {
  const [formData, setFormData] = useState<FormData>(initialData ?? emptyFormData)
  const [showResume, setShowResume] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Check if all required fields are filled
  const isFormComplete =
    formData.website.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.role !== '' &&
    formData.inboundLeads !== ''

  // Restore form data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as FormData
        const hasData = Object.values(parsed).some((v) => v && v.trim() !== '')
        if (hasData) {
          setFormData(parsed)
          setShowResume(true)
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
    setIsInitialized(true)
  }, [])

  // Save form data to localStorage on change (only after initial load)
  useEffect(() => {
    if (!isInitialized) return

    const hasData = Object.values(formData).some((v) => v && v.trim() !== '')
    if (hasData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
    }
  }, [formData, isInitialized])

  const handleContinue = () => {
    // Data is already loaded, just dismiss the prompt
    setShowResume(false)
  }

  const handleStartFresh = () => {
    localStorage.removeItem(STORAGE_KEY)
    setFormData(emptyFormData)
    setShowResume(false)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Qualification logic: Qualified if leads >= 20/mo
    const isQualified = ['20-60', '60-150', '150+'].includes(formData.inboundLeads)

    // Clear saved data on successful submit
    localStorage.removeItem(STORAGE_KEY)

    onSubmit(formData, isQualified)
  }

  return (
    <div className="w-full bg-white/30 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          See if you qualify 👇
        </h2>
        <p className="text-sm text-gray-500">
          Takes less than 30 seconds
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Business Email */}
        <InputField
          label="Business Email"
          name="email"
          type="email"
          placeholder="you@yourfirm.com"
          value={formData.email}
          onChange={handleChange}
        />

        {/* Company Website */}
        <InputField
          label="Company Website"
          name="website"
          type="text"
          placeholder="yourfirm.com"
          value={formData.website}
          onChange={handleChange}
        />

        {/* Role */}
        <SelectField
          label="Your Role"
          name="role"
          value={formData.role}
          options={roleOptions}
          onChange={handleChange}
        />

        {/* Inbound Leads */}
        <SelectField
          label="Inbound Leads / Month"
          name="inboundLeads"
          value={formData.inboundLeads}
          options={leadsOptions}
          onChange={handleChange}
        />

        {/* Button row with progress indicator */}
        <div className="flex items-center justify-between mt-2">
          <button
            type="submit"
            className={`px-8 py-3 text-white text-sm font-medium rounded-full transition-all shadow-lg ${
              isFormComplete
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-blue-500/25 hover:shadow-blue-500/40'
                : 'bg-gray-400/80 backdrop-blur-sm'
            }`}
          >
            Continue to Schedule
          </button>
          <ProgressIndicator currentStep={1} totalSteps={3} />
        </div>
      </form>

      {/* Resume prompt */}
      {showResume && (
        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 py-3 bg-white/40 backdrop-blur-sm border border-white/60 rounded-xl">
          <p className="text-sm text-gray-700">Pick up where you left off?</p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleContinue}
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-full hover:from-blue-500 hover:to-purple-500 transition-all"
            >
              Continue
            </button>
            <button
              type="button"
              onClick={handleStartFresh}
              className="px-5 py-2 bg-white/60 backdrop-blur-sm text-gray-900 text-sm font-medium rounded-full border border-white/80 hover:bg-white/80 transition-all"
            >
              Start Fresh
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

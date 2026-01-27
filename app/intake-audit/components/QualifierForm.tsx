'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
      <label htmlFor={name} className="text-[15px] font-medium text-gray-900">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full px-4 py-3.5 appearance-none border border-gray-300 rounded-xl text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
      <label htmlFor={name} className="text-[15px] font-medium text-gray-900">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3.5 border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3">
          Get your free intake audit
        </h2>
        <p className="text-gray-500">
          Please fill out the form below to get started
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
        <div className="flex items-center justify-between mt-4">
          <button
            type="submit"
            className={`px-8 py-3 text-white text-sm font-medium rounded-full transition-colors ${
              isFormComplete
                ? 'bg-gray-900 hover:bg-gray-800'
                : 'bg-gray-400 hover:bg-gray-500'
            }`}
          >
            Continue to Schedule
          </button>
          <ProgressIndicator currentStep={1} totalSteps={3} />
        </div>
      </form>

      {/* Resume prompt */}
      <AnimatePresence>
        {showResume && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl"
          >
            <p className="text-[15px] text-gray-900">Pick up where you left off?</p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleContinue}
                className="px-5 py-2 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
              >
                Continue
              </button>
              <button
                type="button"
                onClick={handleStartFresh}
                className="px-5 py-2 bg-white text-gray-900 text-sm font-medium rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Start Fresh
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

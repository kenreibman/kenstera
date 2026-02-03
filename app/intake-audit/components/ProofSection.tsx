'use client'

import { motion } from 'framer-motion'
import { Play, FileText } from 'lucide-react'

export default function ProofSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-5 py-16 border-t border-gray-200">
      <div className="text-center mb-12">
        <p className="text-sm font-medium text-gray-500 mb-2">How it works</p>
        <h2 className="text-2xl md:text-3xl font-medium text-gray-900">
          See what the audit delivers
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Demo video placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gray-100 border border-gray-200 rounded-xl overflow-hidden"
        >
          <div className="aspect-video flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 relative">
            <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center mb-4">
              <Play className="w-6 h-6 text-gray-900 ml-1" />
            </div>
            <p className="text-sm font-medium text-gray-700">Demo intake scenario</p>
            <p className="text-xs text-gray-500 mt-1">(simulation)</p>
          </div>
          <div className="p-4">
            <p className="text-sm font-medium text-gray-900 mb-1">
              Lead comes in at 11:47pm
            </p>
            <p className="text-sm text-gray-500">
              Watch how our AI qualifies, engages, and books the consultation
              automatically while your team sleeps.
            </p>
          </div>
        </motion.div>

        {/* Sample deliverable */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gray-100 border border-gray-200 rounded-xl overflow-hidden"
        >
          <div className="aspect-video flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 relative">
            {/* Blurred document preview */}
            <div className="w-32 h-40 bg-white rounded-lg shadow-lg flex flex-col p-3 blur-[2px]">
              <div className="h-2 bg-gray-300 rounded w-3/4 mb-2" />
              <div className="h-2 bg-gray-200 rounded w-full mb-1" />
              <div className="h-2 bg-gray-200 rounded w-full mb-1" />
              <div className="h-2 bg-gray-200 rounded w-2/3 mb-3" />
              <div className="h-12 bg-gray-100 rounded mb-2" />
              <div className="h-2 bg-gray-200 rounded w-full mb-1" />
              <div className="h-2 bg-gray-200 rounded w-4/5" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow">
                <FileText className="w-4 h-4 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">
                  Sample Leak Map
                </span>
              </div>
            </div>
          </div>
          <div className="p-4">
            <p className="text-sm font-medium text-gray-900 mb-1">
              Your audit deliverable
            </p>
            <p className="text-sm text-gray-500">
              Receive a detailed &quot;Leak Map + Fix Plan&quot; showing exactly where
              cases are slipping and how to plug the gaps.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

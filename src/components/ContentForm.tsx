"use client"

import { useState } from 'react'
import AIAssistant from '@/components/AIAssistant'

export default function ContentForm({ 
  action, 
  defaultValues, 
  submitLabel 
}: { 
  action: any
  defaultValues?: { title: string; excerpt: string; body: string; status: string }
  submitLabel: string
}) {
  const [title, setTitle] = useState(defaultValues?.title || '')
  const [body, setBody] = useState(defaultValues?.body || '')
  const [showAI, setShowAI] = useState(false)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <form action={action} className="bg-white rounded-2xl shadow-xl border border-indigo-100 p-8 space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <span>📝</span> Title *
            </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-lg font-semibold"
              placeholder="Enter your content title"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <span>📄</span> Excerpt
            </label>
            <input
              type="text"
              name="excerpt"
              defaultValue={defaultValues?.excerpt}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              placeholder="Brief summary (optional)"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <span>✍️</span> Content *
            </label>
            <textarea
              name="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows={15}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 font-mono text-sm"
              placeholder="Write your content here... (Markdown supported)"
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-sm text-gray-500">
                {body.length} characters • {body.split(/\s+/).filter(Boolean).length} words
              </p>
              <span className="text-xs text-indigo-600 font-semibold">Markdown supported ✨</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <span>🔖</span> Status
            </label>
            <select
              name="status"
              defaultValue={defaultValues?.status || 'DRAFT'}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 font-semibold"
            >
              <option value="DRAFT">📝 Draft</option>
              <option value="PUBLISHED">✅ Published</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] hover:from-indigo-700 hover:to-purple-700"
          >
            {submitLabel}
          </button>
        </form>
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-4 space-y-6">
          <button
            type="button"
            onClick={() => setShowAI(!showAI)}
            className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all duration-200 hover:scale-105"
          >
            {showAI ? '✨ Hide AI Assistant' : '🤖 Show AI Assistant'}
          </button>

          {showAI && (
            <AIAssistant title={title} body={body} />
          )}

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-6 shadow-lg">
            <h4 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
              <span>💡</span> Pro Tips
            </h4>
            <ul className="text-sm text-gray-700 space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span>Use <strong>Markdown</strong> for formatting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>Write <strong>clear, engaging</strong> titles</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600 font-bold">•</span>
                <span>Add excerpts for better <strong>SEO</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Save as <strong>Draft</strong> to review later</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

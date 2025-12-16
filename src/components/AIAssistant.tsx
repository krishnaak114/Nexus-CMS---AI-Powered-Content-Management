"use client"

import { useState } from 'react'

export default function AIAssistant({ contentId: _contentId, title, body }: { contentId?: string, title: string, body: string }) {
  const [loading, setLoading] = useState('')
  const [summary, setSummary] = useState('')
  const [seoData, setSeoData] = useState<Record<string, unknown> | null>(null)
  const [sentiment, setSentiment] = useState<Record<string, unknown> | null>(null)
  const [tags, setTags] = useState<string[]>([])

  const handleSummarize = async () => {
    setLoading('summarize')
    try {
      const res = await fetch('/api/ai/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: body })
      })
      const data = await res.json()
      setSummary(data.summary)
    } catch (error) {
      console.error('Error:', error)
    }
    setLoading('')
  }

  const handleSEO = async () => {
    setLoading('seo')
    try {
      const res = await fetch('/api/ai/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content: body })
      })
      const data = await res.json()
      setSeoData(data)
    } catch (error) {
      console.error('Error:', error)
    }
    setLoading('')
  }

  const handleSentiment = async () => {
    setLoading('sentiment')
    try {
      const res = await fetch('/api/ai/sentiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: body })
      })
      const data = await res.json()
      setSentiment(data)
    } catch (error) {
      console.error('Error:', error)
    }
    setLoading('')
  }

  const handleTags = async () => {
    setLoading('tags')
    try {
      const res = await fetch('/api/ai/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content: body })
      })
      const data = await res.json()
      setTags(data.tags)
    } catch (error) {
      console.error('Error:', error)
    }
    setLoading('')
  }

  if (!body || body.length < 50) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <p className="text-gray-500 text-center">
          Write at least 50 characters to enable AI features
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
        <span className="text-2xl">🤖</span>
        AI Assistant
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleSummarize}
          disabled={loading === 'summarize'}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm"
        >
          {loading === 'summarize' ? 'Generating...' : '✨ Summarize'}
        </button>
        
        <button
          onClick={handleSEO}
          disabled={loading === 'seo'}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm"
        >
          {loading === 'seo' ? 'Analyzing...' : '🎯 SEO Optimize'}
        </button>
        
        <button
          onClick={handleSentiment}
          disabled={loading === 'sentiment'}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 text-sm"
        >
          {loading === 'sentiment' ? 'Analyzing...' : '😊 Sentiment'}
        </button>
        
        <button
          onClick={handleTags}
          disabled={loading === 'tags'}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 text-sm"
        >
          {loading === 'tags' ? 'Suggesting...' : '🏷️ Suggest Tags'}
        </button>
      </div>

      {summary && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Summary</h4>
          <p className="text-blue-800 text-sm">{summary}</p>
        </div>
      )}

      {seoData && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-semibold text-green-900 mb-2">
            SEO Score: {(seoData as any).seoScore}/100
          </h4>
          <p className="text-green-800 text-sm mb-2">{(seoData as any).metaDescription}</p>
          {Array.isArray((seoData as any).keywords) && (seoData as any).keywords.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {(seoData as any).keywords.map((kw: string) => (
                <span key={kw} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                  {kw}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {sentiment && (
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h4 className="font-semibold text-purple-900 mb-2">
            Sentiment: {(sentiment as any).sentiment} ({(sentiment as any).confidence}% confident)
          </h4>
          {Array.isArray((sentiment as any).emotions) && (sentiment as any).emotions.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {(sentiment as any).emotions.map((emotion: string) => (
                <span key={emotion} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                  {emotion}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {tags.length > 0 && (
        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <h4 className="font-semibold text-orange-900 mb-2">Suggested Tags</h4>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

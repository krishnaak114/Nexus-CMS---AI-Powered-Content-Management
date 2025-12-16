import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY || ''
})

export async function summarizeContent(content: string): Promise<string> {
  if (!process.env.CLAUDE_API_KEY) {
    return "AI features require a Claude API key. Add your key to .env.local"
  }

  try {
    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 100,
      messages: [{
        role: "user",
        content: `Summarize in 2 sentences:\n\n${content.slice(0, 500)}`
      }]
    })

    return response.content[0].type === 'text' ? response.content[0].text : "Unable to generate summary"
  } catch (error) {
    console.error('Claude API error:', error)
    return "Error generating summary"
  }
}

export async function optimizeSEO(title: string, content: string): Promise<{
  metaDescription: string
  keywords: string[]
  seoScore: number
}> {
  if (!process.env.CLAUDE_API_KEY) {
    return {
      metaDescription: "Add Claude API key",
      keywords: [],
      seoScore: 0
    }
  }

  try {
    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 150,
      messages: [{
        role: "user",
        content: `SEO for: ${title}\n${content.slice(0, 300)}\nJSON: {metaDescription, keywords[], seoScore}`
      }]
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : '{}'
    const result = JSON.parse(text)
    return {
      metaDescription: result.metaDescription || '',
      keywords: result.keywords || [],
      seoScore: result.seoScore || 50
    }
  } catch {
    return {
      metaDescription: content.slice(0, 150),
      keywords: [],
      seoScore: 50
    }
  }
}

export async function analyzeSentiment(content: string): Promise<{
  sentiment: 'positive' | 'neutral' | 'negative'
  confidence: number
  emotions: string[]
}> {
  if (!process.env.CLAUDE_API_KEY) {
    return {
      sentiment: 'neutral',
      confidence: 0,
      emotions: []
    }
  }

  try {
    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 80,
      messages: [{
        role: "user",
        content: `Sentiment: ${content.slice(0, 300)}\nJSON: {sentiment, confidence, emotions[]}`
      }]
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : '{}'
    const result = JSON.parse(text)
    return {
      sentiment: result.sentiment || 'neutral',
      confidence: result.confidence || 50,
      emotions: result.emotions || []
    }
  } catch {
    return {
      sentiment: 'neutral',
      confidence: 50,
      emotions: []
    }
  }
}

export async function suggestTags(title: string, content: string): Promise<string[]> {
  if (!process.env.CLAUDE_API_KEY) {
    return []
  }

  try {
    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 50,
      messages: [{
        role: "user",
        content: `Tags for: ${title} ${content.slice(0, 200)}\nJSON array of 4 tags:`
      }]
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : '[]'
    return JSON.parse(text)
  } catch (error) {
    return []
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { analyzeSentiment } from '@/lib/ai'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { content } = await req.json()
    
    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 })
    }

    const sentiment = await analyzeSentiment(content)
    
    return NextResponse.json(sentiment)
  } catch (error) {
    console.error('Sentiment API error:', error)
    return NextResponse.json({ error: 'Failed to analyze sentiment' }, { status: 500 })
  }
}

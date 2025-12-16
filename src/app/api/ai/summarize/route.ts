import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { summarizeContent } from '@/lib/ai'

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

    const summary = await summarizeContent(content)
    
    return NextResponse.json({ summary })
  } catch (error) {
    console.error('Summarize API error:', error)
    return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 })
  }
}

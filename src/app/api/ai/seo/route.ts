import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { optimizeSEO } from '@/lib/ai'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { title, content } = await req.json()
    
    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
    }

    const seoData = await optimizeSEO(title, content)
    
    return NextResponse.json(seoData)
  } catch (error) {
    console.error('SEO API error:', error)
    return NextResponse.json({ error: 'Failed to optimize SEO' }, { status: 500 })
  }
}

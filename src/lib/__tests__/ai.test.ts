import { summarizeContent, optimizeSEO, analyzeSentiment, suggestTags } from '@/lib/ai'

// Mock Anthropic
jest.mock('@anthropic-ai/sdk', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      messages: {
        create: jest.fn().mockResolvedValue({
          content: [{ text: 'Test AI response' }],
        }),
      },
    })),
  }
})

describe('AI Functions', () => {
  const mockContent = 'This is a test article about artificial intelligence and machine learning.'

  describe('summarizeContent', () => {
    it('returns a summary of the content', async () => {
      const result = await summarizeContent(mockContent)
      expect(result).toBeDefined()
      expect(typeof result).toBe('string')
    })

    it('handles empty content', async () => {
      const result = await summarizeContent('')
      expect(result).toBeDefined()
    })
  })

  describe('optimizeSEO', () => {
    it('returns SEO optimization suggestions', async () => {
      const result = await optimizeSEO('Test Title', mockContent)
      expect(result).toBeDefined()
      expect(typeof result).toBe('object')
      expect(result).toHaveProperty('metaDescription')
      expect(result).toHaveProperty('keywords')
      expect(result).toHaveProperty('seoScore')
    })
  })

  describe('analyzeSentiment', () => {
    it('analyzes content sentiment', async () => {
      const result = await analyzeSentiment(mockContent)
      expect(result).toBeDefined()
      expect(typeof result).toBe('object')
      expect(result).toHaveProperty('sentiment')
      expect(result).toHaveProperty('confidence')
      expect(result).toHaveProperty('emotions')
    })
  })

  describe('suggestTags', () => {
    it('generates relevant tags', async () => {
      const result = await suggestTags('Test Title', mockContent)
      expect(result).toBeDefined()
      expect(Array.isArray(result)).toBe(true)
    })
  })
})

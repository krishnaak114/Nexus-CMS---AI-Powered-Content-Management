import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"
import Link from "next/link"
import { deleteContent, updateContent, publishContent } from "@/app/actions/content"

export default async function ContentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  const { id } = await params
  const content = await prisma.content.findUnique({
    where: { id },
    include: {
      author: {
        select: { name: true, email: true }
      }
    }
  })

  if (!content || content.authorId !== session?.user?.id) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white shadow-lg border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link 
            href="/dashboard/content" 
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold transition-all duration-200 hover:gap-3"
          >
            <span>←</span> Back to Content
          </Link>
          <div className="flex gap-3">
            <Link
              href={`/dashboard/content/${id}/edit`}
              className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              ✏️ Edit
            </Link>
            <form action={deleteContent.bind(null, id)}>
              <button className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105">
                🗑️ Delete
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl border border-indigo-100 p-10">
          <div className="mb-8">
            <span className={`inline-block px-4 py-2 rounded-xl text-sm font-bold mb-6 shadow-md ${
              content.status === 'PUBLISHED' 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                : 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white'
            }`}>
              {content.status === 'PUBLISHED' ? '✅ Published' : '📝 Draft'}
            </span>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 leading-tight">
              {content.title}
            </h1>
            {content.excerpt && (
              <p className="text-xl text-gray-600 mb-6 leading-relaxed border-l-4 border-indigo-400 pl-4 italic">
                {content.excerpt}
              </p>
            )}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl">
              <span className="flex items-center gap-2">
                <span className="text-lg">👤</span>
                <span>By <strong>{content.author.name}</strong></span>
              </span>
              <span className="text-gray-400">•</span>
              <span className="flex items-center gap-2">
                <span className="text-lg">📅</span>
                <span>Created {new Date(content.createdAt).toLocaleDateString()}</span>
              </span>
              {content.publishedAt && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="flex items-center gap-2">
                    <span className="text-lg">🚀</span>
                    <span>Published {new Date(content.publishedAt).toLocaleDateString()}</span>
                  </span>
                </>
              )}
            </div>
          </div>

          {content.status === 'DRAFT' && (
            <form action={publishContent.bind(null, id)} className="mb-8">
              <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]">
                🚀 Publish Now
              </button>
            </form>
          )}

          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-lg">{content.body}</div>
          </div>

          {content.aiSummary && (
            <div className="mt-10 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl shadow-lg">
              <h3 className="font-bold text-blue-900 mb-3 text-lg flex items-center gap-2">
                <span className="text-2xl">🤖</span> AI Summary
              </h3>
              <p className="text-blue-800 leading-relaxed">{content.aiSummary}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

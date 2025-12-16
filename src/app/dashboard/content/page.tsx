import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import Link from "next/link"

export default async function ContentListPage() {
  const session = await auth()
  
  const content = await prisma.content.findMany({
    where: { 
      authorId: session?.user?.id,
      status: { not: 'ARCHIVED' }
    },
    orderBy: { createdAt: 'desc' },
    include: {
      author: {
        select: { name: true }
      }
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white shadow-md border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/dashboard" className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2 mb-2">
                <span>←</span> Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                📚 All Content
              </h1>
            </div>
            <Link 
              href="/dashboard/content/new"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition font-semibold flex items-center gap-2"
            >
              <span className="text-xl">+</span>
              Create New Content
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {content.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-16 text-center border-2 border-dashed border-indigo-200">
            <div className="text-6xl mb-6">📝</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No content yet</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start creating amazing content with AI-powered features. Your first post is just a click away!
            </p>
            <Link 
              href="/dashboard/content/new"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition font-semibold text-lg"
            >
              <span className="text-2xl">✨</span>
              Create Your First Post
            </Link>
          </div>
        ) : (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">{content.length}</span> {content.length === 1 ? 'post' : 'posts'} found
              </p>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white text-sm font-medium">
                  All
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white text-sm font-medium">
                  Published
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white text-sm font-medium">
                  Drafts
                </button>
              </div>
            </div>

            <div className="grid gap-6">
              {content.map((item) => (
                <Link 
                  key={item.id}
                  href={`/dashboard/content/${item.id}`}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-indigo-200 group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition mb-2">
                        {item.title}
                      </h2>
                      {item.excerpt && (
                        <p className="text-gray-600 leading-relaxed">{item.excerpt}</p>
                      )}
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ml-4 ${
                      item.status === 'PUBLISHED' 
                        ? 'bg-green-100 text-green-700 border border-green-200' 
                        : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                    }`}>
                      {item.status === 'PUBLISHED' ? '✓ Published' : '📝 Draft'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-gray-500">
                      <span className="flex items-center gap-1">
                        <span className="text-indigo-600">👤</span>
                        {item.author.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="text-indigo-600">📅</span>
                        {new Date(item.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                    <span className="text-indigo-600 font-medium group-hover:translate-x-1 transition-transform">
                      View Details →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

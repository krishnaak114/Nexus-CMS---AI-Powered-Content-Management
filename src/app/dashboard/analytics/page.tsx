import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import Link from "next/link"

export default async function AnalyticsPage() {
  const session = await auth()
  
  const totalViews = await prisma.analytics.aggregate({
    where: { content: { authorId: session?.user?.id } },
    _sum: { views: true, uniqueVisitors: true }
  })

  const topContent = await prisma.content.findMany({
    where: { authorId: session?.user?.id, status: 'PUBLISHED' },
    include: {
      analytics: true
    },
    orderBy: {
      analytics: { views: 'desc' }
    },
    take: 10
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white shadow-lg border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold transition-all duration-200 hover:gap-3"
          >
            <span>←</span> Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">📊</span>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Analytics
            </h1>
          </div>
          <p className="text-gray-600 ml-14">Track your content performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-2xl shadow-xl text-white hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold opacity-90">Total Views</h3>
              <span className="text-3xl">👁️</span>
            </div>
            <p className="text-5xl font-bold">
              {totalViews._sum.views || 0}
            </p>
            <p className="text-sm opacity-75 mt-2">All-time page views</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-2xl shadow-xl text-white hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold opacity-90">Unique Visitors</h3>
              <span className="text-3xl">👥</span>
            </div>
            <p className="text-5xl font-bold">
              {totalViews._sum.uniqueVisitors || 0}
            </p>
            <p className="text-sm opacity-75 mt-2">Individual readers</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-indigo-100">
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
              <span>🏆</span> Top Performing Content
            </h2>
          </div>
          
          {topContent.length === 0 ? (
            <div className="p-16 text-center">
              <div className="text-6xl mb-4">📈</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Analytics Yet</h3>
              <p className="text-gray-600 mb-6">Publish some content to see your analytics!</p>
              <Link 
                href="/dashboard/content/new"
                className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                ✨ Create Your First Post
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {topContent.map((item, index) => (
                <div key={item.id} className="p-6 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200 group">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-6">
                      <span className={`text-3xl font-bold px-4 py-2 rounded-xl ${
                        index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' :
                        index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' :
                        index === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                      </span>
                      <div>
                        <Link 
                          href={`/dashboard/content/${item.id}`}
                          className="font-bold text-lg text-gray-900 hover:text-indigo-600 transition-colors group-hover:text-indigo-600"
                        >
                          {item.title}
                        </Link>
                        <div className="flex gap-4 text-sm text-gray-600 mt-2">
                          <span className="flex items-center gap-1">
                            <span className="text-indigo-600">👁️</span>
                            <strong>{item.analytics?.views || 0}</strong> views
                          </span>
                          <span className="text-gray-400">•</span>
                          <span className="flex items-center gap-1">
                            <span className="text-green-600">👥</span>
                            <strong>{item.analytics?.uniqueVisitors || 0}</strong> unique
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-blue-500 to-indigo-600 border-2 border-blue-300 rounded-2xl shadow-lg text-white">
          <p className="text-sm leading-relaxed">
            <span className="text-2xl mr-2">💡</span>
            <strong>Pro Tip:</strong> Analytics tracking is simulated for demo purposes. 
            In production, integrate with Google Analytics or similar service for real metrics and advanced insights.
          </p>
        </div>
      </main>
    </div>
  )
}

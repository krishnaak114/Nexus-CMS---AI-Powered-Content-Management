import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { signOut } from "@/lib/auth"
import Link from "next/link"

export default async function DashboardPage() {
  const session = await auth()
  
  const stats = await prisma.content.groupBy({
    by: ['status'],
    where: { authorId: session?.user?.id },
    _count: true
  })

  const totalContent = stats.reduce((acc, curr) => acc + curr._count, 0)
  const published = stats.find(s => s.status === 'PUBLISHED')?._count || 0
  const drafts = stats.find(s => s.status === 'DRAFT')?._count || 0

  const recentContent = await prisma.content.findMany({
    where: { authorId: session?.user?.id, status: { not: 'ARCHIVED' } },
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: {
      id: true,
      title: true,
      status: true,
      createdAt: true,
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white shadow-lg border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-sm text-gray-600 mt-1">Welcome back, {session?.user?.name} 👋</p>
          </div>
          <form action={async () => {
            "use server"
            await signOut({ redirectTo: "/" })
          }}>
            <button className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105">
              Logout
            </button>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Stats Cards */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl shadow-xl text-white hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold opacity-90">Total Content</h3>
              <span className="text-3xl">📚</span>
            </div>
            <p className="text-4xl font-bold">{totalContent}</p>
            <p className="text-sm opacity-75 mt-2">{totalContent === 0 ? 'Ready to start creating!' : 'All your posts'}</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-xl shadow-xl text-white hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold opacity-90">Published</h3>
              <span className="text-3xl">✅</span>
            </div>
            <p className="text-4xl font-bold">{published}</p>
            <p className="text-sm opacity-75 mt-2">{published === 0 ? 'No published content yet' : 'Live on your site'}</p>
          </div>
          
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-6 rounded-xl shadow-xl text-white hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold opacity-90">Drafts</h3>
              <span className="text-3xl">📝</span>
            </div>
            <p className="text-4xl font-bold">{drafts}</p>
            <p className="text-sm opacity-75 mt-2">{drafts === 0 ? 'No drafts yet' : 'Work in progress'}</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-xl shadow-xl text-white hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold opacity-90">Total Views</h3>
              <span className="text-3xl">👁️</span>
            </div>
            <p className="text-4xl font-bold">0</p>
            <p className="text-sm opacity-75 mt-2">Analytics coming soon</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-indigo-100">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            ⚡ Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              href="/dashboard/content/new"
              className="group p-6 border-2 border-dashed border-indigo-300 rounded-xl hover:border-indigo-500 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">📝</div>
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors">Create Content</h3>
              <p className="text-sm text-gray-600 mt-2">Write a new article or post</p>
            </Link>
            
            <Link 
              href="/dashboard/content"
              className="group p-6 border-2 border-dashed border-purple-300 rounded-xl hover:border-purple-500 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">📚</div>
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-600 transition-colors">View Content</h3>
              <p className="text-sm text-gray-600 mt-2">Manage all your posts</p>
            </Link>
            
            <Link 
              href="/dashboard/analytics"
              className="group p-6 border-2 border-dashed border-pink-300 rounded-xl hover:border-pink-500 hover:bg-gradient-to-br hover:from-pink-50 hover:to-red-50 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">📊</div>
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-pink-600 transition-colors">View Analytics</h3>
              <p className="text-sm text-gray-600 mt-2">Track your performance</p>
            </Link>
          </div>
        </div>

        {/* Recent Content */}
        {recentContent.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-purple-100">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              📄 Recent Content
            </h2>
            <div className="space-y-4">
              {recentContent.map((content) => (
                <Link 
                  key={content.id}
                  href={`/dashboard/content/${content.id}`}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-purple-400 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                      {content.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Created {new Date(content.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      content.status === 'PUBLISHED' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {content.status}
                    </span>
                    <span className="text-purple-600 group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Getting Started Guide */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-3">🎉 Welcome to Nexus CMS!</h2>
          <p className="text-lg opacity-90 mb-8">
            Your powerful content management system with AI superpowers is ready to use.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white/20 p-5 rounded-xl backdrop-blur border border-white/30 hover:bg-white/30 transition-all duration-200">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">✅</span>
                <h3 className="font-bold text-lg">Authentication Ready</h3>
              </div>
              <p className="text-sm opacity-90">NextAuth.js with secure credentials provider</p>
            </div>
            <div className="bg-white/20 p-5 rounded-xl backdrop-blur border border-white/30 hover:bg-white/30 transition-all duration-200">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">✅</span>
                <h3 className="font-bold text-lg">Content Management</h3>
              </div>
              <p className="text-sm opacity-90">Full CRUD operations with rich editor</p>
            </div>
            <div className="bg-white/20 p-5 rounded-xl backdrop-blur border border-white/30 hover:bg-white/30 transition-all duration-200">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">✅</span>
                <h3 className="font-bold text-lg">AI Assistant</h3>
              </div>
              <p className="text-sm opacity-90">4 powerful AI features powered by OpenAI</p>
            </div>
            <div className="bg-white/20 p-5 rounded-xl backdrop-blur border border-white/30 hover:bg-white/30 transition-all duration-200">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🚀</span>
                <h3 className="font-bold text-lg">Production Ready</h3>
              </div>
              <p className="text-sm opacity-90">Deploy to Vercel in minutes</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/dashboard/content/new" 
              className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all duration-200 hover:shadow-xl hover:scale-105"
            >
              ✨ Create Your First Post
            </Link>
            <Link 
              href="/dashboard/analytics" 
              className="inline-block bg-white/20 backdrop-blur text-white border-2 border-white px-8 py-3 rounded-xl font-bold hover:bg-white/30 transition-all duration-200"
            >
              📊 View Analytics
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

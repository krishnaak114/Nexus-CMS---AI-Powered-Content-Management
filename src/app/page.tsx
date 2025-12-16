export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <div className="mb-8 text-7xl animate-bounce">🚀</div>
        <h1 className="text-7xl font-bold mb-6 leading-tight">
          Welcome to <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Nexus CMS</span>
        </h1>
        <p className="text-2xl text-gray-700 mb-10 font-semibold">
          AI-Powered Content Management System ✨
        </p>
        <div className="flex gap-6 justify-center mb-12">
          <a
            href="/login"
            className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-200 hover:scale-110"
          >
            🚀 Get Started
          </a>
          <a
            href="#features"
            className="px-10 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg border-2 border-indigo-600 hover:bg-indigo-50 transition-all duration-200 hover:scale-110 hover:shadow-xl"
          >
            📚 Learn More
          </a>
        </div>
        
        <div id="features" className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-indigo-100">
            <div className="text-5xl mb-5">✨</div>
            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">AI-Powered</h3>
            <p className="text-gray-600 leading-relaxed">
              Automatic content summarization, SEO optimization, and sentiment analysis powered by OpenAI
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-purple-100">
            <div className="text-5xl mb-5">⚡</div>
            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Lightning Fast</h3>
            <p className="text-gray-600 leading-relaxed">
              Built with Next.js 15 and React 19 for optimal performance and amazing user experience
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-pink-100">
            <div className="text-5xl mb-5">🎯</div>
            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">Full-Featured</h3>
            <p className="text-gray-600 leading-relaxed">
              Complete CRUD operations, analytics, media management, and secure authentication
            </p>
          </div>
        </div>

        <div className="mt-24 p-8 bg-white rounded-2xl shadow-2xl border-2 border-indigo-200">
          <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            🎯 Key Features That Set This Apart
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-bold text-lg text-gray-900">Complete Authentication</p>
                <p className="text-sm text-gray-600">Secure login, register, and protected routes with NextAuth.js</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-bold text-lg text-gray-900">Full CRUD Operations</p>
                <p className="text-sm text-gray-600">Create, read, update, and delete content with ease</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-bold text-lg text-gray-900">4 AI Features</p>
                <p className="text-sm text-gray-600">Summarize, SEO optimize, sentiment analysis, and tag suggestions</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-bold text-lg text-gray-900">Real-time Analytics</p>
                <p className="text-sm text-gray-600">Track views, visitors, and top performing content</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-pink-50 to-red-50 rounded-xl">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-bold text-lg text-gray-900">Production Ready</p>
                <p className="text-sm text-gray-600">TypeScript, error handling, and security best practices</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-bold text-lg text-gray-900">Modern Stack</p>
                <p className="text-sm text-gray-600">Next.js 15, React 19, Prisma ORM, and Tailwind CSS</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 p-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl text-white">
          <p className="text-2xl font-bold mb-4">Built by Krishna Agrawal</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-lg">
            <a href="mailto:kagrawalk510@gmail.com" className="flex items-center gap-2 hover:scale-110 transition-transform duration-200 bg-white/20 px-6 py-3 rounded-xl backdrop-blur">
              <span className="text-2xl">📧</span>
              <span className="font-semibold">kagrawalk510@gmail.com</span>
            </a>
            <a href="https://github.com/krishnaak114" className="flex items-center gap-2 hover:scale-110 transition-transform duration-200 bg-white/20 px-6 py-3 rounded-xl backdrop-blur">
              <span className="text-2xl">💻</span>
              <span className="font-semibold">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/agrawal-krishna-aa11a61ba/" className="flex items-center gap-2 hover:scale-110 transition-transform duration-200 bg-white/20 px-6 py-3 rounded-xl backdrop-blur">
              <span className="text-2xl">💼</span>
              <span className="font-semibold">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

import { registerUser } from "../actions/auth"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full border border-purple-100">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">✨</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Join Nexus CMS
          </h1>
          <p className="text-gray-600">Create your account and start creating</p>
        </div>

        <form action={registerUser} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              👤 Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              📧 Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              🔒 Password
            </label>
            <input
              type="password"
              name="password"
              required
              minLength={8}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
              placeholder="At least 8 characters"
            />
            <p className="text-xs text-gray-500 mt-1">Use at least 8 characters with letters and numbers</p>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-bold hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition text-lg"
          >
            Create My Account →
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-purple-600 hover:text-indigo-600 font-bold hover:underline transition">
              Login instead →
            </Link>
          </p>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition">
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}

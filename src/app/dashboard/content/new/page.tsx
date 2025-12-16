import { createContent } from "@/app/actions/content"
import ContentForm from "@/components/ContentForm"
import Link from "next/link"

export default function NewContentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white shadow-lg border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <Link 
            href="/dashboard/content" 
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold transition-all duration-200 hover:gap-3"
          >
            <span>←</span> Back to Content
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">✨</span>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Create New Content
            </h1>
          </div>
          <p className="text-gray-600 ml-14">Write amazing content with AI assistance</p>
        </div>

        <ContentForm action={createContent} submitLabel="🚀 Create Content" />

      </main>
    </div>
  )
}

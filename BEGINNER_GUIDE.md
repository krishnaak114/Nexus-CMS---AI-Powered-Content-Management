# 🎓 Beginner's Guide to Building Nexus CMS

Welcome! This guide will teach you full-stack development step-by-step. No prior experience needed!

---

## 📚 Table of Contents

1. [Understanding Your App](#understanding-your-app)
2. [How Next.js Works](#how-nextjs-works)
3. [Tutorial 1: Add a New Page](#tutorial-1-add-a-new-page)
4. [Tutorial 2: Create a User Registration Form](#tutorial-2-create-a-user-registration-form)
5. [Tutorial 3: Save Data to Database](#tutorial-3-save-data-to-database)
6. [Common Errors & Solutions](#common-errors--solutions)
7. [Learning Resources](#learning-resources)

---

## Understanding Your App

### What is Full-Stack?

- **Frontend** = What users see (HTML, CSS, React)
- **Backend** = Server logic (API routes, database)
- **Database** = Where data is stored (SQLite/PostgreSQL)

### Your Tech Stack (Explained Simply)

| Technology | What it does | Example |
|------------|--------------|---------|
| **Next.js** | Framework that combines frontend + backend | Like WordPress but you build it |
| **React** | Creates UI components (buttons, forms) | `<Button>Click me</Button>` |
| **TypeScript** | JavaScript with types (catches errors early) | Tells you "expected string, got number" |
| **Prisma** | Talks to your database easily | `prisma.user.create({ ... })` |
| **Tailwind** | Styles your pages with classes | `className="bg-blue-500 text-white"` |

---

## How Next.js Works

### File-Based Routing

Every file in `src/app/` becomes a URL:

```
src/app/page.tsx           →  http://localhost:3000/
src/app/about/page.tsx     →  http://localhost:3000/about
src/app/dashboard/page.tsx →  http://localhost:3000/dashboard
```

### Server vs Client Components

**Server Components** (default):
- Run on the server
- Can directly access database
- Faster, more secure
- Use when possible!

```tsx
// src/app/page.tsx - Server Component
export default function HomePage() {
  return <h1>Hello!</h1>
}
```

**Client Components** (interactive):
- Run in browser
- Needed for: buttons, forms, state
- Add `"use client"` at top

```tsx
// src/components/Button.tsx - Client Component
"use client"

export default function Button() {
  const handleClick = () => alert("Clicked!")
  return <button onClick={handleClick}>Click me</button>
}
```

---

## Tutorial 1: Add a New Page

Let's create an "About" page to learn the basics!

### Step 1: Create the file

Create: `src/app/about/page.tsx`

```tsx
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About Nexus CMS
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          This is my first full-stack application built with Next.js 15!
        </p>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-2">Features I'm Building:</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>User authentication (login/register)</li>
            <li>Content creation and management</li>
            <li>AI-powered features</li>
            <li>Analytics dashboard</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
```

### Step 2: Test it

Go to: **http://localhost:3000/about**

🎉 You just created your first page!

### Understanding Tailwind Classes

```tsx
className="min-h-screen bg-gray-50 p-8"
```

- `min-h-screen` = Minimum height of screen
- `bg-gray-50` = Light gray background
- `p-8` = Padding of 8 units (32px)

**Common classes:**
- `text-4xl` = Extra large text
- `font-bold` = Bold text
- `mb-4` = Margin bottom 4 units
- `rounded-lg` = Large rounded corners
- `shadow` = Drop shadow

---

## Tutorial 2: Create a User Registration Form

Now let's build something interactive!

### Step 1: Create the registration page

Create: `src/app/register/page.tsx`

```tsx
"use client"

import { useState } from 'react'

export default function RegisterPage() {
  // State = data that can change
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Prevent page reload
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    // TODO: We'll add database logic next!
    console.log('Form data:', formData)
    setSuccess(true)
    setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Create Account
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Account created successfully! (Not saved to database yet)
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Krishna Agrawal"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="At least 8 characters"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Create Account
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  )
}
```

### Step 2: Test your form

Go to: **http://localhost:3000/register**

Try submitting the form and watch the console (F12 → Console tab)

### Understanding the Code

**State Management:**
```tsx
const [formData, setFormData] = useState({ name: '', email: '', password: '' })
```
- `formData` = Current values
- `setFormData` = Function to update values

**Form Handling:**
```tsx
onChange={(e) => setFormData({ ...formData, name: e.target.value })}
```
- `e.target.value` = What user typed
- `...formData` = Keep existing data
- `name: e.target.value` = Update name field

---

## Tutorial 3: Save Data to Database

Let's make the registration form actually work!

### Step 1: Create a database helper

Create: `src/lib/db.ts`

```tsx
import { PrismaClient } from '@prisma/client'

// Create a single Prisma instance
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### Step 2: Create a Server Action

Create: `src/app/actions/auth.ts`

```tsx
"use server"

import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function registerUser(data: {
  name: string
  email: string
  password: string
}) {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    })

    if (existingUser) {
      return { success: false, error: 'Email already registered' }
    }

    // Hash the password (encrypt it)
    const hashedPassword = await bcrypt.hash(data.password, 10)

    // Create user in database
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: 'EDITOR' // Default role
      }
    })

    return { 
      success: true, 
      message: 'Account created successfully!',
      userId: user.id 
    }
  } catch (error) {
    console.error('Registration error:', error)
    return { success: false, error: 'Something went wrong' }
  }
}
```

### Step 3: Update registration page to use Server Action

Update: `src/app/register/page.tsx`

```tsx
"use client"

import { useState } from 'react'
import { registerUser } from '../actions/auth'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setLoading(true)
    setError('')

    // Call server action to save to database
    const result = await registerUser(formData)

    setLoading(false)

    if (result.success) {
      setSuccess(true)
      setFormData({ name: '', email: '', password: '' })
    } else {
      setError(result.error || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Create Account
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Account created successfully! You can now login.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Krishna Agrawal"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="you@example.com"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="At least 8 characters"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  )
}
```

### Step 4: Install bcryptjs

```powershell
npm install bcryptjs
npm install --save-dev @types/bcryptjs
```

### Step 5: Test it!

1. Go to http://localhost:3000/register
2. Fill out the form
3. Submit
4. Check your database:
   ```powershell
   npx prisma studio
   ```
5. You'll see your user in the database! 🎉

---

## Common Errors & Solutions

### Error: "Cannot find module '@prisma/client'"

**Solution:**
```powershell
npm install @prisma/client
npx prisma generate
```

### Error: "Database file not found"

**Solution:**
```powershell
$env:DATABASE_URL="file:./dev.db"
npx prisma db push
```

### Error: "Hydration failed"

**Cause:** Server and client HTML don't match

**Solution:** Make sure client components have `"use client"` at top

### Error: "Module not found: Can't resolve '@/...'"

**Cause:** Path alias not working

**Solution:** Check `tsconfig.json` has:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## Learning Resources

### Official Docs (Best!)
- [Next.js Tutorial](https://nextjs.org/learn) - Interactive course
- [React Docs](https://react.dev/learn) - Learn React basics
- [Tailwind CSS](https://tailwindcss.com/docs) - Styling reference
- [Prisma Docs](https://www.prisma.io/docs) - Database queries

### YouTube Channels
- **Web Dev Simplified** - Clear, concise tutorials
- **Traversy Media** - Full projects
- **Fireship** - Quick concepts (6-minute videos)

### Practice Sites
- **Frontend Mentor** - Build real projects
- **JavaScript30** - 30 vanilla JS challenges

---

## Your Next Steps

### ✅ What You've Learned
- [x] Created pages with Next.js routing
- [x] Built forms with React state
- [x] Saved data to database with Prisma
- [x] Used Server Actions for backend logic

### 🎯 What to Build Next

**Week 1:**
1. ✅ Registration form (done!)
2. Login form (similar to registration)
3. Protected routes (only logged-in users can access)
4. User profile page

**Week 2:**
5. Create content form
6. List all content
7. Edit/delete content
8. Add categories and tags

**Week 3:**
9. Add AI features (OpenAI)
10. Analytics dashboard
11. Media uploads
12. Polish UI

**Week 4:**
13. Write tests
14. Deploy to Vercel
15. Add CI/CD
16. Final polish

---

## 🆘 Getting Help

**Stuck?** Here's what to do:

1. **Read the error message** - It usually tells you what's wrong
2. **Check the console** - F12 → Console tab
3. **Google the error** - Copy/paste exact error message
4. **Ask ChatGPT** - "I'm learning Next.js and got this error: ..."
5. **Check docs** - Official docs are your best friend

---

## 💡 Pro Tips

1. **Save often** - Use Ctrl+S frequently
2. **Use the console** - `console.log()` is your best debugging tool
3. **Start small** - Build one feature at a time
4. **Copy examples** - Learning by copying is totally fine!
5. **Break things** - You can't break anything permanently
6. **Commit to Git** - Save your progress regularly
7. **Take breaks** - Your brain needs rest to learn

---

## 🎉 You're Doing Great!

Building a full-stack app is hard, but you're making progress! Every error is a learning opportunity.

Remember:
- **Every developer was a beginner once**
- **Google is your friend**
- **It's okay to not know everything**
- **Progress > Perfection**

Keep building, keep learning, keep growing! 🚀

---

**Questions?** Check:
- [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md) - Detailed technical guide
- [PROJECT_PLAN.md](PROJECT_PLAN.md) - What to build when
- [CHECKLIST.md](CHECKLIST.md) - Track your progress

**Good luck! You've got this! 💪**

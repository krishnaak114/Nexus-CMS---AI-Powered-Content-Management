# 🚀 Quick Start Guide - Nexus CMS

This guide will help you get **Nexus CMS** up and running in under 10 minutes.

---

## Prerequisites

Before you begin, ensure you have:

- ✅ **Node.js 20+** and **npm 10+** installed
- ✅ **PostgreSQL 16+** (local or cloud like Vercel Postgres)
- ✅ **OpenAI API Key** (sign up at [platform.openai.com](https://platform.openai.com))
- ✅ **Git** installed
- ✅ A code editor (VS Code recommended)

---

## Step 1: Clone & Install

```bash
# Clone the repository
git clone https://github.com/krishnaak114/nexus-cms.git
cd nexus-cms

# Install dependencies (this may take 2-3 minutes)
npm install
```

---

## Step 2: Set Up Environment Variables

```bash
# Copy the example environment file
cp .env.example .env.local
```

Edit `.env.local` with your values:

```env
# Database - Replace with your PostgreSQL connection string
DATABASE_URL="postgresql://user:password@localhost:5432/nexus_cms?schema=public"

# NextAuth - Generate a secret: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generated-secret-here"

# OpenAI - Get your API key from platform.openai.com
OPENAI_API_KEY="sk-your-openai-api-key-here"
```

**Quick Database Setup Options:**

**Option A: Local PostgreSQL**
```bash
# Install PostgreSQL (Mac)
brew install postgresql@16
brew services start postgresql@16

# Create database
createdb nexus_cms
```

**Option B: Vercel Postgres (Recommended for deployment)**
- Go to [vercel.com/dashboard](https://vercel.com/dashboard)
- Create a Postgres database
- Copy the connection string to your `.env.local`

---

## Step 3: Initialize Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database (creates tables)
npm run db:push

# Seed with sample data (optional but recommended)
npm run db:seed
```

This creates:
- 3 users (admin, editor, viewer)
- 10 sample articles
- 5 categories
- 15 tags

**Default login credentials:**
- Admin: `admin@nexuscms.com` / `Admin@123`
- Editor: `editor@nexuscms.com` / `Editor@123`
- Viewer: `viewer@nexuscms.com` / `Viewer@123`

---

## Step 4: Run the Development Server

```bash
npm run dev
```

🎉 **You're done!** Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Step 5: Explore the Application

### 1. **Login**
   - Go to `/login`
   - Use any of the seeded credentials above

### 2. **Dashboard** (`/dashboard`)
   - View overview statistics
   - See recent content

### 3. **Create Content** (`/dashboard/content/new`)
   - Write a new article
   - Try the **AI features**:
     - Click "AI Summarize" to generate a summary
     - Click "Optimize SEO" for meta tags
     - Click "Analyze Sentiment" to check tone
     - Click "Suggest Tags" for automatic tagging

### 4. **View Analytics** (`/dashboard/analytics`)
   - See content performance metrics
   - View charts and graphs

### 5. **Manage Media** (`/dashboard/media`)
   - Upload images
   - Organize media files

---

## Common Issues & Solutions

### Issue: Database connection error

**Solution:**
```bash
# Check PostgreSQL is running
brew services list | grep postgresql

# Verify DATABASE_URL is correct in .env.local
# Format: postgresql://username:password@host:port/database
```

### Issue: Prisma errors

**Solution:**
```bash
# Reset and regenerate
npm run db:generate
npm run db:push

# If issues persist, reset the database
npx prisma migrate reset --force
```

### Issue: OpenAI API errors

**Solution:**
- Verify your API key is correct
- Check you have credits at [platform.openai.com/account/usage](https://platform.openai.com/account/usage)
- AI features gracefully fall back if API fails

### Issue: Port 3000 already in use

**Solution:**
```bash
# Use a different port
PORT=3001 npm run dev

# Or kill the process using port 3000
lsof -ti:3000 | xargs kill
```

---

## Next Steps

### Development
- Read the full [README.md](README.md) for detailed documentation
- Check [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md) for architecture details
- Explore the codebase structure

### Testing
```bash
# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e

# Open Prisma Studio to view/edit database
npm run db:studio
```

### Deployment
- See [Deployment Guide](README.md#deployment) in README
- Deploy to Vercel with one click
- Set up CI/CD with GitHub Actions

---

## Project Structure at a Glance

```
nexus-cms/
├── app/                    # Next.js 16 App Router
│   ├── (auth)/            # Auth pages (login, register)
│   ├── (dashboard)/       # Protected dashboard pages
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/                # shadcn/ui components
│   └── content/           # Content-specific components
├── lib/                   # Utilities
│   ├── db/                # Prisma client
│   ├── auth/              # NextAuth config
│   └── ai/                # OpenAI integration
├── prisma/                # Database schema
└── public/                # Static assets
```

---

## Getting Help

- **Issues**: [GitHub Issues](https://github.com/krishnaak114/nexus-cms/issues)
- **Email**: kagrawalk510@gmail.com
- **LinkedIn**: [Krishna Agrawal](https://www.linkedin.com/in/agrawal-krishna-aa11a61ba/)

---

## Quick Commands Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run E2E tests |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:push` | Push schema changes |
| `npm run db:seed` | Seed database |

---

**Happy coding! 🚀**

**Made with ❤️ by Krishna Agrawal**

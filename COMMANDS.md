# Nexus CMS - Quick Commands

## Development

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type check
npm run type-check

# Lint code
npm run lint

## Database

# Open Prisma Studio (database GUI)
npx prisma studio

# Push schema changes
npx prisma db push

# Generate Prisma client
npx prisma generate

# Reset database
Remove-Item dev.db -ErrorAction SilentlyContinue
npx prisma db push

## Testing

# Run development tests
npm run dev

# Build test
npm run build

## Deployment

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod

## Git

# Initial commit
git init
git add .
git commit -m "Initial commit - Nexus CMS"

# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/nexus-cms.git
git branch -M main
git push -u origin main

## Troubleshooting

# Kill port 3000
npx kill-port 3000

# Reinstall dependencies
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json -ErrorAction SilentlyContinue
npm install

# Clear Next.js cache
Remove-Item .next -Recurse -Force -ErrorAction SilentlyContinue
npm run dev

# Fix permissions (if needed)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force

## Quick URLs

# Local development
http://localhost:3000

# Prisma Studio
http://localhost:5555

# Register
http://localhost:3000/register

# Login
http://localhost:3000/login

# Dashboard
http://localhost:3000/dashboard

# Create Content
http://localhost:3000/dashboard/content/new

# Analytics
http://localhost:3000/dashboard/analytics

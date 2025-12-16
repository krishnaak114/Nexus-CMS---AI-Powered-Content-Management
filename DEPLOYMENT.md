# 🚀 Quick Deployment Guide

Deploy your Nexus CMS to Vercel in under 10 minutes!

## Prerequisites

- GitHub account
- Vercel account (free)
- OpenAI API key (optional, for AI features)

## Step 1: Push to GitHub

```powershell
# Initialize git (if not already done)
cd c:\SAV_REPOS\nexus-cms
git init
git add .
git commit -m "Initial commit - Nexus CMS"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/nexus-cms.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure environment variables:

```
DATABASE_URL=your-postgresql-url
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-generated-secret
OPENAI_API_KEY=sk-your-key (optional)
```

5. Click "Deploy"

## Step 3: Set Up Production Database

### Option A: Vercel Postgres (Easiest)

1. In Vercel dashboard, go to "Storage"
2. Create new Postgres database
3. Copy `DATABASE_URL` to environment variables
4. Run migrations:
   ```powershell
   npx prisma db push
   ```

### Option B: Supabase (Free PostgreSQL)

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Get connection string from Settings → Database
4. Add to Vercel environment variables
5. Update schema:
   ```powershell
   # In prisma/schema.prisma, change datasource to:
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   
   npx prisma db push
   ```

### Option C: Railway (Free PostgreSQL)

1. Go to [railway.app](https://railway.app)
2. Create new PostgreSQL database
3. Copy connection URL
4. Add to Vercel environment variables

## Step 4: Update Database Schema

After setting up production database:

```powershell
# Generate Prisma client
npx prisma generate

# Push schema to production
npx prisma db push

# (Optional) Open Prisma Studio to verify
npx prisma studio
```

## Step 5: Generate NextAuth Secret

```powershell
# Generate a secure secret
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Copy the output and add to NEXTAUTH_SECRET in Vercel
```

## Step 6: Test Your Deployment

1. Visit your app URL: `https://your-app.vercel.app`
2. Register a new account
3. Create test content
4. Test AI features (if OpenAI key is added)

## Environment Variables Checklist

Required:
- [x] `DATABASE_URL` - PostgreSQL connection string
- [x] `NEXTAUTH_URL` - Your app URL
- [x] `NEXTAUTH_SECRET` - Generated secret

Optional:
- [ ] `OPENAI_API_KEY` - For AI features
- [ ] `BLOB_READ_WRITE_TOKEN` - For image uploads (Vercel Blob)

## Troubleshooting

### "Database connection error"
- Verify `DATABASE_URL` is correct
- Ensure database is accessible from Vercel
- Check if you need to whitelist Vercel's IP ranges

### "NextAuth error"
- Verify `NEXTAUTH_URL` matches your domain
- Check `NEXTAUTH_SECRET` is set
- Clear cookies and try again

### "Build failed"
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify TypeScript has no errors: `npm run build`

### "AI features not working"
- Verify `OPENAI_API_KEY` is valid
- Check OpenAI account has credits
- Look at API route logs in Vercel

## Production Checklist

Before launching:
- [ ] Set up custom domain
- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Set up error monitoring (Sentry)
- [ ] Configure analytics (Google Analytics)
- [ ] Set up email notifications
- [ ] Add rate limiting
- [ ] Configure CORS if needed
- [ ] Set up backups for database
- [ ] Add health check endpoint
- [ ] Test on multiple devices

## Post-Deployment

1. Create your first admin account
2. Publish welcome content
3. Test all features
4. Monitor error logs
5. Set up automatic deployments (GitHub Actions)

## Automatic Deployments

Vercel automatically deploys on git push! Every push to `main` branch triggers a production deployment.

For preview deployments:
```powershell
git checkout -b feature-branch
git push origin feature-branch
```

Vercel creates a preview URL for each branch!

## Cost Estimate

- **Vercel**: Free (Hobby plan) or $20/month (Pro)
- **Database**: Free tier available on Supabase, Railway, or Neon
- **OpenAI**: Pay per use (~$0.002 per request)
- **Total**: $0-$25/month depending on usage

## Need Help?

- Check Vercel docs: https://vercel.com/docs
- Prisma docs: https://www.prisma.io/docs
- NextAuth docs: https://next-auth.js.org

---

**Congratulations! Your app is now live! 🎉**

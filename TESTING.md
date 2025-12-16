# 🚀 Testing Guide - Run the App Locally

Quick guide to test all features of Nexus CMS.

## Start the Application

```powershell
cd c:\SAV_REPOS\nexus-cms
npm run dev
```

Visit: **http://localhost:3000**

## Test Flow (15 Minutes)

### 1. Register Account (2 min)

1. Click "Get Started" on homepage
2. Or go to http://localhost:3000/register
3. Fill in:
   - Name: Your Name
   - Email: test@example.com
   - Password: password123
4. Click "Create Account"
5. You'll be redirected to login

### 2. Login (1 min)

1. Go to http://localhost:3000/login
2. Use the credentials you just created
3. Click "Login"
4. You'll see the dashboard!

### 3. Dashboard Overview (1 min)

You should see:
- Stats cards (Total, Published, Drafts)
- Quick Actions
- Recent content list (empty at first)

### 4. Create Content (3 min)

1. Click "Create Content" button
2. Fill in the form:
   - Title: "My First Blog Post"
   - Excerpt: "This is a test article"
   - Content: Write at least 100 words of text
   - Status: Choose "Draft" or "Published"
3. Click "Create Content"

### 5. Test AI Features (5 min)

#### Enable AI Assistant:
1. While creating/editing content, click "✨ Show AI Assistant"
2. Write some content (at least 50 characters)
3. Try each AI feature:

**✨ Summarize**
- Generates a 2-3 sentence summary
- Shows in blue box below

**🎯 SEO Optimize**
- Provides meta description
- Suggests keywords
- Shows SEO score /100

**😊 Sentiment Analysis**
- Detects positive/neutral/negative tone
- Shows confidence level
- Lists detected emotions

**🏷️ Suggest Tags**
- AI suggests relevant tags
- Shows 3-5 single-word tags

> **Note**: If you see "Add OpenAI API key" message, AI features are in demo mode. To enable real AI:
> 1. Get API key from https://platform.openai.com/api-keys
> 2. Add to `.env.local`: `OPENAI_API_KEY=sk-your-key`
> 3. Restart server

### 6. View Content (1 min)

1. Go to "View All Content" from dashboard
2. Click on your created content
3. You should see:
   - Full content
   - Status badge
   - Creation date
   - Edit/Delete buttons

### 7. Edit Content (2 min)

1. Click "Edit" button
2. Modify title or content
3. Try AI features again with updated content
4. Click "Save Changes"

### 8. Publish Content (1 min)

1. If content is "Draft", click "Publish Now"
2. Status changes to "Published"
3. Timestamp added

### 9. Analytics Page (1 min)

1. Go to http://localhost:3000/dashboard/analytics
2. View:
   - Total views
   - Unique visitors
   - Top performing content

> Note: Analytics are simulated for demo. In production, integrate Google Analytics.

### 10. Delete Content (1 min)

1. Go to content detail page
2. Click "Delete" button
3. Content is archived (soft delete)
4. No longer appears in list

## Quick Feature Checklist

Test that each works:

**Authentication**
- [ ] Register new user
- [ ] Login
- [ ] Logout (click name → Logout)
- [ ] Protected routes (try accessing /dashboard when logged out)

**Content Management (CRUD)**
- [ ] Create new content
- [ ] View content list
- [ ] View single content
- [ ] Edit content
- [ ] Delete content
- [ ] Publish draft

**AI Features** (if API key configured)
- [ ] Summarization
- [ ] SEO optimization
- [ ] Sentiment analysis
- [ ] Tag suggestions

**Dashboard**
- [ ] Stats cards update with real data
- [ ] Recent content shows
- [ ] Quick actions work

**UI/UX**
- [ ] Responsive design (resize browser)
- [ ] Smooth animations
- [ ] Loading states
- [ ] Error messages
- [ ] Form validation

## Common Issues & Fixes

### "Cannot connect to database"
```powershell
# Verify .env.local has:
DATABASE_URL="file:./dev.db"

# Regenerate database:
npx prisma db push
```

### "Session/Auth errors"
```powershell
# Clear browser cookies
# Or use incognito mode
# Verify NEXTAUTH_SECRET is set in .env.local
```

### "AI features don't work"
This is normal! AI features need an OpenAI API key.

**Option 1: Demo Mode** (Current)
- Features show placeholder messages
- App works fine without AI

**Option 2: Enable Real AI**
```powershell
# Get free credits: https://platform.openai.com/signup
# Add to .env.local:
OPENAI_API_KEY=sk-your-key-here

# Restart server
npm run dev
```

### "Port 3000 already in use"
```powershell
# Kill the process
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

## Database Management

### View Database
```powershell
npx prisma studio
```
Opens GUI at http://localhost:5555 to browse all data.

### Reset Database
```powershell
# Delete database file
Remove-Item dev.db

# Recreate
npx prisma db push
```

### Seed Sample Data
```powershell
# Create sample content (optional)
# You can manually create via the UI instead
```

## Performance Check

Your app should:
- [ ] Load homepage in < 1 second
- [ ] Dashboard loads in < 2 seconds
- [ ] AI requests complete in 3-5 seconds
- [ ] No console errors (F12 → Console)
- [ ] Smooth page transitions

## Browser Compatibility

Test in:
- [ ] Chrome/Edge (recommended)
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browser (Chrome Android/Safari iOS)

## What to Show in Video Demo

1. **Homepage** (10 sec)
   - Beautiful landing page
   - Feature highlights

2. **Registration & Login** (20 sec)
   - Quick signup flow
   - Instant login

3. **Dashboard** (15 sec)
   - Real-time stats
   - Quick actions

4. **Create Content** (30 sec)
   - Full editor
   - Character/word count
   - Status selection

5. **AI Features** (45 sec) ⭐ HIGHLIGHT
   - Show each AI feature
   - Real AI responses
   - Multiple features in action

6. **Content Management** (30 sec)
   - List view
   - Detail view
   - Edit functionality

7. **Analytics** (15 sec)
   - Stats overview
   - Top content

8. **Mobile Responsive** (15 sec)
   - Resize browser
   - Show mobile view

## Video Recording Tips

1. **Clean your desktop** - Remove distractions
2. **Use Chrome** - Best rendering
3. **Zoom in** - Make text readable (Ctrl + +)
4. **Go slow** - Show each feature clearly
5. **Add narration** - Explain what you're doing
6. **Show AI magic** - This is your differentiator!
7. **Keep it short** - 3-5 minutes max

## Ready to Deploy?

Once testing is complete:
1. Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment guide
2. Push to GitHub
3. Deploy to Vercel
4. Record video demo
5. Submit!

---

**All tests passing? Congratulations! Your app is ready! 🎉**

Need help? Check the error messages or review the code.

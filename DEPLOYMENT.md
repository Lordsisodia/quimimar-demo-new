# Quimimar Demo Deployment Guide

## 🚀 Quick Deploy to Vercel

### Step 1: Login to Vercel
```bash
vercel login
```
Choose your preferred login method (GitHub, GitLab, Bitbucket, or Email).

### Step 2: Deploy
```bash
./deploy.sh
```

That's it! Your site will be deployed to Vercel.

## 📋 Manual Deployment Steps

If you prefer to deploy manually:

1. **Login to Vercel:**
   ```bash
   vercel login
   ```

2. **Deploy to production:**
   ```bash
   vercel --prod
   ```

3. **Follow the prompts:**
   - Set up and deploy: `Y`
   - Which scope: Choose your personal account
   - Link to existing project: `N`
   - Project name: `quimimar-demo` (or your preferred name)
   - Directory: `./` (current directory)
   - Override settings: `N`

## 🔗 GitHub Integration (Automatic Deployments)

To enable automatic deployments when you push to GitHub:

1. Visit [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository: `Lordsisodia/quimimar-demo-new`
4. Configure project settings (defaults are fine)
5. Click "Deploy"

Now every push to `main` branch will trigger a new deployment!

## 🌐 Custom Domain (Optional)

To add a custom domain:

1. Go to your project on Vercel dashboard
2. Navigate to Settings → Domains
3. Add your domain (e.g., `demo.quimimar.es`)
4. Follow DNS configuration instructions

## 📱 Environment Variables

This demo doesn't require any environment variables, but if you add backend features later:

1. Go to Settings → Environment Variables
2. Add your variables (e.g., `SUPABASE_URL`, `CLERK_SECRET_KEY`)
3. Redeploy for changes to take effect

## 🛠️ Troubleshooting

### Build Errors
- Ensure all dependencies are installed: `npm install`
- Check for TypeScript errors: `npm run build`

### Deployment Fails
- Clear Vercel cache: `vercel --force`
- Remove `.vercel` folder and try again

### Wrong Account
- Logout: `vercel logout`
- Login with correct account: `vercel login`

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- GitHub Repo: https://github.com/Lordsisodia/quimimar-demo-new

---

Ready to deploy? Run `./deploy.sh` and your site will be live in minutes! 🎉
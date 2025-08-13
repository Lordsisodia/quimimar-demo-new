#!/bin/bash

echo "🚀 Deploying Quimimar Demo to Vercel"
echo "===================================="
echo ""

# Check if logged in to Vercel
if ! vercel whoami > /dev/null 2>&1; then
    echo "❌ Not logged in to Vercel"
    echo "👉 Please run: vercel login"
    exit 1
fi

echo "✅ Logged in as: $(vercel whoami)"
echo ""

# Deploy to Vercel
echo "📦 Building and deploying to Vercel..."
vercel --prod --yes

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Your site is now live! 🎉"
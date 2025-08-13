#!/bin/bash

# Deploy using Vercel token
echo "🚀 Deploying with Vercel Token"
echo "=============================="
echo ""

# Check if token is provided
if [ -z "$1" ]; then
    echo "❌ Please provide your Vercel token"
    echo "Usage: ./deploy-with-token.sh YOUR_VERCEL_TOKEN"
    echo ""
    echo "Get your token at: https://vercel.com/account/tokens"
    exit 1
fi

TOKEN=$1

echo "📦 Deploying to Vercel..."
vercel --prod --yes --token=$TOKEN

echo ""
echo "✅ Deployment complete!"
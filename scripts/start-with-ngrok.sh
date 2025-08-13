#!/bin/bash

echo "🌐 Starting Quimimar Demo with Public Access (ngrok)"
echo "=================================================="

# Check if server is running
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "✅ Server already running on port 3000"
else
    echo "🚀 Starting Next.js server..."
    npm run dev &
    SERVER_PID=$!
    echo "⏳ Waiting for server to start..."
    sleep 5
fi

echo ""
echo "🔗 Creating public tunnel with ngrok..."
echo ""

# Start ngrok
ngrok http 3000
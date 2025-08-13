#!/bin/bash

echo "🚀 Starting Quimimar Demo Server for Mobile Access"
echo "=================================================="

# Get the actual IP address
IP=$(ipconfig getifaddr en0 || ipconfig getifaddr en1)

if [ -z "$IP" ]; then
    echo "❌ Could not determine network IP address"
    echo "   Please check your network connection"
    exit 1
fi

echo ""
echo "📱 Your network IP is: $IP"
echo ""
echo "Starting server..."
echo ""

# Export the HOST environment variable
export HOST=0.0.0.0

# Kill any existing processes on port 3000
lsof -ti:3000 | xargs kill -9 2>/dev/null

# Start Next.js with the proper host binding
echo "Server starting at:"
echo "  Local:   http://localhost:3000"
echo "  Network: http://$IP:3000"
echo ""
echo "📲 To access from your phone:"
echo "  1. Connect to the same WiFi network"
echo "  2. Open http://$IP:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the server
npx next dev -H 0.0.0.0 -p 3000
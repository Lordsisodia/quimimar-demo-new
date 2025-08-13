# 📱 Mobile Access Troubleshooting Guide

## Current Issue: Phone Can't Connect

### 🔍 **Step 1: Check What's Running**
Your server should be at: `http://192.168.0.16:3000`

### 🛠️ **Step 2: Try These Solutions**

#### Option A: Use the Mobile Server Script
```bash
./scripts/start-mobile-server.sh
```

#### Option B: Manual Server Start
```bash
# Kill existing server
pkill -f "next dev"

# Start with explicit settings
npx next dev -H 0.0.0.0 -p 3000
```

#### Option C: Check macOS Firewall
1. Open **System Settings** → **Network** → **Firewall**
2. If firewall is ON, click **Options**
3. Make sure "Block all incoming connections" is OFF
4. Add Node.js to allowed apps if needed

### 🔗 **Step 3: Alternative - Use ngrok for Public Access**

If local network access doesn't work, use ngrok:

```bash
# Install ngrok (if not installed)
brew install ngrok

# In one terminal, start your server
npm run dev

# In another terminal, create public tunnel
ngrok http 3000
```

This will give you a public URL like `https://abc123.ngrok.io` that works from anywhere!

### 📱 **Step 4: Test URLs to Try**

1. `http://192.168.0.16:3000` (your current network IP)
2. `http://localhost:3000` (only on Mac)
3. If using ngrok: `https://[random].ngrok.io`

### 🚨 **Common Issues & Fixes**

| Problem | Solution |
|---------|----------|
| "Site can't be reached" | Check firewall settings |
| "Connection refused" | Server not running or wrong port |
| "Different WiFi" | Must be same network |
| "Takes forever to load" | Try clearing browser cache |

### 📞 **Quick Test**

Run this to verify everything:
```bash
npm run network-info
curl http://192.168.0.16:3000
```

If curl works but phone doesn't, it's likely a firewall issue.
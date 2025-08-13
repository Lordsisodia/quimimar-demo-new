const os = require('os');

// Get network interfaces
function getNetworkAddresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  
  for (const name of Object.keys(interfaces)) {
    for (const interface of interfaces[name]) {
      // Skip internal (i.e. 127.0.0.1) and non-IPv4 addresses
      if (interface.family === 'IPv4' && !interface.internal) {
        addresses.push({
          name: name,
          address: interface.address
        });
      }
    }
  }
  
  return addresses;
}

// Display network info
const networkAddresses = getNetworkAddresses();
const port = process.env.PORT || 3000;

console.log('\n🌐 Quimimar Demo - Network Access Information');
console.log('═══════════════════════════════════════════════════════════');
console.log('\n📱 To access from your phone or another device:\n');

console.log('  Local URLs:');
console.log(`    → http://localhost:${port}`);
console.log(`    → http://127.0.0.1:${port}`);

if (networkAddresses.length > 0) {
  console.log('\n  Network URLs (use these on your phone):');
  networkAddresses.forEach(({ name, address }) => {
    console.log(`    → http://${address}:${port} (${name})`);
  });
  
  console.log('\n📲 Quick Tips:');
  console.log('  1. Make sure your phone is on the same WiFi network');
  console.log('  2. If using cellular data, this won\'t work');
  console.log('  3. Some networks block device-to-device connections');
  console.log('  4. If it doesn\'t work, check your firewall settings');
} else {
  console.log('\n⚠️  No network interfaces found. Check your connection.');
}

console.log('\n═══════════════════════════════════════════════════════════\n');
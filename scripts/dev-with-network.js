const { spawn } = require('child_process');
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

// Display startup message
console.log('\n🚀 Starting Quimimar Demo Server...\n');

// Get network addresses
const networkAddresses = getNetworkAddresses();

// Start Next.js dev server
const child = spawn('next', ['dev', '-H', '0.0.0.0'], {
  stdio: 'inherit',
  shell: true
});

// Display network info after a short delay
setTimeout(() => {
  console.log('\n📱 Access URLs:');
  console.log('────────────────────────────────────────');
  console.log(`  Local:           http://localhost:3000`);
  
  if (networkAddresses.length > 0) {
    networkAddresses.forEach(({ name, address }) => {
      console.log(`  Network (${name}):  http://${address}:3000`);
    });
  }
  
  console.log('────────────────────────────────────────');
  console.log('\n✨ You can access this from your phone using the Network URL!\n');
}, 2000);

// Handle process exit
child.on('exit', (code) => {
  process.exit(code);
});
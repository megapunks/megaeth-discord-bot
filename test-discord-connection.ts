import https from 'https';

https.get('https://discord.com/api/v10', (res) => {
  console.log(`STATUS: ${res.statusCode}`);
}).on('error', (e) => {
  console.error(`❌ Error: ${e.message}`);
});

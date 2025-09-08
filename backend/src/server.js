const app = require('./app');
require('dotenv').config();
const findFreePort = require('find-free-port');

const defaultPort = process.env.PORT || 3030;

findFreePort(defaultPort, (err, freePort) => {
  if (err) {
    console.error('Oops! Error finding free port:', err);
    process.exit(1);
  }
  app.listen(freePort, () => {
   const now = new Date();
   console.log(`Mmoney Server running on port => ${freePort}. Started at ${now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'Africa/Johannesburg' })} SAST, ${now.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'Africa/Johannesburg' })}`);
  });
});
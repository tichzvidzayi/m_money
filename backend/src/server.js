const app = require('./app');
// Load envs vars
require('dotenv').config();
const findFreePort = require('find-free-port'); 

const defaultPort = process.env.PORT || 3000;
// else find the next free port
findFreePort(defaultPort, (err, freePort) => {
  if (err) {
    console.error(' Ooops Error finding free port:', err);
    process.exit(1);
  }
  app.listen(freePort, () => {
    console.log(`Mmoney Server running on port => ${freePort}`);
  });
});
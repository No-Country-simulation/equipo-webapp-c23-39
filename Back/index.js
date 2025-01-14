const app = require('./src/app.js');
const { conn } = require('./src/data');
const { PORT } = require('./src/config/envs.js');
require('dotenv').config();

// Syncing all the models at once.
conn.sync({ force : true }).then(async () => {
  app.listen(PORT, () => {
    console.log(`🚀 listening on port: ${PORT} 🚀`);
  });
 
});

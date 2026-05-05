const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

pool.connect()
  .then(client => {
    console.log('Connected to PostgreSQL');
    client.release(); // Important: Release the client back to the pool!
  })
  .catch(err => {
    console.error('Database connection failed:', err.message);
  });

module.exports = pool
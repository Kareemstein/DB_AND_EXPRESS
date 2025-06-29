const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables from .env

function createDBConnection() {
  const environment = process.env.NODE_ENV || 'renderdb';
  let pool;

  if (environment === 'localdb') {
    pool = new Pool({
      user: process.env.LOCAL_DB_USER,
      host: process.env.LOCAL_DB_HOST,
      database: process.env.LOCAL_DB_NAME,
      password: process.env.LOCAL_DB_PASSWORD,
      port: process.env.LOCAL_DB_PORT,
    });
  } else if (environment === 'production' || environment === 'renderdb') {
    pool = new Pool({
      user: process.env.REMOTE_DB_USER,
      host: process.env.REMOTE_DB_HOST,
      database: process.env.REMOTE_DB_NAME,
      password: process.env.REMOTE_DB_PASSWORD,
      port: process.env.REMOTE_DB_PORT,
      ssl: { rejectUnauthorized: false },
    });
  } else if (environment === 'clouddb') {
    pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      ssl: { rejectUnauthorized: false },
    });
  }
  
  return pool;
}

module.exports = createDBConnection;
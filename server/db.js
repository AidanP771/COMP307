const { MongoClient } = require('mongodb');

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'comp307';
const client = new MongoClient(mongoUri);

let db;

async function connectDB() {
  await client.connect();
  db = client.db(dbName);
  console.log(`db connected: ${dbName}`);
}

function getDB() {
  if (!db) {
    throw new Error("db no good");
  }
  return db;
}

async function closeDB() {
  await client.close();
  db = null;
}

module.exports = { connectDB, getDB, closeDB };

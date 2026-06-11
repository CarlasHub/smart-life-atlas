import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MongoClient } from 'mongodb';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const seedPath = resolve(rootDir, 'agent/mongodb/seed-data.json');
const seed = JSON.parse(readFileSync(seedPath, 'utf8'));
const mongoUri = process.env.MDB_MCP_CONNECTION_STRING;
const confirmation = process.env.ATLAS_SEED_MONGODB_CONFIRM;

if (!mongoUri) {
  console.error(JSON.stringify({
    status: 'blocked',
    reason: 'MDB_MCP_CONNECTION_STRING is required.'
  }, null, 2));
  process.exit(1);
}

if (confirmation !== 'replace-demo-data') {
  console.error(JSON.stringify({
    status: 'blocked',
    reason: 'Refusing to replace MongoDB collections without ATLAS_SEED_MONGODB_CONFIRM=replace-demo-data.'
  }, null, 2));
  process.exit(1);
}

const client = new MongoClient(mongoUri);

try {
  await client.connect();
  const db = client.db(seed.database);
  const collectionNames = Object.keys(seed.collections);

  for (const collectionName of collectionNames) {
    const collection = db.collection(collectionName);
    await collection.deleteMany({});

    const documents = seed.collections[collectionName];
    if (documents.length > 0) {
      await collection.insertMany(documents);
    }
  }

  await Promise.all([
    db.collection('life_areas').createIndex({ dimension: 1 }),
    db.collection('life_signals').createIndex({ id: 1 }, { unique: true }),
    db.collection('life_signals').createIndex({ dimension: 1 }),
    db.collection('evidence_items').createIndex({ signalId: 1 }),
    db.collection('resolution_paths').createIndex({ id: 1 }, { unique: true }),
    db.collection('memory_events').createIndex({ timestamp: 1 }),
    db.collection('agent_tests').createIndex({ id: 1 }, { unique: true })
  ]);

  console.log(JSON.stringify({
    status: 'ready',
    database: seed.database,
    replacedCollections: collectionNames,
    dataPolicy: seed.dataPolicy
  }, null, 2));
} finally {
  await client.close();
}

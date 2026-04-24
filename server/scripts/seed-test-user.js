const { MongoClient } = require('mongodb');

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const dbName = process.env.DB_NAME || 'comp307';

const email = (process.env.SEED_EMAIL || 'student@mail.mcgill.ca').trim().toLowerCase();
const password = process.env.SEED_PASSWORD || 'password123';
const name = process.env.SEED_NAME || 'Local Test Student';
const job = process.env.SEED_JOB || 'student';

function inferRoleFromEmail(value) {
  if (value.endsWith('@mcgill.ca') && !value.endsWith('@mail.mcgill.ca')) {
    return 'owner';
  }
  if (value.endsWith('@mail.mcgill.ca')) {
    return 'user';
  }
  throw new Error('SEED_EMAIL must end with @mcgill.ca or @mail.mcgill.ca');
}

const role = process.env.SEED_ROLE || inferRoleFromEmail(email);

function genId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

async function main() {
  const client = new MongoClient(mongoUri);
  await client.connect();

  try {
    const db = client.db(dbName);
    const users = db.collection('users');
    const owners = db.collection('owners');

    const existing = await users.findOne({ email });
    if (existing) {
      await users.updateOne(
        { email },
        {
          $set: {
            name,
            pwd: password,
            job,
            role,
          },
          $setOnInsert: {
            bookingIds: [],
            requestMeetingIds: [],
          },
        }
      );

      if (role === 'owner') {
        await owners.updateOne(
          { userId: existing.userId },
          {
            $setOnInsert: {
              userId: existing.userId,
              publicId: genId(),
              activeSlots: [],
              privateSlots: [],
            },
          },
          { upsert: true }
        );
      }

      console.log(`Updated existing user: ${email}`);
      console.log(`Password: ${password}`);
      return;
    }

    const userId = genId();
    await users.insertOne({
      userId,
      name,
      email,
      pwd: password,
      role,
      job,
      bookingIds: [],
      requestMeetingIds: [],
    });

    if (role === 'owner') {
      await owners.insertOne({
        userId,
        publicId: genId(),
        activeSlots: [],
        privateSlots: [],
      });
    }

    console.log(`Created user: ${email}`);
    console.log(`Password: ${password}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});

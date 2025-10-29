import { MongoClient, Db, ServerApiVersion } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDb() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

// For MongoDB when adding process environment NOTE: case sensitive and beware of spacing
// Windows: (powershell)
// $env:mongodb_user = "carlo_db_user"
// $env:mongodb_password = "password"

// Mac:
// export mongodb_user=carlo_db_user
// export mongodb_password=password

  const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.io06vy9.mongodb.net/?appName=Cluster0`;

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  await client.connect();

  cachedClient = client;
  cachedDb = client.db('ecommerce');

  console.log("cachedClient", cachedClient)
  console.log("cachedDb", cachedDb)

  return { client, db: client.db('ecommerce') }
}
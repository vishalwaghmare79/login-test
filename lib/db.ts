import { MongoClient } from "mongodb"

let cachedClient: MongoClient | null = null

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined")
  }

  const client = new MongoClient(process.env.MONGODB_URI)
  cachedClient = await client.connect()
  return cachedClient
}

export async function getDatabase() {
  const client = await connectToDatabase()
  return client.db("nextjs-auth")
}

export async function getUsersCollection() {
  const db = await getDatabase()
  return db.collection("users")
}

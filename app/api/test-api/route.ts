// app/api/test-db/route.ts
import { connectToDb } from "../db";

export async function GET() {
  try {
    const { db } = await connectToDb();

    // Optional: Run a test command
    const collections = await db.listCollections().toArray();

    return Response.json({
      success: true,
      message: "Connected to MongoDB",
      collections: collections.map((c) => c.name),
    });
  } catch (error: any) {
    console.error("MongoDB connection error:", error);
    return Response.json({
      success: false,
      message: "Failed to connect to MongoDB",
      error: error.message,
    });
  }
}

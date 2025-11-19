import { connectToDb } from "../db";
export async function GET() {
  try {
    const { db } = await connectToDb();

    const sales = await db.collection("sales").aggregate([
      { 
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product"
        }
      },
      { 
        $lookup: {
          from: "stores",
          localField: "storeId",
          foreignField: "_id",
          as: "store"
        }
      },
      { 
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      }
    ]).toArray();

    return Response.json({ success: true, sales });
  } catch (error: any) {
    return Response.json({ success: false, error: error.message });
  }
}
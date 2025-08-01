import { VercelRequest, VercelResponse } from "@vercel/node";
import appPromise from "../src/app";

// ✅ Production-ready Vercel handler
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  try {
    const app = await appPromise;

    // Optional: narrow casting if you're certain these types align
    (app as any)(req, res);
  } catch (err) {
    console.error("❌ Error handling Vercel request:", err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

import { type NextRequest, NextResponse } from "next/server"
import { verifyToken, getTokenFromCookie } from "@/lib/auth"
import { getUsersCollection } from "@/lib/db"
import { ObjectId } from "mongodb"

export async function GET(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get("cookie")
    const token = getTokenFromCookie(cookieHeader || "")

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }

    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 })
    }

    // Fetch user profile from DB and return it (omit password)
    const usersCollection = await getUsersCollection()
    const user = await usersCollection.findOne({ _id: new ObjectId(decoded.userId) })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const safeUser = { id: user._id.toString(), email: user.email, name: user.name }

    return NextResponse.json({ user: safeUser }, { status: 200 })
  } catch (error) {
    console.error("Verify error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

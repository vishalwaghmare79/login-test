import { type NextRequest, NextResponse } from "next/server"
import { getUsersCollection } from "@/lib/db"
import { comparePasswords, signToken } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const usersCollection = await getUsersCollection()
    const user = await usersCollection.findOne({ email })

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    const isPasswordValid = await comparePasswords(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    const token = signToken(user._id.toString())

    const response = NextResponse.json(
      { message: "Login successful", user: { id: user._id, email: user.email, name: user.name } },
      { status: 200 },
    )

    response.cookies.set("auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

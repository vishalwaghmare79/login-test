import { type NextRequest, NextResponse } from "next/server"
import { getUsersCollection } from "@/lib/db"
import { hashPassword, signToken } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json()

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Email, password, and name are required" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    const usersCollection = await getUsersCollection()
    const existingUser = await usersCollection.findOne({ email })

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    const hashedPassword = await hashPassword(password)
    const result = await usersCollection.insertOne({
      email,
      password: hashedPassword,
      name,
      createdAt: new Date(),
    })

    const token = signToken(result.insertedId.toString())

    const response = NextResponse.json({ message: "User registered successfully" }, { status: 201 })

    response.cookies.set("auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

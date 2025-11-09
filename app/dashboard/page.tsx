"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ id: string; email: string; name: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function verifyUser() {
      try {
        const res = await fetch("/api/auth/verify")
        if (!res.ok) {
          router.push("/login")
          return
        }

        const data = await res.json()
        // Expecting { user: { id, email, name } }
        if (data?.user) {
          setUser(data.user)
        } else {
          router.push("/login")
        }
      } catch (error) {
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }

    verifyUser()
  }, [router])

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/login")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-gray-600">Welcome back!</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-md bg-red-600 px-4 py-2 text-white font-medium hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-900">Your Profile</h2>
          <div className="mt-4 space-y-3">
            <p className="text-gray-700">
              <strong>Name:</strong> {user?.name}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {user?.email}
            </p>
            <p className="text-gray-700">
              <strong>Status:</strong> <span className="text-green-600 font-medium">Authenticated</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

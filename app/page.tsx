import Link from "next/link"

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Next.js Auth App</h1>
        <p className="mt-4 text-lg text-gray-600">Secure authentication with JWT, MongoDB, and bcrypt</p>
        <div className="mt-8 flex gap-4 justify-center">
          <Link href="/login" className="rounded-md bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700">
            Sign In
          </Link>
          <Link
            href="/register"
            className="rounded-md bg-gray-200 px-6 py-3 text-gray-900 font-medium hover:bg-gray-300"
          >
            Create Account
          </Link>
        </div>
      </div>
    </main>
  )
}

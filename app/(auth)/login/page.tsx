import LoginForm from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>
          <p className="mt-2 text-gray-600">Access your account</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-md">
          <LoginForm />
        </div>
      </div>
    </main>
  )
}

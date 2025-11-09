import RegisterForm from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="mt-2 text-gray-600">Join us today</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-md">
          <RegisterForm />
        </div>
      </div>
    </main>
  )
}

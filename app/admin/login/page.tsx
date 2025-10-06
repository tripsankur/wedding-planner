import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminLoginForm } from "@/components/admin/admin-login-form"
import { getCurrentAdmin } from "@/lib/auth/admin-auth"
import { redirect } from "next/navigation"

export default async function AdminLoginPage() {
  const admin = await getCurrentAdmin()

  if (admin) {
    redirect("/admin")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminLoginForm />
        </CardContent>
      </Card>
    </div>
  )
}

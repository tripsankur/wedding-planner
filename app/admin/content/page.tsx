"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { isAdminAuthenticated } from "@/lib/auth/temp-admin-auth"
import { AdminNav } from "@/components/admin/admin-nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteContentManager } from "@/components/admin/content/site-content-manager"
import { BackgroundManager } from "@/components/admin/content/background-manager"

export default function ContentPage() {
  const router = useRouter()

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push("/admin/login")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50">
      <AdminNav />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 font-serif">Content Management</h1>
          <p className="text-muted-foreground">Manage all website content including site info, backgrounds, and more</p>
        </div>

        <Tabs defaultValue="site" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="site">Site Info</TabsTrigger>
            <TabsTrigger value="backgrounds">Backgrounds</TabsTrigger>
          </TabsList>

          <TabsContent value="site">
            <SiteContentManager />
          </TabsContent>

          <TabsContent value="backgrounds">
            <BackgroundManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

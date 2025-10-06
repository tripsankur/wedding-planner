import { AdminNav } from "@/components/admin/admin-nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EventsManager } from "@/components/admin/content/events-manager"
import { VenuesManager } from "@/components/admin/content/venues-manager"
import { TravelManager } from "@/components/admin/content/travel-manager"
import { RegistryManager } from "@/components/admin/content/registry-manager"
import { SiteContentManager } from "@/components/admin/content/site-content-manager"

export default function ContentPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminNav />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Content Management</h1>
          <p className="text-muted-foreground">
            Manage all website content including events, venues, travel info, and more
          </p>
        </div>

        <Tabs defaultValue="site" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="site">Site Info</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="venues">Venues</TabsTrigger>
            <TabsTrigger value="travel">Travel</TabsTrigger>
            <TabsTrigger value="registry">Registry</TabsTrigger>
          </TabsList>

          <TabsContent value="site">
            <SiteContentManager />
          </TabsContent>

          <TabsContent value="events">
            <EventsManager />
          </TabsContent>

          <TabsContent value="venues">
            <VenuesManager />
          </TabsContent>

          <TabsContent value="travel">
            <TravelManager />
          </TabsContent>

          <TabsContent value="registry">
            <RegistryManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

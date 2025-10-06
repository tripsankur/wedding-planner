"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Venue {
  id: string
  name: string
  address: string
  city: string
  state: string
  zip_code: string
  google_maps_link: string
  description: string
  parking_info: string
  venue_type: string
  display_order: number
}

export function VenuesManager() {
  const [venues, setVenues] = useState<Venue[]>([])
  const [editingVenue, setEditingVenue] = useState<Venue | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchVenues()
  }, [])

  async function fetchVenues() {
    try {
      const response = await fetch("/api/admin/venues")
      const data = await response.json()
      setVenues(data)
    } catch (error) {
      toast({ title: "Error loading venues", variant: "destructive" })
    }
  }

  async function handleSave(venue: Partial<Venue>) {
    try {
      const method = venue.id ? "PUT" : "POST"
      const response = await fetch("/api/admin/venues", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(venue),
      })

      if (response.ok) {
        toast({ title: venue.id ? "Venue updated!" : "Venue created!" })
        fetchVenues()
        setIsDialogOpen(false)
        setEditingVenue(null)
      }
    } catch (error) {
      toast({ title: "Error saving venue", variant: "destructive" })
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this venue?")) return

    try {
      const response = await fetch(`/api/admin/venues?id=${id}`, { method: "DELETE" })
      if (response.ok) {
        toast({ title: "Venue deleted" })
        fetchVenues()
      }
    } catch (error) {
      toast({ title: "Error deleting venue", variant: "destructive" })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Venues</h2>
          <p className="text-muted-foreground">Manage ceremony and reception locations</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingVenue(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Venue
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingVenue ? "Edit Venue" : "Add New Venue"}</DialogTitle>
            </DialogHeader>
            <VenueForm venue={editingVenue} onSave={handleSave} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {venues.map((venue) => (
          <Card key={venue.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{venue.name}</CardTitle>
                  <CardDescription>{venue.venue_type}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingVenue(venue)
                      setIsDialogOpen(true)
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(venue.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-2">{venue.description}</p>
              <p className="text-sm text-muted-foreground">
                {venue.address}, {venue.city}, {venue.state} {venue.zip_code}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function VenueForm({ venue, onSave }: { venue: Venue | null; onSave: (venue: Partial<Venue>) => void }) {
  const [formData, setFormData] = useState<Partial<Venue>>(
    venue || {
      name: "",
      address: "",
      city: "",
      state: "",
      zip_code: "",
      google_maps_link: "",
      description: "",
      parking_info: "",
      venue_type: "other",
      display_order: 0,
    },
  )

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Venue Name</Label>
        <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="venue_type">Venue Type</Label>
        <Select value={formData.venue_type} onValueChange={(value) => setFormData({ ...formData, venue_type: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ceremony">Ceremony</SelectItem>
            <SelectItem value="reception">Reception</SelectItem>
            <SelectItem value="hotel">Hotel</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Street Address</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="zip_code">ZIP Code</Label>
          <Input
            id="zip_code"
            value={formData.zip_code}
            onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="google_maps_link">Google Maps Link</Label>
        <Input
          id="google_maps_link"
          value={formData.google_maps_link}
          onChange={(e) => setFormData({ ...formData, google_maps_link: e.target.value })}
          placeholder="https://maps.google.com/..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="parking_info">Parking Information</Label>
        <Textarea
          id="parking_info"
          value={formData.parking_info}
          onChange={(e) => setFormData({ ...formData, parking_info: e.target.value })}
          rows={2}
        />
      </div>

      <Button onClick={() => onSave(formData)} className="w-full">
        Save Venue
      </Button>
    </div>
  )
}

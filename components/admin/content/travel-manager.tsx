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

interface TravelInfo {
  id: string
  title: string
  category: string
  description: string
  address: string
  phone: string
  website: string
  booking_code: string
  special_rate: string
  distance_from_venue: string
  display_order: number
}

export function TravelManager() {
  const [travelInfo, setTravelInfo] = useState<TravelInfo[]>([])
  const [editingInfo, setEditingInfo] = useState<TravelInfo | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchTravelInfo()
  }, [])

  async function fetchTravelInfo() {
    try {
      const response = await fetch("/api/admin/travel")
      const data = await response.json()
      setTravelInfo(data)
    } catch (error) {
      toast({ title: "Error loading travel info", variant: "destructive" })
    }
  }

  async function handleSave(info: Partial<TravelInfo>) {
    try {
      const method = info.id ? "PUT" : "POST"
      const response = await fetch("/api/admin/travel", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      })

      if (response.ok) {
        toast({ title: info.id ? "Travel info updated!" : "Travel info created!" })
        fetchTravelInfo()
        setIsDialogOpen(false)
        setEditingInfo(null)
      }
    } catch (error) {
      toast({ title: "Error saving travel info", variant: "destructive" })
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this?")) return

    try {
      const response = await fetch(`/api/admin/travel?id=${id}`, { method: "DELETE" })
      if (response.ok) {
        toast({ title: "Travel info deleted" })
        fetchTravelInfo()
      }
    } catch (error) {
      toast({ title: "Error deleting travel info", variant: "destructive" })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Travel & Accommodations</h2>
          <p className="text-muted-foreground">Manage hotels, airports, and transportation info</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingInfo(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Info
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingInfo ? "Edit Travel Info" : "Add Travel Info"}</DialogTitle>
            </DialogHeader>
            <TravelForm info={editingInfo} onSave={handleSave} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {travelInfo.map((info) => (
          <Card key={info.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{info.title}</CardTitle>
                  <CardDescription>{info.category}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingInfo(info)
                      setIsDialogOpen(true)
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(info.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-2">{info.description}</p>
              {info.special_rate && (
                <p className="text-sm text-primary font-medium">Special Rate: {info.special_rate}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function TravelForm({ info, onSave }: { info: TravelInfo | null; onSave: (info: Partial<TravelInfo>) => void }) {
  const [formData, setFormData] = useState<Partial<TravelInfo>>(
    info || {
      title: "",
      category: "hotel",
      description: "",
      address: "",
      phone: "",
      website: "",
      booking_code: "",
      special_rate: "",
      distance_from_venue: "",
      display_order: 0,
    },
  )

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Marriott Hotel"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hotel">Hotel</SelectItem>
            <SelectItem value="airport">Airport</SelectItem>
            <SelectItem value="transportation">Transportation</SelectItem>
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

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="booking_code">Booking Code</Label>
          <Input
            id="booking_code"
            value={formData.booking_code}
            onChange={(e) => setFormData({ ...formData, booking_code: e.target.value })}
            placeholder="WEDDING2025"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="special_rate">Special Rate</Label>
          <Input
            id="special_rate"
            value={formData.special_rate}
            onChange={(e) => setFormData({ ...formData, special_rate: e.target.value })}
            placeholder="$129/night"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="distance_from_venue">Distance from Venue</Label>
        <Input
          id="distance_from_venue"
          value={formData.distance_from_venue}
          onChange={(e) => setFormData({ ...formData, distance_from_venue: e.target.value })}
          placeholder="2 miles"
        />
      </div>

      <Button onClick={() => onSave(formData)} className="w-full">
        Save Travel Info
      </Button>
    </div>
  )
}

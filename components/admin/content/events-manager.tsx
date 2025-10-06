"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Event {
  id: string
  title: string
  description: string
  event_date: string
  event_time: string
  location: string
  address: string
  dress_code: string
  calendar_link: string
  display_order: number
}

export function EventsManager() {
  const [events, setEvents] = useState<Event[]>([])
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchEvents()
  }, [])

  async function fetchEvents() {
    try {
      const response = await fetch("/api/admin/events")
      const data = await response.json()
      setEvents(data)
    } catch (error) {
      toast({ title: "Error loading events", variant: "destructive" })
    }
  }

  async function handleSave(event: Partial<Event>) {
    try {
      const method = event.id ? "PUT" : "POST"
      const response = await fetch("/api/admin/events", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      })

      if (response.ok) {
        toast({ title: event.id ? "Event updated!" : "Event created!" })
        fetchEvents()
        setIsDialogOpen(false)
        setEditingEvent(null)
      }
    } catch (error) {
      toast({ title: "Error saving event", variant: "destructive" })
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this event?")) return

    try {
      const response = await fetch(`/api/admin/events?id=${id}`, { method: "DELETE" })
      if (response.ok) {
        toast({ title: "Event deleted" })
        fetchEvents()
      }
    } catch (error) {
      toast({ title: "Error deleting event", variant: "destructive" })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Events</h2>
          <p className="text-muted-foreground">Manage your wedding events and schedule</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingEvent(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingEvent ? "Edit Event" : "Add New Event"}</DialogTitle>
            </DialogHeader>
            <EventForm event={editingEvent} onSave={handleSave} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>
                    {new Date(event.event_date).toLocaleDateString()} at {event.event_time}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingEvent(event)
                      setIsDialogOpen(true)
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(event.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
              <p className="text-sm">
                <strong>Location:</strong> {event.location}
              </p>
              {event.dress_code && (
                <p className="text-sm">
                  <strong>Dress Code:</strong> {event.dress_code}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function EventForm({ event, onSave }: { event: Event | null; onSave: (event: Partial<Event>) => void }) {
  const [formData, setFormData] = useState<Partial<Event>>(
    event || {
      title: "",
      description: "",
      event_date: "",
      event_time: "",
      location: "",
      address: "",
      dress_code: "",
      calendar_link: "",
      display_order: 0,
    },
  )

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Event Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Reception"
        />
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
          <Label htmlFor="event_date">Date</Label>
          <Input
            id="event_date"
            type="date"
            value={formData.event_date}
            onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="event_time">Time</Label>
          <Input
            id="event_time"
            type="time"
            value={formData.event_time}
            onChange={(e) => setFormData({ ...formData, event_time: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location Name</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder="Grand Ballroom"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Full Address</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="123 Main St, City, State 12345"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dress_code">Dress Code</Label>
        <Input
          id="dress_code"
          value={formData.dress_code}
          onChange={(e) => setFormData({ ...formData, dress_code: e.target.value })}
          placeholder="Formal / Semi-Formal / Casual"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="calendar_link">Calendar Link (optional)</Label>
        <Input
          id="calendar_link"
          value={formData.calendar_link}
          onChange={(e) => setFormData({ ...formData, calendar_link: e.target.value })}
          placeholder="https://calendar.google.com/..."
        />
      </div>

      <Button onClick={() => onSave(formData)} className="w-full">
        Save Event
      </Button>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { submitRSVP } from "@/lib/actions/rsvp-actions"
import type { Guest, Event, RSVP } from "@/lib/types/database"
import { Loader2, Check, Calendar } from "lucide-react"

interface RSVPFormProps {
  guest: Guest
  events: Event[]
  existingRsvps: RSVP[]
}

export function RSVPForm({ guest, events, existingRsvps }: RSVPFormProps) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  // Initialize form state with existing RSVPs or defaults
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {}
    events.forEach((event) => {
      const existingRsvp = existingRsvps.find((r) => r.event_id === event.id)
      initial[event.id] = {
        status: existingRsvp?.status || "pending",
        meal_choice: existingRsvp?.meal_choice || "",
        plus_ones: existingRsvp?.plus_ones || 0,
        plus_one_names: existingRsvp?.plus_one_names || [],
        special_requests: existingRsvp?.special_requests || "",
      }
    })
    return initial
  })

  const [dietaryRestrictions, setDietaryRestrictions] = useState(guest.dietary_restrictions || "")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      const result = await submitRSVP({
        guestId: guest.id,
        rsvps: formData,
        dietaryRestrictions,
      })

      if (result.success) {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 5000)
      } else {
        setError(result.error || "Failed to submit RSVP")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const updateEventData = (eventId: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [eventId]: {
        ...prev[eventId],
        [field]: value,
      },
    }))
  }

  const maxPlusOnes = guest.guest_groups?.max_plus_ones || 0

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Events */}
      {events.map((event) => {
        const eventData = formData[event.id]
        const isAttending = eventData.status === "attending"

        return (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                {event.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {new Date(event.event_date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Attendance Status */}
              <div>
                <Label>Will you be attending?</Label>
                <RadioGroup
                  value={eventData.status}
                  onValueChange={(value) => updateEventData(event.id, "status", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="attending" id={`${event.id}-yes`} />
                    <Label htmlFor={`${event.id}-yes`} className="font-normal cursor-pointer">
                      Joyfully Accept
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="not_attending" id={`${event.id}-no`} />
                    <Label htmlFor={`${event.id}-no`} className="font-normal cursor-pointer">
                      Regretfully Decline
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Meal Choice (only for attending) */}
              {isAttending && (
                <>
                  <div>
                    <Label htmlFor={`${event.id}-meal`}>Meal Choice</Label>
                    <Select
                      value={eventData.meal_choice}
                      onValueChange={(value) => updateEventData(event.id, "meal_choice", value)}
                    >
                      <SelectTrigger id={`${event.id}-meal`} className="mt-1">
                        <SelectValue placeholder="Select your meal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chicken">Herb-Roasted Chicken</SelectItem>
                        <SelectItem value="beef">Grilled Beef Tenderloin</SelectItem>
                        <SelectItem value="fish">Pan-Seared Salmon</SelectItem>
                        <SelectItem value="vegetarian">Vegetarian Pasta Primavera</SelectItem>
                        <SelectItem value="vegan">Vegan Mediterranean Bowl</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Plus Ones */}
                  {maxPlusOnes > 0 && (
                    <div>
                      <Label htmlFor={`${event.id}-plus-ones`}>Number of Plus Ones (Max: {maxPlusOnes})</Label>
                      <Input
                        id={`${event.id}-plus-ones`}
                        type="number"
                        min="0"
                        max={maxPlusOnes}
                        value={eventData.plus_ones}
                        onChange={(e) => updateEventData(event.id, "plus_ones", Number.parseInt(e.target.value) || 0)}
                        className="mt-1"
                      />
                    </div>
                  )}

                  {/* Plus One Names */}
                  {eventData.plus_ones > 0 && (
                    <div>
                      <Label htmlFor={`${event.id}-names`}>Plus One Name(s)</Label>
                      <Input
                        id={`${event.id}-names`}
                        type="text"
                        placeholder="Enter names separated by commas"
                        value={eventData.plus_one_names.join(", ")}
                        onChange={(e) =>
                          updateEventData(
                            event.id,
                            "plus_one_names",
                            e.target.value.split(",").map((n) => n.trim()),
                          )
                        }
                        className="mt-1"
                      />
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        )
      })}

      {/* Dietary Restrictions */}
      <Card>
        <CardHeader>
          <CardTitle>Dietary Restrictions & Special Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="dietary">
              Please let us know of any dietary restrictions, allergies, or special requests
            </Label>
            <Textarea
              id="dietary"
              placeholder="e.g., Gluten-free, nut allergy, wheelchair access needed..."
              value={dietaryRestrictions}
              onChange={(e) => setDietaryRestrictions(e.target.value)}
              className="mt-1 min-h-24"
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex flex-col gap-4">
        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm flex items-center gap-2">
            <Check className="h-4 w-4" />
            Your RSVP has been submitted successfully!
          </div>
        )}

        <Button type="submit" disabled={loading} size="lg" className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit RSVP"
          )}
        </Button>
      </div>
    </form>
  )
}

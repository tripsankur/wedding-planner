"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface RSVPWithRelations {
  id: string
  status: string
  meal_choice: string | null
  plus_ones: number
  special_requests: string | null
  submitted_at: string | null
  guests: {
    first_name: string
    last_name: string
    email: string
  }
  events: {
    title: string
    event_date: string
  }
}

export function RSVPTable({ rsvps }: { rsvps: RSVPWithRelations[] }) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "attending":
        return <Badge className="bg-green-600">Attending</Badge>
      case "not_attending":
        return <Badge variant="destructive">Declined</Badge>
      default:
        return <Badge variant="secondary">Pending</Badge>
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Guest</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Meal Choice</TableHead>
            <TableHead>Plus Ones</TableHead>
            <TableHead>Submitted</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rsvps.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
                No RSVP responses yet.
              </TableCell>
            </TableRow>
          ) : (
            rsvps.map((rsvp) => (
              <TableRow key={rsvp.id}>
                <TableCell className="font-medium">
                  {rsvp.guests.first_name} {rsvp.guests.last_name}
                </TableCell>
                <TableCell>{rsvp.events.title}</TableCell>
                <TableCell>{getStatusBadge(rsvp.status)}</TableCell>
                <TableCell>{rsvp.meal_choice || "—"}</TableCell>
                <TableCell>{rsvp.plus_ones || 0}</TableCell>
                <TableCell>
                  {rsvp.submitted_at
                    ? new Date(rsvp.submitted_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "—"}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

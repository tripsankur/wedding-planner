"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Guest } from "@/lib/types/database"
import { Copy, Mail, Loader2 } from "lucide-react"
import { useState } from "react"
import { sendInvitationEmail } from "@/lib/actions/notification-actions"

export function GuestTable({ guests }: { guests: Guest[] }) {
  const [copiedToken, setCopiedToken] = useState<string | null>(null)
  const [sendingEmail, setSendingEmail] = useState<string | null>(null)

  const copyToken = (token: string) => {
    navigator.clipboard.writeText(token)
    setCopiedToken(token)
    setTimeout(() => setCopiedToken(null), 2000)
  }

  const handleSendInvitation = async (guestId: string) => {
    setSendingEmail(guestId)
    await sendInvitationEmail(guestId)
    setSendingEmail(null)
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Group</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Access Token</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guests.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
                No guests found. Add your first guest to get started.
              </TableCell>
            </TableRow>
          ) : (
            guests.map((guest) => (
              <TableRow key={guest.id}>
                <TableCell className="font-medium">
                  {guest.first_name} {guest.last_name}
                </TableCell>
                <TableCell>{guest.email}</TableCell>
                <TableCell>{guest.guest_groups?.name || "—"}</TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {guest.tags.length > 0 ? (
                      guest.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground text-sm">—</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-muted px-2 py-1 rounded">{guest.access_token.slice(0, 8)}...</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToken(guest.access_token)}
                      className="h-7 w-7 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    {copiedToken === guest.access_token && <span className="text-xs text-green-600">Copied!</span>}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSendInvitation(guest.id)}
                    disabled={sendingEmail === guest.id}
                  >
                    {sendingEmail === guest.id ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Mail className="h-4 w-4 mr-2" />
                    )}
                    Send Invite
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

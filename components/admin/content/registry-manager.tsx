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

interface RegistryLink {
  id: string
  store_name: string
  url: string
  description: string
  icon_name: string
  display_order: number
}

export function RegistryManager() {
  const [registries, setRegistries] = useState<RegistryLink[]>([])
  const [editingRegistry, setEditingRegistry] = useState<RegistryLink | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchRegistries()
  }, [])

  async function fetchRegistries() {
    try {
      const response = await fetch("/api/admin/registry")
      const data = await response.json()
      setRegistries(data)
    } catch (error) {
      toast({ title: "Error loading registries", variant: "destructive" })
    }
  }

  async function handleSave(registry: Partial<RegistryLink>) {
    try {
      const method = registry.id ? "PUT" : "POST"
      const response = await fetch("/api/admin/registry", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registry),
      })

      if (response.ok) {
        toast({ title: registry.id ? "Registry updated!" : "Registry created!" })
        fetchRegistries()
        setIsDialogOpen(false)
        setEditingRegistry(null)
      }
    } catch (error) {
      toast({ title: "Error saving registry", variant: "destructive" })
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this registry?")) return

    try {
      const response = await fetch(`/api/admin/registry?id=${id}`, { method: "DELETE" })
      if (response.ok) {
        toast({ title: "Registry deleted" })
        fetchRegistries()
      }
    } catch (error) {
      toast({ title: "Error deleting registry", variant: "destructive" })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Registry Links</h2>
          <p className="text-muted-foreground">Manage your gift registry links</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingRegistry(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Registry
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingRegistry ? "Edit Registry" : "Add Registry Link"}</DialogTitle>
            </DialogHeader>
            <RegistryForm registry={editingRegistry} onSave={handleSave} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {registries.map((registry) => (
          <Card key={registry.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{registry.store_name}</CardTitle>
                  <CardDescription className="break-all">{registry.url}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingRegistry(registry)
                      setIsDialogOpen(true)
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(registry.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            {registry.description && (
              <CardContent>
                <p className="text-sm text-muted-foreground">{registry.description}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

function RegistryForm({
  registry,
  onSave,
}: {
  registry: RegistryLink | null
  onSave: (registry: Partial<RegistryLink>) => void
}) {
  const [formData, setFormData] = useState<Partial<RegistryLink>>(
    registry || {
      store_name: "",
      url: "",
      description: "",
      icon_name: "",
      display_order: 0,
    },
  )

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="store_name">Store Name</Label>
        <Input
          id="store_name"
          value={formData.store_name}
          onChange={(e) => setFormData({ ...formData, store_name: e.target.value })}
          placeholder="Amazon"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">Registry URL</Label>
        <Input
          id="url"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          placeholder="https://www.amazon.com/wedding/..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (optional)</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={2}
          placeholder="For home essentials and kitchen items"
        />
      </div>

      <Button onClick={() => onSave(formData)} className="w-full">
        Save Registry
      </Button>
    </div>
  )
}

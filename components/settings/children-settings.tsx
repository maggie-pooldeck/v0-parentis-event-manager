"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { Child } from "@/lib/types/database"

const PRESET_COLORS = [
  "#3B82F6", // Blue
  "#10B981", // Green
  "#F59E0B", // Amber
  "#EF4444", // Red
  "#8B5CF6", // Purple
  "#EC4899", // Pink
  "#14B8A6", // Teal
  "#F97316", // Orange
]

interface ChildrenSettingsProps {
  initialChildren: Child[]
}

export function ChildrenSettings({ initialChildren }: ChildrenSettingsProps) {
  const [children, setChildren] = useState<Child[]>(initialChildren)
  const [newChildName, setNewChildName] = useState("")
  const [newChildColor, setNewChildColor] = useState(PRESET_COLORS[0])
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleAddChild = async () => {
    if (!newChildName.trim()) {
      setMessage("Please enter a child's name")
      return
    }

    setIsLoading(true)
    setMessage("")

    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setMessage("Not authenticated")
        setIsLoading(false)
        return
      }

      const { data, error } = await supabase
        .from("children")
        .insert({
          user_id: user.id,
          name: newChildName.trim(),
          color: newChildColor,
        })
        .select()
        .single()

      if (error) {
        setMessage("Failed to add child")
        console.error("[v0] Add child error:", error)
      } else {
        setChildren([...children, data as Child])
        setNewChildName("")
        setNewChildColor(PRESET_COLORS[0])
        setMessage("Child added successfully!")
        setTimeout(() => setMessage(""), 3000)
      }
    } catch (err) {
      setMessage("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteChild = async (childId: string) => {
    if (!confirm("Are you sure you want to delete this child? All their events will also be deleted.")) {
      return
    }

    setIsLoading(true)
    setMessage("")

    try {
      const supabase = createClient()

      const { error } = await supabase.from("children").delete().eq("id", childId)

      if (error) {
        setMessage("Failed to delete child")
        console.error("[v0] Delete child error:", error)
      } else {
        setChildren(children.filter((child) => child.id !== childId))
        setMessage("Child deleted successfully")
        setTimeout(() => setMessage(""), 3000)
      }
    } catch (err) {
      setMessage("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateChild = async (childId: string, name: string, color: string) => {
    setIsLoading(true)
    setMessage("")

    try {
      const supabase = createClient()

      const { error } = await supabase.from("children").update({ name, color }).eq("id", childId)

      if (error) {
        setMessage("Failed to update child")
        console.error("[v0] Update child error:", error)
      } else {
        setChildren(children.map((child) => (child.id === childId ? { ...child, name, color } : child)))
        setMessage("Child updated successfully!")
        setTimeout(() => setMessage(""), 3000)
      }
    } catch (err) {
      setMessage("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Children</CardTitle>
        <CardDescription>Manage your children's profiles</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Existing Children */}
        <div className="space-y-4">
          {children.map((child) => (
            <ChildRow
              key={child.id}
              child={child}
              onUpdate={handleUpdateChild}
              onDelete={handleDeleteChild}
              isLoading={isLoading}
            />
          ))}
        </div>

        {/* Add New Child */}
        <div className="space-y-4 border-t pt-4">
          <h3 className="font-semibold">Add New Child</h3>
          <div className="flex items-end gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="newChildName">Name</Label>
              <Input
                id="newChildName"
                type="text"
                placeholder="Child's name"
                value={newChildName}
                onChange={(e) => setNewChildName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label>Color</Label>
              <div className="flex gap-2">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className="h-10 w-10 rounded-md border-2 transition-all hover:scale-110"
                    style={{
                      backgroundColor: color,
                      borderColor: newChildColor === color ? "#000" : "transparent",
                    }}
                    onClick={() => setNewChildColor(color)}
                    disabled={isLoading}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>
            <Button onClick={handleAddChild} disabled={isLoading}>
              <Plus className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>
        </div>

        {message && (
          <p className={`text-sm ${message.includes("success") ? "text-green-600" : "text-destructive"}`}>{message}</p>
        )}
      </CardContent>
    </Card>
  )
}

interface ChildRowProps {
  child: Child
  onUpdate: (childId: string, name: string, color: string) => void
  onDelete: (childId: string) => void
  isLoading: boolean
}

function ChildRow({ child, onUpdate, onDelete, isLoading }: ChildRowProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(child.name)
  const [color, setColor] = useState(child.color)

  const handleSave = () => {
    onUpdate(child.id, name, color)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setName(child.name)
    setColor(child.color)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="flex items-end gap-4 rounded-lg border p-4">
        <div className="flex-1 space-y-2">
          <Label htmlFor={`edit-${child.id}`}>Name</Label>
          <Input
            id={`edit-${child.id}`}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label>Color</Label>
          <div className="flex gap-2">
            {PRESET_COLORS.map((presetColor) => (
              <button
                key={presetColor}
                type="button"
                className="h-10 w-10 rounded-md border-2 transition-all hover:scale-110"
                style={{
                  backgroundColor: presetColor,
                  borderColor: color === presetColor ? "#000" : "transparent",
                }}
                onClick={() => setColor(presetColor)}
                disabled={isLoading}
                aria-label={`Select color ${presetColor}`}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSave} disabled={isLoading} size="sm">
            Save
          </Button>
          <Button onClick={handleCancel} disabled={isLoading} variant="outline" size="sm">
            Cancel
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full" style={{ backgroundColor: child.color }} />
        <span className="font-medium">{child.name}</span>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => setIsEditing(true)} disabled={isLoading} variant="outline" size="sm">
          Edit
        </Button>
        <Button onClick={() => onDelete(child.id)} disabled={isLoading} variant="outline" size="sm">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

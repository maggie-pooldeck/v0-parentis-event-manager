"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Plus, X } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface ChildData {
  name: string
  color: string
}

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

export default function OnboardingPage() {
  const [children, setChildren] = useState<ChildData[]>([{ name: "", color: PRESET_COLORS[0] }])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const addChild = () => {
    if (children.length < 8) {
      setChildren([...children, { name: "", color: PRESET_COLORS[children.length % PRESET_COLORS.length] }])
    }
  }

  const removeChild = (index: number) => {
    if (children.length > 1) {
      setChildren(children.filter((_, i) => i !== index))
    }
  }

  const updateChild = (index: number, field: keyof ChildData, value: string) => {
    const updated = [...children]
    updated[index][field] = value
    setChildren(updated)
  }

  const handleComplete = async () => {
    setError("")

    // Validate all children have names
    if (children.some((child) => !child.name.trim())) {
      setError("Please provide a name for each child")
      return
    }

    setIsLoading(true)

    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setError("Not authenticated")
        setIsLoading(false)
        return
      }

      // Insert children
      const { error: childrenError } = await supabase.from("children").insert(
        children.map((child) => ({
          user_id: user.id,
          name: child.name.trim(),
          color: child.color,
        })),
      )

      if (childrenError) {
        setError("Failed to save children")
        console.error("[v0] Children insert error:", childrenError)
        setIsLoading(false)
        return
      }

      // Mark onboarding as completed
      const { error: updateError } = await supabase
        .from("users")
        .update({ onboarding_completed: true })
        .eq("id", user.id)

      if (updateError) {
        console.error("[v0] Onboarding update error:", updateError)
      }

      router.push("/dashboard")
    } catch (err) {
      setError("An unexpected error occurred")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4 py-12 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
            <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome to Parentis!</CardTitle>
          <CardDescription>Let's get started by adding your children</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {children.map((child, index) => (
              <div key={index} className="flex items-end gap-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`child-${index}`}>Child {index + 1}</Label>
                  <Input
                    id={`child-${index}`}
                    type="text"
                    placeholder="Enter child's name"
                    value={child.name}
                    onChange={(e) => updateChild(index, "name", e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`color-${index}`}>Color</Label>
                  <div className="flex gap-2">
                    {PRESET_COLORS.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className="h-10 w-10 rounded-md border-2 transition-all hover:scale-110"
                        style={{
                          backgroundColor: color,
                          borderColor: child.color === color ? "#000" : "transparent",
                        }}
                        onClick={() => updateChild(index, "color", color)}
                        disabled={isLoading}
                        aria-label={`Select color ${color}`}
                      />
                    ))}
                  </div>
                </div>
                {children.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeChild(index)}
                    disabled={isLoading}
                    aria-label="Remove child"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {children.length < 8 && (
            <Button
              type="button"
              variant="outline"
              onClick={addChild}
              disabled={isLoading}
              className="w-full bg-transparent"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Another Child
            </Button>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button onClick={handleComplete} disabled={isLoading} className="w-full" size="lg">
            {isLoading ? "Setting up..." : "Complete Setup"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

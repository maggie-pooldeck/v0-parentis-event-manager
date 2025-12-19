"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@/lib/types/database"

interface ProfileSettingsProps {
  user: User | null
  userEmail: string
}

export function ProfileSettings({ user, userEmail }: ProfileSettingsProps) {
  const [fullName, setFullName] = useState(user?.full_name || "")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleUpdateProfile = async () => {
    setIsLoading(true)
    setMessage("")

    try {
      const supabase = createClient()
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser()

      if (!currentUser) {
        setMessage("Not authenticated")
        setIsLoading(false)
        return
      }

      const { error } = await supabase.from("users").update({ full_name: fullName }).eq("id", currentUser.id)

      if (error) {
        setMessage("Failed to update profile")
        console.error("[v0] Profile update error:", error)
      } else {
        setMessage("Profile updated successfully!")
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
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your personal details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={userEmail} disabled />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            placeholder="Your name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {message && (
          <p className={`text-sm ${message.includes("success") ? "text-green-600" : "text-destructive"}`}>{message}</p>
        )}

        <Button onClick={handleUpdateProfile} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </CardContent>
    </Card>
  )
}

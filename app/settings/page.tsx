import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProfileSettings } from "@/components/settings/profile-settings"
import { ChildrenSettings } from "@/components/settings/children-settings"
import type { Child } from "@/lib/types/database"

export default async function SettingsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: userData } = await supabase.from("users").select("*").eq("id", user.id).single()

  const { data: children } = await supabase.from("children").select("*").eq("user_id", user.id).order("created_at")

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userName={userData?.full_name || "there"} />

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="mt-2 text-muted-foreground">Manage your account and children profiles</p>
          </div>

          <ProfileSettings user={userData} userEmail={user.email || ""} />
          <ChildrenSettings initialChildren={(children as Child[]) || []} />
        </div>
      </main>
    </div>
  )
}

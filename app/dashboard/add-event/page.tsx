import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AddEventForm } from "@/components/dashboard/add-event-form"
import type { Child } from "@/lib/types/database"

export default async function AddEventPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: userData } = await supabase.from("users").select("full_name").eq("id", user.id).single()

  const { data: children } = await supabase.from("children").select("*").eq("user_id", user.id).order("created_at")

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userName={userData?.full_name || "there"} />

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <AddEventForm children={(children as Child[]) || []} />
        </div>
      </main>
    </div>
  )
}

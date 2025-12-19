import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { WeekView } from "@/components/dashboard/week-view"
import { UpcomingEvents } from "@/components/dashboard/upcoming-events"
import type { Child, EventWithChild } from "@/lib/types/database"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch user's children
  const { data: children } = await supabase.from("children").select("*").eq("user_id", user.id).order("created_at")

  // Fetch upcoming events (next 7 days)
  const today = new Date()
  const nextWeek = new Date(today)
  nextWeek.setDate(today.getDate() + 7)

  const { data: events } = await supabase
    .from("events")
    .select(
      `
      *,
      child:children(*)
    `,
    )
    .eq("user_id", user.id)
    .gte("start_time", today.toISOString())
    .lte("start_time", nextWeek.toISOString())
    .order("start_time")

  const { data: userData } = await supabase.from("users").select("full_name").eq("id", user.id).single()

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userName={userData?.full_name || "there"} />

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content - Week View */}
          <div className="lg:col-span-2">
            <WeekView events={(events as EventWithChild[]) || []} children={(children as Child[]) || []} />
          </div>

          {/* Sidebar - Upcoming Events & Quick Actions */}
          <div className="space-y-6">
            <UpcomingEvents events={(events as EventWithChild[]) || []} />
          </div>
        </div>
      </main>
    </div>
  )
}

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { EventWithChild } from "@/lib/types/database"
import { format, parseISO } from "date-fns"
import { Clock } from "lucide-react"

interface UpcomingEventsProps {
  events: EventWithChild[]
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  // Take first 5 events
  const upcomingEvents = events.slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Upcoming Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        {upcomingEvents.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">No upcoming events</p>
        ) : (
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="rounded-lg border p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="font-medium leading-tight">{event.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {format(parseISO(event.start_time), "MMM d, h:mm a")}
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="shrink-0 text-xs"
                    style={{
                      backgroundColor: `${event.child?.color || "#6B7280"}20`,
                      color: event.child?.color || "#6B7280",
                    }}
                  >
                    {event.child?.name || "Unknown"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

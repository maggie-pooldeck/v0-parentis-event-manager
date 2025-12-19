"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Child, EventWithChild } from "@/lib/types/database"
import { format, startOfWeek, addDays, isSameDay, parseISO } from "date-fns"
import { Calendar } from "lucide-react"

interface WeekViewProps {
  events: EventWithChild[]
  children: Child[]
}

export function WeekView({ events, children }: WeekViewProps) {
  const today = new Date()
  const weekStart = startOfWeek(today, { weekStartsOn: 0 }) // Sunday

  const daysOfWeek = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  const getEventsForDay = (day: Date) => {
    return events.filter((event) => isSameDay(parseISO(event.start_time), day))
  }

  const getChildColor = (childId: string) => {
    const child = children.find((c) => c.id === childId)
    return child?.color || "#6B7280"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          This Week
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {daysOfWeek.map((day) => {
            const dayEvents = getEventsForDay(day)
            const isToday = isSameDay(day, today)

            return (
              <div
                key={day.toISOString()}
                className={`rounded-lg border p-4 ${isToday ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20" : ""}`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h3 className={`font-semibold ${isToday ? "text-blue-600 dark:text-blue-400" : ""}`}>
                      {format(day, "EEEE")}
                    </h3>
                    <p className="text-sm text-muted-foreground">{format(day, "MMMM d")}</p>
                  </div>
                  {isToday && (
                    <Badge variant="default" className="bg-blue-600">
                      Today
                    </Badge>
                  )}
                </div>

                {dayEvents.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No events scheduled</p>
                ) : (
                  <div className="space-y-2">
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        className="flex items-center gap-3 rounded-md bg-background p-3 shadow-sm"
                        style={{
                          borderLeft: `4px solid ${getChildColor(event.child_id)}`,
                        }}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{event.title}</p>
                            <Badge
                              variant="secondary"
                              className="text-xs"
                              style={{
                                backgroundColor: `${getChildColor(event.child_id)}20`,
                                color: getChildColor(event.child_id),
                              }}
                            >
                              {event.child?.name || "Unknown"}
                            </Badge>
                          </div>
                          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{format(parseISO(event.start_time), "h:mm a")}</span>
                            {event.location && (
                              <>
                                <span>•</span>
                                <span>{event.location}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

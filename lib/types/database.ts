export interface User {
  id: string
  email: string
  full_name: string | null
  onboarding_completed: boolean
  created_at: string
  updated_at: string
}

export interface Child {
  id: string
  user_id: string
  name: string
  color: string
  created_at: string
  updated_at: string
}

export interface School {
  id: string
  name: string
  address: string | null
  created_at: string
}

export interface SportsClub {
  id: string
  name: string
  sport: string | null
  address: string | null
  created_at: string
}

export interface Event {
  id: string
  user_id: string
  child_id: string
  title: string
  description: string | null
  event_type: "school" | "sports" | "other"
  location: string | null
  start_time: string
  end_time: string | null
  is_recurring: boolean
  recurrence_pattern: string | null
  source: string | null
  school_id: string | null
  sports_club_id: string | null
  created_at: string
  updated_at: string
}

export interface EventWithChild extends Event {
  child: Child
}

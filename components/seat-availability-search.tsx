"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export function SeatAvailabilitySearch() {
  const [trainQuery, setTrainQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (trainQuery.trim()) {
      router.push(`/seat-availability/${trainQuery.trim()}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
      <Input
        value={trainQuery}
        onChange={(e) => setTrainQuery(e.target.value)}
        placeholder="Enter the train number or name"
        className="flex-1 h-12 bg-gray-50"
      />
      <Button type="submit" className="h-12 px-8 bg-primary hover:bg-primary/90 text-white">
        Check Availability
      </Button>
    </form>
  )
}


"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function PnrStatusForm() {
  const [pnrNumber, setPnrNumber] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!pnrNumber || pnrNumber.length !== 10) return

    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      // Here you would typically update some state or trigger a server action
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="pnr-number">Enter 10 digit PNR Number</Label>
        <Input
          id="pnr-number"
          value={pnrNumber}
          onChange={(e) => setPnrNumber(e.target.value)}
          placeholder="e.g., 1234567890"
          maxLength={10}
          pattern="[0-9]{10}"
          required
        />
        <p className="text-xs text-gray-500">You can find your PNR number on your e-ticket or SMS confirmation</p>
      </div>

      <Button type="submit" disabled={isSubmitting || pnrNumber.length !== 10}>
        {isSubmitting ? (
          <>Processing...</>
        ) : (
          <>
            <Search className="mr-2 h-4 w-4" />
            Check PNR Status
          </>
        )}
      </Button>
    </form>
  )
}


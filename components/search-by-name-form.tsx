"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight } from "lucide-react"
import { StationSearch } from "@/components/station-search"
import type { Station } from "@/lib/stations"

export function SearchByNameForm() {
  const [fromStation, setFromStation] = useState("Old Delhi")
  const [toStation, setToStation] = useState("Tanakpur")
  const [quota, setQuota] = useState("General")

  const handleSwapStations = () => {
    const temp = fromStation
    setFromStation(toStation)
    setToStation(temp)
  }

  const handleFromStationChange = (value: string, station?: Station) => {
    setFromStation(value)
  }

  const handleToStationChange = (value: string, station?: Station) => {
    setToStation(value)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto] gap-4 items-end">
      <StationSearch label="From" value={fromStation} onChange={handleFromStationChange} required />

      <div className="flex justify-center items-end">
        <Button type="button" variant="ghost" size="icon" className="mb-2" onClick={handleSwapStations}>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <StationSearch label="To" value={toStation} onChange={handleToStationChange} required />

      <div className="space-y-2">
        <Label htmlFor="quota">Quota</Label>
        <Select value={quota} onValueChange={setQuota}>
          <SelectTrigger id="quota">
            <SelectValue placeholder="Select quota" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="General">General</SelectItem>
            <SelectItem value="Tatkal">Tatkal</SelectItem>
            <SelectItem value="Ladies">Ladies</SelectItem>
            <SelectItem value="Senior Citizen">Senior Citizen</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}


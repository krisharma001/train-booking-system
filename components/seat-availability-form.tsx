"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RefreshCw } from "lucide-react"
import { StationSearch } from "@/components/station-search"
import type { Station } from "@/lib/stations"

export function SeatAvailabilityForm() {
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
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
      <StationSearch label="From" value={fromStation} onChange={handleFromStationChange} required />

      <div className="flex justify-center items-end">
        <Button type="button" variant="ghost" size="icon" className="mb-2" onClick={handleSwapStations}>
          <RefreshCw className="h-4 w-4" />
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

      <div className="md:col-span-4 mt-2">
        <div className="text-sm font-medium">Runs on</div>
        <div className="flex space-x-4 mt-1">
          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 text-xs font-medium">S</div>
          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 text-xs font-medium">M</div>
          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 text-xs font-medium">T</div>
          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 text-xs font-medium">W</div>
          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 text-xs font-medium">T</div>
          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 text-xs font-medium">F</div>
          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 text-xs font-medium">S</div>
        </div>
      </div>
    </div>
  )
}


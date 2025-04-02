"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { StationSearch } from "@/components/station-search"
import type { Station } from "@/lib/stations"

export function SearchByStationForm() {
  const [stationName, setStationName] = useState("")

  const handleStationChange = (value: string, station?: Station) => {
    setStationName(value)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <StationSearch
          label="STATION NAME/CODE"
          value={stationName}
          onChange={handleStationChange}
          placeholder="Enter the station name or code"
          required
        />
      </div>
      <Button className="h-12 px-8 bg-primary hover:bg-primary/90 text-white self-end">SEARCH</Button>
    </div>
  )
}


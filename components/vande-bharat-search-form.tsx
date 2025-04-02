"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { StationSearch } from "@/components/station-search"
import type { Station } from "@/lib/stations"

export function VandeBharatSearchForm() {
  const [fromStation, setFromStation] = useState("Delhi - All stations(NDLS)")
  const [toStation, setToStation] = useState("Asafpur (AFR)")
  const [date, setDate] = useState("01 Apr, Tue")

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
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_1fr_auto] gap-4 items-end">
      <StationSearch label="From" value={fromStation} onChange={handleFromStationChange} required />

      <div className="flex justify-center items-end">
        <Button type="button" variant="ghost" size="icon" className="mb-2" onClick={handleSwapStations}>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <StationSearch label="To" value={toStation} onChange={handleToStationChange} required />

      <div className="space-y-1">
        <div className="text-xs font-medium uppercase text-gray-500">Departure Date</div>
        <div className="flex items-center border rounded-md p-2 bg-gray-50">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-500 mr-2"
          >
            <rect
              x="3"
              y="4"
              width="18"
              height="18"
              rx="2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{date}</span>
        </div>
      </div>

      <Button className="px-8 bg-primary hover:bg-primary/90 text-white">SEARCH</Button>
    </div>
  )
}


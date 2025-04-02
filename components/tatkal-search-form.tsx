"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { RefreshCw, Search } from "lucide-react"
import { StationSearch } from "@/components/station-search"
import type { Station } from "@/lib/stations"

export function TatkalSearchForm() {
  const [fromStation, setFromStation] = useState("New Delhi (NDLS)")
  const [toStation, setToStation] = useState("Asafpur (AFR)")
  const [date, setDate] = useState("01 Apr, Tue")
  const [selectedClass, setSelectedClass] = useState<string[]>([])

  const handleSwapStations = () => {
    const temp = fromStation
    setFromStation(toStation)
    setToStation(temp)
  }

  const handleClassToggle = (value: string) => {
    setSelectedClass(
      selectedClass.includes(value) ? selectedClass.filter((item) => item !== value) : [...selectedClass, value],
    )
  }

  const handleFromStationChange = (value: string, station?: Station) => {
    setFromStation(value)
  }

  const handleToStationChange = (value: string, station?: Station) => {
    setToStation(value)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_1fr] gap-4 items-end">
        <StationSearch label="From" value={fromStation} onChange={handleFromStationChange} required />

        <div className="flex justify-center items-end">
          <Button type="button" variant="ghost" size="icon" className="mb-2" onClick={handleSwapStations}>
            <RefreshCw className="h-4 w-4" />
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="font-medium mb-2">Class</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <Checkbox
                id="class-2s"
                checked={selectedClass.includes("2s")}
                onCheckedChange={() => handleClassToggle("2s")}
              />
              <Label htmlFor="class-2s" className="ml-2">
                2S
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="class-cc"
                checked={selectedClass.includes("cc")}
                onCheckedChange={() => handleClassToggle("cc")}
              />
              <Label htmlFor="class-cc" className="ml-2">
                CC
              </Label>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Quota</h3>
          <RadioGroup defaultValue="general">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="general" id="general" />
              <Label htmlFor="general">General</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="tatkal" id="tatkal" />
              <Label htmlFor="tatkal">Tatkal</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="lower-berth" id="lower-berth" />
              <Label htmlFor="lower-berth">Lower Berth</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ladies" id="ladies" />
              <Label htmlFor="ladies">Ladies</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <h3 className="font-medium mb-2">Departure from</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="border rounded-md p-2 text-center bg-gray-50">
              <div className="text-xs text-gray-600">00:00 - 06:00</div>
              <div className="text-sm">Early Morning</div>
            </div>
            <div className="border rounded-md p-2 text-center bg-gray-50">
              <div className="text-xs text-gray-600">06:00 - 12:00</div>
              <div className="text-sm">Morning</div>
            </div>
            <div className="border rounded-md p-2 text-center bg-gray-50">
              <div className="text-xs text-gray-600">12:00 - 18:00</div>
              <div className="text-sm">Mid Day</div>
            </div>
            <div className="border rounded-md p-2 text-center bg-gray-50">
              <div className="text-xs text-gray-600">18:00 - 24:00</div>
              <div className="text-sm">Night</div>
            </div>
          </div>
          <div className="mt-4 text-right">
            <Button variant="link" className="text-primary">
              MORE FILTERS
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="px-8 bg-primary hover:bg-primary/90 text-white">
          <Search className="mr-2 h-4 w-4" />
          SEARCH
        </Button>
      </div>
    </div>
  )
}


"use client"

import { useState } from "react"
import { Calendar, RefreshCw, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { StationSearch } from "@/components/station-search"
import type { Station } from "@/lib/stations"

export function SearchForm() {
  const [date, setDate] = useState<Date>()
  const [fromStation, setFromStation] = useState("Delhi - All stations(NDLS)")
  const [toStation, setToStation] = useState("Asafpur (AFR)")
  const [bookingType, setBookingType] = useState("regular")
  const [fullRefund, setFullRefund] = useState(false)

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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
        <StationSearch label="From" value={fromStation} onChange={handleFromStationChange} required />

        <Button type="button" variant="ghost" size="icon" className="mt-8 hidden md:flex" onClick={handleSwapStations}>
          <RefreshCw className="h-4 w-4" />
        </Button>

        <StationSearch label="To" value={toStation} onChange={handleToStationChange} required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Departure Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {date ? format(date, "EEE, dd MMM") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Booking Type</Label>
          <RadioGroup defaultValue="regular" className="flex space-x-1" onValueChange={setBookingType}>
            <div className="flex items-center space-x-2 border rounded-l-md px-4 py-2 bg-white">
              <RadioGroupItem value="regular" id="regular" />
              <Label htmlFor="regular" className="cursor-pointer">
                Regular
              </Label>
            </div>
            <div className="flex items-center space-x-2 border px-4 py-2 bg-white">
              <RadioGroupItem value="tatkal" id="tatkal" />
              <Label htmlFor="tatkal" className="cursor-pointer">
                Tatkal
                <span className="ml-1 text-xs text-green-600 font-medium">Open</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-r-md px-4 py-2 bg-white">
              <RadioGroupItem value="premium-tatkal" id="premium-tatkal" />
              <Label htmlFor="premium-tatkal" className="cursor-pointer">
                Premium Tatkal
                <span className="ml-1 text-xs text-green-600 font-medium">Open</span>
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="full-refund"
          checked={fullRefund}
          onCheckedChange={(checked) => setFullRefund(checked as boolean)}
        />
        <Label htmlFor="full-refund" className="text-sm text-gray-700">
          Get a full train fare refund
        </Label>
      </div>

      <div className="flex flex-wrap gap-4 text-xs text-gray-600">
        <div className="flex items-center">
          <span className="mr-1">₹0</span> cancellation fee
        </div>
        <div className="flex items-center">
          <span className="mr-1">•</span> Instant full train fare refunds
        </div>
        <div className="flex items-center">
          <span className="mr-1">•</span> 24*7 premium customer support
        </div>
        <div className="flex items-center">
          <span className="mr-1">•</span> No documentation required
        </div>
      </div>

      <div className="flex justify-end">
        <Button size="lg" className="px-8">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>
    </div>
  )
}


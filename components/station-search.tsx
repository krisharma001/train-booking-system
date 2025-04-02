"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Loader2 } from "lucide-react"
import { type Station, formatStation, searchStations, getStations } from "@/lib/stations"

interface StationSearchProps {
  label: string
  placeholder?: string
  value: string
  onChange: (value: string, station?: Station) => void
  required?: boolean
}

export function StationSearch({
  label,
  placeholder = "Enter station name or code",
  value,
  onChange,
  required = false,
}: StationSearchProps) {
  const [query, setQuery] = useState(value)
  const [stations, setStations] = useState<Station[]>([])
  const [results, setResults] = useState<Station[]>([])
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Fetch stations data
  useEffect(() => {
    const fetchStations = async () => {
      setLoading(true)
      try {
        const data = await getStations()
        setStations(data)
      } catch (error) {
        console.error("Error loading stations:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStations()
  }, [])

  // Handle outside clicks to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Update search results when query changes
  useEffect(() => {
    if (query.trim() && stations.length > 0) {
      const searchResults = searchStations(query, stations)
      setResults(searchResults)
    } else {
      setResults([])
    }
  }, [query, stations])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    setShowResults(true)

    // If input is cleared, notify parent component
    if (!newQuery.trim()) {
      onChange("")
    }
  }

  const handleStationSelect = (station: Station) => {
    const formattedValue = formatStation(station)
    setQuery(formattedValue)
    onChange(formattedValue, station)
    setShowResults(false)
  }

  return (
    <div className="relative">
      <Label htmlFor={`station-${label}`} className="mb-1 block">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <div className="relative">
        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        <Input
          id={`station-${label}`}
          ref={inputRef}
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowResults(true)}
          className="pl-9"
          placeholder={placeholder}
          required={required}
        />
        {loading && (
          <div className="absolute right-3 top-3">
            <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
          </div>
        )}
      </div>

      {showResults && results.length > 0 && (
        <div
          ref={resultsRef}
          className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto"
        >
          <ul className="py-1">
            {results.map((station) => (
              <li
                key={station.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleStationSelect(station)}
              >
                <div className="font-medium">
                  {station.name} ({station.code})
                </div>
                <div className="text-xs text-gray-500">{station.address}</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showResults && query.trim() && results.length === 0 && !loading && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg p-4 text-center text-gray-500">
          No stations found matching "{query}"
        </div>
      )}
    </div>
  )
}


"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft, Search, Train } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { TrainInfo } from "@/components/train-info"
import { SearchByNameForm } from "@/components/search-by-name-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PopularTrain {
  id: string
  number: string
  name: string
  from: string
  fromCode: string
  to: string
  toCode: string
}

export function SearchByNameContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchPerformed, setSearchPerformed] = useState(false)

  const popularTrains: PopularTrain[] = [
    {
      id: "1",
      number: "19037",
      name: "Avadh Exp",
      from: "Bandra Terminus",
      fromCode: "BDTS",
      to: "Barauni Jn",
      toCode: "BJU",
    },
    {
      id: "2",
      number: "12322",
      name: "Kolkata Mail",
      from: "C Shivaji Mah T",
      fromCode: "CSMT",
      to: "Howrah Jn",
      toCode: "HWH",
    },
    {
      id: "3",
      number: "11061",
      name: "Ltt Jaynagar Exp",
      from: "Lokmanyatilak T",
      fromCode: "LTT",
      to: "Jaynagar",
      toCode: "JYG",
    },
    {
      id: "4",
      number: "22503",
      name: "Dbrg Vivek Exp",
      from: "Kanyakumari",
      fromCode: "CAPE",
      to: "DIBRUGARH",
      toCode: "DBRG",
    },
    {
      id: "5",
      number: "22538",
      name: "Kushinagar Exp",
      from: "Lokmanyatilak T",
      fromCode: "LTT",
      to: "Gorakhpur Jn",
      toCode: "GKP",
    },
    {
      id: "6",
      number: "20103",
      name: "Ltt Gkp Sf Exp",
      from: "Lokmanyatilak T",
      fromCode: "LTT",
      to: "Gorakhpur Jn",
      toCode: "GKP",
    },
    {
      id: "7",
      number: "19483",
      name: "Adi Bju Exp",
      from: "Ahmedabad Jn",
      fromCode: "ADI",
      to: "Barauni Jn",
      toCode: "BJU",
    },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setSearchPerformed(true)
    }
  }

  if (searchPerformed) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center text-sm mb-4">
          <Link href="/" className="text-primary hover:underline">
            Home
          </Link>
          <span className="mx-2">›</span>
          <Link href="/trains" className="text-primary hover:underline">
            Trains
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-700">Purangiri Janst - 12036</span>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <Tabs defaultValue="overview">
            <TabsList className="w-full justify-start border-b rounded-none p-0">
              <TabsTrigger
                value="overview"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3 px-6"
              >
                OVERVIEW
              </TabsTrigger>
              <TabsTrigger
                value="availability"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3 px-6"
              >
                AVAILABILITY
              </TabsTrigger>
              <TabsTrigger
                value="schedule"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3 px-6"
              >
                TRAIN SCHEDULE
              </TabsTrigger>
              <TabsTrigger
                value="coach"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3 px-6"
              >
                COACH POSITION
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="p-6">
              <TrainInfo />

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Purangiri Janst 12036 Train Information</h2>
                <p className="text-gray-700 mb-4">
                  Purangiri Janst (12036) train runs from Old Delhi to Tanakpur. This jan shatabdi train covers a
                  distance of about 395 km. The fare classes on 12036 train are CC,2S. The following train ticket quotas
                  are available on Purangiri Janst: GN,TQ,SS,LD.
                </p>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Purangiri Janst 12036 Ticket Prices</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <SearchByNameForm />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="availability" className="p-0">
              {/* Availability content would go here */}
            </TabsContent>

            <TabsContent value="schedule" className="p-0">
              {/* Schedule content would go here */}
            </TabsContent>

            <TabsContent value="coach" className="p-0">
              {/* Coach position content would go here */}
            </TabsContent>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">{/* Additional train information would go here */}</div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-medium mb-4">New Delhi to Tanakpur Trains Seat Availability</h3>
              <Link href="/seat-availability/12036" className="text-primary hover:underline block mb-2">
                Purangiri Janst - 12036 Seat Availability
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-medium mb-4">New Delhi to Tanakpur Trains Running Status</h3>
              <Link href="/running-status/12036" className="text-primary hover:underline block mb-2">
                Purangiri Janst - 12036 Running Status
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-medium mb-4">Popular Train from New Delhi to Tanakpur</h3>
              <Link href="/trains/15091" className="text-primary hover:underline block mb-2">
                Doz Tpu Exp - 15091
              </Link>
              <Link href="/trains/05098" className="text-primary hover:underline block mb-2">
                Doz Tpu Spl - 05098
              </Link>
              <Link href="/trains/12036" className="text-primary hover:underline block mb-2">
                Purangiri Janst - 12036
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-2">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-medium">Search trains by name or number</h1>
      </div>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search trains by name or number"
            className="pl-10 pr-4 py-6 rounded-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </form>

      <h2 className="text-xl font-bold mb-4">Popular Trains</h2>

      <div className="space-y-4">
        {popularTrains.map((train) => (
          <div
            key={train.id}
            className="bg-white rounded-lg p-4 flex items-center border hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => {
              setSearchQuery(`${train.number} ${train.name}`)
              setSearchPerformed(true)
            }}
          >
            <div className="mr-4">
              <Train className="h-6 w-6 text-gray-500" />
            </div>
            <div>
              <div className="font-medium">
                {train.number} {train.name}
              </div>
              <div className="text-sm text-gray-600">
                {train.from} ({train.fromCode}) - {train.to} ({train.toCode})
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


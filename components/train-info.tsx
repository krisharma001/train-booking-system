"use client"
import { Clock, Coffee, Moon, Utensils } from "lucide-react"

export function TrainInfo() {
  return (
    <div className="border rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-amber-100 text-amber-800 font-semibold px-2 py-1 rounded text-sm">2.7</div>
        <h2 className="text-xl font-semibold">Purangiri Janst 12036 Train</h2>
        <div className="ml-auto text-sm text-gray-600">
          Runs on: <span className="font-medium">S M T W T F S</span>
          <span className="ml-2 text-xs text-primary">(हिंदी में देखें)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
        <div>
          <div className="text-gray-600">DLI</div>
          <div className="text-3xl font-semibold">06:25</div>
          <div className="text-sm text-gray-600">Old Delhi</div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-sm text-gray-600">9hr 45min</div>
          <div className="relative w-32 h-0.5 bg-gray-300 my-2">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-500"></div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-500"></div>
          </div>
          <div className="text-sm text-gray-600">24 Stops</div>
        </div>

        <div>
          <div className="text-gray-600">TPU</div>
          <div className="text-3xl font-semibold">16:10</div>
          <div className="text-sm text-gray-600">Tanakpur</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="flex items-center gap-2">
          <Utensils className="h-5 w-5 text-red-500" />
          <span className="text-sm">Pantry</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-green-600" />
          <span className="text-sm">Superfast</span>
        </div>
        <div className="flex items-center gap-2">
          <Moon className="h-5 w-5 text-blue-600" />
          <span className="text-sm">Overnight</span>
        </div>
        <div className="flex items-center gap-2">
          <Coffee className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-400">Catering</span>
        </div>
      </div>
    </div>
  )
}


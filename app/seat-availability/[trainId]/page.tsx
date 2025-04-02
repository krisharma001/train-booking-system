import { Header } from "@/components/header"
import { SeatAvailabilityForm } from "@/components/seat-availability-form"
import { SeatAvailabilityCalendar } from "@/components/seat-availability-calendar"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface SeatAvailabilityTrainPageProps {
  params: {
    trainId: string
  }
}

export default function SeatAvailabilityTrainPage({ params }: SeatAvailabilityTrainPageProps) {
  // In a real app, you would fetch train data based on the trainId
  const trainId = params.trainId
  const trainName = trainId === "12036" ? "Purangiri Janst" : `Train ${trainId}`

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center text-sm mb-4">
          <Link href="/" className="text-primary hover:underline">
            Trains
          </Link>
          <ChevronRight className="h-4 w-4 mx-1 text-gray-500" />
          <Link href={`/trains/${trainId}`} className="text-primary hover:underline">
            {trainName} - {trainId}
          </Link>
          <ChevronRight className="h-4 w-4 mx-1 text-gray-500" />
          <span className="text-gray-700">
            {trainName} - {trainId} Seat Availability
          </span>
        </div>

        <h1 className="text-2xl font-bold mb-4">
          {trainName} {trainId} Seat Availability
        </h1>

        <div className="prose max-w-none mb-6">
          <p className="text-gray-700">
            Looking for {trainId} Seat Availability? Book confirmed train ticket for {trainName} {trainId} after
            checking seat availability easily on TrainGo. {trainName} {trainId} train runs on Mon, Tue, Wed, Thu, Fri,
            Sat, Sun & runs 7 days per week. {trainId} {trainName} starts its journey from Old Delhi and ends at
            Tanakpur and crosses 25 stations with 11 coaches. The total distance covered by {trainName} is 395 Km.{" "}
            {trainName} {trainId} departs from the origin at 06:25 and arrives at the destination at 16:10. Check the
            train seat availability and fare before booking your{" "}
            <Link href="/train-ticket" className="text-primary hover:underline">
              train ticket
            </Link>
            . Check{" "}
            <Link href={`/running-status/${trainId}`} className="text-primary hover:underline">
              {trainId} live running status
            </Link>{" "}
            on every train station.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <SeatAvailabilityForm />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">APRIL 2025</h2>
              </div>
              <SeatAvailabilityCalendar />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}


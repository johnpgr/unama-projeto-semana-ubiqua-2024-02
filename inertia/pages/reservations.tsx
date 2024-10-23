import { useState } from "react"
import Layout from "../components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import type Reservation from "#models/reservation"
import { DateRange } from "react-day-picker"

Reservations.layout = (page: React.ReactNode) => (
  <Layout title="Reservations" children={page} />
)

export default function Reservations(props: { reservation: Reservation[] }) {
  const [date, setDate] = useState<DateRange | undefined>()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">Reservations</h1>
      <Card>
        <CardHeader>
          <CardTitle>Make a Reservation</CardTitle>
          <CardDescription>
            Book your stay at one of our accommodations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="accommodation">Select Accommodation</Label>
              <Select required>
                <SelectTrigger id="accommodation">
                  <SelectValue placeholder="Select an accommodation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grand-hotel">Grand Hotel</SelectItem>
                  <SelectItem value="cruise-ship">Cruise Ship</SelectItem>
                  <SelectItem value="community-center">
                    Community Center
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Reservation date</Label>
              <Calendar
                mode="range"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nights">Number of Nights</Label>
              <Input
                id="nights"
                type="number"
                placeholder="Enter number of nights"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="guests">Number of Guests</Label>
              <Input
                id="guests"
                type="number"
                placeholder="Enter number of guests"
                required
              />
            </div>
            <Button type="submit">Make Reservation</Button>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

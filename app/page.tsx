"use client"
import { useState } from "react"
import { format } from "date-fns"
import { cn } from "~/lib/utils"
import { Button, buttonVariants } from "~/components/ui/button"
import { Calendar } from "~/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import {
  CalendarIcon as CalendarIcon2,
  MapPinIcon,
  UsersIcon,
} from "lucide-react"
import Image from "next/image"
import Placeholder from "~/assets/placeholder.svg"

export default function HomePage() {
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [guestCount, setGuestCount] = useState<number>()

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Find Your Perfect Stay</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Discover a wide range of accommodations for your next adventure
        </p>
        <Card className="max-w-5xl mx-auto">
          <CardContent className="pt-6">
            <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="Where are you going?"
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="check-in">Check-in</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal bg-transparent",
                        !checkIn && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon2 className="mr-2 h-4 w-4" />
                      {checkIn ? (
                        format(checkIn, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={checkIn}
                      onSelect={setCheckIn}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="check-out">Check-out</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal bg-transparent",
                        !checkOut && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon2 className="mr-2 h-4 w-4" />
                      {checkOut ? (
                        format(checkOut, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={checkOut}
                      onSelect={setCheckOut}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="guests">Guests</Label>
                <div className="relative">
                  <UsersIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Select
                    value={guestCount ? String(guestCount) : undefined}
                    onValueChange={(v) => setGuestCount(parseInt(v))}
                  >
                    <SelectTrigger
                      id="guests"
                      className={buttonVariants({
                        variant: "outline",
                        className: cn(
                          "pl-10 w-full justify-between text-left font-normal bg-transparent",
                          !guestCount && "text-muted-foreground"
                        ),
                      })}
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Guest</SelectItem>
                      <SelectItem value="2">2 Guests</SelectItem>
                      <SelectItem value="3">3 Guests</SelectItem>
                      <SelectItem value="4">4+ Guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="md:col-span-4">Search Accommodations</Button>
            </form>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6">Featured Accommodations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <Image
                src={Placeholder.src}
                width={Placeholder.width}
                height={Placeholder.height}
                alt="Accommodation"
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle>Luxury Suite {i}</CardTitle>
                <CardDescription>City Center, New York</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  From $199 per night
                </p>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-bold mb-6">Why Choose LodgeEase?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Wide Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Choose from hotels, vacation rentals, and unique accommodations
                worldwide.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Best Price Guarantee</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Find a lower price? We&apos;ll match it and give you an additional
                10% off.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>24/7 Customer Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Our dedicated team is always here to help with any questions or
                concerns.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}

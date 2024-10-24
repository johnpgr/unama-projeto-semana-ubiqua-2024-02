"use client"

import { useState } from "react"
import { Button, buttonVariants } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Slider } from "~/components/ui/slider"
import {
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  WifiIcon,
  CoffeeIcon,
  TvIcon,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "~/lib/utils"
import { Calendar } from "~/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import Image from "next/image"
import Placeholder from "~/assets/placeholder.svg"

const accommodations = [
  {
    id: 1,
    name: "Luxury Suite",
    type: "Hotel",
    location: "City Center",
    price: 199,
    rating: 4.8,
    amenities: ["WiFi", "Coffee Maker", "TV"],
  },
  {
    id: 2,
    name: "Cozy Cabin",
    type: "Vacation Rental",
    location: "Mountain View",
    price: 150,
    rating: 4.5,
    amenities: ["WiFi", "Fireplace", "Kitchen"],
  },
  {
    id: 3,
    name: "Beachfront Villa",
    type: "Villa",
    location: "Coastal Area",
    price: 350,
    rating: 4.9,
    amenities: ["Pool", "WiFi", "Beach Access"],
  },
  {
    id: 4,
    name: "City Apartment",
    type: "Apartment",
    location: "Downtown",
    price: 120,
    rating: 4.3,
    amenities: ["WiFi", "Kitchen", "Washer"],
  },
]

export default function AccommodationsPage() {
  const [priceRange, setPriceRange] = useState([0, 500])
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [guestCount, setGuestCount] = useState<number>()

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Available Accommodations</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="Enter location"
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
                      <CalendarIcon className="mr-2 h-4 w-4" />
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
                      <CalendarIcon className="mr-2 h-4 w-4" />
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
              <div className="space-y-2">
                <Label>Price Range</Label>
                <Slider
                  min={0}
                  max={500}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              <Button className="w-full">Apply Filters</Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accommodations.map((accommodation) => (
              <Card key={accommodation.id}>
                <Image
                  src={Placeholder.src}
                  width={Placeholder.width}
                  height={Placeholder.height}
                  alt={accommodation.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardHeader>
                  <CardTitle>{accommodation.name}</CardTitle>
                  <CardDescription>{accommodation.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold mb-2">
                    ${accommodation.price}{" "}
                    <span className="text-sm font-normal">per night</span>
                  </p>
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span>{accommodation.rating}</span>
                  </div>
                  <div className="flex space-x-2">
                    {accommodation.amenities.includes("WiFi") && (
                      <WifiIcon className="h-5 w-5 text-gray-500" />
                    )}
                    {accommodation.amenities.includes("Coffee Maker") && (
                      <CoffeeIcon className="h-5 w-5 text-gray-500" />
                    )}
                    {accommodation.amenities.includes("TV") && (
                      <TvIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Book Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

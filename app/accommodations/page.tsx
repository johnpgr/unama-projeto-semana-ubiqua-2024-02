import Image from "next/image"
import Placeholder from "~/assets/placeholder.svg"
import { Filters } from "./filters"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { CoffeeIcon, TvIcon, WifiIcon } from "lucide-react"

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

export const dynamic = "force-static"

export default function AccommodationsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Acomodações Disponíveis</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Filters />
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
                    R${accommodation.price}{" "}
                    <span className="text-sm font-normal">por noite</span>
                  </p>
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span>{accommodation.rating}</span>
                  </div>
                  <div className="flex space-x-2">
                    {accommodation.amenities.includes("WiFi") && (
                      <WifiIcon className="h-5 w-5 text-gray-500" />
                    )}
                    {accommodation.amenities.includes("Cafeteira") && (
                      <CoffeeIcon className="h-5 w-5 text-gray-500" />
                    )}
                    {accommodation.amenities.includes("TV") && (
                      <TvIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Reservar Agora</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

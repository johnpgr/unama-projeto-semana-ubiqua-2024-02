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
import { Card, CardContent } from "~/components/ui/card"
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

export function SearchForm() {
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [guestCount, setGuestCount] = useState<number>()

  return (
    <Card className="max-w-5xl mx-auto">
      <CardContent className="pt-6">
        <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location">Localização</Label>
            <div className="relative">
              <MapPinIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                placeholder="Para onde você vai?"
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
                    <span>Escolha uma data</span>
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
                    <span>Escolha uma data</span>
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
            <Label htmlFor="guests">Hóspedes</Label>
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
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Hóspede</SelectItem>
                  <SelectItem value="2">2 Hóspedes</SelectItem>
                  <SelectItem value="3">3 Hóspedes</SelectItem>
                  <SelectItem value="4">4+ Hóspedes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="md:col-span-4">Buscar Acomodações</Button>
        </form>
      </CardContent>
    </Card>
  )
}

"use client";

import { useState } from "react";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Slider } from "~/components/ui/slider";
import {
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "~/lib/utils";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

export function Filters() {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guestCount, setGuestCount] = useState<number>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtros</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="location">Localização</Label>
          <div className="relative">
            <MapPinIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="location"
              placeholder="Digite a localização"
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
                <CalendarIcon className="mr-2 h-4 w-4" />
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
        <div className="space-y-2">
          <Label>Faixa de Preço</Label>
          <Slider
            min={0}
            max={500}
            step={10}
            value={priceRange}
            onValueChange={setPriceRange}
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>R${priceRange[0]}</span>
            <span>R${priceRange[1]}</span>
          </div>
        </div>
        <Button className="w-full">Aplicar Filtros</Button>
      </CardContent>
    </Card>
  );
}

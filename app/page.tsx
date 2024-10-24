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
        <h2 className="text-4xl font-bold mb-4">Encontre a Estadia Perfeita</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Descubra uma ampla gama de acomodações para sua próxima aventura
        </p>
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
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6">Acomodações em Destaque</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <Image
                src={Placeholder.src}
                width={Placeholder.width}
                height={Placeholder.height}
                alt="Acomodação"
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle>Suíte de Luxo {i}</CardTitle>
                <CardDescription>Centro da Cidade, Nova York</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  A partir de $199 por noite
                </p>
                <Button variant="outline" className="w-full">
                  Ver Detalhes
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-bold mb-6">Por que Escolher LodgeEase?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Ampla Seleção</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Escolha entre hotéis, aluguéis de temporada e acomodações únicas
                em todo o mundo.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Garantia do Melhor Preço</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Encontrou um preço mais baixo? Nós igualamos e damos um desconto
                adicional de 10%.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Suporte ao Cliente 24/7</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Nossa equipe dedicada está sempre aqui para ajudar com qualquer
                dúvida ou preocupação.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>

  )
}

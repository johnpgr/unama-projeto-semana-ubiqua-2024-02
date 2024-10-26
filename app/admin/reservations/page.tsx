"use client"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"

export default function ReservationsPage() {
  const [checkIns, setCheckIns] = useState([
    { id: 1, name: "John Doe", accommodation: "Grand Hotel", room: "101" },
    { id: 2, name: "Jane Smith", accommodation: "Cruise Ship A", room: "A22" },
  ])

  const [checkOuts, setCheckOuts] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      accommodation: "Community Center",
      room: "5",
    },
    { id: 2, name: "Bob Williams", accommodation: "Grand Hotel", room: "205" },
  ])

  const handleCheckIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const handleCheckOut = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <>
      <Tabs defaultValue="check-in">
        <div className="flex items-center w-full justify-between mb-4">
          <h1 className="text-2xl font-semibold">Controle de Reservas</h1>
          <TabsList>
            <TabsTrigger value="check-in">Check-in</TabsTrigger>
            <TabsTrigger value="check-out">Check-out</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="check-in">
          <Card>
            <CardHeader>
              <CardTitle>Check-in</CardTitle>
              <CardDescription>Buscar check-ins de hóspedes</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCheckIn} className="space-y-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="guest-name">Nome do Hóspede</Label>
                  <Input
                    id="guest-name"
                    placeholder="Digite o nome do hóspede"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reservation-id">ID da Reserva</Label>
                  <Input
                    id="reservation-id"
                    placeholder="Digite o ID da reserva"
                    required
                  />
                </div>
                <Button type="submit">Buscar Check-in</Button>
              </form>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome do Hóspede</TableHead>
                    <TableHead>Acomodação</TableHead>
                    <TableHead>Quarto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {checkIns.map((checkIn) => (
                    <TableRow key={checkIn.id}>
                      <TableCell>{checkIn.name}</TableCell>
                      <TableCell>{checkIn.accommodation}</TableCell>
                      <TableCell>{checkIn.room}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="check-out">
          <Card>
            <CardHeader>
              <CardTitle>Check-out</CardTitle>
              <CardDescription>Buscar check-outs de hóspedes</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCheckOut} className="space-y-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="guest-name-out">Nome do Hóspede</Label>
                  <Input
                    id="guest-name-out"
                    placeholder="Digite o nome do hóspede"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room-number">Número do Quarto</Label>
                  <Input
                    id="room-number"
                    placeholder="Digite o número do quarto"
                    required
                  />
                </div>
                <Button type="submit">Buscar Check-out</Button>
              </form>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome do Hóspede</TableHead>
                    <TableHead>Acomodação</TableHead>
                    <TableHead>Quarto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {checkOuts.map((checkOut) => (
                    <TableRow key={checkOut.id}>
                      <TableCell>{checkOut.name}</TableCell>
                      <TableCell>{checkOut.accommodation}</TableCell>
                      <TableCell>{checkOut.room}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}

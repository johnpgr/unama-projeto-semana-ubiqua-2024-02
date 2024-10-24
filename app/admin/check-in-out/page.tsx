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

export default function CheckInOut() {
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
    // Add logic to handle check-in
  }

  const handleCheckOut = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Add logic to handle check-out
  }

  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">
        Check-in / Check-out Control
      </h1>
      <Tabs defaultValue="check-in">
        <TabsList>
          <TabsTrigger value="check-in">Check-in</TabsTrigger>
          <TabsTrigger value="check-out">Check-out</TabsTrigger>
        </TabsList>
        <TabsContent value="check-in">
          <Card>
            <CardHeader>
              <CardTitle>Check-in</CardTitle>
              <CardDescription>Process new guest check-ins</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCheckIn} className="space-y-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="guest-name">Guest Name</Label>
                  <Input
                    id="guest-name"
                    placeholder="Enter guest name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reservation-id">Reservation ID</Label>
                  <Input
                    id="reservation-id"
                    placeholder="Enter reservation ID"
                    required
                  />
                </div>
                <Button type="submit">Process Check-in</Button>
              </form>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Guest Name</TableHead>
                    <TableHead>Accommodation</TableHead>
                    <TableHead>Room</TableHead>
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
              <CardDescription>Process guest check-outs</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCheckOut} className="space-y-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="guest-name-out">Guest Name</Label>
                  <Input
                    id="guest-name-out"
                    placeholder="Enter guest name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room-number">Room Number</Label>
                  <Input
                    id="room-number"
                    placeholder="Enter room number"
                    required
                  />
                </div>
                <Button type="submit">Process Check-out</Button>
              </form>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Guest Name</TableHead>
                    <TableHead>Accommodation</TableHead>
                    <TableHead>Room</TableHead>
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

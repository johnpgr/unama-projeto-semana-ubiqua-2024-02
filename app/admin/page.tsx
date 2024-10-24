import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import {
    BedDouble,
    CalendarDays,
    CreditCard, Users
} from "lucide-react"
import { OccupancyCharts } from "./charts"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Badge } from "~/components/ui/badge"

const chartData = [
  { name: "Hotel", total: 80 },
  { name: "Ship", total: 65 },
  { name: "School", total: 45 },
  { name: "Community", total: 70 },
]

const recentReservations = [
  {
    id: 1,
    guest: "Alice Johnson",
    accommodation: "Luxury Suite",
    checkIn: "2024-03-15",
    checkOut: "2024-03-20",
    status: "Confirmed",
  },
  {
    id: 2,
    guest: "Bob Smith",
    accommodation: "Cozy Cabin",
    checkIn: "2024-03-16",
    checkOut: "2024-03-18",
    status: "Pending",
  },
  {
    id: 3,
    guest: "Charlie Brown",
    accommodation: "Beachfront Villa",
    checkIn: "2024-03-17",
    checkOut: "2024-03-22",
    status: "Confirmed",
  },
  {
    id: 4,
    guest: "Diana Prince",
    accommodation: "City Apartment",
    checkIn: "2024-03-18",
    checkOut: "2024-03-21",
    status: "Cancelled",
  },
  {
    id: 5,
    guest: "Ethan Hunt",
    accommodation: "Mountain Chalet",
    checkIn: "2024-03-19",
    checkOut: "2024-03-23",
    status: "Confirmed",
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Accommodations
            </CardTitle>
            <BedDouble className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">254</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Reservations
            </CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-xs text-muted-foreground">+22% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Current Occupancy
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">+5% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$54,231</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Reservations</CardTitle>
            <CardDescription>
              Latest bookings across all accommodations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Guest</TableHead>
                  <TableHead>Accommodation</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead>Check-out</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentReservations.map((reservation) => (
                  <TableRow key={reservation.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={`/placeholder.svg?height=32&width=32`}
                            alt={reservation.guest}
                          />
                          <AvatarFallback>
                            {reservation.guest
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span>{reservation.guest}</span>
                      </div>
                    </TableCell>
                    <TableCell>{reservation.accommodation}</TableCell>
                    <TableCell>{reservation.checkIn}</TableCell>
                    <TableCell>{reservation.checkOut}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          reservation.status === "Confirmed"
                            ? "default"
                            : reservation.status === "Pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {reservation.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Occupancy Trend</CardTitle>
            <CardDescription>7-day occupancy rate trend</CardDescription>
          </CardHeader>
          <CardContent>
            <OccupancyCharts data={chartData} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


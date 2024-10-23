"use client"
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
import { OccupancyCharts } from "./_components/charts"

export default function OccupancyPage() {
  const data = [
    { name: "Hotel", total: 80 },
    { name: "Ship", total: 65 },
    { name: "School", total: 45 },
    { name: "Community", total: 70 },
  ]
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">
        Occupancy Management
      </h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Occupancy Overview</CardTitle>
            <CardDescription>
              Current occupancy rates by accommodation type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <OccupancyCharts data={data}/>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Occupancy Details</CardTitle>
            <CardDescription>
              Detailed view of occupancy by accommodation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Accommodation</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Occupancy</TableHead>
                  <TableHead>Available</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Grand Hotel</TableCell>
                  <TableCell>Hotel</TableCell>
                  <TableCell>85%</TableCell>
                  <TableCell>15 rooms</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cruise Ship A</TableCell>
                  <TableCell>Ship</TableCell>
                  <TableCell>70%</TableCell>
                  <TableCell>600 cabins</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>University Dorms</TableCell>
                  <TableCell>School</TableCell>
                  <TableCell>50%</TableCell>
                  <TableCell>500 beds</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Community Hall</TableCell>
                  <TableCell>Community Center</TableCell>
                  <TableCell>60%</TableCell>
                  <TableCell>80 spaces</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

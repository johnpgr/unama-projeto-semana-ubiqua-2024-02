import { Button } from "~/components/ui/button"
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
import { NewAccommodationForm } from "./new-accommodation-form"
import { createAccommodationAction } from "~/features/accommodations/accommodation.actions"
import { db } from "~/database"

// export const runtime = "edge"

export default async function AccommodationsPage() {
  const accommodations = await db.query.Accommodation.findMany({
    with: { address: true },
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Accommodations</h1>
        <NewAccommodationForm action={createAccommodationAction}/>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Accommodations</CardTitle>
          <CardDescription>
            Manage your registered accommodations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accommodations.map((acc) => (
                <TableRow key={acc.id}>
                  <TableCell>{acc.name}</TableCell>
                  <TableCell>{acc.type}</TableCell>
                  <TableCell>{acc.capacity}</TableCell>
                  <TableCell>{acc.address!.street}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

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
import { Accommodation } from "~/database/schema"
import { desc } from "drizzle-orm"

export const runtime = "edge"

export default async function AccommodationsPage() {
  const accommodations = await db.query.Accommodation.findMany({
    with: { address: true },
    orderBy: desc(Accommodation.createdAt),
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Acomodações</h1>
        <NewAccommodationForm />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Todas as Acomodações</CardTitle>
          <CardDescription>
            Gerencie suas acomodações registradas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Capacidade</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Ações</TableHead>
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
                      Editar
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

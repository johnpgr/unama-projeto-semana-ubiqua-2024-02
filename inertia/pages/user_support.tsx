import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MapPin } from 'lucide-react'
import Layout from '@/components/layout'

SupportPage.layout = (page: React.ReactNode) => (
  <Layout title="Visitor Support" children={page} />
)

export default function SupportPage() {
  const [attractions, setAttractions] = useState([
    { id: 1, name: 'City Museum', distance: '0.5 km', rating: 4.5 },
    { id: 2, name: 'Central Park', distance: '1.2 km', rating: 4.8 },
    { id: 3, name: 'Shopping Mall', distance: '2.0 km', rating: 4.2 },
  ])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Visitor Support</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Support Request</CardTitle>
            <CardDescription>Submit a support request or inquiry</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Enter your message or inquiry" required />
              </div>
              <Button type="submit">Submit Request</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Nearby Attractions</CardTitle>
            <CardDescription>Popular attractions near your accommodation</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Attraction</TableHead>
                  <TableHead>Distance</TableHead>
                  <TableHead>Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attractions.map((attraction) => (
                  <TableRow key={attraction.id}>
                    <TableCell>{attraction.name}</TableCell>
                    <TableCell>{attraction.distance}</TableCell>
                    <TableCell>{attraction.rating}/5</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                <MapPin className="mr-2 h-4 w-4" />
                View Full Map
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

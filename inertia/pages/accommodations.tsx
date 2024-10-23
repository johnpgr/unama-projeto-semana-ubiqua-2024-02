import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { PlusCircle, Building2, Ship, School, Users } from "lucide-react"
import Accommodation from "#models/accommodation"
import Layout from "@/components/layout"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"

AccommodationsPage.layout = (page: React.ReactNode) => (
  <Layout children={page} title="Manage accommodations" />
)
export default function AccommodationsPage({
  accommodations,
}: {
  accommodations: Accommodation[]
}) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    capacity: "",
    location: "",
  })
  const isMobile = useMediaQuery('(max-width: 640px)')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Add logic to handle form submission
    console.log("Form submitted:", formData)
    // Reset form after submission
    setFormData({ name: "", type: "", capacity: "", location: "" })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prevData) => ({ ...prevData, type: value }))
  }

  const FormContent = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Accommodation Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter accommodation name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="type">Type</Label>
        <Select onValueChange={handleSelectChange} required>
          <SelectTrigger id="type">
            <SelectValue placeholder="Select accommodation type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hotel">
              <span className="flex items-center">
                <Building2 className="mr-2 h-4 w-4" />
                Hotel
              </span>
            </SelectItem>
            <SelectItem value="ship">
              <span className="flex items-center">
                <Ship className="mr-2 h-4 w-4" />
                Ship
              </span>
            </SelectItem>
            <SelectItem value="school">
              <span className="flex items-center">
                <School className="mr-2 h-4 w-4" />
                School
              </span>
            </SelectItem>
            <SelectItem value="community-center">
              <span className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Community Center
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="capacity">Capacity</Label>
        <Input
          id="capacity"
          name="capacity"
          type="number"
          placeholder="Enter total capacity"
          value={formData.capacity}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          placeholder="Enter location"
          value={formData.location}
          onChange={handleInputChange}
          required
        />
      </div>
    </form>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Accommodations</h1>
        {isMobile ? (
          <Drawer>
            <DrawerTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Accommodation
              </Button>
            </DrawerTrigger>
            <DrawerContent className="px-4">
              <DrawerHeader>
                <DrawerTitle>Add New Accommodation</DrawerTitle>
                <DrawerDescription>
                  Enter the details of the new accommodation
                </DrawerDescription>
              </DrawerHeader>
              <FormContent />
              <DrawerFooter className="px-0">
                <DrawerClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DrawerClose>
                <Button type="submit" form="add-accommodation-form">
                  Add Accommodation
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        ) : (
          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Accommodation
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="space-y-6">
              <SheetHeader>
                <SheetTitle>Add New Accommodation</SheetTitle>
                <SheetDescription>
                  Enter the details of the new accommodation
                </SheetDescription>
              </SheetHeader>
              <FormContent />
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </SheetClose>
                <Button type="submit" form="add-accommodation-form">
                  Add Accommodation
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        )}
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
                  <TableCell>{acc.address.street}</TableCell>
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

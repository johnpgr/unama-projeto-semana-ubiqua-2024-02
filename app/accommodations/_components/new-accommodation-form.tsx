"use client"

import { Building2, PlusCircle, School, Ship, Users } from "lucide-react"
import React from "react"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { useMediaQuery } from "~/hooks/use-media-query"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose,
} from "~/components/ui/sheet"
import { Button } from "~/components/ui/button"

export function NewAccommodationForm() {
  const isMobile = useMediaQuery("(max-width: 640px)")
  const [formData, setFormData] = React.useState({
    name: "",
    type: "",
    capacity: "",
    location: "",
  })
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
    <>
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
    </>
  )
}

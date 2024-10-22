import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Building2, Ship, School, Users, Home, CalendarDays, ClipboardList } from 'lucide-react'
import { Link } from '@inertiajs/react'

export default function HostingManagementSystem() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Home className="h-6 w-6" />
          <span className="sr-only">Hosting Management System</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Dashboard
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Manage Hostings
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Reservations
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Reports
          </Link>
        </nav>
      </header>
      <main>
        <section className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="dashboard" className="max-w-screen-sm mx-auto w-full">
              <TabsList>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="manage-hostings">Manage Hostings</TabsTrigger>
                <TabsTrigger value="reservations">Reservations</TabsTrigger>
              </TabsList>
              <TabsContent value="dashboard">
                <Card>
                  <CardHeader>
                    <CardTitle>Dashboard</CardTitle>
                    <CardDescription>Overview of your hosting management system</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Total Hostings</CardTitle>
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">245</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Active Reservations</CardTitle>
                          <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">89</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Available Rooms</CardTitle>
                          <ClipboardList className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">1,234</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                          >
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                          </svg>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">$45,231.89</div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="manage-hostings">
                <Card>
                  <CardHeader>
                    <CardTitle>Manage Hostings</CardTitle>
                    <CardDescription>
                      Register and manage different types of hostings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="hosting-type">Hosting Type</Label>
                        <Select>
                          <SelectTrigger id="hosting-type">
                            <SelectValue placeholder="Select hosting type" />
                          </SelectTrigger>
                          <SelectContent position="popper">
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
                        <Label htmlFor="hosting-name">Hosting Name</Label>
                        <Input id="hosting-name" placeholder="Enter hosting name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="capacity">Capacity</Label>
                        <Input id="capacity" placeholder="Enter capacity" type="number" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" placeholder="Enter address" />
                      </div>
                      <Button type="submit">Register Hosting</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reservations">
                <Card>
                  <CardHeader>
                    <CardTitle>Reservations</CardTitle>
                    <CardDescription>Check-in to available hostings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="hosting">Select Hosting</Label>
                        <Select>
                          <SelectTrigger id="hosting">
                            <SelectValue placeholder="Select a hosting" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="grand-hotel">Grand Hotel</SelectItem>
                            <SelectItem value="cruise-ship">Cruise Ship</SelectItem>
                            <SelectItem value="university-dorm">University Dorm</SelectItem>
                            <SelectItem value="community-hall">Community Hall</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-4">
                        <div>
                          <Label>Check-in Date</Label>
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border w-fit"
                          />
                        </div>
                        <div>
                          <Label>Check-out Date</Label>
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border w-fit"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="guests">Number of Guests</Label>
                        <Input id="guests" placeholder="Enter number of guests" type="number" />
                      </div>
                      <Button type="submit">Make Reservation</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
    </div>
  )
}

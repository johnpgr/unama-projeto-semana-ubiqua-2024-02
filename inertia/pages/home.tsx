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
import {
  Building2,
  Ship,
  School,
  Users,
  Home,
  CalendarDays,
  ClipboardList,
  DollarSign,
} from 'lucide-react'
import { Link } from '@inertiajs/react'

export default function HostingManagementSystem() {
  const [checkInDate, setCheckInDate] = useState(new Date())
  const [checkOutDate, setCheckOutDate] = useState(new Date())

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Home className="h-6 w-6" />
          <span className="sr-only">Sistema de Gerenciamento de Hospedagem</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Painel
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Gerenciar Hospedagens
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Reservas
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Relatórios
          </Link>
        </nav>
      </header>
      <main>
        <section className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="painel" className="max-w-screen-sm mx-auto w-full">
              <TabsList>
                <TabsTrigger value="painel">Painel</TabsTrigger>
                <TabsTrigger value="gerenciar-hospedagens">Gerenciar Hospedagens</TabsTrigger>
                <TabsTrigger value="reservas">Reservas</TabsTrigger>
              </TabsList>
              <TabsContent value="painel">
                <Card>
                  <CardHeader>
                    <CardTitle>Painel</CardTitle>
                    <CardDescription>
                      Visão geral do seu sistema de gerenciamento de hospedagem
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            Total de Hospedagens
                          </CardTitle>
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">245</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Reservas Ativas</CardTitle>
                          <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">89</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Quartos Disponíveis</CardTitle>
                          <ClipboardList className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">1,234</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">$45,231.89</div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="gerenciar-hospedagens">
                <Card>
                  <CardHeader>
                    <CardTitle>Gerenciar Hospedagens</CardTitle>
                    <CardDescription>
                      Registre e gerencie diferentes tipos de hospedagens
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="tipo-hospedagem">Tipo de Hospedagem</Label>
                        <Select>
                          <SelectTrigger id="tipo-hospedagem">
                            <SelectValue placeholder="Selecione o tipo de hospedagem" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="hotel">
                              <span className="flex items-center">
                                <Building2 className="mr-2 h-4 w-4" />
                                Hotel
                              </span>
                            </SelectItem>
                            <SelectItem value="navio">
                              <span className="flex items-center">
                                <Ship className="mr-2 h-4 w-4" />
                                Navio
                              </span>
                            </SelectItem>
                            <SelectItem value="escola">
                              <span className="flex items-center">
                                <School className="mr-2 h-4 w-4" />
                                Escola
                              </span>
                            </SelectItem>
                            <SelectItem value="centro-comunitario">
                              <span className="flex items-center">
                                <Users className="mr-2 h-4 w-4" />
                                Centro Comunitário
                              </span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nome-hospedagem">Nome da Hospedagem</Label>
                        <Input id="nome-hospedagem" placeholder="Digite o nome da hospedagem" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="capacidade">Capacidade</Label>
                        <Input id="capacidade" placeholder="Digite a capacidade" type="number" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endereco">Endereço</Label>
                        <Input id="endereco" placeholder="Digite o endereço" />
                      </div>
                      <Button type="submit">Registrar Hospedagem</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reservas">
                <Card>
                  <CardHeader>
                    <CardTitle>Reservas</CardTitle>
                    <CardDescription>Check-in em hospedagens disponíveis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="hospedagem">Selecione a Hospedagem</Label>
                        <Select>
                          <SelectTrigger id="hospedagem">
                            <SelectValue placeholder="Selecione uma hospedagem" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="grand-hotel">Grand Hotel</SelectItem>
                            <SelectItem value="cruise-ship">Navio de Cruzeiro</SelectItem>
                            <SelectItem value="university-dorm">
                              Dormitório Universitário
                            </SelectItem>
                            <SelectItem value="community-hall">Salão Comunitário</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-4">
                        <div>
                          <Label>Data de Check-in</Label>
                          <Calendar
                            mode="single"
                            selected={checkInDate}
                            onSelect={setCheckInDate}
                            className="rounded-md border w-fit"
                          />
                        </div>
                        <div>
                          <Label>Data de Check-out</Label>
                          <Calendar
                            mode="single"
                            selected={checkOutDate}
                            onSelect={setCheckOutDate}
                            className="rounded-md border w-fit"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hospedes">Número de Hóspedes</Label>
                        <Input
                          id="hospedes"
                          placeholder="Digite o número de hóspedes"
                          type="number"
                        />
                      </div>
                      <Button type="submit">Fazer Reserva</Button>
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

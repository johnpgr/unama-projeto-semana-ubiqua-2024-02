'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Calendar } from "~/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { ChevronDown, CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "~/lib/utils"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const paymentsData = [
  { id: 1, date: "2024-03-01", amount: 150.00, method: "Cartão de Crédito", status: "Concluído" },
  { id: 2, date: "2024-03-02", amount: 200.50, method: "PayPal", status: "Concluído" },
  { id: 3, date: "2024-03-03", amount: 175.25, method: "Transferência Bancária", status: "Pendente" },
  { id: 4, date: "2024-03-04", amount: 300.00, method: "Cartão de Crédito", status: "Concluído" },
  { id: 5, date: "2024-03-05", amount: 125.75, method: "PayPal", status: "Falhou" },
]

const chartData = [
  { name: 'Janeiro', total: 1200 },
  { name: 'Fevereiro', total: 1900 },
  { name: 'Março', total: 2400 },
  { name: 'Abril', total: 1800 },
  { name: 'Maio', total: 2800 },
  { name: 'Junho', total: 3200 },
]

export default function PaymentsDashboard() {
  const [date, setDate] = useState<Date>()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Painel de Pagamentos</h1>
        <div className="flex space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[200px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Escolha uma data</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Select>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Método de Pagamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Métodos</SelectItem>
              <SelectItem value="credit-card">Cartão de Crédito</SelectItem>
              <SelectItem value="paypal">PayPal</SelectItem>
              <SelectItem value="bank-transfer">Transferência Bancária</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$12.345,67</div>
            <p className="text-xs text-muted-foreground">+20,1% desde o mês passado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transações Bem-Sucedidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.234</div>
            <p className="text-xs text-muted-foreground">+15% desde o mês passado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Médio da Transação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$123,45</div>
            <p className="text-xs text-muted-foreground">+5% desde o mês passado</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Receita ao Longo do Tempo</CardTitle>
          <CardDescription>Receita mensal para o ano atual</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pagamentos Recentes</CardTitle>
          <CardDescription>Uma lista dos pagamentos mais recentes</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Método</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentsData.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>R${payment.amount.toFixed(2)}</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        payment.status === 'Concluído' ? 'default' :
                        payment.status === 'Pendente' ? 'secondary' :
                        'destructive'
                      }
                    >
                      {payment.status}
                    </Badge>
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

"use client"

import {
  Building,
  Building2,
  Cuboid,
  PlusCircle,
  Ship,
  Volleyball,
} from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { Input } from "~/components/ui/input"
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
import { AccommodationType } from "~/database/schema"
import { createAccommodationAction } from "~/features/accommodations/accommodation.actions"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CreateAccommodationSchema } from "~/features/accommodations/accommodation.validation"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { useRouter } from "next/navigation"

const iconClasses = "mr-2 h-4 w-4"
const accommodationTypeIcons: Record<string, React.ReactNode> = {
  [AccommodationType.Hotel]: <Building2 className={iconClasses} />,
  [AccommodationType.Ship]: <Ship className={iconClasses} />,
  [AccommodationType.Hostel]: <Building className={iconClasses} />,
  [AccommodationType.Resort]: <Volleyball className={iconClasses} />,
  [AccommodationType.Adapted]: <Cuboid className={iconClasses} />,
}

const accommodationTypesPTBR: Record<string, string> = {
  [AccommodationType.Hotel]: "Hotel",
  [AccommodationType.Ship]: "Navio",
  [AccommodationType.Hostel]: "Hostel",
  [AccommodationType.Resort]: "Resort",
  [AccommodationType.Adapted]: "Adaptado",
}

const FormContent = (props: {
  toggleOpen: () => void
  children: React.ReactNode
}) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof CreateAccommodationSchema>>({
    resolver: zodResolver(CreateAccommodationSchema),
    criteriaMode: "all",
  })

  async function onSubmit(data: z.infer<typeof CreateAccommodationSchema>) {
    try {
      await createAccommodationAction(data)
      router.refresh()
      props.toggleOpen()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Acomodação</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome da acomodação" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de acomodação</FormLabel>
              <FormControl>
                <Select
                  required
                  value={field.value}
                  name={field.name}
                  onValueChange={(v) => {
                    field.onChange(v)
                  }}
                >
                  <SelectTrigger id={field.name}>
                    <SelectValue placeholder="Selecione o tipo de acomodação" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(accommodationTypeIcons).map((type) => (
                      <SelectItem key={type} value={type}>
                        <span className="flex items-center">
                          {accommodationTypeIcons[type]}
                          {accommodationTypesPTBR[type]}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacidade</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  required
                  placeholder="Digite a capacidade total"
                  {...field}
                  onChange={(e) => field.onChange(+e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Price of the accommodation */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  required
                  placeholder="Digite o preço da acomodação"
                  {...field}
                  onChange={(e) => field.onChange(+e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="font-bold pt-4">Endereço</p>
        <FormField
          control={form.control}
          name="address.street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rua</FormLabel>
              <FormControl>
                <Input placeholder="Digite o endereço da rua" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address.city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input placeholder="Digite a cidade" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address.postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <Input placeholder="Digite o CEP" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {props.children}
      </form>
    </Form>
  )
}

export function NewAccommodationForm() {
  const isMobile = useMediaQuery("(max-width: 640px)")
  const [isOpen, setIsOpen] = React.useState(false)

  function toggleOpen() {
    setIsOpen((prev) => !prev)
  }

  return (
    <>
      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={toggleOpen}>
          <DrawerTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nova Acomodação
            </Button>
          </DrawerTrigger>
          <DrawerContent className="px-4">
            <DrawerHeader>
              <DrawerTitle>Criar Nova Acomodação</DrawerTitle>
              <DrawerDescription>
                Insira os detalhes da nova acomodação
              </DrawerDescription>
            </DrawerHeader>
            <FormContent toggleOpen={toggleOpen}>
              <DrawerFooter className="px-0">
                <DrawerClose asChild>
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                </DrawerClose>
                <Button type="submit">Criar Acomodação</Button>
              </DrawerFooter>
            </FormContent>
          </DrawerContent>
        </Drawer>
      ) : (
        <Sheet open={isOpen} onOpenChange={toggleOpen}>
          <SheetTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Criar Acomodação
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="overflow-y-auto space-y-6">
            <SheetHeader>
              <SheetTitle>Criar Nova Acomodação</SheetTitle>
              <SheetDescription>
                Insira os detalhes da nova acomodação
              </SheetDescription>
            </SheetHeader>
            <FormContent toggleOpen={toggleOpen}>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                </SheetClose>
                <Button type="submit">Criar Acomodação</Button>
              </SheetFooter>
            </FormContent>
          </SheetContent>
        </Sheet>
      )}
    </>
  )
}

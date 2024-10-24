import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import Link from "next/link"
import { LogOut, Menu, Settings, Shield } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { UserRole } from "~/database/schema"
import { auth, signOutAction } from "~/lib/auth"
import { Suspense } from "react"

export function SignoutButton() {
  return (
    <form action={signOutAction}>
      <DropdownMenuItem asChild>
        <button type="submit" className="w-full cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </button>
      </DropdownMenuItem>
    </form>
  )
}

async function UserSection() {
  const session = await auth()
  const user = session?.user

  return (
    <>
      {user ? (
        <>
          <div className="hidden md:flex pl-8 items-center justify-end md:flex-1 lg:w-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image ?? ""} alt={user.name!} />
                    <AvatarFallback>
                      {user
                        .name!.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                {user.role === UserRole.Admin ? (
                  <DropdownMenuItem>
                    <Shield className="mr-2 h-4 w-4" />
                    <Link href="/admin">Painel de Administração</Link>
                  </DropdownMenuItem>
                ) : null}
                <SignoutButton />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Abrir menu</span>
                  <Menu className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <SignoutButton />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      ) : (
        <li>
          <Link href="/login">Entrar</Link>
        </li>
      )}
    </>
  )
}

export function Header() {
  return (
    <header className="bg-accent shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold">EasyLodge</h1>
        </Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link href="/accommodations">Encontre Acomodações</Link>
            </li>
            <li>
              <Link href="/about">Sobre Nós</Link>
            </li>
            <li>
              <Link href="/contact">Contato</Link>
            </li>
            <Suspense fallback={}>
              <UserSection />
            </Suspense>
          </ul>
        </nav>
      </div>
    </header>
  )
}

import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import {
  BedDouble,
  CalendarDays,
  CreditCard,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
} from "lucide-react"
import Image from "next/image"
import Placeholder from "~/assets/placeholder.svg"
import { Nav,MobileNav } from "./Nav"
import { auth } from "~/lib/auth"
import { notFound } from "next/navigation"
import { UserRole } from "~/database/schema"

const navItemClasses = "h-5 w-5 mr-2"

const navItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: <LayoutDashboard className={navItemClasses} />,
  },
  {
    name: "Accommodations",
    href: "/admin/accommodations",
    icon: <BedDouble className={navItemClasses} />,
  },
  {
    name: "Reservations",
    href: "/admin/reservations",
    icon: <CalendarDays className={navItemClasses} />,
  },
  {
    name: "Occupancy",
    href: "/admin/occupancy",
    icon: <Users className={navItemClasses} />,
  },
  {
    name: "Payments",
    href: "/admin/payments",
    icon: <CreditCard className={navItemClasses} />,
  },
  {
    name: "Support",
    href: "/admin/support",
    icon: <HelpCircle className={navItemClasses} />,
  },
]
export type NavItem = (typeof navItems)[number]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (session?.user?.role !== UserRole.Admin) return notFound()

  return (
    <div className="min-h-screen">
      <header className="bg-accent/50 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
            <Nav navItems={navItems} />
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Image
                      src={Placeholder.src}
                      width={Placeholder.width}
                      height={Placeholder.height}
                      alt="User avatar"
                      className="rounded-full"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <Menu className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <MobileNav navItems={navItems} />
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  )
}

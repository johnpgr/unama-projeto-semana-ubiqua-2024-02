import { Head, Link } from "@inertiajs/react"
import { Home, Building, Calendar, Users, LogIn, Map } from "lucide-react"

export default function Layout(props: {
  children: React.ReactNode
  title: string
}) {
  return (
    <>
      <Head title={props.title} />
      <div className="flex h-screen bg-gray-100">
        <aside className="w-64 bg-white shadow-md">
          <nav className="mt-5 px-2">
            <Link
              href="/"
              className="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-900 hover:bg-gray-50 hover:text-gray-900"
            >
              <Home className="mr-4 h-6 w-6" />
              Dashboard
            </Link>
            <Link
              href="/accommodations"
              className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Building className="mr-4 h-6 w-6" />
              Accommodations
            </Link>
            <Link
              href="/reservations"
              className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Calendar className="mr-4 h-6 w-6" />
              Reservations
            </Link>
            <Link
              href="/occupancy"
              className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Users className="mr-4 h-6 w-6" />
              Occupancy
            </Link>
            <Link
              href="/support"
              className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Map className="mr-4 h-6 w-6" />
              Visitor Support
            </Link>
          </nav>
        </aside>
        <main className="flex-1 overflow-y-auto p-5">{props.children}</main>
      </div>
    </>
  )
}
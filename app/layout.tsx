import "./globals.css"
import type { Metadata } from "next"
import { Header } from "./header"
import { Footer } from "./footer"
import { auth } from "~/lib/auth"

export const metadata: Metadata = {
  title: "EasyLodge",
  description: "UNAMA Projeto Hackaton Semana Ubiqua 2024_02",
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <html lang="en">
      <body>
        <Header session={session} />
        {children}
        <Footer />
      </body>
    </html>
  )
}

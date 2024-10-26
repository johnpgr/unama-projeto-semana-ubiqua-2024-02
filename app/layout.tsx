import "./globals.css"
import type { Metadata } from "next"
import { Header } from "./_components/header"
import { Footer } from "./_components/footer"
import { Toaster } from "~/components/ui/sonner"

export const metadata: Metadata = {
  title: "EasyLodge",
  description: "UNAMA Projeto Hackaton Semana Ubiqua 2024_02",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Header />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}

import "./globals.css"
import type { Metadata } from "next"
import { Header } from "./header"
import { Footer } from "./footer"

export const metadata: Metadata = {
  title: "EasyLodge",
  description: "UNAMA Projeto Hackaton Semana Ubiqua 2024_02",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

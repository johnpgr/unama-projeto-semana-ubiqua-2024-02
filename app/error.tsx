"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { AlertTriangle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-yellow-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Oops! Algo deu errado
          </CardTitle>
          <CardDescription className="text-center">
            Ocorreu um erro ao renderizar esta página.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 text-center mb-4">
            Pedimos desculpas pelo inconveniente. Nossa equipe foi notificada e
            está trabalhando para resolver o problema.
          </p>
          {process.env.NODE_ENV === "development" && (
            <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
              <h3 className="text-sm font-medium text-red-800">
                Detalhes do erro:
              </h3>
              <p className="text-sm text-red-700 mt-1">{error.message}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => reset()}>
            Tentar novamente
          </Button>
          <Button asChild>
            <Link href="/">Voltar para a página inicial</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

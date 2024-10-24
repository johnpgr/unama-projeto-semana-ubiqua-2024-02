import Image from "next/image"
import Placeholder from "~/assets/placeholder.svg"
import { SearchForm } from "./search"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"

export const dynamic = "force-static"
export const runtime = "edge"

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Encontre a Estadia Perfeita</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Descubra uma ampla gama de acomodações para sua próxima aventura
        </p>
        <SearchForm />
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6">Acomodações em Destaque</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <Image
                src={Placeholder.src}
                width={Placeholder.width}
                height={Placeholder.height}
                alt="Acomodação"
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle>Suíte de Luxo {i}</CardTitle>
                <CardDescription>Centro da Cidade, Nova York</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  A partir de $199 por noite
                </p>
                <Button variant="outline" className="w-full">
                  Ver Detalhes
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-bold mb-6">Por que Escolher EasyLodge?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Ampla Seleção</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Escolha entre hotéis, aluguéis de temporada e acomodações únicas
                em todo o mundo.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Garantia do Melhor Preço</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Encontrou um preço mais baixo? Nós igualamos e damos um desconto
                adicional de 10%.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Suporte ao Cliente 24/7</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Nossa equipe dedicada está sempre aqui para ajudar com qualquer
                dúvida ou preocupação.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}

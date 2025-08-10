import { Card, CardContent } from "@/components/ui/card"
import { Circle } from "lucide-react"

type ChainItem = {
  id: string
  name: string
  color: string
  subtitle: string
  tokens: number
}

const CHAINS: ChainItem[] = [
  { id: "c", name: "C Chain", color: "#EA5C5C", subtitle: "12 tokens", tokens: 12 },
  { id: "p", name: "P Chain", color: "#EA5C5C", subtitle: "12 tokens", tokens: 12 },
  { id: "x", name: "X Chain", color: "#EA5C5C", subtitle: "12 tokens", tokens: 12 },
  { id: "a", name: "A Chain", color: "#EA5C5C", subtitle: "12 tokens", tokens: 12 },
]

export default function ChainOverview({ items = CHAINS }: { items?: ChainItem[] }) {
  return (
    <section aria-labelledby="chain-overview-title">
      <h2 id="chain-overview-title" className="text-2xl font-bold tracking-tight">
        Chain Overview
      </h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((c) => (
          <Card key={c.id} className="border-white/5 bg-[#141419] hover:bg-[#1a1a20] transition-colors cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Circle className="h-3 w-3" style={{ color: c.color, fill: c.color }} aria-hidden="true" />
                <div className="text-xl font-semibold text-white">{c.name}</div>
              </div>
              <div className="mt-2 text-sm text-zinc-400">{c.subtitle}</div>
              <div className="mt-4 space-y-2">
                <div className="h-1 rounded-full bg-zinc-800">
                  <div className="h-full w-1/3 rounded-full bg-[#EA5C5C]" />
                </div>
                <div className="h-1 rounded-full bg-zinc-800">
                  <div className="h-full w-2/3 rounded-full bg-[#EA5C5C]" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

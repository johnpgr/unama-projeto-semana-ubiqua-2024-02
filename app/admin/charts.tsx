"use client"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { ChartContainer } from "~/components/ui/chart"

const chartConfig = {}

export function OccupancyCharts(props: {
  data: Array<{ name: string; total: number }>
}) {
  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <BarChart accessibilityLayer data={props.data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="total" className="fill-primary" />
      </BarChart>
    </ChartContainer>
  )
}

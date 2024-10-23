"use client"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

export function OccupancyCharts(props: {
  data: Array<{ name: string; total: number }>
}) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={props.data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="total" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, Bar, BarChart, Pie, PieChart, Cell, XAxis, YAxis, CartesianGrid } from "recharts"
import { cn } from "@/lib/utils"

interface ChartCardProps {
  title: string
  description: string
  type: "line" | "bar" | "donut"
  data: any[]
  className?: string
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export function ChartCard({ title, description, type, data, className }: ChartCardProps) {
  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <ChartContainer
            config={{
              value: {
                label: "Revenue",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px]"
          >
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--color-value)"
                strokeWidth={2}
                dot={{ fill: "var(--color-value)" }}
              />
            </LineChart>
          </ChartContainer>
        )

      case "bar":
        return (
          <ChartContainer
            config={{
              value: {
                label: "Users",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill="var(--color-value)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        )

      case "donut":
        return (
          <ChartContainer
            config={{
              value: {
                label: "Conversions",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[300px]"
          >
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        )

      default:
        return null
    }
  }

  return (
    <Card className={cn("transition-all duration-200 hover:shadow-md", className)}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{renderChart()}</CardContent>
    </Card>
  )
}

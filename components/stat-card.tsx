"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Users, Target, Activity } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: "dollar" | "users" | "target" | "trending"
  className?: string
}

const iconMap = {
  dollar: DollarSign,
  users: Users,
  target: Target,
  trending: Activity,
}

export function StatCard({ title, value, change, trend, icon, className }: StatCardProps) {
  const Icon = iconMap[icon]
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown

  return (
    <Card className={cn("transition-all duration-200 hover:shadow-md hover:-translate-y-1", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-1 mt-1">
          <Badge variant={trend === "up" ? "default" : "destructive"} className="text-xs">
            <TrendIcon className="w-3 h-3 mr-1" />
            {change}
          </Badge>
          <span className="text-xs text-muted-foreground">vs last period</span>
        </div>
      </CardContent>
    </Card>
  )
}

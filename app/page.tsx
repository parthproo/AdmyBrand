"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { StatCard } from "@/components/stat-card"
import { ChartCard } from "@/components/chart-card"
import { DataTable } from "@/components/data-table"
import { DateFilter } from "@/components/date-filter"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Zap } from "lucide-react"
import { mockCampaignData, mockChartData } from "@/lib/mock-data"

export default function Dashboard() {
  const [dateRange, setDateRange] = useState("7d")
  const [isLoading, setIsLoading] = useState(false)

  const handleExport = (format: "csv" | "pdf") => {
    setIsLoading(true)
    // Simulate export
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto p-6 space-y-8">
        {/* Live Status Badge */}
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="animate-pulse">
            <Zap className="w-3 h-3 mr-1 text-green-500" />
            Live Data
          </Badge>
        </div>

        {/* Overview Stats */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Revenue" value="$124,592" change="+12.5%" trend="up" icon="dollar" />
          <StatCard title="Active Users" value="8,549" change="+8.2%" trend="up" icon="users" />
          <StatCard title="Conversions" value="1,247" change="+15.3%" trend="up" icon="target" />
          <StatCard title="Growth %" value="23.8%" change="+2.1%" trend="up" icon="trending" />
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <ChartCard
            title="Revenue Over Time"
            description="Monthly revenue trends"
            type="line"
            data={mockChartData.revenue}
            className="xl:col-span-2"
          />
          <ChartCard
            title="Users by Channel"
            description="Traffic source breakdown"
            type="bar"
            data={mockChartData.channels}
          />
          <ChartCard
            title="Conversion Sources"
            description="Top performing sources"
            type="donut"
            data={mockChartData.sources}
            className="lg:col-span-2 xl:col-span-1"
          />
        </section>

        {/* Filters and Export */}
        <section className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-4">
            <DateFilter value={dateRange} onChange={setDateRange} />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleExport("csv")} disabled={isLoading}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExport("pdf")} disabled={isLoading}>
              <FileText className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </section>

        {/* Data Table */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable data={mockCampaignData} />
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}

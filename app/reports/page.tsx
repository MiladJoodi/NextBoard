"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { dashboardStats, transactions, orders } from "@/lib/data"
import { FileText, Download, TrendingUp, DollarSign, ShoppingCart, Users } from "lucide-react"

export default function ReportsPage() {
  const reportTypes = [
    {
      title: "Financial Report",
      description: "Revenue, expenses, and profit analysis",
      icon: DollarSign,
      stats: { value: `$${dashboardStats.totalRevenue.toLocaleString()}`, label: "Total Revenue" },
    },
    {
      title: "Sales Report",
      description: "Product sales and order statistics",
      icon: ShoppingCart,
      stats: { value: orders.length, label: "Total Orders" },
    },
    {
      title: "User Report",
      description: "User growth and engagement metrics",
      icon: Users,
      stats: { value: dashboardStats.activeUsers.toLocaleString(), label: "Active Users" },
    },
    {
      title: "Growth Report",
      description: "Monthly growth and trends analysis",
      icon: TrendingUp,
      stats: { value: `+${dashboardStats.monthlyGrowth}%`, label: "Monthly Growth" },
    },
  ]

  return (
    <DashboardLayout>
      <PageHeader
        title="Reports"
        description="Generate and download various business reports"
        action={
          <Button className="bg-violet-500 hover:bg-violet-600">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {reportTypes.map((report) => (
          <Card key={report.title} className="p-6 bg-card border-border hover:border-violet-500/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-violet-500/10">
                <report.icon className="w-6 h-6 text-violet-400" />
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
            <h3 className="text-xl font-semibold mb-2">{report.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <span className="text-sm text-muted-foreground">{report.stats.label}</span>
              <span className="text-2xl font-bold">{report.stats.value}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Transactions Summary */}
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-violet-500/10">
              <FileText className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Transaction Summary</h2>
              <p className="text-sm text-muted-foreground">Latest financial transactions</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Category</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-border hover:bg-muted/50">
                  <td className="py-3 px-4 text-sm font-mono">{transaction.id}</td>
                  <td className="py-3 px-4 text-sm capitalize">{transaction.type}</td>
                  <td className="py-3 px-4 text-sm font-medium">
                    {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-sm">{transaction.category}</td>
                  <td className="py-3 px-4 text-sm">{transaction.date}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.status === "completed"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  )
}

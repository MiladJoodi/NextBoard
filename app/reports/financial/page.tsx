"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { transactions, invoices } from "@/lib/data"
import { DollarSign, TrendingUp, TrendingDown, Download } from "lucide-react"

export default function FinancialReportsPage() {
  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
  const netProfit = totalIncome - totalExpenses
  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.total, 0)
  const paidInvoices = invoices.filter((inv) => inv.status === "paid").reduce((sum, inv) => sum + inv.total, 0)
  const pendingInvoices = invoices.filter((inv) => inv.status === "pending").reduce((sum, inv) => sum + inv.total, 0)

  return (
    <DashboardLayout>
      <PageHeader
        title="Financial Reports"
        description="Comprehensive financial analysis and reports"
        action={
          <Button className="bg-violet-500 hover:bg-violet-600">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-sm text-muted-foreground">Total Income</span>
          </div>
          <p className="text-3xl font-bold text-emerald-400">${totalIncome.toFixed(2)}</p>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-red-500/10">
              <TrendingDown className="w-5 h-5 text-red-400" />
            </div>
            <span className="text-sm text-muted-foreground">Total Expenses</span>
          </div>
          <p className="text-3xl font-bold text-red-400">${totalExpenses.toFixed(2)}</p>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-violet-500/10">
              <DollarSign className="w-5 h-5 text-violet-400" />
            </div>
            <span className="text-sm text-muted-foreground">Net Profit</span>
          </div>
          <p className="text-3xl font-bold">${netProfit.toFixed(2)}</p>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-amber-500/10">
              <DollarSign className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-sm text-muted-foreground">Total Invoiced</span>
          </div>
          <p className="text-3xl font-bold">${totalInvoiced.toFixed(2)}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income Breakdown */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-semibold mb-6">Income Breakdown</h2>
          <div className="space-y-4">
            {transactions
              .filter((t) => t.type === "income")
              .map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border"
                >
                  <div>
                    <p className="font-medium">{transaction.category}</p>
                    <p className="text-sm text-muted-foreground">{transaction.description}</p>
                  </div>
                  <p className="text-lg font-bold text-emerald-400">${transaction.amount.toFixed(2)}</p>
                </div>
              ))}
          </div>
        </Card>

        {/* Expense Breakdown */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-semibold mb-6">Expense Breakdown</h2>
          <div className="space-y-4">
            {transactions
              .filter((t) => t.type === "expense")
              .map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border"
                >
                  <div>
                    <p className="font-medium">{transaction.category}</p>
                    <p className="text-sm text-muted-foreground">{transaction.description}</p>
                  </div>
                  <p className="text-lg font-bold text-red-400">${transaction.amount.toFixed(2)}</p>
                </div>
              ))}
          </div>
        </Card>

        {/* Invoice Status */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-semibold mb-6">Invoice Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
              <span className="font-medium">Paid Invoices</span>
              <span className="text-2xl font-bold text-emerald-400">${paidInvoices.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-amber-500/5 border border-amber-500/20">
              <span className="font-medium">Pending Invoices</span>
              <span className="text-2xl font-bold text-amber-400">${pendingInvoices.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        {/* Profit Margin */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-semibold mb-6">Profit Analysis</h2>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Profit Margin</span>
                <span className="font-medium">{((netProfit / totalIncome) * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-2 rounded-full"
                  style={{ width: `${(netProfit / totalIncome) * 100}%` }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground mb-1">ROI</p>
                <p className="text-2xl font-bold">32.5%</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground mb-1">Growth</p>
                <p className="text-2xl font-bold text-emerald-400">+12.5%</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}

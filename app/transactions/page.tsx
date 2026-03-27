"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { transactions } from "@/lib/data"
import { ArrowUpRight, ArrowDownRight, Filter, Download } from "lucide-react"

export default function TransactionsPage() {
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all")

  const filteredTransactions = filter === "all" ? transactions : transactions.filter((t) => t.type === filter)

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpense = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
  const netBalance = totalIncome - totalExpense

  return (
    <DashboardLayout>
      <PageHeader
        title="Transactions"
        description="View and manage all financial transactions"
        action={
          <Button className="bg-violet-500 hover:bg-violet-600">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <ArrowDownRight className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-sm text-muted-foreground">Total Income</span>
          </div>
          <p className="text-3xl font-bold text-emerald-400">${totalIncome.toFixed(2)}</p>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-red-500/10">
              <ArrowUpRight className="w-5 h-5 text-red-400" />
            </div>
            <span className="text-sm text-muted-foreground">Total Expense</span>
          </div>
          <p className="text-3xl font-bold text-red-400">${totalExpense.toFixed(2)}</p>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-violet-500/10">
              <ArrowDownRight className="w-5 h-5 text-violet-400" />
            </div>
            <span className="text-sm text-muted-foreground">Net Balance</span>
          </div>
          <p className="text-3xl font-bold">${netBalance.toFixed(2)}</p>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <div className="flex gap-2">
          {(["all", "income", "expense"] as const).map((type) => (
            <Button
              key={type}
              variant={filter === type ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(type)}
              className={filter === type ? "bg-violet-500" : ""}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Transactions Table */}
      <Card className="p-6 bg-card border-border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Category</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Description</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-border hover:bg-muted/50">
                  <td className="py-3 px-4 text-sm font-mono">{transaction.id}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {transaction.type === "income" ? (
                        <ArrowDownRight className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 text-red-400" />
                      )}
                      <span className="text-sm capitalize">{transaction.type}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-sm font-medium ${
                        transaction.type === "income" ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">{transaction.category}</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{transaction.description}</td>
                  <td className="py-3 px-4 text-sm">{transaction.date}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.status === "completed"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : transaction.status === "pending"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : "bg-red-500/10 text-red-400 border border-red-500/20"
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

"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { orders, users, products } from "@/lib/data"
import { ShoppingCart, MapPin } from "lucide-react"

export default function OrdersPage() {
  return (
    <DashboardLayout>
      <PageHeader title="Orders" description="Track and manage customer orders" />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        {[
          { label: "Total Orders", value: orders.length, status: null },
          { label: "Pending", value: orders.filter((o) => o.status === "pending").length, status: "pending" },
          {
            label: "Processing",
            value: orders.filter((o) => o.status === "processing").length,
            status: "processing",
          },
          { label: "Shipped", value: orders.filter((o) => o.status === "shipped").length, status: "shipped" },
          { label: "Delivered", value: orders.filter((o) => o.status === "delivered").length, status: "delivered" },
        ].map((stat) => (
          <Card key={stat.label} className="p-6 bg-card border-border">
            <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => {
          const customer = users.find((u) => u.id === order.userId)

          return (
            <Card key={order.id} className="p-6 bg-card border-border hover:border-violet-500/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-violet-500/10">
                    <ShoppingCart className="w-6 h-6 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Order {order.id}</h3>
                    <p className="text-sm text-muted-foreground">Customer: {customer?.name}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold mb-2">${order.total.toFixed(2)}</p>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === "delivered"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : order.status === "shipped"
                          ? "bg-violet-500/10 text-violet-400 border border-violet-500/20"
                          : order.status === "processing"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="border-t border-border pt-4 mb-4">
                <h4 className="text-sm font-medium mb-2">Order Items</h4>
                <div className="space-y-2">
                  {order.products.map((item, index) => {
                    const product = products.find((p) => p.id === item.productId)
                    return (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {product?.name} × {item.quantity}
                        </span>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{order.shippingAddress}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm" className="bg-violet-500 hover:bg-violet-600">
                    Update Status
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </DashboardLayout>
  )
}

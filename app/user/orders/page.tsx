import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone } from "lucide-react"

export default function UserOrdersPage() {
  // Mock orders data
  const orders = [
    {
      id: "ORD-001",
      date: "۱۴۰۲/۰۲/۱۵",
      status: "completed",
      total: 15000,
      items: [{ platform: "تلگرام", number: "+1 (555) 123-4567" }],
    },
    {
      id: "ORD-002",
      date: "۱۴۰۲/۰۳/۲۰",
      status: "processing",
      total: 22500,
      items: [
        { platform: "اسپاتیفای", number: "+1 (555) 987-6543" },
        { platform: "واتساپ", number: "+1 (555) 456-7890" },
      ],
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-success text-success-foreground">تکمیل شده</Badge>
      case "processing":
        return <Badge className="bg-primary text-primary-foreground">در حال پردازش</Badge>
      case "cancelled":
        return <Badge className="bg-destructive text-destructive-foreground">لغو شده</Badge>
      default:
        return <Badge>نامشخص</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">سفارشات من</h1>

      <Card>
        <CardHeader>
          <CardTitle>تاریخچه سفارشات</CardTitle>
          <CardDescription>لیست تمام سفارشات شما و وضعیت آنها</CardDescription>
        </CardHeader>
        <CardContent>
          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/50 py-3">
                    <div className="flex flex-wrap justify-between items-center gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">سفارش {order.id}</span>
                        <span className="text-sm text-muted-foreground">{order.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(order.status)}
                        <span className="font-medium">{order.total.toLocaleString()} تومان</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="py-3">
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{item.platform}: </span>
                          <span className="font-mono ltr">{item.number}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">هنوز هیچ سفارشی ثبت نکرده‌اید.</p>
              <Button asChild>
                <a href="/shop">مشاهده شماره‌ها</a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

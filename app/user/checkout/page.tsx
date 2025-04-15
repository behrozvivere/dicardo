"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/providers/cart-provider"
import { useAuth } from "@/components/providers/auth-provider"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCart()
  const { user, isAuthenticated } = useAuth()

  const [paymentMethod, setPaymentMethod] = useState("online")
  const [isLoading, setIsLoading] = useState(false)

  // Calculate totals
  const subtotal = getTotal()
  const tax = Math.round(subtotal * 0.09) // 9% tax
  const total = subtotal + tax

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    router.push("/auth/login?redirect=/user/checkout")
    return null
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would call an API to process the payment
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Clear cart after successful checkout
      clearCart()

      // Redirect to success page
      router.push("/user/orders")
    } catch (error) {
      console.error("Checkout failed", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 gradient-primary text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">تکمیل خرید</h1>
              <p className="max-w-[700px] text-white/90 md:text-xl">یک قدم تا دریافت شماره مجازی خود فاصله دارید.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12">
        <div className="container px-4 md:px-6">
          <form onSubmit={handleCheckout}>
            <div className="grid gap-10 md:grid-cols-[1fr_350px]">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>اطلاعات شخصی</CardTitle>
                    <CardDescription>لطفاً اطلاعات خود را برای تکمیل خرید وارد کنید.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">نام</Label>
                        <Input id="firstName" defaultValue={user?.name?.split(" ")[0] || ""} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">نام خانوادگی</Label>
                        <Input id="lastName" defaultValue={user?.name?.split(" ")[1] || ""} required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">ایمیل</Label>
                      <Input id="email" type="email" defaultValue={user?.email || ""} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">شماره موبایل</Label>
                      <Input id="phone" type="tel" defaultValue={user?.phone || ""} required />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>روش پرداخت</CardTitle>
                    <CardDescription>روش پرداخت مورد نظر خود را انتخاب کنید.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value="online" id="online" />
                        <Label htmlFor="online" className="flex items-center gap-2">
                          <span>درگاه پرداخت آنلاین</span>
                          <span className="text-xs text-muted-foreground">(زرین‌پال، پی‌پینگ، پی‌پد)</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value="wallet" id="wallet" />
                        <Label htmlFor="wallet" className="flex items-center gap-2">
                          <span>پرداخت از کیف پول</span>
                          <span className="text-xs text-muted-foreground">(موجودی: ۰ تومان)</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value="crypto" id="crypto" />
                        <Label htmlFor="crypto" className="flex items-center gap-2">
                          <span>پرداخت با ارز دیجیتال</span>
                          <span className="text-xs text-muted-foreground">(بیت‌کوین، اتریوم، تتر)</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>خلاصه سفارش</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div key={item.number.id} className="flex justify-between">
                          <span className="text-sm">
                            {item.number.platform} - {item.number.number}
                          </span>
                          <span className="font-medium">{item.number.price.toLocaleString()} تومان</span>
                        </div>
                      ))}
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">جمع کل</span>
                        <span>{subtotal.toLocaleString()} تومان</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">مالیات (۹٪)</span>
                        <span>{tax.toLocaleString()} تومان</span>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>مبلغ قابل پرداخت</span>
                      <span>{total.toLocaleString()} تومان</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                    <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                      {isLoading ? "در حال پردازش..." : "پرداخت و تکمیل خرید"}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      با کلیک بر روی دکمه پرداخت، شما{" "}
                      <Link href="/terms" className="text-primary underline-offset-4 hover:underline">
                        قوانین و مقررات
                      </Link>{" "}
                      سایت را می‌پذیرید.
                    </p>
                  </CardFooter>
                </Card>

                <Button variant="outline" className="w-full" asChild>
                  <Link href="/cart">بازگشت به سبد خرید</Link>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}

"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Trash2, CreditCard, ArrowRight } from "lucide-react"
import { useCart } from "@/components/providers/cart-provider"
import type { Platform } from "@/types/number"

// Platform display names and logos
const platformInfo: Record<Platform, { name: string; logo: string }> = {
  spotify: { name: "اسپاتیفای", logo: "/placeholder.svg?height=40&width=40" },
  telegram: { name: "تلگرام", logo: "/placeholder.svg?height=40&width=40" },
  whatsapp: { name: "واتساپ", logo: "/placeholder.svg?height=40&width=40" },
  instagram: { name: "اینستاگرام", logo: "/placeholder.svg?height=40&width=40" },
  google: { name: "گوگل", logo: "/placeholder.svg?height=40&width=40" },
  facebook: { name: "فیسبوک", logo: "/placeholder.svg?height=40&width=40" },
}

export default function CartPage() {
  const { items, removeItem, clearCart, getTotal } = useCart()

  // Calculate totals
  const subtotal = getTotal()
  const tax = Math.round(subtotal * 0.09) // 9% tax
  const total = subtotal + tax

  return (
    <main className="flex min-h-screen flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 gradient-primary text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">سبد خرید</h1>
              <p className="max-w-[700px] text-white/90 md:text-xl">
                شماره‌های انتخاب شده خود را قبل از نهایی کردن خرید بررسی کنید.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12">
        <div className="container px-4 md:px-6">
          {items.length > 0 ? (
            <div className="grid gap-10 md:grid-cols-[1fr_350px]">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">اقلام سبد خرید ({items.length})</h2>

                {items.map((item) => (
                  <Card key={item.number.id} className="overflow-hidden">
                    <CardHeader className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex items-center gap-4">
                          <Image
                            src={platformInfo[item.number.platform].logo || "/placeholder.svg"}
                            alt={platformInfo[item.number.platform].name}
                            width={40}
                            height={40}
                            className="h-10 w-10 object-contain bg-muted rounded-md p-1"
                          />
                          <div>
                            <CardTitle className="text-lg md:text-xl">
                              {platformInfo[item.number.platform].name}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground mt-1 font-mono ltr">{item.number.number}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => removeItem(item.number.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                          <span className="sr-only">حذف</span>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6 pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">هزینه ماهانه</p>
                          <p className="text-lg font-bold">{item.number.price.toLocaleString()} تومان</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">هزینه راه‌اندازی</p>
                          <p className="text-lg font-bold">
                            {item.number.setupFee > 0 ? `${item.number.setupFee.toLocaleString()} تومان` : "رایگان"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="flex justify-between items-center">
                  <Button variant="outline" asChild>
                    <Link href="/shop">ادامه خرید</Link>
                  </Button>
                  <Button variant="destructive" onClick={clearCart}>
                    خالی کردن سبد
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle>خلاصه سفارش</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0 space-y-4">
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

                    <div className="space-y-2">
                      <label htmlFor="promo" className="text-sm font-medium">
                        کد تخفیف
                      </label>
                      <div className="flex gap-2">
                        <Input id="promo" placeholder="کد تخفیف را وارد کنید" />
                        <Button variant="outline">اعمال</Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 md:p-6">
                    <Button className="w-full" size="lg" asChild>
                      <Link href="/user/checkout">
                        <CreditCard className="ml-2 h-4 w-4" />
                        ادامه فرآیند خرید
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle>نیاز به راهنمایی دارید؟</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0 space-y-4">
                    <p className="text-sm text-muted-foreground">
                      اگر سوالی در مورد سفارش خود یا نحوه خرید دارید، تیم پشتیبانی ما آماده کمک به شما است.
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/contact">
                        تماس با پشتیبانی
                        <ArrowRight className="mr-2 h-4 w-4 flip-x" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4 py-12">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">سبد خرید شما خالی است</h2>
                <p className="text-muted-foreground">
                  به نظر می‌رسد هنوز هیچ شماره مجازی به سبد خرید خود اضافه نکرده‌اید.
                </p>
              </div>
              <Button asChild size="lg">
                <Link href="/shop">مشاهده شماره‌ها</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

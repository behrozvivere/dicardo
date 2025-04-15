"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, ShoppingCart, ArrowRight } from "lucide-react"
import { useCart } from "@/components/providers/cart-provider"
import type { VirtualNumber, Platform } from "@/types/number"

// Platform display names and logos
const platformInfo: Record<Platform, { name: string; logo: string }> = {
  spotify: { name: "اسپاتیفای", logo: "/placeholder.svg?height=40&width=40" },
  telegram: { name: "تلگرام", logo: "/placeholder.svg?height=40&width=40" },
  whatsapp: { name: "واتساپ", logo: "/placeholder.svg?height=40&width=40" },
  instagram: { name: "اینستاگرام", logo: "/placeholder.svg?height=40&width=40" },
  google: { name: "گوگل", logo: "/placeholder.svg?height=40&width=40" },
  facebook: { name: "فیسبوک", logo: "/placeholder.svg?height=40&width=40" },
}

// Mock data for virtual numbers
const mockNumbers: VirtualNumber[] = [
  {
    id: "sp1",
    number: "+1 (555) 123-4567",
    platform: "spotify",
    country: "USA",
    price: 7500,
    setupFee: 0,
    isAvailable: true,
    features: ["تایید آنی", "پشتیبانی ۲۴ ساعته", "گارانتی بازگشت وجه"],
    description:
      "این شماره مجازی آمریکا برای استفاده در اسپاتیفای مناسب است. با استفاده از این شماره می‌توانید به راحتی در اسپاتیفای ثبت‌نام کنید و از خدمات آن بهره‌مند شوید.",
  },
  {
    id: "tg1",
    number: "+1 (555) 234-5678",
    platform: "telegram",
    country: "USA",
    price: 6500,
    setupFee: 0,
    isAvailable: true,
    features: ["تایید آنی", "پشتیبانی ۲۴ ساعته", "گارانتی بازگشت وجه"],
    description:
      "این شماره مجازی آمریکا برای استفاده در تلگرام مناسب است. با استفاده از این شماره می‌توانید به راحتی در تلگرام ثبت‌نام کنید و از خدمات آن بهره‌مند شوید.",
  },
  {
    id: "wa1",
    number: "+1 (555) 345-6789",
    platform: "whatsapp",
    country: "USA",
    price: 8500,
    setupFee: 0,
    isAvailable: true,
    features: ["تایید آنی", "پشتیبانی ۲۴ ساعته", "گارانتی بازگشت وجه"],
    description:
      "این شماره مجازی آمریکا برای استفاده در واتساپ مناسب است. با استفاده از این شماره می‌توانید به راحتی در واتساپ ثبت‌نام کنید و از خدمات آن بهره‌مند شوید.",
  },
]

export default function NumberDetailPage({ params }: { params: { id: string } }) {
  const { addItem } = useCart()
  const [number, setNumber] = useState<VirtualNumber | null>(null)
  const [relatedNumbers, setRelatedNumbers] = useState<VirtualNumber[]>([])

  useEffect(() => {
    // Find the number with the matching ID
    const foundNumber = mockNumbers.find((n) => n.id === params.id)
    setNumber(foundNumber || null)

    if (foundNumber) {
      // Find related numbers (same platform but different IDs)
      const related = mockNumbers
        .filter((n) => n.platform === foundNumber.platform && n.id !== foundNumber.id)
        .slice(0, 2) // Limit to 2 related numbers

      setRelatedNumbers(related)
    }
  }, [params.id])

  if (!number) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p className="text-xl">شماره مورد نظر یافت نشد.</p>
        <Button asChild className="mt-4">
          <Link href="/shop">بازگشت به فروشگاه</Link>
        </Button>
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col">
      <section className="w-full py-12 md:py-24 gradient-primary text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild className="text-white hover:bg-white/10">
                <Link href="/shop">
                  <ArrowRight className="h-4 w-4 flip-x" />
                  <span className="sr-only">بازگشت به فروشگاه</span>
                </Link>
              </Button>
              <p className="text-sm text-white/80">بازگشت به فروشگاه</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Image
                  src={platformInfo[number.platform].logo || "/placeholder.svg"}
                  alt={platformInfo[number.platform].name}
                  width={40}
                  height={40}
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain bg-white/10 rounded-md p-1"
                />
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  شماره مجازی {platformInfo[number.platform].name}
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-xl font-mono ltr">{number.number}</p>
                <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                  {number.country}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 md:grid-cols-[1fr_350px]">
            <div className="space-y-8">
              <Tabs defaultValue="features" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="features">ویژگی‌ها</TabsTrigger>
                  <TabsTrigger value="specifications">مشخصات</TabsTrigger>
                </TabsList>
                <TabsContent value="features" className="space-y-4 pt-4">
                  <h2 className="text-2xl font-bold">ویژگی‌ها</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {number.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="specifications" className="space-y-4 pt-4">
                  <h2 className="text-2xl font-bold">مشخصات</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">نوع شماره</span>
                        <span>موبایل</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">کشور</span>
                        <span>{number.country}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">پلتفرم</span>
                        <span>{platformInfo[number.platform].name}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">پشتیبانی از پیامک</span>
                        <span>بله</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">مدت اعتبار</span>
                        <span>۳۰ روز</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">قابلیت تمدید</span>
                        <span>بله</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">توضیحات</h2>
                <p className="text-muted-foreground">{number.description}</p>
                <p className="text-muted-foreground">
                  این شماره با قابلیت دریافت پیامک و کد تأیید، گزینه مناسبی برای ثبت‌نام در پلتفرم‌های مختلف است. شماره
                  بلافاصله پس از خرید فعال می‌شود و می‌توانید از آن استفاده کنید.
                </p>
              </div>

              {relatedNumbers.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">شماره‌های مرتبط</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedNumbers.map((relatedNumber) => (
                      <Card key={relatedNumber.id} className="overflow-hidden gradient-card text-white">
                        <CardContent className="p-4 flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <Image
                              src={platformInfo[relatedNumber.platform].logo || "/placeholder.svg"}
                              alt={platformInfo[relatedNumber.platform].name}
                              width={40}
                              height={40}
                              className="h-10 w-10 object-contain bg-white/10 rounded-md p-1"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold truncate">
                              {platformInfo[relatedNumber.platform].name}
                            </h3>
                            <p className="text-sm text-white/70">{relatedNumber.country}</p>
                            <p className="font-mono text-sm mt-1 ltr">{relatedNumber.number}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                              {relatedNumber.price.toLocaleString()} تومان
                            </Badge>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex justify-between items-center">
                          <Button variant="link" size="sm" className="text-white/70 hover:text-white p-0" asChild>
                            <Link href={`/shop/${relatedNumber.id}`}>جزئیات بیشتر</Link>
                          </Button>
                          <Button
                            size="sm"
                            className="bg-white text-gray-900 hover:bg-white/90"
                            onClick={() => addItem(relatedNumber)}
                          >
                            <ShoppingCart className="h-4 w-4 ml-2" />
                            خرید
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader className="p-4 md:p-6">
                  <CardTitle>خرید این شماره</CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">هزینه ماهانه</span>
                      <span className="font-medium">{number.price.toLocaleString()} تومان</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">هزینه راه‌اندازی</span>
                      <span className="font-medium">
                        {number.setupFee > 0 ? `${number.setupFee.toLocaleString()} تومان` : "رایگان"}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>مبلغ قابل پرداخت</span>
                    <span>{(number.price + number.setupFee).toLocaleString()} تومان</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 md:p-6 flex flex-col gap-2">
                  <Button className="w-full" size="lg" onClick={() => addItem(number)}>
                    <ShoppingCart className="ml-2 h-4 w-4" />
                    افزودن به سبد خرید
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/cart">مشاهده سبد خرید</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="p-4 md:p-6">
                  <CardTitle>نیاز به راهنمایی دارید؟</CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  <p className="text-sm text-muted-foreground">
                    اگر سوالی در مورد این شماره یا نحوه خرید آن دارید، تیم پشتیبانی ما آماده کمک به شما است.
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">ایمیل:</span>
                      <a href="mailto:support@virtualnumber.com" className="text-primary hover:underline">
                        support@virtualnumber.com
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">تلفن:</span>
                      <a href="tel:+982112345678" className="text-primary hover:underline ltr">
                        ۰۲۱-۱۲۳۴۵۶۷۸
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

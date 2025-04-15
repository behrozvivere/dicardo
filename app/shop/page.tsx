"use client"

import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import NumberCard from "@/components/shop/NumberCard"
import { useCart } from "@/components/providers/cart-provider"
import type { VirtualNumber, Platform } from "@/types/number"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data for virtual numbers
const mockVirtualNumbers: VirtualNumber[] = [
  {
    id: "sp1",
    number: "+1 (555) 123-4567",
    platform: "spotify",
    country: "USA",
    price: 7500,
    setupFee: 0,
    isAvailable: true,
    features: ["تایید آنی", "پشتیبانی ۲۴ ساعته", "گارانتی بازگشت وجه"],
    type: "virtual",
  },
  {
    id: "sp2",
    number: "+1 (555) 987-6543",
    platform: "spotify",
    country: "USA",
    price: 7500,
    setupFee: 0,
    isAvailable: true,
    features: ["تایید آنی", "پشتیبانی ۲۴ ساعته", "گارانتی بازگشت وجه"],
    type: "virtual",
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
    type: "virtual",
  },
  {
    id: "tg2",
    number: "+1 (555) 876-5432",
    platform: "telegram",
    country: "USA",
    price: 6500,
    setupFee: 0,
    isAvailable: true,
    features: ["تایید آنی", "پشتیبانی ۲۴ ساعته", "گارانتی بازگشت وجه"],
    type: "virtual",
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
    type: "virtual",
  },
  {
    id: "wa2",
    number: "+1 (555) 765-4321",
    platform: "whatsapp",
    country: "USA",
    price: 8500,
    setupFee: 0,
    isAvailable: true,
    features: ["تایید آنی", "پشتیبانی ۲۴ ساعته", "گارانتی بازگشت وجه"],
    type: "virtual",
  },
  {
    id: "ig1",
    number: "+1 (555) 456-7890",
    platform: "instagram",
    country: "USA",
    price: 7000,
    setupFee: 0,
    isAvailable: true,
    features: ["تایید آنی", "پشتیبانی ۲۴ ساعته", "گارانتی بازگشت وجه"],
    type: "virtual",
  },
  {
    id: "ig2",
    number: "+1 (555) 654-3210",
    platform: "instagram",
    country: "USA",
    price: 7000,
    setupFee: 0,
    isAvailable: true,
    features: ["تایید آنی", "پشتیبانی ۲۴ ساعته", "گارانتی بازگشت وجه"],
    type: "virtual",
  },
]

// Mock data for permanent numbers
const mockPermanentNumbers: VirtualNumber[] = [
  {
    id: "perm1",
    number: "+1 (555) 111-2222",
    platform: "spotify",
    country: "USA",
    price: 15000,
    setupFee: 5000,
    isAvailable: true,
    features: ["مالکیت دائمی", "پشتیبانی ۲۴ ساعته", "گارانتی بازگشت وجه"],
    type: "permanent",
  },
  {
    id: "perm2",
    number: "+1 (555) 333-4444",
    platform: "telegram",
    country: "USA",
    price: 14000,
    setupFee: 5000,
    isAvailable: true,
    features: ["مالکیت دائمی", "پشتیبانی ۲۴ ساعته", "گارانتی بازگشت وجه"],
    type: "permanent",
  },
  {
    id: "perm3",
    number: "+1 (555) 555-6666",
    platform: "whatsapp",
    country: "USA",
    price: 16000,
    setupFee: 5000,
    isAvailable: true,
    features: ["مالکیت دائمی", "پشتیبانی ۲۴ ساعته", "گارانتی بازگشت وجه"],
    type: "permanent",
  },
  {
    id: "perm4",
    number: "+1 (555) 777-8888",
    platform: "instagram",
    country: "USA",
    price: 15500,
    setupFee: 5000,
    isAvailable: true,
    features: ["مالکیت دائمی", "پشتیبانی ۲۴ ساعته", "گارانتی بازگشت وجه"],
    type: "permanent",
  },
]

// Platform display names
const platformNames: Record<Platform, string> = {
  spotify: "اسپاتیفای",
  telegram: "تلگرام",
  whatsapp: "واتساپ",
  instagram: "اینستاگرام",
  google: "گوگل",
  facebook: "فیسبوک",
}

export default function ShopPage() {
  const searchParams = useSearchParams()
  const { addItem } = useCart()
  const initialized = useRef(false)

  // Local state for filters
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [numberType, setNumberType] = useState<"virtual" | "permanent">("virtual")
  const [platform, setPlatform] = useState("all")
  const [country, setCountry] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [features, setFeatures] = useState({
    instantActivation: false,
    support24h: false,
    moneyBackGuarantee: false,
  })

  // Initialize filters from URL params once
  useEffect(() => {
    if (initialized.current) return

    const type = searchParams.get("type")
    if (type === "permanent") {
      setNumberType("permanent")
    }

    const platformParam = searchParams.get("platform")
    if (platformParam) {
      setPlatform(platformParam)
    }

    const countryParam = searchParams.get("country")
    if (countryParam) {
      setCountry(countryParam)
    }

    const priceRangeParam = searchParams.get("priceRange")
    if (priceRangeParam) {
      setPriceRange(priceRangeParam)
    }

    setFeatures({
      instantActivation: searchParams.get("instantActivation") === "true",
      support24h: searchParams.get("support24h") === "true",
      moneyBackGuarantee: searchParams.get("moneyBackGuarantee") === "true",
    })

    initialized.current = true
  }, [searchParams])

  // Memoize the addItem function to prevent unnecessary re-renders
  const handleAddToCart = useCallback(
    (number: VirtualNumber) => {
      addItem(number)
    },
    [addItem],
  )

  // Filter numbers based on current filters
  const filteredNumbers = useMemo(() => {
    // Get the base numbers based on type
    const allNumbers = numberType === "virtual" ? mockVirtualNumbers : mockPermanentNumbers
    let filtered = [...allNumbers]

    // Apply platform filter
    if (platform !== "all") {
      filtered = filtered.filter((number) => number.platform === platform)
    }

    // Apply country filter
    if (country !== "all") {
      filtered = filtered.filter((number) => number.country.toLowerCase() === country.toLowerCase())
    }

    // Apply price range filter
    if (priceRange !== "all") {
      if (priceRange === "0-5000") {
        filtered = filtered.filter((number) => number.price <= 5000)
      } else if (priceRange === "5000-10000") {
        filtered = filtered.filter((number) => number.price > 5000 && number.price <= 10000)
      } else if (priceRange === "10000+") {
        filtered = filtered.filter((number) => number.price > 10000)
      }
    }

    // Apply feature filters
    if (features.instantActivation) {
      filtered = filtered.filter((number) => number.features.includes("تایید آنی"))
    }

    if (features.support24h) {
      filtered = filtered.filter((number) => number.features.includes("پشتیبانی ۲۴ ساعته"))
    }

    if (features.moneyBackGuarantee) {
      filtered = filtered.filter((number) => number.features.includes("گارانتی بازگشت وجه"))
    }

    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (number) =>
          number.number.toLowerCase().includes(query) ||
          number.platform.toLowerCase().includes(query) ||
          number.country.toLowerCase().includes(query),
      )
    }

    // Apply sorting
    if (sortBy === "price-low") {
      return [...filtered].sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      return [...filtered].sort((a, b) => b.price - a.price)
    }

    return filtered
  }, [numberType, platform, country, priceRange, features, searchQuery, sortBy])

  const pageTitle = numberType === "virtual" ? "شماره‌های مجازی" : "شماره‌های دائمی"

  return (
    <main className="flex min-h-screen flex-col">
      <section className="w-full py-16 md:py-24 lg:py-32 hero-gradient">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-3xl animate-fade-in">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">{pageTitle}</h1>
              <p className="text-muted-foreground md:text-xl">
                {numberType === "virtual"
                  ? "شماره مجازی مورد نظر خود را از میان صدها شماره موجود انتخاب کنید."
                  : "شماره دائمی مورد نظر خود را با مالکیت کامل خریداری کنید."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12">
        <div className="container px-4 md:px-6">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">خانه</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/shop">{pageTitle}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="grid gap-8 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr]">
            <div className="space-y-6">
              <div className="glass-effect rounded-xl p-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold">فیلترها</h2>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="platform" className="text-sm font-medium">
                          پلتفرم
                        </Label>
                        <Select value={platform} onValueChange={setPlatform}>
                          <SelectTrigger id="platform">
                            <SelectValue placeholder="همه پلتفرم‌ها" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">همه پلتفرم‌ها</SelectItem>
                            {Object.entries(platformNames).map(([key, name]) => (
                              <SelectItem key={key} value={key}>
                                {name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="country" className="text-sm font-medium">
                          کشور
                        </Label>
                        <Select value={country} onValueChange={setCountry}>
                          <SelectTrigger id="country">
                            <SelectValue placeholder="همه کشورها" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">همه کشورها</SelectItem>
                            <SelectItem value="usa">آمریکا</SelectItem>
                            <SelectItem value="uk">انگلستان</SelectItem>
                            <SelectItem value="canada">کانادا</SelectItem>
                            <SelectItem value="australia">استرالیا</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="price" className="text-sm font-medium">
                          محدوده قیمت
                        </Label>
                        <Select value={priceRange} onValueChange={setPriceRange}>
                          <SelectTrigger id="price">
                            <SelectValue placeholder="همه قیمت‌ها" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">همه قیمت‌ها</SelectItem>
                            <SelectItem value="0-5000">۰ تا ۵,۰۰۰ تومان</SelectItem>
                            <SelectItem value="5000-10000">۵,۰۰۰ تا ۱۰,۰۰۰ تومان</SelectItem>
                            <SelectItem value="10000+">بیشتر از ۱۰,۰۰۰ تومان</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">ویژگی‌ها</Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Checkbox
                              id="instantActivation"
                              checked={features.instantActivation}
                              onCheckedChange={(checked) =>
                                setFeatures((prev) => ({ ...prev, instantActivation: checked as boolean }))
                              }
                            />
                            <Label htmlFor="instantActivation" className="text-sm">
                              فعال‌سازی آنی
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Checkbox
                              id="support24h"
                              checked={features.support24h}
                              onCheckedChange={(checked) =>
                                setFeatures((prev) => ({ ...prev, support24h: checked as boolean }))
                              }
                            />
                            <Label htmlFor="support24h" className="text-sm">
                              پشتیبانی ۲۴ ساعته
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Checkbox
                              id="moneyBackGuarantee"
                              checked={features.moneyBackGuarantee}
                              onCheckedChange={(checked) =>
                                setFeatures((prev) => ({ ...prev, moneyBackGuarantee: checked as boolean }))
                              }
                            />
                            <Label htmlFor="moneyBackGuarantee" className="text-sm">
                              گارانتی بازگشت وجه
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="glass-effect rounded-xl p-4 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="جستجوی شماره..."
                    className="pr-8 w-full sm:w-[300px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="مرتب‌سازی بر اساس" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">جدیدترین</SelectItem>
                    <SelectItem value="price-low">قیمت: کم به زیاد</SelectItem>
                    <SelectItem value="price-high">قیمت: زیاد به کم</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {filteredNumbers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
                  {filteredNumbers.map((number) => (
                    <NumberCard key={number.id} number={number} onAddToCart={handleAddToCart} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center glass-effect rounded-xl">
                  <p className="text-lg font-medium">هیچ شماره‌ای با فیلترهای انتخاب شده یافت نشد.</p>
                  <p className="text-muted-foreground mt-2">
                    لطفاً فیلترهای خود را تغییر دهید یا جستجوی دیگری انجام دهید.
                  </p>
                </div>
              )}

              {filteredNumbers.length > 0 && (
                <div className="flex justify-center mt-8">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Button variant="outline" size="icon" disabled>
                      <span className="sr-only">صفحه قبل</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 flip-x"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </Button>
                    <Button variant="outline" size="sm" className="font-medium bg-primary text-primary-foreground">
                      ۱
                    </Button>
                    <Button variant="outline" size="sm">
                      ۲
                    </Button>
                    <Button variant="outline" size="sm">
                      ۳
                    </Button>
                    <Button variant="outline" size="icon">
                      <span className="sr-only">صفحه بعد</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 flip-x"
                      >
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

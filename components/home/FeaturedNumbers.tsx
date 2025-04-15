"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/components/providers/cart-provider"
import NumberCard from "@/components/shop/NumberCard"
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
const mockNumbers: Record<Platform, VirtualNumber[]> = {
  spotify: [
    {
      id: "sp1",
      number: "+1 (555) 123-4567",
      platform: "spotify",
      country: "USA",
      price: 7500,
      setupFee: 0,
      isAvailable: true,
      features: ["تایید آنی", "پشتیبانی ۲۴ ساعته", "گارانتی بازگشت وجه"],
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
    },
    {
      id: "sp3",
      number: "+44 20 1234 5678",
      platform: "spotify",
      country: "UK",
      price: 8500,
      setupFee: 0,
      isAvailable: true,
      features: ["تایید آنی", "پشتیبانی ۲۴ ساعته", "گارانتی بازگشت وجه"],
    },
    {
      id: "sp4",
      number: "+44 20 8765 4321",
      platform: "spotify",
      country: "UK",
      price: 8500,
      setupFee: 0,
      isAvailable: true,
      features: ["تایید آنی", "پشتیبانی ۲۴ ساعته", "گارانتی بازگشت وجه"],
    },
  ],
  telegram: [
    {
      id: "tg1",
      number: "+1 (555) 234-5678",
      platform: "telegram",
      country: "USA",
      price: 6500,
      setupFee: 0,
      isAvailable: true,
      features: ["تایید آنی", "پشتیبانی ۲۴ ساعته", "گارانتی بازگشت وجه"],
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
    },
    {
      id: "tg3",
      number: "+44 20 2345 6789",
      platform: "telegram",
      country: "UK",
      price: 7500,
      setupFee: 0,
      isAvailable: true,
      features: ["تایید آنی", "پشتیبانی ۲۴ ساعته", "گارانتی بازگشت وجه"],
    },
    {
      id: "tg4",
      number: "+44 20 9876 5432",
      platform: "telegram",
      country: "UK",
      price: 7500,
      setupFee: 0,
      isAvailable: true,
      features: ["تایید آنی", "پشتیبانی ۲۴ ساعته", "گارانتی بازگشت وجه"],
    },
  ],
  whatsapp: [
    {
      id: "wa1",
      number: "+1 (555) 345-6789",
      platform: "whatsapp",
      country: "USA",
      price: 8500,
      setupFee: 0,
      isAvailable: true,
      features: ["تایید آنی", "پشتیبانی ۲۴ ساعته", "گارانتی بازگشت وجه"],
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
    },
    {
      id: "wa3",
      number: "+44 20 3456 7890",
      platform: "whatsapp",
      country: "UK",
      price: 9500,
      setupFee: 0,
      isAvailable: true,
      features: ["تایید آنی", "پشتیبانی ۲۴ ساعته", "گارانتی بازگشت وجه"],
    },
    {
      id: "wa4",
      number: "+44 20 7654 3210",
      platform: "whatsapp",
      country: "UK",
      price: 9500,
      setupFee: 0,
      isAvailable: true,
      features: ["تایید آنی", "پشتیبانی ۲۴ ساعته", "گارانتی بازگشت وجه"],
    },
  ],
  instagram: [
    {
      id: "ig1",
      number: "+1 (555) 456-7890",
      platform: "instagram",
      country: "USA",
      price: 7000,
      setupFee: 0,
      isAvailable: true,
      features: ["تایید آنی", "پشتیبانی ۲۴ ساعته", "گارانتی بازگشت وجه"],
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
    },
    {
      id: "ig3",
      number: "+44 20 4567 8901",
      platform: "instagram",
      country: "UK",
      price: 8000,
      setupFee: 0,
      isAvailable: true,
      features: ["تایید آنی", "پشتیبانی ۲۴ ساعته", "گارانتی بازگشت وجه"],
    },
    {
      id: "ig4",
      number: "+44 20 6543 2109",
      platform: "instagram",
      country: "UK",
      price: 8000,
      setupFee: 0,
      isAvailable: true,
      features: ["تایید آنی", "پشتیبانی ۲۴ ساعته", "گارانتی بازگشت وجه"],
    },
  ],
  google: [
    {
      id: "go1",
      number: "+1 (555) 567-8901",
      platform: "google",
      country: "USA",
      price: 6000,
      setupFee: 0,
      isAvailable: true,
      features: ["تایید آنی", "پشتیبانی ۲۴ ساعته", "گارانتی بازگشت وجه"],
    },
    {
      id: "go2",
      number: "+1 (555) 543-2109",
      platform: "google",
      country: "USA",
      price: 6000,
      setupFee: 0,
      isAvailable: true,
      features: ["تایید آنی", "پشتیبانی ۲۴ ساعته", "گارانتی بازگشت وجه"],
    },
    {
      id: "go3",
      number: "+44 20 5678 9012",
      platform: "google",
      country: "UK",
      price: 7000,
      setupFee: 0,
      isAvailable: true,
      features: ["تایید آنی", "پشتیبانی ۲۴ ساعته", "گارانتی بازگشت وجه"],
    },
    {
      id: "go4",
      number: "+44 20 5432 1098",
      platform: "google",
      country: "UK",
      price: 7000,
      setupFee: 0,
      isAvailable: true,
      features: ["تایید آنی", "پشتیبانی ۲۴ ساعته", "گارانتی بازگشت وجه"],
    },
  ],
  facebook: [
    {
      id: "fb1",
      number: "+1 (555) 678-9012",
      platform: "facebook",
      country: "USA",
      price: 6500,
      setupFee: 0,
      isAvailable: true,
      features: ["تایید آنی", "پشتیبانی ۲۴ ساعته", "گارانتی بازگشت وجه"],
    },
    {
      id: "fb2",
      number: "+1 (555) 432-1098",
      platform: "facebook",
      country: "USA",
      price: 6500,
      setupFee: 0,
      isAvailable: true,
      features: ["تایید آنی", "پشتیبانی ۲۴ ساعته", "گارانتی بازگشت وجه"],
    },
    {
      id: "fb3",
      number: "+44 20 6789 0123",
      platform: "facebook",
      country: "UK",
      price: 7500,
      setupFee: 0,
      isAvailable: true,
      features: ["تایید آنی", "پشتیبانی ۲۴ ساعته", "گارانتی بازگشت وجه"],
    },
    {
      id: "fb4",
      number: "+44 20 4321 0987",
      platform: "facebook",
      country: "UK",
      price: 7500,
      setupFee: 0,
      isAvailable: true,
      features: ["تایید آنی", "پشتیبانی ۲۴ ساعته", "گارانتی بازگشت وجه"],
    },
  ],
}

export default function FeaturedNumbers() {
  const [activeTab, setActiveTab] = useState<Platform>("spotify")
  const { addItem } = useCart()

  // Use memoized data to prevent unnecessary re-renders
  const currentNumbers = useMemo(() => {
    return mockNumbers[activeTab].slice(0, 4)
  }, [activeTab])

  // Memoize the handler to prevent recreating the function on each render
  const handleAddToCart = useCallback(
    (number: VirtualNumber) => {
      addItem(number)
    },
    [addItem],
  )

  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">شماره‌های ویژه</h2>
            <p className="text-muted-foreground md:text-xl/relaxed">
              مجموعه‌ای از بهترین شماره‌های مجازی برای پلتفرم‌های مختلف
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-5xl">
          <Tabs
            defaultValue="spotify"
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as Platform)}
            className="w-full"
          >
            <div className="flex justify-center overflow-x-auto pb-6">
              <TabsList className="h-auto p-1 bg-muted/50 backdrop-blur-sm">
                {Object.entries(platformInfo).map(([platform, info]) => (
                  <TabsTrigger
                    key={platform}
                    value={platform}
                    className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    <Image
                      src={info.logo || "/placeholder.svg"}
                      alt={info.name}
                      width={20}
                      height={20}
                      className="h-5 w-5 object-contain"
                    />
                    <span>{info.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {Object.keys(mockNumbers).map((platform) => (
              <TabsContent key={platform} value={platform} className="mt-8 stagger-children">
                <div className="grid grid-cols-1 gap-4">
                  {platform === activeTab &&
                    currentNumbers.map((number) => (
                      <NumberCard key={number.id} number={number} onAddToCart={handleAddToCart} compact={true} />
                    ))}
                </div>
                <div className="mt-10 text-center">
                  <Button asChild size="lg" className="btn-hover-effect">
                    <Link href={`/shop?platform=${activeTab}`}>مشاهده همه شماره‌های {platformInfo[activeTab].name}</Link>
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  )
}

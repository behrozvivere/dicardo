"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, ExternalLink } from "lucide-react"
import type { VirtualNumber, Platform } from "@/types/number"

// Platform display names and logos
const platformInfo: Record<Platform, { name: string; logo: string }> = {
  spotify: { name: "اسپاتیفای", logo: "/placeholder.svg?height=80&width=80" },
  telegram: { name: "تلگرام", logo: "/placeholder.svg?height=80&width=80" },
  whatsapp: { name: "واتساپ", logo: "/placeholder.svg?height=80&width=80" },
  instagram: { name: "اینستاگرام", logo: "/placeholder.svg?height=80&width=80" },
  google: { name: "گوگل", logo: "/placeholder.svg?height=80&width=80" },
  facebook: { name: "فیسبوک", logo: "/placeholder.svg?height=80&width=80" },
}

interface NumberCardProps {
  number: VirtualNumber
  onAddToCart: (number: VirtualNumber) => void
  compact?: boolean
}

export default function NumberCard({ number, onAddToCart, compact = false }: NumberCardProps) {
  if (compact) {
    return (
      <div className="compact-card group">
        <div className="icon">
          <Image
            src={platformInfo[number.platform].logo || "/placeholder.svg"}
            alt={platformInfo[number.platform].name}
            width={24}
            height={24}
            className="h-6 w-6 object-contain"
          />
        </div>
        <div className="content">
          <h3 className="text-base font-medium">{platformInfo[number.platform].name}</h3>
          <p className="text-xs text-card-foreground/70 ltr">{number.number}</p>
        </div>
        <div className="price">
          <span>{number.price.toLocaleString()} تومان</span>
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="opacity-0 group-hover:opacity-100 transition-opacity ml-2"
          onClick={() => onAddToCart(number)}
        >
          <ShoppingCart className="h-4 w-4" />
          <span className="sr-only">خرید</span>
        </Button>
      </div>
    )
  }

  return (
    <div className="product-card">
      <div className="p-5 flex flex-col">
        <div className="flex items-center mb-4">
          <div className="h-12 w-12 rounded-full bg-background/50 flex items-center justify-center mr-3">
            <Image
              src={platformInfo[number.platform].logo || "/placeholder.svg"}
              alt={platformInfo[number.platform].name}
              width={40}
              height={40}
              className="h-8 w-8 object-contain"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium">{platformInfo[number.platform].name}</h3>
            <p className="text-sm text-card-foreground/70">{number.country}</p>
          </div>
          <div className="text-right">
            <span className="font-medium">{number.price.toLocaleString()} تومان</span>
          </div>
        </div>

        <p className="font-mono text-sm mb-4 ltr opacity-70">{number.number}</p>

        <div className="mt-auto flex justify-between items-center">
          <Button variant="ghost" size="sm" className="text-primary p-0 h-auto" asChild>
            <Link href={`/shop/${number.id}`} className="flex items-center">
              <span className="text-sm">جزئیات</span>
              <ExternalLink className="h-3.5 w-3.5 mr-1" />
            </Link>
          </Button>

          <Button size="sm" className="btn-hover-effect" onClick={() => onAddToCart(number)}>
            <ShoppingCart className="h-4 w-4 ml-2" />
            خرید
          </Button>
        </div>
      </div>
    </div>
  )
}

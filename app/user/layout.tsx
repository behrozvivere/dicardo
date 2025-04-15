"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/components/providers/auth-provider"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { User, Package, Settings, Sun, Moon, Wallet, MessageSquare } from "lucide-react"
import { useTheme } from "@/components/providers/theme-provider"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getWalletBalance } from "@/lib/api/wallet"
import type { Wallet as WalletType } from "@/types/wallet"

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [wallet, setWallet] = useState<WalletType | null>(null)
  const [isWalletLoading, setIsWalletLoading] = useState(true)
  const [redirectToLogin, setRedirectToLogin] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      setRedirectToLogin(true)
    } else {
      setRedirectToLogin(false)
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (redirectToLogin) {
      router.push("/auth/login?redirect=" + pathname)
    }
  }, [redirectToLogin, pathname, router])

  // Load wallet balance
  useEffect(() => {
    async function loadWalletBalance() {
      setIsWalletLoading(true)
      try {
        const walletData = await getWalletBalance()
        setWallet(walletData)
      } catch (error) {
        console.error("Failed to load wallet balance:", error)
      } finally {
        setIsWalletLoading(false)
      }
    }

    if (isAuthenticated) {
      loadWalletBalance()
    }
  }, [isAuthenticated])

  const navItems = [
    { href: "/user", label: "پروفایل", icon: <User className="h-4 w-4 ml-2" /> },
    { href: "/user/orders", label: "سفارشات", icon: <Package className="h-4 w-4 ml-2" /> },
    { href: "/user/wallet", label: "کیف پول", icon: <Wallet className="h-4 w-4 ml-2" /> },
    { href: "/user/support", label: "پشتیبانی", icon: <MessageSquare className="h-4 w-4 ml-2" /> },
    { href: "/user/settings", label: "تنظیمات", icon: <Settings className="h-4 w-4 ml-2" /> },
  ]

  const isActive = (path: string) => {
    if (path === "/user" && pathname === "/user") {
      return true
    }
    if (path !== "/user" && pathname?.startsWith(path)) {
      return true
    }
    return false
  }

  // Get current page title for breadcrumb
  const getCurrentPageTitle = () => {
    const currentItem = navItems.find((item) => isActive(item.href))
    return currentItem?.label || "پنل کاربری"
  }

  if (redirectToLogin) {
    return null
  }

  return (
    <div className="container py-6 md:py-10">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">خانه</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/user">پنل کاربری</BreadcrumbLink>
          </BreadcrumbItem>
          {pathname !== "/user" && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={pathname}>{getCurrentPageTitle()}</BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr] gap-6">
        <div className="space-y-6">
          <Card className="p-4">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{user?.name || "کاربر"}</h2>
                <p className="text-sm text-muted-foreground">{user?.phone || "شماره موبایل"}</p>
              </div>

              {/* Wallet Balance */}
              <div className="w-full p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted-foreground">موجودی کیف پول:</span>
                  <Link href="/user/wallet" className="text-xs text-primary hover:underline">
                    شارژ کیف پول
                  </Link>
                </div>
                {isWalletLoading ? (
                  <div className="h-6 w-24 skeleton-shimmer rounded-md mx-auto"></div>
                ) : (
                  <div className="text-lg font-bold">{wallet?.balance.toLocaleString()} تومان</div>
                )}
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${isActive(item.href) ? "bg-primary/10 text-primary nav-item active" : ""}`}
                  >
                    {item.icon}
                    {item.label}
                  </Button>
                </Link>
              ))}
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="h-4 w-4 ml-2" />
                    حالت روشن
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4 ml-2" />
                    حالت تاریک
                  </>
                )}
              </Button>
            </nav>
          </Card>
        </div>

        <div>{children}</div>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/providers/auth-provider"
import { useTheme } from "@/components/providers/theme-provider"
import { Switch } from "@/components/ui/switch"
import { Sun, Moon, Check } from "lucide-react"

export default function UserSettingsPage() {
  const { user } = useAuth()
  const { theme, setTheme } = useTheme()

  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [phone, setPhone] = useState(user?.phone || "")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState("")

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSuccess("")

    try {
      // In a real app, this would call an API to update the profile
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccess("اطلاعات پروفایل با موفقیت به‌روزرسانی شد.")
    } catch (error) {
      console.error("Failed to update profile", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">تنظیمات</h1>

      <Card className="overflow-hidden border border-border/50">
        <form onSubmit={handleSaveProfile}>
          <CardHeader>
            <CardTitle>اطلاعات شخصی</CardTitle>
            <CardDescription>اطلاعات پروفایل خود را ویرایش کنید</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">نام و نام خانوادگی</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="نام و نام خانوادگی خود را وارد کنید"
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">ایمیل (اختیاری)</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ایمیل خود را وارد کنید"
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">شماره موبایل</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled
                className="bg-muted/50"
              />
              <p className="text-xs text-muted-foreground">شماره موبایل قابل تغییر نیست.</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="btn-hover-effect">
              {isLoading ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </Button>
            {success && (
              <div className="flex items-center text-sm text-success mr-4">
                <Check className="h-4 w-4 mr-1" />
                {success}
              </div>
            )}
          </CardFooter>
        </form>
      </Card>

      <Card className="overflow-hidden border border-border/50">
        <CardHeader>
          <CardTitle>تنظیمات ظاهری</CardTitle>
          <CardDescription>حالت نمایش و ظاهر سایت را تغییر دهید</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`h-12 w-12 rounded-full flex items-center justify-center ${theme === "dark" ? "bg-muted" : "bg-primary/10"}`}
              >
                {theme === "dark" ? (
                  <Moon className="h-6 w-6 text-primary" />
                ) : (
                  <Sun className="h-6 w-6 text-primary" />
                )}
              </div>
              <div>
                <p className="font-medium">حالت {theme === "dark" ? "تاریک" : "روشن"}</p>
                <p className="text-sm text-muted-foreground">
                  {theme === "dark"
                    ? "حالت تاریک برای استفاده در محیط‌های کم‌نور مناسب است."
                    : "حالت روشن برای استفاده در طول روز مناسب است."}
                </p>
              </div>
            </div>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

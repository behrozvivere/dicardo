"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/components/providers/auth-provider"

export default function RegisterPage() {
  const router = useRouter()
  const { loginWithPhone } = useAuth()

  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [termsAccepted, setTermsAccepted] = useState(false)

  const handleSendOtp = async () => {
    if (!phone || phone.length < 10) {
      setError("لطفاً شماره موبایل معتبر وارد کنید")
      return
    }

    if (!termsAccepted) {
      setError("برای ثبت‌نام باید قوانین و مقررات را بپذیرید.")
      return
    }

    setError("")
    setIsLoading(true)

    try {
      // In a real app, this would call an API to send OTP
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setOtpSent(true)
    } catch (error) {
      setError("ارسال کد تأیید ناموفق بود. لطفاً دوباره تلاش کنید.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!otp || otp.length < 4) {
      setError("لطفاً کد تأیید را وارد کنید")
      return
    }

    setError("")
    setIsLoading(true)

    try {
      await loginWithPhone(phone, otp)
      router.push("/user/settings")
    } catch (error) {
      setError("ثبت‌نام ناموفق بود. لطفاً دوباره تلاش کنید.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">ایجاد حساب کاربری</h1>
          <p className="text-sm text-muted-foreground">برای ایجاد حساب کاربری، شماره موبایل خود را وارد کنید.</p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">ثبت‌نام</CardTitle>
            <CardDescription>برای استفاده از خدمات ما، یک حساب کاربری ایجاد کنید.</CardDescription>
          </CardHeader>
          <form onSubmit={handleRegister}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">شماره موبایل</Label>
                <div className="flex space-x-2 space-x-reverse">
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    disabled={otpSent}
                  />
                  {!otpSent && (
                    <Button type="button" onClick={handleSendOtp} disabled={isLoading || !phone || !termsAccepted}>
                      ارسال کد
                    </Button>
                  )}
                </div>
              </div>

              {otpSent && (
                <div className="space-y-2">
                  <Label htmlFor="otp">کد تأیید</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="کد ۵ رقمی"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">کد تأیید به شماره {phone} ارسال شد.</p>
                </div>
              )}

              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm">
                  <span>
                    با{" "}
                    <Link href="/terms" className="text-primary underline-offset-4 hover:underline">
                      قوانین و مقررات
                    </Link>{" "}
                    سایت موافقم.
                  </span>
                </Label>
              </div>

              {error && <div className="text-sm font-medium text-destructive">{error}</div>}
            </CardContent>
            <CardFooter>
              {otpSent ? (
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
                </Button>
              ) : (
                <Button
                  type="button"
                  className="w-full"
                  onClick={handleSendOtp}
                  disabled={isLoading || !phone || !termsAccepted}
                >
                  {isLoading ? "در حال ارسال..." : "ارسال کد تأیید"}
                </Button>
              )}
            </CardFooter>
          </form>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          قبلاً ثبت‌نام کرده‌اید؟{" "}
          <Link href="/auth/login" className="text-primary underline-offset-4 hover:underline">
            وارد شوید
          </Link>
        </p>
      </div>
    </div>
  )
}

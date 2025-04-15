"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/components/providers/auth-provider"
import { GoogleLoginButton } from "@/components/auth/google-login-button"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get("redirect") || "/"

  const { loginWithPhone } = useAuth()

  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSendOtp = async () => {
    if (!phone || phone.length < 10) {
      setError("لطفاً شماره موبایل معتبر وارد کنید")
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

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!otp || otp.length < 4) {
      setError("لطفاً کد تأیید را وارد کنید")
      return
    }

    setError("")
    setIsLoading(true)

    try {
      await loginWithPhone(phone, otp)
      router.push(redirectUrl)
    } catch (error) {
      setError("ورود ناموفق بود. لطفاً دوباره تلاش کنید.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">ورود به حساب کاربری</h1>
          <p className="text-sm text-muted-foreground">برای ورود به حساب کاربری خود، شماره موبایل خود را وارد کنید.</p>
        </div>

        <GoogleLoginButton redirectUrl={redirectUrl} />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">یا</span>
          </div>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">ورود با شماره موبایل</CardTitle>
            <CardDescription>شماره موبایل خود را وارد کنید تا کد تأیید برای شما ارسال شود.</CardDescription>
          </CardHeader>
          <form onSubmit={handlePhoneLogin}>
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
                    <Button type="button" onClick={handleSendOtp} disabled={isLoading || !phone}>
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

              {error && <div className="text-sm font-medium text-destructive">{error}</div>}
            </CardContent>
            <CardFooter>
              {otpSent ? (
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "در حال ورود..." : "ورود"}
                </Button>
              ) : (
                <Button type="button" className="w-full" onClick={handleSendOtp} disabled={isLoading || !phone}>
                  {isLoading ? "در حال ارسال..." : "ارسال کد تأیید"}
                </Button>
              )}
            </CardFooter>
          </form>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          حساب کاربری ندارید؟{" "}
          <Link href="/auth/register" className="text-primary underline-offset-4 hover:underline">
            ثبت نام کنید
          </Link>
        </p>
      </div>
    </div>
  )
}

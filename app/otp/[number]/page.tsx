"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getOtp } from "@/lib/api/otp"
import { Copy, Check, ArrowLeft, RefreshCw } from "lucide-react"
import { OtpSkeleton } from "@/components/skeletons/otp-skeleton"

export default function OtpPage() {
  const params = useParams()
  const router = useRouter()
  const [otp, setOtp] = useState<string | null>(null)
  const [expiresAt, setExpiresAt] = useState<Date | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCopied, setIsCopied] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [timeLeft, setTimeLeft] = useState<string>("")

  const number = decodeURIComponent(params.number as string)

  useEffect(() => {
    async function fetchOtp() {
      setIsLoading(true)
      try {
        const { otp, expiresAt } = await getOtp(number)
        setOtp(otp)
        setExpiresAt(expiresAt)
      } catch (error) {
        console.error("Failed to fetch OTP:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOtp()
  }, [number])

  useEffect(() => {
    if (!expiresAt) return

    const intervalId = setInterval(() => {
      const now = new Date()
      const diff = expiresAt.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeLeft("منقضی شده")
        clearInterval(intervalId)
      } else {
        const minutes = Math.floor(diff / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        setTimeLeft(`${minutes}:${seconds.toString().padStart(2, "0")}`)
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [expiresAt])

  const handleCopyOtp = () => {
    if (!otp) return

    navigator.clipboard.writeText(otp)
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  const handleRefreshOtp = async () => {
    setIsRefreshing(true)
    try {
      const { otp, expiresAt } = await getOtp(number)
      setOtp(otp)
      setExpiresAt(expiresAt)
    } catch (error) {
      console.error("Failed to refresh OTP:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  if (isLoading) {
    return <OtpSkeleton />
  }

  return (
    <div className="container max-w-md mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">کد تأیید</CardTitle>
          <CardDescription className="text-center">کد تأیید برای شماره {number} دریافت شد</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="text-sm text-muted-foreground">
            این کد تا <span className="font-medium">{timeLeft}</span> دیگر معتبر است
          </div>

          <div className="otp-code">{otp}</div>

          <Button onClick={handleCopyOtp} className="otp-copy-button" disabled={isCopied}>
            {isCopied ? (
              <>
                <Check className="h-4 w-4" />
                کپی شد
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                کپی کد
              </>
            )}
          </Button>

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 ml-2 flip-x" />
              بازگشت
            </Button>

            <Button variant="outline" onClick={handleRefreshOtp} disabled={isRefreshing}>
              {isRefreshing ? (
                <RefreshCw className="h-4 w-4 ml-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 ml-2" />
              )}
              دریافت مجدد
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

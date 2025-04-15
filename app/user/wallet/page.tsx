"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Wallet, Transaction } from "@/types/wallet"
import { getWalletBalance, getWalletTransactions, topUpWallet } from "@/lib/api/wallet"
import { formatDate } from "@/lib/utils"
import { PlusCircle, MinusCircle, RefreshCw, WalletIcon } from "lucide-react"
import { WalletSkeleton } from "@/components/skeletons/wallet-skeleton"

export default function WalletPage() {
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isTopUpLoading, setIsTopUpLoading] = useState(false)
  const [topUpAmount, setTopUpAmount] = useState<number>(10000)
  const [activeTab, setActiveTab] = useState("balance")

  useEffect(() => {
    async function loadWalletData() {
      setIsLoading(true)
      try {
        const [walletData, transactionsData] = await Promise.all([getWalletBalance(), getWalletTransactions()])
        setWallet(walletData)
        setTransactions(transactionsData)
      } catch (error) {
        console.error("Failed to load wallet data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadWalletData()
  }, [])

  const handleTopUp = async () => {
    if (!topUpAmount || topUpAmount <= 0) return

    setIsTopUpLoading(true)
    try {
      const updatedWallet = await topUpWallet(topUpAmount)
      setWallet(updatedWallet)

      // Refresh transactions
      const updatedTransactions = await getWalletTransactions()
      setTransactions(updatedTransactions)

      // Reset amount
      setTopUpAmount(10000)

      // Switch to transactions tab
      setActiveTab("transactions")
    } catch (error) {
      console.error("Failed to top up wallet:", error)
    } finally {
      setIsTopUpLoading(false)
    }
  }

  if (isLoading) {
    return <WalletSkeleton />
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">کیف پول</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="balance">موجودی و شارژ</TabsTrigger>
          <TabsTrigger value="transactions">تاریخچه تراکنش‌ها</TabsTrigger>
        </TabsList>

        <TabsContent value="balance" className="space-y-6 mt-6">
          <Card className="wallet-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <WalletIcon className="h-6 w-6 text-primary" />
                موجودی کیف پول
              </CardTitle>
              <CardDescription>موجودی فعلی کیف پول شما و امکان شارژ آن</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-muted/30 rounded-lg text-center">
                <div className="text-sm text-muted-foreground mb-2">موجودی فعلی</div>
                <div className="wallet-balance">{wallet?.balance.toLocaleString()} تومان</div>
                <div className="text-xs text-muted-foreground mt-2">
                  آخرین بروزرسانی: {formatDate(wallet?.updatedAt || new Date())}
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="topup-amount">مبلغ شارژ (تومان)</Label>
                <div className="flex gap-2">
                  <Input
                    id="topup-amount"
                    type="number"
                    min="10000"
                    step="10000"
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(Number(e.target.value))}
                    className="text-left ltr"
                  />
                  <Button onClick={handleTopUp} disabled={isTopUpLoading} className="btn-hover-effect">
                    {isTopUpLoading ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <PlusCircle className="h-4 w-4 ml-2" />
                    )}
                    شارژ کیف پول
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setTopUpAmount(10000)}
                  className={topUpAmount === 10000 ? "border-primary text-primary" : ""}
                >
                  ۱۰,۰۰۰ تومان
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setTopUpAmount(50000)}
                  className={topUpAmount === 50000 ? "border-primary text-primary" : ""}
                >
                  ۵۰,۰۰۰ تومان
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setTopUpAmount(100000)}
                  className={topUpAmount === 100000 ? "border-primary text-primary" : ""}
                >
                  ۱۰۰,۰۰۰ تومان
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>تاریخچه تراکنش‌ها</CardTitle>
              <CardDescription>لیست تراکنش‌های اخیر کیف پول شما</CardDescription>
            </CardHeader>
            <CardContent>
              {transactions.length > 0 ? (
                <div className="space-y-1">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="wallet-transaction">
                      <div className="flex items-center gap-3">
                        {transaction.type === "topup" ? (
                          <PlusCircle className="h-5 w-5 text-success" />
                        ) : transaction.type === "refund" ? (
                          <RefreshCw className="h-5 w-5 text-success" />
                        ) : (
                          <MinusCircle className="h-5 w-5 text-destructive" />
                        )}
                        <div>
                          <div className="font-medium">{transaction.description}</div>
                          <div className="text-xs text-muted-foreground">{formatDate(transaction.createdAt)}</div>
                        </div>
                      </div>
                      <div
                        className={
                          transaction.type === "purchase" ? "transaction-amount-debit" : "transaction-amount-credit"
                        }
                      >
                        {transaction.type === "purchase" ? "-" : "+"}
                        {transaction.amount.toLocaleString()} تومان
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">هنوز هیچ تراکنشی انجام نداده‌اید.</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">تعداد تراکنش‌ها: {transactions.length}</div>
              <div className="text-sm font-medium">موجودی فعلی: {wallet?.balance.toLocaleString()} تومان</div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function WalletSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-10 w-40 skeleton-shimmer rounded-md"></div>

      <Tabs defaultValue="balance" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="balance" className="skeleton-shimmer">
            موجودی و شارژ
          </TabsTrigger>
          <TabsTrigger value="transactions" className="skeleton-shimmer">
            تاریخچه تراکنش‌ها
          </TabsTrigger>
        </TabsList>

        <TabsContent value="balance" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="h-6 w-48 skeleton-shimmer rounded-md mb-2"></div>
              <div className="h-4 w-64 skeleton-shimmer rounded-md"></div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-muted/30 rounded-lg">
                <div className="h-4 w-32 skeleton-shimmer rounded-md mx-auto mb-3"></div>
                <div className="h-8 w-48 skeleton-shimmer rounded-md mx-auto"></div>
                <div className="h-3 w-40 skeleton-shimmer rounded-md mx-auto mt-3"></div>
              </div>

              <div className="space-y-4">
                <div className="h-5 w-36 skeleton-shimmer rounded-md"></div>
                <div className="flex gap-2">
                  <div className="h-10 flex-1 skeleton-shimmer rounded-md"></div>
                  <div className="h-10 w-32 skeleton-shimmer rounded-md"></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="h-10 skeleton-shimmer rounded-md"></div>
                <div className="h-10 skeleton-shimmer rounded-md"></div>
                <div className="h-10 skeleton-shimmer rounded-md"></div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="h-6 w-48 skeleton-shimmer rounded-md mb-2"></div>
              <div className="h-4 w-64 skeleton-shimmer rounded-md"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="h-5 w-5 skeleton-shimmer rounded-full"></div>
                      <div>
                        <div className="h-5 w-40 skeleton-shimmer rounded-md mb-1"></div>
                        <div className="h-3 w-24 skeleton-shimmer rounded-md"></div>
                      </div>
                    </div>
                    <div className="h-5 w-24 skeleton-shimmer rounded-md"></div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="h-4 w-32 skeleton-shimmer rounded-md"></div>
              <div className="h-4 w-40 skeleton-shimmer rounded-md"></div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

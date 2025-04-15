import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function OtpSkeleton() {
  return (
    <div className="container max-w-md mx-auto py-12">
      <Card className="skeleton-shimmer">
        <CardHeader>
          <div className="h-6 w-48 rounded-md mx-auto mb-2"></div>
          <div className="h-4 w-64 rounded-md mx-auto"></div>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="h-5 w-48 rounded-md mx-auto"></div>
          <div className="h-12 w-32 rounded-md mx-auto my-6"></div>
          <div className="h-10 w-32 rounded-md mx-auto"></div>
          <div className="h-10 w-full rounded-md"></div>
        </CardContent>
      </Card>
    </div>
  )
}

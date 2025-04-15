import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function ChatSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-10 w-40 skeleton-shimmer rounded-md"></div>

      <Card className="h-[calc(100vh-250px)] flex flex-col skeleton-shimmer">
        <CardHeader>
          <div className="h-6 w-48 rounded-md mb-2"></div>
          <div className="h-4 w-64 rounded-md"></div>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          <div className="chat-container h-full">
            <div className="chat-messages">
              <div className="chat-message chat-message-support w-3/4 skeleton-shimmer">
                <div className="h-16 rounded-md"></div>
                <div className="h-3 w-16 mt-1 rounded-md"></div>
              </div>

              <div className="chat-message chat-message-user w-3/4 skeleton-shimmer">
                <div className="h-8 rounded-md"></div>
                <div className="h-3 w-16 mt-1 rounded-md mr-auto"></div>
              </div>

              <div className="chat-message chat-message-support w-3/4 skeleton-shimmer">
                <div className="h-12 rounded-md"></div>
                <div className="h-3 w-16 mt-1 rounded-md"></div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t p-0">
          <div className="flex items-center p-3 w-full">
            <div className="h-10 flex-1 rounded-md"></div>
            <div className="h-10 w-10 rounded-md ml-2"></div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

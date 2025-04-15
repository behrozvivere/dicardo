"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { ChatSession } from "@/types/chat"
import { getChatSession, sendMessage } from "@/lib/api/chat"
import { formatTime } from "@/lib/utils"
import { Send, RefreshCw } from "lucide-react"
import { ChatSkeleton } from "@/components/skeletons/chat-skeleton"

export default function SupportPage() {
  const [chatSession, setChatSession] = useState<ChatSession | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function loadChatSession() {
      setIsLoading(true)
      try {
        const session = await getChatSession()
        setChatSession(session)
      } catch (error) {
        console.error("Failed to load chat session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadChatSession()

    // Poll for new messages every 10 seconds
    const intervalId = setInterval(async () => {
      if (!isSending) {
        try {
          const session = await getChatSession()
          setChatSession(session)
        } catch (error) {
          console.error("Failed to poll chat session:", error)
        }
      }
    }, 10000)

    return () => clearInterval(intervalId)
  }, [isSending])

  useEffect(() => {
    // Scroll to bottom when messages change
    scrollToBottom()
  }, [chatSession?.messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim()) return

    setIsSending(true)
    try {
      await sendMessage(newMessage)
      setNewMessage("")

      // Refresh chat session
      const session = await getChatSession()
      setChatSession(session)
    } catch (error) {
      console.error("Failed to send message:", error)
    } finally {
      setIsSending(false)
    }
  }

  if (isLoading) {
    return <ChatSkeleton />
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">پشتیبانی</h1>

      <Card className="h-[calc(100vh-250px)] flex flex-col">
        <CardHeader>
          <CardTitle>گفتگو با پشتیبانی</CardTitle>
          <CardDescription>سوالات خود را با کارشناسان ما در میان بگذارید</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          <div className="chat-container h-full" ref={chatContainerRef}>
            <div className="chat-messages">
              {chatSession?.messages.map((message) => (
                <div
                  key={message.id}
                  className={`chat-message ${message.sender === "user" ? "chat-message-user" : "chat-message-support"}`}
                >
                  <div>{message.content}</div>
                  <div className={`chat-timestamp ${message.sender === "user" ? "text-right" : "text-left"}`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t p-0">
          <form onSubmit={handleSendMessage} className="w-full">
            <div className="flex items-center p-3">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="پیام خود را بنویسید..."
                className="flex-1"
                disabled={isSending}
              />
              <Button type="submit" size="icon" className="ml-2" disabled={isSending}>
                {isSending ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}

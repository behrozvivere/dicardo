"use client"

import Link from "next/link"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"

// Mock data for virtual numbers
const numbers = {
  us: [
    { id: 1, number: "+1 (555) 123-4567", location: "New York", price: 4.99, popular: true },
    { id: 2, number: "+1 (555) 987-6543", location: "Los Angeles", price: 4.99 },
    { id: 3, number: "+1 (555) 456-7890", location: "Chicago", price: 4.99 },
    { id: 4, number: "+1 (555) 234-5678", location: "Miami", price: 5.99, popular: true },
  ],
  uk: [
    { id: 5, number: "+44 20 1234 5678", location: "London", price: 5.99, popular: true },
    { id: 6, number: "+44 11 8765 4321", location: "Manchester", price: 5.49 },
    { id: 7, number: "+44 13 1234 5678", location: "Edinburgh", price: 5.49 },
    { id: 8, number: "+44 12 3456 7890", location: "Birmingham", price: 5.49 },
  ],
  canada: [
    { id: 9, number: "+1 (416) 123-4567", location: "Toronto", price: 4.99, popular: true },
    { id: 10, number: "+1 (604) 987-6543", location: "Vancouver", price: 4.99 },
    { id: 11, number: "+1 (514) 456-7890", location: "Montreal", price: 4.99 },
    { id: 12, number: "+1 (403) 234-5678", location: "Calgary", price: 4.99 },
  ],
}

export default function FeaturedNumbers() {
  const [activeTab, setActiveTab] = useState("us")

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Numbers</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Browse our selection of premium virtual phone numbers from around the world.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-5xl">
          <Tabs defaultValue="us" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center">
              <TabsList>
                <TabsTrigger value="us">United States</TabsTrigger>
                <TabsTrigger value="uk">United Kingdom</TabsTrigger>
                <TabsTrigger value="canada">Canada</TabsTrigger>
              </TabsList>
            </div>
            {Object.entries(numbers).map(([country, countryNumbers]) => (
              <TabsContent key={country} value={country} className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {countryNumbers.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <CardHeader className="p-4">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg font-mono">{item.number}</CardTitle>
                          {item.popular && (
                            <Badge variant="secondary" className="ml-2">
                              Popular
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground">{item.location}</p>
                      </CardContent>
                      <CardFooter className="p-4 flex items-center justify-between bg-muted/50">
                        <span className="font-medium">${item.price}/mo</span>
                        <Button size="sm">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <Button asChild size="lg">
                    <Link href={`/numbers/${activeTab}`}>View All {activeTab.toUpperCase()} Numbers</Link>
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  )
}

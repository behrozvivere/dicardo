import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Search } from "lucide-react"

export const metadata: Metadata = {
  title: "Browse Virtual Numbers - VirtualDigits",
  description: "Browse and purchase virtual phone numbers from around the world.",
}

// Mock data for virtual numbers
const numbers = [
  { id: 1, number: "+1 (555) 123-4567", location: "New York, USA", price: 4.99, popular: true },
  { id: 2, number: "+1 (555) 987-6543", location: "Los Angeles, USA", price: 4.99 },
  { id: 3, number: "+1 (555) 456-7890", location: "Chicago, USA", price: 4.99 },
  { id: 4, number: "+1 (555) 234-5678", location: "Miami, USA", price: 5.99, popular: true },
  { id: 5, number: "+44 20 1234 5678", location: "London, UK", price: 5.99, popular: true },
  { id: 6, number: "+44 11 8765 4321", location: "Manchester, UK", price: 5.49 },
  { id: 7, number: "+44 13 1234 5678", location: "Edinburgh, UK", price: 5.49 },
  { id: 8, number: "+44 12 3456 7890", location: "Birmingham, UK", price: 5.49 },
  { id: 9, number: "+1 (416) 123-4567", location: "Toronto, Canada", price: 4.99, popular: true },
  { id: 10, number: "+1 (604) 987-6543", location: "Vancouver, Canada", price: 4.99 },
  { id: 11, number: "+1 (514) 456-7890", location: "Montreal, Canada", price: 4.99 },
  { id: 12, number: "+1 (403) 234-5678", location: "Calgary, Canada", price: 4.99 },
]

export default function NumbersPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Browse Virtual Numbers
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Find and purchase your perfect virtual phone number from our global inventory.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr]">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-bold">Filters</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="country" className="text-sm font-medium">
                      Country
                    </label>
                    <Select defaultValue="all">
                      <SelectTrigger id="country">
                        <SelectValue placeholder="All Countries" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Countries</SelectItem>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="type" className="text-sm font-medium">
                      Number Type
                    </label>
                    <Select defaultValue="all">
                      <SelectTrigger id="type">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="mobile">Mobile</SelectItem>
                        <SelectItem value="landline">Landline</SelectItem>
                        <SelectItem value="tollfree">Toll Free</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="price" className="text-sm font-medium">
                      Price Range
                    </label>
                    <Select defaultValue="all">
                      <SelectTrigger id="price">
                        <SelectValue placeholder="All Prices" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Prices</SelectItem>
                        <SelectItem value="0-5">$0 - $5</SelectItem>
                        <SelectItem value="5-10">$5 - $10</SelectItem>
                        <SelectItem value="10+">$10+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="features" className="text-sm font-medium">
                      Features
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="sms" className="h-4 w-4 rounded border-gray-300" />
                        <label htmlFor="sms" className="text-sm">
                          SMS Support
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="mms" className="h-4 w-4 rounded border-gray-300" />
                        <label htmlFor="mms" className="text-sm">
                          MMS Support
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="voicemail" className="h-4 w-4 rounded border-gray-300" />
                        <label htmlFor="voicemail" className="text-sm">
                          Voicemail
                        </label>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">Apply Filters</Button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search numbers..." className="pl-8 w-full sm:w-[300px]" />
                </div>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {numbers.map((item) => (
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

              <div className="flex justify-center">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" disabled>
                    <span className="sr-only">Previous page</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </Button>
                  <Button variant="outline" size="sm" className="font-medium">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="icon">
                    <span className="sr-only">Next page</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

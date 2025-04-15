import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, ShoppingCart, ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Virtual Number Details - VirtualDigits",
  description: "View details and purchase this virtual phone number.",
}

export default function NumberDetailPage({ params }: { params: { id: string } }) {
  // Mock data for a specific number
  const number = {
    id: params.id,
    number: "+1 (555) 123-4567",
    location: "New York, USA",
    price: 4.99,
    setupFee: 0,
    popular: true,
    features: [
      "Unlimited incoming calls",
      "Call forwarding to any device",
      "Voicemail to email",
      "SMS support",
      "Web-based management",
      "24/7 customer support",
    ],
    specifications: {
      type: "Mobile",
      country: "United States",
      area: "New York",
      smsSupport: true,
      mmsSupport: true,
      voicemail: true,
    },
  }

  return (
    <main className="flex min-h-screen flex-col">
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/numbers">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Back to numbers</span>
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground">Back to numbers</p>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{number.number}</h1>
              <div className="flex items-center gap-2">
                <p className="text-muted-foreground">{number.location}</p>
                {number.popular && <Badge variant="secondary">Popular</Badge>}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 md:grid-cols-[1fr_350px]">
            <div className="space-y-8">
              <Tabs defaultValue="features" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="specifications">Specifications</TabsTrigger>
                </TabsList>
                <TabsContent value="features" className="space-y-4 pt-4">
                  <h2 className="text-2xl font-bold">Features</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {number.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="specifications" className="space-y-4 pt-4">
                  <h2 className="text-2xl font-bold">Specifications</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Number Type</span>
                        <span>{number.specifications.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Country</span>
                        <span>{number.specifications.country}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Area</span>
                        <span>{number.specifications.area}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">SMS Support</span>
                        <span>{number.specifications.smsSupport ? "Yes" : "No"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">MMS Support</span>
                        <span>{number.specifications.mmsSupport ? "Yes" : "No"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Voicemail</span>
                        <span>{number.specifications.voicemail ? "Yes" : "No"}</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Description</h2>
                <p className="text-muted-foreground">
                  This virtual number from {number.location} provides you with a reliable and flexible communication
                  solution. Perfect for business or personal use, this number comes with all the features you need to
                  stay connected.
                </p>
                <p className="text-muted-foreground">
                  With unlimited incoming calls, SMS support, and easy call forwarding, you can manage your
                  communications from anywhere in the world. The number is activated instantly after purchase, allowing
                  you to start using it right away.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Related Numbers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg font-mono">+1 (555) 987-6543</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">Los Angeles, USA</p>
                    </CardContent>
                    <CardFooter className="p-4 flex items-center justify-between bg-muted/50">
                      <span className="font-medium">$4.99/mo</span>
                      <Button size="sm" variant="outline" asChild>
                        <Link href="/numbers/2">View</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg font-mono">+1 (555) 456-7890</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">Chicago, USA</p>
                    </CardContent>
                    <CardFooter className="p-4 flex items-center justify-between bg-muted/50">
                      <span className="font-medium">$4.99/mo</span>
                      <Button size="sm" variant="outline" asChild>
                        <Link href="/numbers/3">View</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader className="p-4 md:p-6">
                  <CardTitle>Purchase This Number</CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monthly Fee</span>
                      <span className="font-medium">${number.price.toFixed(2)}/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Setup Fee</span>
                      <span className="font-medium">${number.setupFee.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Due Today</span>
                    <span>${(number.price + number.setupFee).toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 md:p-6 flex flex-col gap-2">
                  <Button className="w-full" size="lg">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/cart">View Cart</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="p-4 md:p-6">
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  <p className="text-sm text-muted-foreground">
                    If you have questions about this number or need assistance with your purchase, our support team is
                    here to help.
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Email:</span>
                      <a href="mailto:support@virtualdigits.com" className="text-primary hover:underline">
                        support@virtualdigits.com
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Phone:</span>
                      <a href="tel:+18001234567" className="text-primary hover:underline">
                        +1 (800) 123-4567
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

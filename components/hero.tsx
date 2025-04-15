import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Get Your Virtual Phone Number Today
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Global coverage, instant activation, and competitive pricing. Perfect for business, privacy, or
                international calling.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="text" placeholder="Search by country or area code..." className="pl-8 w-full" />
              </div>
              <Button size="lg" className="sm:w-auto">
                Find Numbers
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              <span>Popular:</span>
              <Link href="/numbers/us" className="underline hover:text-primary">
                USA
              </Link>
              <Link href="/numbers/uk" className="underline hover:text-primary">
                UK
              </Link>
              <Link href="/numbers/canada" className="underline hover:text-primary">
                Canada
              </Link>
              <Link href="/numbers/australia" className="underline hover:text-primary">
                Australia
              </Link>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[400px] aspect-square rounded-lg overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40 rounded-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-background/95 backdrop-blur-sm p-6 rounded-lg shadow-lg max-w-[300px] w-full">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold">US Number</h3>
                        <p className="text-2xl font-mono">+1 (555) 123-4567</p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Monthly fee</span>
                          <span className="font-medium">$4.99</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Setup fee</span>
                          <span className="font-medium">$0.00</span>
                        </div>
                      </div>
                      <Button className="w-full">Add to Cart</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function HeroSection() {
  return (
    <section className="w-full py-20 md:py-28 lg:py-36 hero-gradient overflow-hidden relative">
      <div className="container px-4 md:px-6 relative z-10">
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            className="flex flex-col justify-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-4">
              <motion.h1
                className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                شماره مجازی برای تمام پلتفرم‌ها
              </motion.h1>
              <motion.p
                className="text-muted-foreground md:text-xl max-w-[600px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                با شماره مجازی ما، به راحتی در تمام پلتفرم‌ها ثبت‌نام کنید و از خدمات آنها بهره‌مند شوید.
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="جستجو بر اساس پلتفرم یا کشور..."
                  className="pr-10 w-full h-12 bg-background/80 backdrop-blur-sm border-background/20"
                />
              </div>
              <Button size="lg" className="btn-hover-effect h-12">
                جستجو
              </Button>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-3 text-sm text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span>پلتفرم‌های محبوب:</span>
              <Link href="/shop?platform=spotify" className="text-primary hover:underline">
                اسپاتیفای
              </Link>
              <Link href="/shop?platform=telegram" className="text-primary hover:underline">
                تلگرام
              </Link>
              <Link href="/shop?platform=whatsapp" className="text-primary hover:underline">
                واتساپ
              </Link>
              <Link href="/shop?platform=instagram" className="text-primary hover:underline">
                اینستاگرام
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-full max-w-[450px] aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-background/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="glass-effect p-6 rounded-xl shadow-lg max-w-[320px] w-full">
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold">شماره اسپاتیفای</h3>
                        <p className="text-2xl font-mono ltr">+1 (555) 123-4567</p>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">هزینه ماهانه</span>
                          <span className="font-medium">۷,۵۰۰ تومان</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">هزینه راه‌اندازی</span>
                          <span className="font-medium">رایگان</span>
                        </div>
                      </div>
                      <Button className="w-full btn-hover-effect">
                        افزودن به سبد خرید
                        <ArrowRight className="mr-2 h-4 w-4 flip-x" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

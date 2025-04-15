import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Check, Globe, Phone, Shield } from "lucide-react"
import HeroSection from "@/components/home/HeroSection"
import FeaturedNumbers from "@/components/home/FeaturedNumbers"
import { generateMetadata } from "@/lib/utils"

export const metadata: Metadata = generateMetadata(
  "شماره مجازی - خرید شماره مجازی برای تمام پلتفرم‌ها",
  "خرید شماره مجازی برای پلتفرم‌های مختلف مانند اسپاتیفای، تلگرام، واتساپ و اینستاگرام با قیمت مناسب و فعال‌سازی آنی",
  ["شماره مجازی", "خرید شماره مجازی", "اسپاتیفای", "تلگرام", "واتساپ", "اینستاگرام"],
  "/og-image.jpg",
)

export default function Home() {
  // Features section data
  const features = [
    {
      icon: <Globe className="h-10 w-10" />,
      title: "پوشش جهانی",
      description: "شماره‌های مجازی از بیش از ۵۰ کشور مختلف در سراسر جهان",
    },
    {
      icon: <Check className="h-10 w-10" />,
      title: "فعال‌سازی آنی",
      description: "دریافت شماره مجازی بلافاصله پس از خرید بدون نیاز به مدارک",
    },
    {
      icon: <Phone className="h-10 w-10" />,
      title: "پشتیبانی از تمام پلتفرم‌ها",
      description: "قابل استفاده در اسپاتیفای، تلگرام، واتساپ، اینستاگرام و...",
    },
    {
      icon: <Shield className="h-10 w-10" />,
      title: "امنیت و حریم خصوصی",
      description: "حفظ حریم خصوصی شما با استفاده از شماره مجازی به جای شماره شخصی",
    },
  ]

  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />

      {/* Product Categories Section */}
      <section className="w-full py-16 md:py-24 section-margin">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">خدمات ما</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                انواع شماره‌های مجازی و دائمی برای نیازهای مختلف شما
              </p>
            </div>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col items-center p-6 text-center bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg border border-primary/10 shadow-sm hover:shadow-md transition-all duration-300">
              <Phone className="h-16 w-16 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-2">شماره‌های مجازی</h3>
              <p className="text-muted-foreground mb-6">
                شماره‌های موقت با قیمت مناسب برای استفاده در پلتفرم‌های مختلف. مناسب برای تأیید حساب‌های کاربری و دریافت
                پیامک.
              </p>
              <Button asChild size="lg" className="btn-hover-effect">
                <Link href="/shop?type=virtual">مشاهده شماره‌های مجازی</Link>
              </Button>
            </div>

            <div className="flex flex-col items-center p-6 text-center bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-lg border border-secondary/10 shadow-sm hover:shadow-md transition-all duration-300">
              <Phone className="h-16 w-16 text-secondary mb-4" />
              <h3 className="text-2xl font-bold mb-2">شماره‌های دائمی</h3>
              <p className="text-muted-foreground mb-6">
                شماره‌های دائمی با مالکیت کامل برای استفاده طولانی مدت. مناسب برای کسب و کارها و استفاده‌های حرفه‌ای.
              </p>
              <Button asChild size="lg" variant="secondary" className="btn-hover-effect">
                <Link href="/shop?type=permanent">مشاهده شماره‌های دائمی</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <FeaturedNumbers />

      {/* Features Section */}
      <section className="w-full py-16 md:py-24 bg-muted/50 section-margin">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">ویژگی‌های ما</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                چرا باید از خدمات شماره مجازی ما استفاده کنید؟
              </p>
            </div>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-4 text-center p-6 bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24 gradient-primary section-margin">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                آماده خرید شماره مجازی هستید؟
              </h2>
              <p className="max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                به هزاران کاربر راضی بپیوندید که از شماره‌های مجازی ما استفاده می‌کنند.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 btn-hover-effect"
              >
                <Link href="/shop">مشاهده شماره‌ها</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 btn-hover-effect"
              >
                <Link href="/user/support">گفتگو با پشتیبانی</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

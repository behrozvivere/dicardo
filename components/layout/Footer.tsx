import Link from "next/link"
import { Phone, Mail, MapPin, Instagram, Twitter, Linkedin, Facebook } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <span className="text-xl font-bold">شماره مجازی</span>
            </div>
            <p className="text-sm text-muted-foreground">
              ارائه دهنده شماره های مجازی با پشتیبانی ۲۴ ساعته و قیمت مناسب
            </p>
            <div className="flex items-center gap-4">
              <Link href="https://instagram.com" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://twitter.com" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://linkedin.com" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="https://facebook.com" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">دسترسی سریع</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  صفحه اصلی
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-muted-foreground hover:text-foreground transition-colors">
                  فروشگاه
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  درباره ما
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  تماس با ما
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">خدمات</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/shop?platform=spotify"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  شماره مجازی اسپاتیفای
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?platform=telegram"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  شماره مجازی تلگرام
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?platform=whatsapp"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  شماره مجازی واتساپ
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?platform=instagram"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  شماره مجازی اینستاگرام
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">تماس با ما</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">۰۲۱-۱۲۳۴۵۶۷۸</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">info@virtualnumber.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                <span className="text-muted-foreground">تهران، خیابان ولیعصر، برج ساعت، طبقه ۱۰، واحد ۳</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} شماره مجازی. تمامی حقوق محفوظ است.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              قوانین و مقررات
            </Link>
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              حریم خصوصی
            </Link>
            <Link href="/faq" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              سوالات متداول
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

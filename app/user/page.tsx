import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function UserProfilePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">پروفایل کاربری</h1>

      <Card>
        <CardHeader>
          <CardTitle>خوش آمدید</CardTitle>
          <CardDescription>
            به پنل کاربری خود خوش آمدید. از اینجا می‌توانید سفارشات خود را مدیریت کنید و تنظیمات حساب خود را تغییر دهید.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">سفارشات اخیر</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">هنوز هیچ سفارشی ثبت نکرده‌اید.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">اطلاعات حساب</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">شماره موبایل:</span>
                    <span className="text-sm text-muted-foreground">۰۹۱۲۳۴۵۶۷۸۹</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">تاریخ عضویت:</span>
                    <span className="text-sm text-muted-foreground">۱۴۰۲/۰۱/۰۱</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

import { CheckCircle2, Globe, Phone, Shield } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: <Globe className="h-10 w-10" />,
      title: "Choose Your Number",
      description: "Browse our selection of virtual numbers from over 50 countries worldwide.",
    },
    {
      icon: <CheckCircle2 className="h-10 w-10" />,
      title: "Instant Activation",
      description: "Get your number activated instantly after purchase with no paperwork.",
    },
    {
      icon: <Phone className="h-10 w-10" />,
      title: "Start Receiving Calls",
      description: "Forward calls to your existing phone or use our mobile app to answer.",
    },
    {
      icon: <Shield className="h-10 w-10" />,
      title: "Privacy Protected",
      description: "Keep your personal number private while maintaining communication.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Get your virtual phone number in minutes with our simple process.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                {step.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

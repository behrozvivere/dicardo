"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQ() {
  const faqs = [
    {
      question: "What is a virtual phone number?",
      answer:
        "A virtual phone number is a telephone number that is not directly associated with a specific phone line. Instead, it forwards incoming calls to one of the pre-set telephone numbers chosen by the client.",
    },
    {
      question: "How quickly can I get my virtual number?",
      answer:
        "Most virtual numbers are activated instantly after purchase. Some countries may require additional verification which can take 1-2 business days.",
    },
    {
      question: "Can I keep my virtual number if I cancel my subscription?",
      answer:
        "No, virtual numbers are tied to active subscriptions. If you cancel your subscription, the number will be released back into our pool after a grace period.",
    },
    {
      question: "Can I send and receive SMS with my virtual number?",
      answer:
        "Yes, most of our virtual numbers support SMS functionality. Check the specific number details before purchase to confirm SMS capabilities.",
    },
    {
      question: "Do I need to provide ID verification?",
      answer:
        "Some countries require ID verification due to local regulations. This will be clearly indicated during the purchase process if applicable.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and cryptocurrency payments including Bitcoin and Ethereum.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find answers to common questions about our virtual number service.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

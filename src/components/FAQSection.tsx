"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function FAQSection() {
  const [askDialogOpen, setAskDialogOpen] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const faqs = [
    {
      question: "What should I bring to the hackathon?",
      answer:
        "You should bring your laptop, charger, any necessary adapters, a water bottle, and personal items for an overnight stay. Food and drinks will be provided throughout the event. Consider bringing a change of clothes and toiletries for a more comfortable experience.",
    },
    {
      question: "Do I need to have a team before registering?",
      answer:
        "While it's recommended to form a team before registering, you can also register individually and we'll help you find team members during the team formation phase. Teams must have 3-4 members to participate in the hackathon.",
    },
    {
      question: "What technical resources will be provided?",
      answer:
        "We'll provide high-speed Wi-Fi, power outlets, workspace, and mentor support. You'll need to bring your own devices (laptops, etc.). Some cloud resources and APIs may be available through our sponsors.",
    },
    {
      question: "Can I participate remotely?",
      answer:
        "DevOlympus is an in-person hackathon held at Dronacharya College of Engineering. All team members must be physically present for the entire duration of the event to qualify for prizes and certificates.",
    },
    {
      question: "What happens after my team is selected?",
      answer:
        "Selected teams will receive official confirmation via email with detailed instructions, venue information, and any pre-hackathon requirements. Make sure to arrive on time for the check-in on the day of the event.",
    },
    {
      question: "Are there any prerequisites for participating?",
      answer:
        "No specific technical prerequisites are required, but basic programming knowledge is recommended. Teams with diverse skill sets (coding, design, business) often perform better. Come with enthusiasm and a willingness to learn!",
    },
    {
      question: "What kind of projects can we build?",
      answer:
        "You can build any type of software project that aligns with the event themes, which will be announced closer to the hackathon date. Projects can range from web and mobile applications to hardware integrations, AI solutions, and more.",
    },
  ];

  return (
    <section id="faqs" ref={ref} className="relative py-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text font-bold text-transparent">
              Questions
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-300">
            Get answers to common questions about DevOlympus
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-slate-800/30 rounded-lg border border-slate-700 px-4 overflow-hidden backdrop-blur-sm"
              >
                <AccordionTrigger className="py-4 hover:no-underline">
                  <div className="font-medium text-left">{faq.question}</div>
                </AccordionTrigger>
                <AccordionContent className="text-slate-300 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-10 text-center">
            <Dialog open={askDialogOpen} onOpenChange={setAskDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-slate-700 hover:bg-slate-800 gap-2"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Ask a Question</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-700 text-white">
                <DialogHeader>
                  <DialogTitle>Ask Your Question</DialogTitle>
                  <DialogDescription className="text-slate-400">
                    Submit your question about DevOlympus and we&apos;ll get back to
                    you.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      className="bg-slate-800 border-slate-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="question">Your Question</Label>
                    <Textarea
                      id="question"
                      placeholder="Type your question here..."
                      className="bg-slate-800 border-slate-700 min-h-32"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white"
                    onClick={() => setAskDialogOpen(false)}
                  >
                    Submit Question
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

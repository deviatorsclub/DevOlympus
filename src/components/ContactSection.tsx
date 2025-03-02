"use client";

import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SimplifiedContactSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-20 bg-slate-900/50 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get in{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text font-bold text-transparent">
              Touch
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-300">
            Have questions? Reach out to us
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-slate-800/30 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Contact Information
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Get in touch with the Deviators team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a
                        href="mailto:clubdeviators@gmail.com"
                        className="hover:text-primary transition-colors"
                      >
                        clubdeviators@gmail.com
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Location</p>
                      <address className="not-italic">
                        Dronacharya College of Engineering, Khentawas, Gurugram
                      </address>
                    </div>
                  </li>
                </ul>

                <div className="pt-4 border-t border-slate-700">
                  <h4 className="font-medium mb-3">Follow Us</h4>
                  <div className="flex items-center gap-4">
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.97 }}
                      href="https://github.com/deviatorsclub"
                      className="bg-slate-700/50 p-2 rounded-full text-slate-300 hover:text-primary hover:bg-slate-700 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.97 }}
                      href="https://www.linkedin.com/company/deviators-club"
                      className="bg-slate-700/50 p-2 rounded-full text-slate-300 hover:text-primary hover:bg-slate-700 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.97 }}
                      href="https://www.instagram.com/deviatorsclub"
                      className="bg-slate-700/50 p-2 rounded-full text-slate-300 hover:text-primary hover:bg-slate-700 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram className="h-5 w-5" />
                      <span className="sr-only">Instagram</span>
                    </motion.a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
          >
            <Card className="bg-slate-800/30 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Sponsorship Inquiry
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-6">
                  Interested in sponsoring DevOlympus? We offer various
                  sponsorship packages that provide visibility to your brand and
                  access to talented students.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full border-slate-700 hover:bg-slate-800 text-white"
                  asChild
                >
                  <a href="mailto:clubdeviators@gmail.com?subject=DevOlympus%20Sponsorship%20Inquiry">
                    Become a Sponsor
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

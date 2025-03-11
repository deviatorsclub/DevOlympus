"use client";

import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import DeviatorsLogo from "@/assets/sm.svg";

export default function EnhancedFooter() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const listItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const socialIconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <footer ref={ref} className="relative bg-slate-900 py-16 overflow-hidden">
      {/* Gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

      {/* Background subtle elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-blue-500/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-purple-500/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-4"
          >
            <Link href="/" className="inline-block mb-4">
              <Image
                src={DeviatorsLogo}
                alt="Deviators Club"
                width={200}
                height={50}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-slate-400 mb-4 max-w-xs">
              Deviators Club is a tech community at Dronacharya College of
              Engineering fostering innovation and technical excellence.
            </p>
            <div className="flex space-x-3">
              {[
                {
                  icon: <FaGithub />,
                  href: "https://github.com/deviatorsclub",
                  delay: 0,
                },
                {
                  icon: <FaLinkedin />,
                  href: "https://www.linkedin.com/company/deviators-club",
                  delay: 0.1,
                },
                {
                  icon: <FaInstagram />,
                  href: "https://www.instagram.com/deviatorsclub",
                  delay: 0.2,
                },
                {
                  icon: <FaEnvelope />,
                  href: "mailto:clubdeviators@gmail.com",
                  delay: 0.4,
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="bg-slate-800 p-2 rounded-full text-slate-400 hover:text-primary hover:bg-slate-700/80 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={socialIconVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  transition={{ duration: 0.3, delay: social.delay }}
                >
                  {social.icon}
                  <span className="sr-only">Social Link</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2"
          >
            <h3 className="text-white font-medium mb-4">Event</h3>
            <ul className="space-y-2">
              {["About", "Schedule", "Rules", "Sponsors", "Register"].map(
                (item, index) => (
                  <motion.li
                    key={index}
                    variants={listItemVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      href={`#${item.toLowerCase()}`}
                      className="text-slate-400 hover:text-primary transition-colors"
                    >
                      {item}
                    </Link>
                  </motion.li>
                )
              )}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2"
          >
            <h3 className="text-white font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              {[
                "FAQs",
                "Contact",
                "Privacy Policy",
                "Terms",
                "Code of Conduct",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  variants={listItemVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    href={
                      item === "FAQs"
                        ? "#faqs"
                        : item === "Contact"
                        ? "#contact"
                        : "#"
                    }
                    className="text-slate-400 hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-800 text-slate-400 gap-4"
        >
          <p className="text-sm text-center md:text-left">
            © {new Date().getFullYear()} Deviators Club. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <Link href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Code of Conduct
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import DeviatorsLogo from "@/assets/sm.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Schedule", href: "#schedule" },
    { name: "Rules", href: "#rules" },
    { name: "FAQs", href: "#faqs" },
    { name: "Register", href: "#register" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/95 backdrop-blur-sm shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between p-4 md:p-6">
        <div className="flex items-center gap-3">
          <motion.a
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            href="https://www.deviatorsdce.tech"
          >
            <Image
              src={DeviatorsLogo}
              alt="Deviators Club"
              width={200}
              height={50}
              className="h-8 w-auto md:h-10"
            />
          </motion.a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`text-slate-300 hover:text-white transition-colors ${
                    item.name === "Register"
                      ? "px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-md text-white font-medium hover:opacity-90"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-slate-900/95 backdrop-blur-sm"
        >
          <ul className="flex flex-col items-center gap-4 py-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`text-slate-300 hover:text-white transition-colors ${
                    item.name === "Register"
                      ? "px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-md text-white font-medium hover:opacity-90"
                      : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </motion.header>
  );
}

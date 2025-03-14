"use client";

import { useState, useEffect, useCallback, memo, JSX } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DeviatorsLogo from "@/assets/sm.svg";

type NavItem = {
  name: string;
  href: string;
};

export default function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const handleScroll = useCallback((): void => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const navItems: NavItem[] = [
    { name: "About", href: "#about" },
    { name: "Rules", href: "#rules" },
    { name: "Schedule", href: "#schedule" },
    { name: "FAQs", href: "#faqs" },
    { name: "Code of Conduct", href: "/code-of-conduct" },
    { name: "Register", href: "#register" },
  ];

  const MobileNavItem = memo(
    ({ item }: { item: NavItem }): JSX.Element => (
      <motion.li
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        <Link
          href={item.href}
          className={`block py-2 px-4 text-gray-800 dark:text-slate-300 transition-colors ${
            item.name === "Register"
              ? "px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-md text-white font-medium"
              : ""
          }`}
          onClick={() => setIsOpen(false)}
        >
          {item.name}
        </Link>
      </motion.li>
    )
  );
  MobileNavItem.displayName = "MobileNavItem";

  const DesktopNavItem = memo(
    ({ item }: { item: NavItem }): JSX.Element => (
      <li>
        <Link
          href={item.href}
          className={`text-gray-800 dark:text-slate-300 transition-colors ${
            item.name === "Register"
              ? "px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-md text-white font-medium"
              : ""
          }`}
        >
          {item.name}
        </Link>
      </li>
    )
  );
  DesktopNavItem.displayName = "DesktopNavItem";

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between p-4 md:p-6">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image
              src={DeviatorsLogo}
              alt="Deviators Club"
              width={200}
              height={50}
              className="h-6 w-auto md:h-8"
            />
          </Link>
        </div>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <DesktopNavItem key={item.name} item={item} />
            ))}
          </ul>
        </nav>

        <button
          className="md:hidden text-gray-800 dark:text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: 45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -45 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: 0.3 },
                opacity: { duration: 0.2, delay: 0.1 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.3 },
                opacity: { duration: 0.2 },
              },
            }}
            className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm overflow-hidden"
          >
            <motion.ul
              className="flex flex-col items-center gap-4 py-6"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.1,
                  },
                },
                closed: {
                  transition: {
                    staggerChildren: 0.05,
                    staggerDirection: -1,
                  },
                },
              }}
            >
              {navItems.map((item) => (
                <MobileNavItem key={item.name} item={item} />
              ))}
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

"use client";

import {
  useState,
  useCallback,
  memo,
  FC,
  useRef,
  useMemo,
  useEffect,
} from "react";
import Link from "next/link";
import { Menu, User, X, LogOut, FileText, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DeviatorsLogo from "@/assets/sm.svg";
import { signIn, signOut } from "next-auth/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { FLAGS } from "@/lib/flags";
import { CreditCard } from "lucide-react";

type NavItem = {
  name: string;
  href: string;
};

type UserIconProps =
  | { imgUrl?: string; name: string; isLoggedIn: true; session: Session }
  | { isLoggedIn: false; session?: Session };

type MenuItemProps = {
  icon: FC<{ className?: string }>;
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: "default" | "danger" | "accent";
  closeMenu: () => void;
};

interface HeaderClientProps {
  initialSession: Session | null;
}

const navItems: NavItem[] = [
  { name: "Rules", href: "/#rules" },
  { name: "Schedule", href: "/#schedule" },
  { name: "FAQs", href: "/#faqs" },
  { name: "Code of Conduct", href: "/code-of-conduct" },
];

const actionItems: {
  title: string;
  url: string;
  onlyForAdmins?: boolean;
  onlyShowIf?: boolean;
  icon: FC<{ className?: string }>;
}[] = [
  {
    title: "Register for hackathon",
    url: "/register",
    icon: FileText,
  },
  {
    title: "View All Users",
    url: "/users",
    onlyForAdmins: true,
    icon: Users,
  },
  {
    title: "Pay for Round 2",
    url: "/round-2-payment",
    onlyShowIf: FLAGS.showPaymentFormAndConsent,
    icon: CreditCard,
  },
];

const menuItemVariants = {
  hidden: { opacity: 0, y: -5 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -5 },
};

const dropdownVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -8,
    transition: { duration: 0.15 },
  },
};

const MenuItem: FC<MenuItemProps> = ({
  icon: Icon,
  label,
  onClick,
  variant = "default",
  closeMenu,
  href,
}) => {
  const router = useRouter();
  const colorStyles = {
    default:
      "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
    danger:
      "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20",
    accent:
      "text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20",
  };

  return (
    <motion.button
      variants={menuItemVariants}
      className={`cursor-pointer group flex w-full items-center gap-2 px-4 py-2.5 text-sm font-medium ${colorStyles[variant]}`}
      role="menuitem"
      onClick={() => {
        closeMenu();
        if (onClick) onClick();
        if (href) router.push(href);
      }}
    >
      <Icon className="h-4 w-4" />
      <span className="truncate">{label}</span>
    </motion.button>
  );
};

const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  handler: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, handler]);
};

const useScrollPosition = (threshold = 0) => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > threshold);
  }, [threshold]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return scrolled;
};

const MobileNavItem = memo<{ item: NavItem; onClose: () => void }>(
  ({ item, onClose }) => (
    <motion.li
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={item.href}
        className={`block px-4 py-2 text-gray-800 dark:text-slate-300 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
          item.name === "Register"
            ? "my-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-md text-white font-medium hover:bg-gray-50/0 dark:hover:bg-gray-800/0"
            : ""
        }`}
        onClick={onClose}
      >
        {item.name}
      </Link>
    </motion.li>
  )
);
MobileNavItem.displayName = "MobileNavItem";

const DesktopNavItem = memo<{ item: NavItem }>(({ item }) => (
  <li>
    <Link
      href={item.href}
      className={`text-gray-800 dark:text-slate-300 transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
        item.name === "Register"
          ? "px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-md text-white font-medium hover:opacity-90"
          : ""
      }`}
    >
      {item.name}
    </Link>
  </li>
));
DesktopNavItem.displayName = "DesktopNavItem";

function menuItemsBasedOnAccess(user?: Session["user"]) {
  let filteredItems = [...actionItems];

  filteredItems = filteredItems.filter((item) => {
    return item.onlyShowIf !== false;
  });

  if (user?.isAdmin) {
    return filteredItems.filter((item) => item.onlyForAdmins === true);
  } else {
    return filteredItems.filter((item) => item.onlyForAdmins !== true);
  }
}

const UserIcon: FC<UserIconProps> = (props) => {
  const { session } = props;
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 640px)");

  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  useClickOutside(menuRef, closeMenu);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="flex items-center justify-center rounded-full cursor-pointer shadow-sm hover:shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div
          className={`relative flex items-center justify-center rounded-full overflow-hidden ${
            isMobile ? "h-8 w-8" : "h-9 w-9"
          }`}
        >
          {props.isLoggedIn ? (
            props.imgUrl && (
              <img
                src={props.imgUrl}
                alt={`${props.name}'s profile`}
                className="h-full w-full object-cover"
                width={isMobile ? 32 : 36}
                height={isMobile ? 32 : 36}
              />
            )
          ) : (
            <div className="flex items-center justify-center h-full w-full bg-gray-100 dark:bg-gray-700">
              <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </div>
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            className={`
              absolute z-50 mt-2 rounded-lg overflow-hidden shadow-lg 
              bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
              ${isMobile ? "right-0 w-56" : "right-0 w-64"}
            `}
          >
            {props.isLoggedIn ? (
              <>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-900 dark:bg-gray-750">
                  <div className="flex items-center gap-3">
                    {props.imgUrl && (
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <img
                          src={props.imgUrl}
                          alt={`${props.name}'s profile`}
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {props.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                        Signed in with Google
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-1">
                  {menuItemsBasedOnAccess(session?.user).map((item, index) => (
                    <MenuItem
                      key={index}
                      closeMenu={closeMenu}
                      icon={item.icon}
                      label={item.title}
                      href={item.url}
                    />
                  ))}
                  <MenuItem
                    closeMenu={closeMenu}
                    icon={LogOut}
                    label="Sign out"
                    onClick={() => signOut()}
                    variant="danger"
                  />
                </div>
              </>
            ) : (
              <div className="p-2">
                <MenuItem
                  closeMenu={closeMenu}
                  icon={User}
                  label="Sign in with Google"
                  onClick={() =>
                    signIn("google", {
                      redirectTo: "/register",
                    })
                  }
                  variant="accent"
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function HeaderClient({ initialSession }: HeaderClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isDesk = useMediaQuery("(min-width: 768px)");
  const scrolled = useScrollPosition(20);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  const session = useMemo(() => initialSession, [initialSession]);

  const currentNavItems = useMemo(() => {
    if (!session?.user)
      return [...navItems, { name: "Register", href: "/register" }];
    return navItems;
  }, [session?.user]);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between p-4 md:px-8 md:py-5">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
          >
            <img
              src={DeviatorsLogo.src}
              alt="Deviators Club"
              className="h-6 w-auto md:h-8"
            />
          </Link>
        </div>

        <nav className="hidden md:block transition-opacity duration-300">
          <ul className="flex items-center gap-8">
            {currentNavItems.map((item) => (
              <DesktopNavItem key={item.name} item={item} />
            ))}
            <li className="min-w-9 h-9">
              {mounted && (
                <>
                  {session?.user ? (
                    <UserIcon
                      isLoggedIn={true}
                      imgUrl={session.user.image ?? undefined}
                      name={session.user.name ?? ""}
                      session={session}
                    />
                  ) : (
                    <UserIcon isLoggedIn={false} />
                  )}
                </>
              )}
            </li>
          </ul>
        </nav>

        {!isDesk && (
          <div className="flex gap-3 items-center">
            <div className="min-w-8 h-8">
              {mounted && (
                <>
                  {session?.user ? (
                    <UserIcon
                      isLoggedIn={true}
                      imgUrl={session.user.image ?? undefined}
                      name={session.user.name ?? ""}
                      session={session}
                    />
                  ) : (
                    <UserIcon isLoggedIn={false} />
                  )}
                </>
              )}
            </div>
            <button
              className="flex items-center justify-center h-10 w-10 rounded-md text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={toggleMenu}
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
        )}
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
            className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm overflow-hidden border-t border-gray-200 dark:border-gray-800"
          >
            <motion.ul
              className="flex flex-col py-4 px-2"
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
              {currentNavItems.map((item) => (
                <MobileNavItem
                  key={item.name}
                  item={item}
                  onClose={closeMenu}
                />
              ))}
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

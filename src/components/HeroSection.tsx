"use client";

import {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
  memo,
  JSX,
} from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HACKATHON_DATE } from "@/data";

type ParticleProps = {
  count: number;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type CountdownDigitProps = {
  value: number;
  label: string;
};

type AnimatedTitleProps = {
  isLoaded: boolean;
};

const titleCharVariants: Variants = {
  hidden: { y: -150, opacity: 0, rotateX: 90, rotateY: 90 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    rotateX: 0,
    rotateY: 0,
    transition: {
      duration: 0.7,
      delay: 0.8 + i * 0.07,
      type: "spring",
      damping: 12,
    },
  }),
  shadow: (i: number) => ({
    x: [0, -4, 0, 4, 0],
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "mirror",
      delay: i * 0.1,
    },
  }),
  line: (i: number) => ({
    width: "100%",
    transition: { duration: 0.3, delay: 1.5 + i * 0.05 },
  }),
};

const lineVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1.5, delay: 2 },
  },
};

const blobVariants: Variants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.5, 0.3, 0.5],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

const descriptionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: 2.2 },
  },
  shadow: {
    x: [0, 3, 0, -3, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "mirror",
    },
  },
};

const countdownContainerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 2.4 },
  },
};

const buttonContainerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 2.8 },
  },
};

const registerButtonVariants: Variants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
  gradientMove: {
    x: "0%",
    transition: { duration: 0.4 },
  },
  glowPulse: {
    scale: [0.9, 1.1, 0.9],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

const learnMoreButtonVariants: Variants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
  fillUp: {
    y: "0%",
    transition: { duration: 0.4 },
  },
};

const chevronVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, delay: 3 },
  },
  bounce: {
    y: [0, 10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

const Particles = memo(({ count }: ParticleProps): JSX.Element => {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 4 + 1;
      const initialX = Math.random() * 100;
      const initialY = Math.random() * 100;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 2;
      const xOffset = (Math.random() - 0.5) * 200;

      return {
        size,
        initialX,
        initialY,
        duration,
        delay,
        xOffset,
        key: `particle-${i}`,
      };
    });
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.key}
          className="absolute rounded-full bg-white dark:bg-blue-400"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
            opacity: Math.random() * 0.5 + 0.3,
          }}
          animate={{
            y: [0, -1000],
            x: [0, particle.xOffset],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
});
Particles.displayName = "Particles";

const CircuitLines = memo((): JSX.Element => {
  const lines = useMemo(
    () => [
      { x1: "10%", y1: "20%", x2: "30%", y2: "20%" },
      { x1: "30%", y1: "20%", x2: "30%", y2: "40%" },
      { x1: "30%", y1: "40%", x2: "70%", y2: "40%" },
      { x1: "70%", y1: "40%", x2: "70%", y2: "60%" },
      { x1: "70%", y1: "60%", x2: "40%", y2: "60%" },
      { x1: "40%", y1: "60%", x2: "40%", y2: "80%" },
      { x1: "40%", y1: "80%", x2: "90%", y2: "80%" },
      { x1: "20%", y1: "30%", x2: "20%", y2: "70%" },
      { x1: "20%", y1: "70%", x2: "50%", y2: "70%" },
      { x1: "80%", y1: "20%", x2: "80%", y2: "50%" },
      { x1: "80%", y1: "50%", x2: "60%", y2: "50%" },
      { x1: "60%", y1: "50%", x2: "60%", y2: "90%" },
    ],
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg width="100%" height="100%" className="absolute inset-0">
        {lines.map((line, i) => (
          <motion.line
            key={`line-${i}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x1}
            y2={line.y1}
            stroke="rgba(138, 58, 185, 0.2)"
            strokeWidth="1"
            initial={{ x1: line.x1, y1: line.y1, x2: line.x1, y2: line.y1 }}
            animate={{ x2: line.x2, y2: line.y2 }}
            transition={{
              duration: 1.5,
              delay: i * 0.1 + 1,
              ease: "easeOut",
            }}
          />
        ))}
        {lines.map((line, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={line.x2}
            cy={line.y2}
            r="3"
            fill="rgba(138, 58, 185, 0.6)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: i * 0.1 + 1.5,
              ease: "backOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
});
CircuitLines.displayName = "CircuitLines";

const CursorGlow = memo(({ x, y }: { x: number; y: number }): JSX.Element => {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{
        background: `radial-gradient(circle at ${x * 100}% ${
          y * 100
        }%, rgba(59, 130, 246, 0.15), transparent 40%)`,
        willChange: "background",
      }}
      transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
    />
  );
});
CursorGlow.displayName = "CursorGlow";

const TitleCharacter = memo(
  ({
    char,
    index,
    isLoaded,
  }: {
    char: string;
    index: number;
    isLoaded: boolean;
  }): JSX.Element => {
    return (
      <motion.div
        className="relative inline-block"
        variants={titleCharVariants}
        initial="hidden"
        animate="visible"
        custom={index}
      >
        <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 tracking-tight">
          {char}
        </span>

        <motion.span
          className="absolute left-0 top-0 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-blue-500/30 blur-sm"
          variants={titleCharVariants}
          animate="shadow"
          custom={index}
        >
          {char}
        </motion.span>

        <AnimatePresence>
          {isLoaded && (
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              initial={{ width: 0 }}
              variants={titleCharVariants}
              animate="line"
              custom={index}
            />
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);
TitleCharacter.displayName = "TitleCharacter";

const AnimatedTitle = memo(({ isLoaded }: AnimatedTitleProps): JSX.Element => {
  const titleCharacters = useMemo(() => "DEVOLYMPUS".split(""), []);

  return (
    <div className="flex justify-center mb-8">
      <div className="relative">
        <div className="flex space-x-1 sm:space-x-2 md:space-x-3 overflow-hidden">
          {titleCharacters.map((char, index) => (
            <TitleCharacter
              key={`title-char-${index}`}
              char={char}
              index={index}
              isLoaded={isLoaded}
            />
          ))}
        </div>

        <motion.div
          className="absolute -bottom-4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
          variants={lineVariants}
          initial="hidden"
          animate="visible"
        />

        <motion.div
          className="absolute -inset-8 rounded-full bg-purple-500/20 blur-3xl -z-10"
          variants={blobVariants}
          animate="animate"
        />
      </div>
    </div>
  );
});
AnimatedTitle.displayName = "AnimatedTitle";

const AnimatedDescription = memo((): JSX.Element => {
  return (
    <div className="glitch-wrapper">
      <motion.p
        variants={descriptionVariants}
        initial="hidden"
        animate="visible"
        className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-gray-600 dark:text-gray-300 relative"
      >
        <span className="relative z-10">
          An intense 30-hour innovation sprint where the sharpest minds ascend
          to new heights, building real-world solutions.
        </span>

        <motion.span
          className="absolute inset-0 text-lg sm:text-xl md:text-2xl text-blue-500/30 blur-sm -z-10"
          variants={descriptionVariants}
          animate="shadow"
        >
          An intense 30-hour innovation sprint where the sharpest minds ascend
          to new heights, building real-world solutions.
        </motion.span>
      </motion.p>
    </div>
  );
});
AnimatedDescription.displayName = "AnimatedDescription";

const CountdownDigit = memo(
  ({ value, label }: CountdownDigitProps): JSX.Element => {
    const [animationKey, setAnimationKey] = useState<number>(value);
    const prevValue = useRef<number>(value);

    useEffect(() => {
      if (prevValue.current !== value) {
        setAnimationKey(value);
        prevValue.current = value;
      }
    }, [value]);

    const formattedValue = useMemo(() => {
      return value.toString().padStart(2, "0");
    }, [value]);

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-lg border border-white/20 overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={animationKey}
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute"
            >
              <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-b from-white to-blue-200 dark:from-white dark:to-blue-300 bg-clip-text text-transparent">
                {formattedValue}
              </span>
            </motion.div>
          </AnimatePresence>

          <motion.div
            className="absolute inset-0 bg-blue-500/20"
            animate={{ opacity: [0, 0.2, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {label}
        </span>
      </div>
    );
  }
);
CountdownDigit.displayName = "CountdownDigit";

const CountdownTimer = memo((): JSX.Element => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const countDownDate = HACKATHON_DATE.getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      variants={countdownContainerVariants}
      initial="hidden"
      animate="visible"
      className="flex justify-center mb-10"
    >
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        <CountdownDigit value={timeLeft.days} label="DAYS" />
        <CountdownDigit value={timeLeft.hours} label="HOURS" />
        <CountdownDigit value={timeLeft.minutes} label="MINUTES" />
        <CountdownDigit value={timeLeft.seconds} label="SECONDS" />
      </div>
    </motion.div>
  );
});
CountdownTimer.displayName = "CountdownTimer";

const ActionButtons = memo((): JSX.Element => {
  return (
    <motion.div
      variants={buttonContainerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
    >
      <Link href="#register">
        <motion.div
          variants={registerButtonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Button className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white hover:from-blue-700 hover:to-purple-700">
            <span className="relative z-10">Register Now</span>
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700"
              initial={{ x: "-100%" }}
              variants={registerButtonVariants}
              whileHover="gradientMove"
            />

            <motion.div
              className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 blur-lg bg-gradient-to-r from-blue-400 to-purple-400"
              variants={registerButtonVariants}
              animate="glowPulse"
            />
          </Button>
        </motion.div>
      </Link>

      <Link href="#about">
        <motion.div
          variants={learnMoreButtonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Button
            variant="outline"
            className="relative overflow-hidden group border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-white/20 dark:hover:bg-white/10"
          >
            <span className="relative z-10">Learn More</span>
            <motion.span
              className="absolute inset-0 bg-white/20 dark:bg-white/10"
              initial={{ y: "-100%" }}
              variants={learnMoreButtonVariants}
              whileHover="fillUp"
            />
          </Button>
        </motion.div>
      </Link>
    </motion.div>
  );
});
ActionButtons.displayName = "ActionButtons";

const ScrollIndicator = memo((): JSX.Element => {
  return (
    <motion.div
      variants={chevronVariants}
      initial="hidden"
      animate="visible"
      className="flex justify-center"
    >
      <motion.div variants={chevronVariants} animate="bounce">
        <ChevronDown className="h-6 w-6 text-gray-500 dark:text-gray-400" />
      </motion.div>
    </motion.div>
  );
});
ScrollIndicator.displayName = "ScrollIndicator";

export default function HeroSection(): JSX.Element {
  const [cursorPosition, setCursorPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleMouseMove = useCallback((e: MouseEvent): void => {
    if (heroRef.current) {
      const { left, top, width, height } =
        heroRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setCursorPosition({ x, y });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, [handleMouseMove]);

  return (
    <motion.section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-900 pt-20 sm:pt-24 md:pt-28"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ willChange: "transform" }}
    >
      <Particles count={50} />
      <CircuitLines />

      <CursorGlow x={cursorPosition.x} y={cursorPosition.y} />

      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <AnimatedTitle isLoaded={isLoaded} />
          <AnimatedDescription />
          <CountdownTimer />
          <ActionButtons />
          <ScrollIndicator />
        </motion.div>
      </div>

    </motion.section>
  );
}

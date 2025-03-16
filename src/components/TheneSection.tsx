import React, { JSX } from "react";
import { Brain, Network, Lock, Cpu, Globe } from "lucide-react";

type Theme = {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
};

export default function ThemesSection(): JSX.Element {
  const themes: Theme[] = [
    {
      id: "ai",
      name: "AI & Machine Learning",
      icon: Brain,
      description:
        "Explore cutting-edge AI algorithms and machine learning applications.",
    },
    {
      id: "blockchain",
      name: "Blockchain & Web3",
      icon: Network,
      description:
        "Build decentralized solutions using blockchain technology and Web3 frameworks.",
    },
    {
      id: "security",
      name: "Cybersecurity & Privacy",
      icon: Lock,
      description:
        "Develop secure systems and privacy-preserving technologies.",
    },
    {
      id: "robotics",
      name: "Robotics",
      icon: Cpu,
      description:
        "Create innovative robotics solutions and automation systems.",
    },
    {
      id: "open",
      name: "Open Innovation",
      icon: Globe,
      description:
        "Collaborate on open-source projects and cross-discipline innovations.",
    },
  ];

  return (
    <section className="w-full py-16 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          Themes
        </h2>

        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
          {themes.map((theme) => (
            <ThemeCard key={theme.id} theme={theme} />
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-6 lg:hidden">
          {themes.map((theme) => (
            <ThemeCard key={theme.id} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ThemeCardProps {
  theme: Theme;
}

const ThemeCard = ({ theme }: ThemeCardProps): JSX.Element => {
  const Icon = theme.icon;

  return (
    <div className="w-full sm:w-80 lg:w-full bg-gray-900 border border-purple-700/30 rounded-lg p-6 transition-all duration-300 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-purple-700/20 flex items-center justify-center mr-4">
          <Icon className="w-5 h-5 text-purple-400" />
        </div>
        <h3 className="text-xl font-semibold">{theme.name}</h3>
      </div>
      <p className="text-gray-400">{theme.description}</p>
    </div>
  );
};

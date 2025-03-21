import { JSX } from "react";
import { CategoryData } from "./types";
import { StaticImageData } from "next/image";

import XYZ from "@/assets/sponsors/xyz.png";
import INTERVIEW_BUDDY from "@/assets/sponsors/interview-buddy.svg";

export const REGISTRATION_FORM_URL = "https://forms.gle/Mc9Yvd7yyQgrQizK8";
export const HACKATHON_DATE = new Date("April 11, 2025 09:00:00");
export const HACKATHON_END_DATE = new Date("April 12, 2025 12:00:00");

export const FAQS = [
  {
    question: "What should I bring to the hackathon?",
    answer:
      "You should bring your laptop, charger, any necessary adapters, a water bottle, and personal items for an overnight stay. Food and drinks will be provided throughout the event. Consider bringing a change of clothes and toiletries for a more comfortable experience.",
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
  {
    question: "Should I bring an extension cord?",
    answer:
      "Yes, we recommend bringing a power strip or extension cord as power outlets may be limited. This will ensure that everyone in your team has access to power for their devices throughout the hackathon.",
  },
  {
    question: "What should I not bring with myself?",
    answer:
      "Please avoid bringing any illegal substances, weapons, or items that could disrupt the event. We also recommend not bringing valuables that you won't need during the hackathon, as we cannot guarantee their safety.",
  },
];

export const categories: CategoryData[] = [
  {
    id: "team",
    title: "Team Requirements",
    icon: <TeamIcon />,
    rules: [
      { id: 1, text: "Teams must consist of 3-4 members" },
      { id: 2, text: "Diversity in team composition is encouraged" },
      { id: 3, text: "All team members must be enrolled in college" },
      { id: 4, text: "Each team must designate one team leader" },
    ],
  },
  {
    id: "project",
    title: "Project Guidelines",
    icon: <ProjectIcon />,
    rules: [
      { id: 1, text: "All code must be written during the hackathon" },
      { id: 2, text: "Open-source libraries and APIs are permitted" },
      { id: 3, text: "Projects must address real-world problems" },
      {
        id: 4,
        text: "Final submissions must include source code and presentation",
      },
    ],
  },
  {
    id: "conduct",
    title: "Event Conduct",
    icon: <ConductIcon />,
    rules: [
      { id: 1, text: "Respect all participants, mentors, and organizers" },
      { id: 2, text: "Maintain a clean and organized workspace" },
      { id: 3, text: "Report any issues to the organizing committee" },
      { id: 4, text: "Follow all college rules and regulations" },
    ],
  },
  {
    id: "judging",
    title: "Judging Criteria",
    icon: <JudgingIcon />,
    rules: [
      { id: 1, text: "Innovation and creativity (25%)" },
      { id: 2, text: "Technical implementation (25%)" },
      { id: 3, text: "Impact and practicality (25%)" },
      { id: 4, text: "Presentation and demonstration (25%)" },
    ],
  },
];

function TeamIcon(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );
}

function ProjectIcon(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  );
}

function ConductIcon(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
    </svg>
  );
}

function JudgingIcon(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  );
}

export interface Sponsor {
  name: string;
  image: StaticImageData;
  link: string;
}

export const sponsors: Sponsor[] = [
  {
    name: ".xyz",
    link: "https://gen.xyz",
    image: XYZ,
  },
  {
    name: "Interview Buddy",
    link: "https://interviewbuddy.net",
    image: INTERVIEW_BUDDY,
  },
];

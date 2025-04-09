import { JSX } from "react";
import { CategoryData, ScheduleDay } from "./types";

import XYZ from "@/assets/sponsors/xyz.png";
import INTERVIEW_BUDDY from "@/assets/sponsors/interview-buddy.png";
import APPWRITE from "@/assets/sponsors/appwrite.png";
import APIDOTMARKET from "@/assets/sponsors/api.market.png";
import { Sponsor } from "./types/gloabals";
import {
  MapPin,
  Utensils,
  Code,
  Code2,
  Skull,
  Presentation,
  GraduationCap,
  Clipboard,
  Coffee,
  Gamepad,
  CheckSquare,
} from "lucide-react";
import { FaChalkboardTeacher } from "react-icons/fa";

import ANSHIKA from "@/assets/judges/anshika.png";
import AKASH_CHAUHAN from "@/assets/judges/akash-chauhan.png";
import JATIN_KAPOOR from "@/assets/judges/jatin-kapoor.png";
import PIYUSH_GARG from "@/assets/judges/piyush-garg.png";
import VRINDA_BHATEJA from "@/assets/judges/vrinda-bhateja.png";
import SALONI_ARORA from "@/assets/judges/saloni-arora.png";
import JATIN_SHARMA from "@/assets/judges/jatin-sharma.png";
import { formatDate } from "./lib/utils";

export const ROUND_1_SPREADSHEET_URL =
  "https://docs.google.com/spreadsheets/d/1eiHDhYHNzqHf59-VA_-eW65uL1WRYou41I7pKOy3RNs/edit?usp=sharing";
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

export const sponsors: Sponsor[] = [
  {
    name: "api.market",
    link: "https://api.market",
    image: APIDOTMARKET,
  },
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
  {
    name: "Appwrite",
    link: "https://appwrite.io",
    image: APPWRITE,
  },
];

export const judges = [
  {
    name: "Anshika",
    image: ANSHIKA,
    oneLiner: "American Express - Engineer III",
  },
  {
    name: "Akash Chauhan",
    image: AKASH_CHAUHAN,
    oneLiner: "Gate Qualified, AIR: 648",
  },
  {
    name: "Jatin Kapoor",
    image: JATIN_KAPOOR,
    oneLiner: "Capegemini, Associate consultant(Oracle)",
  },
  {
    name: "Piyush Garg",
    image: PIYUSH_GARG,
    oneLiner: "Juspay - Senior Software Engineer I",
  },
  {
    name: "Vrinda Bhateja",
    image: VRINDA_BHATEJA,
    oneLiner: "Senior Data Engineer - United Airlines",
  },
  {
    name: "Saloni Arora",
    image: SALONI_ARORA,
    oneLiner: "Engineer at Merce and ex-Samsung",
  },
  {
    name: "Jatin Sharma",
    image: JATIN_SHARMA,
    oneLiner: "Senior Database Administrator",
  },
];

export const scheduleItems: ScheduleDay[] = [
  {
    id: "day1",
    day: "Day 1",
    title: "Kickoff",
    date: formatDate(HACKATHON_DATE),
    events: [
      {
        time: "08:15 AM - 09:00 AM",
        title: "Registrations",
        description: "Arrive at DCE campus and complete your registration",
        icon: <Clipboard className="h-5 w-5" />,
        location: "Main Entrance",
      },
      {
        time: "09:00 AM onwards",
        title: "Event Start",
        description: "Welcome address, introduction to mentors and sponsors",
        icon: <Presentation className="h-5 w-5" />,
        location: "Main Auditorium",
      },
      {
        time: "11:30 AM onwards",
        title: "Round 1 Judgment Start",
        description: "Present your ideas to judges",
        icon: <GraduationCap className="h-5 w-5" />,
        location: "Seminar Hall",
      },
      {
        time: "02:15 PM",
        title: "Round 1 Results",
        description: "Announcement of teams advancing to Round 2",
        icon: <CheckSquare className="h-5 w-5" />,
        location: "Main Auditorium",
      },
      {
        time: "03:00 PM",
        title: "Selected Teams move to Round 2",
        description: "Qualified teams begin the next phase of the hackathon",
        icon: <Code2 className="h-5 w-5" />,
        location: "Hack Space",
      },
      {
        time: "03:00 PM - 04:00 PM",
        title: "Lunch Break",
        description: "Refuel and network with fellow participants",
        icon: <Utensils className="h-5 w-5" />,
        location: "Cafeteria",
      },
      {
        time: "04:00 PM - 06:00 PM",
        title: "Mentorship Session",
        description: "Get guidance from mentors on your projects",
        icon: <FaChalkboardTeacher className="h-5 w-5" />,
        location: "Hack Space",
      },
      {
        time: "06:00 PM - 08:00 PM",
        title: "Hack Period",
        description: "Work on your projects with your team",
        icon: <Code className="h-5 w-5" />,
        location: "Hack Space",
      },
      {
        time: "08:00 PM - 09:00 PM",
        title: "Dinner Break",
        description: "Refuel for the night ahead",
        icon: <Utensils className="h-5 w-5" />,
        location: "Cafeteria",
      },
      {
        time: "09:00 PM - 12:00 AM",
        title: "Hack Period",
        description: "Continue working on your projects",
        icon: <Code className="h-5 w-5" />,
        location: "Hack Space",
      },
    ],
  },
  {
    id: "day2",
    day: "Day 2",
    title: "Finale",
    date: formatDate(HACKATHON_END_DATE),
    events: [
      {
        time: "12:00 AM - 02:00 AM",
        title: "Night Mentorship Session",
        description: "Get late-night guidance from mentors",
        icon: <FaChalkboardTeacher className="h-5 w-5" />,
        location: "Hack Space",
      },
      {
        time: "02:00 AM - 07:00 AM",
        title: "Hack Period",
        description: "For the night owls & early birds",
        icon: <Code className="h-5 w-5" />,
        location: "Hack Space",
      },
      {
        time: "07:00 AM - 08:30 AM",
        title: "Breakfast Break",
        description: "Morning fuel to keep you going",
        icon: <Coffee className="h-5 w-5" />,
        location: "Cafeteria",
      },
      {
        time: "08:30 AM - 09:00 AM",
        title: "Final Hacking & Submission",
        description: "Last-minute touches and project submission",
        icon: <Code2 className="h-5 w-5" />,
        location: "Hack Space",
      },
      {
        time: "09:00 AM - 12:00 PM",
        title: "Round 2 Judgment",
        description: "Present your final projects to the judges",
        icon: <GraduationCap className="h-5 w-5" />,
        location: "Seminar Hall",
      },
      {
        time: "12:00 PM - 01:00 PM",
        title: "Final Results",
        description: "Winners announcement and prize distribution",
        icon: <Presentation className="h-5 w-5" />,
        location: "Main Auditorium",
      },
      {
        time: "01:00 PM",
        title: "Event done!",
        description: "Congratulations on completing DevOlympus!",
        icon: <Gamepad className="h-5 w-5" />,
        location: "Main Auditorium",
      },
    ],
  },
];

import { JSX, ReactNode } from "react";

export type RuleItem = {
  id: number;
  text: string;
};

export type CategoryData = {
  id: string;
  title: string;
  rules: RuleItem[];
  icon: JSX.Element;
};

export interface ScheduleDay {
  id: string;
  day: string;
  title: string;
  date: string;
  events: ScheduleEvent[];
  textColor?: string;
}

export interface ScheduleEvent {
  time: string;
  title: string;
  description: string;
  icon: ReactNode;
  location: string;
  textColor?: string;
  highlightBorder?: string;
}

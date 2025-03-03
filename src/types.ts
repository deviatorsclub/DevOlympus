import { JSX } from "react";

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

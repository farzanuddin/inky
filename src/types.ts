export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ColorTheme =
  | "blue"
  | "green"
  | "purple"
  | "rose"
  | "amber"
  | "slate";
export type FontTheme = "sans" | "serif" | "mono";

export const DEFAULT_TAGS = [
  "General",
  "Personal",
  "Dev",
  "React",
  "AI",
  "Ideas",
] as const;

export type TagType = (typeof DEFAULT_TAGS)[number];

export const TAG_COLOR_VALUES: Record<ColorTheme, string> = {
  blue: "#2563eb",
  green: "#16a34a",
  purple: "#7c3aed",
  rose: "#e11d48",
  amber: "#d97706",
  slate: "#475569",
};

export const TAG_COLOR_OPTIONS = [
  "blue",
  "green",
  "purple",
  "rose",
  "amber",
  "slate",
] as const satisfies ColorTheme[];

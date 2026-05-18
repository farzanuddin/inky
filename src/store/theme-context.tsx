import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { ColorTheme, FontTheme } from "@/types";

interface ThemeContextValue {
  color: ColorTheme;
  setColor: (c: ColorTheme) => void;
  font: FontTheme;
  setFont: (f: FontTheme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function loadTheme<K extends string>(key: string, fallback: K): K {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return stored as K;
  } catch {
    /* ignore */
  }
  return fallback;
}

const COLOR_THEME_MAP: Record<ColorTheme, Record<string, string>> = {
  blue: {
    "--color-primary": "#2563eb",
    "--color-primary-foreground": "#ffffff",
    "--color-ring": "#2563eb",
    "--color-accent": "#eff6ff",
    "--color-accent-foreground": "#1e40af",
    "--color-sidebar": "#f0f6ff",
    "--color-sidebar-accent": "#dbeafe",
  },
  green: {
    "--color-primary": "#16a34a",
    "--color-primary-foreground": "#ffffff",
    "--color-ring": "#16a34a",
    "--color-accent": "#f0fdf4",
    "--color-accent-foreground": "#166534",
    "--color-sidebar": "#f0fdf6",
    "--color-sidebar-accent": "#dcfce7",
  },
  purple: {
    "--color-primary": "#7c3aed",
    "--color-primary-foreground": "#ffffff",
    "--color-ring": "#7c3aed",
    "--color-accent": "#faf5ff",
    "--color-accent-foreground": "#6b21a8",
    "--color-sidebar": "#faf8ff",
    "--color-sidebar-accent": "#ede9fe",
  },
  rose: {
    "--color-primary": "#e11d48",
    "--color-primary-foreground": "#ffffff",
    "--color-ring": "#e11d48",
    "--color-accent": "#fff1f2",
    "--color-accent-foreground": "#9f1239",
    "--color-sidebar": "#fff5f6",
    "--color-sidebar-accent": "#ffe4e6",
  },
  amber: {
    "--color-primary": "#d97706",
    "--color-primary-foreground": "#ffffff",
    "--color-ring": "#d97706",
    "--color-accent": "#fffbeb",
    "--color-accent-foreground": "#92400e",
    "--color-sidebar": "#fffdf5",
    "--color-sidebar-accent": "#fef3c7",
  },
  slate: {
    "--color-primary": "#475569",
    "--color-primary-foreground": "#ffffff",
    "--color-ring": "#475569",
    "--color-accent": "#f8fafc",
    "--color-accent-foreground": "#1e293b",
    "--color-sidebar": "#f8fafc",
    "--color-sidebar-accent": "#e2e8f0",
  },
};

const FONT_THEME_MAP: Record<FontTheme, string> = {
  sans: "'Inter', system-ui, -apple-system, sans-serif",
  serif: "'Merriweather', 'Georgia', 'Times New Roman', serif",
  mono: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [color, setColor] = useState<ColorTheme>(() =>
    loadTheme("inky-color-theme", "blue"),
  );
  const [font, setFont] = useState<FontTheme>(() =>
    loadTheme("inky-font-theme", "sans"),
  );

  useEffect(() => {
    localStorage.setItem("inky-color-theme", color);
    const root = document.documentElement;
    for (const [key, value] of Object.entries(COLOR_THEME_MAP[color])) {
      root.style.setProperty(key, value);
    }
  }, [color]);

  useEffect(() => {
    localStorage.setItem("inky-font-theme", font);
    document.documentElement.style.setProperty(
      "--font-family",
      FONT_THEME_MAP[font],
    );
  }, [font]);

  return (
    <ThemeContext.Provider value={{ color, setColor, font, setFont }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

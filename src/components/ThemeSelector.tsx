import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTheme } from "@/store/theme-context";
import type { ColorTheme, FontTheme } from "@/types";
import { Check, ChevronRight, Palette, Settings, Type } from "lucide-react";
import { useState } from "react";

const COLOR_OPTIONS: { value: ColorTheme; label: string; color: string }[] = [
  { value: "blue", label: "Blue", color: "#2563eb" },
  { value: "green", label: "Green", color: "#16a34a" },
  { value: "purple", label: "Purple", color: "#7c3aed" },
  { value: "rose", label: "Rose", color: "#e11d48" },
  { value: "amber", label: "Amber", color: "#d97706" },
  { value: "slate", label: "Slate", color: "#475569" },
];

const FONT_OPTIONS: { value: FontTheme; label: string }[] = [
  { value: "sans", label: "Sans-serif" },
  { value: "serif", label: "Serif" },
  { value: "mono", label: "Monospace" },
];

export function ThemeSelector() {
  const { color, setColor, font, setFont } = useTheme();
  const [open, setOpen] = useState(false);
  const [submenu, setSubmenu] = useState<"color" | "font" | null>(null);

  return (
    <Popover
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) setSubmenu(null);
      }}
    >
      <PopoverTrigger
        render={
          <Button variant="ghost" size="icon-sm" aria-label="Options" title="Options" />
        }
      >
        <Settings className="size-4" />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-56 rounded-lg p-2"
        aria-label="Options"
      >
        <p className="px-2 pb-1 pt-0.5 text-xs font-medium text-muted-foreground">
          Options
        </p>

        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 hover:!bg-primary/15 hover:!text-primary"
          onClick={() => setSubmenu(submenu === "color" ? null : "color")}
          aria-expanded={submenu === "color"}
        >
          <Palette className="size-4" />
          Theme
          <ChevronRight className="ml-auto size-4" />
        </Button>
        {submenu === "color" && (
          <div className="mb-1 ml-4 mt-1 border-l border-border pl-2">
            {COLOR_OPTIONS.map((opt) => (
              <Button
                key={opt.value}
                variant="ghost"
                size="xs"
                className="w-full justify-start gap-2 hover:!bg-primary/15 hover:!text-primary"
                onClick={() => setColor(opt.value)}
                aria-pressed={color === opt.value}
              >
                <span
                  className="size-3.5 rounded-full border border-border"
                  style={{ backgroundColor: opt.color }}
                />
                {opt.label}
                {color === opt.value && <Check className="ml-auto size-3" />}
              </Button>
            ))}
          </div>
        )}

        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 hover:!bg-primary/15 hover:!text-primary"
          onClick={() => setSubmenu(submenu === "font" ? null : "font")}
          aria-expanded={submenu === "font"}
        >
          <Type className="size-4" />
          Text style
          <ChevronRight className="ml-auto size-4" />
        </Button>
        {submenu === "font" && (
          <div className="ml-4 mt-1 border-l border-border pl-2">
            {FONT_OPTIONS.map((opt) => (
              <Button
                key={opt.value}
                variant="ghost"
                size="xs"
                className="w-full justify-start hover:!bg-primary/15 hover:!text-primary"
                style={{
                  fontFamily:
                    opt.value === "sans"
                      ? "sans-serif"
                      : opt.value === "serif"
                        ? "serif"
                        : "monospace",
                }}
                onClick={() => setFont(opt.value)}
                aria-pressed={font === opt.value}
              >
                {opt.label}
                {font === opt.value && <Check className="ml-auto size-3" />}
              </Button>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

import { useState } from "react";
import { Check, ChevronRight, Palette, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/store/theme-context";
import { COLOR_THEME_OPTIONS, FONT_THEME_OPTIONS } from "@/types";
import { cn } from "@/lib/utils";

interface SettingsOptionsProps {
  className?: string;
  optionLabelClassName?: string;
}

export function SettingsOptions({
  className,
  optionLabelClassName = "px-2 pb-1 pt-0.5 text-xs font-medium text-muted-foreground",
}: SettingsOptionsProps) {
  const { color, setColor, font, setFont } = useTheme();
  const [section, setSection] = useState<"color" | "font" | null>(null);

  return (
    <div className={className}>
      <p className={optionLabelClassName}>Options</p>

      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "w-full justify-start gap-2 transition-all duration-200 hover:!bg-primary/15 hover:!text-primary hover:[&_svg]:!text-primary",
          section === "color" &&
            "bg-primary/15 text-primary aria-expanded:!bg-primary/15 aria-expanded:!text-primary",
        )}
        onClick={() => setSection(section === "color" ? null : "color")}
        aria-expanded={section === "color"}
      >
        <Palette className="size-4" />
        Theme
        <ChevronRight className="ml-auto size-4" />
      </Button>
      {section === "color" && (
        <div className="mb-2 ml-4 mt-1 border-l border-border pl-2">
          {COLOR_THEME_OPTIONS.map((option) => (
            <Button
              key={option.value}
              variant="ghost"
              size="xs"
              className={cn(
                "w-full justify-start gap-2 transition-all duration-200 hover:!bg-primary/15 hover:!text-primary",
                color === option.value && "bg-primary/15 text-primary",
              )}
              onClick={() => setColor(option.value)}
              aria-pressed={color === option.value}
            >
              <span
                className="size-3.5 rounded-full border border-border"
                style={{ backgroundColor: option.color }}
              />
              {option.label}
              {color === option.value && <Check className="ml-auto size-3" />}
            </Button>
          ))}
        </div>
      )}

      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "w-full justify-start gap-2 transition-all duration-200 hover:!bg-primary/15 hover:!text-primary hover:[&_svg]:!text-primary",
          section === "font" &&
            "bg-primary/15 text-primary aria-expanded:!bg-primary/15 aria-expanded:!text-primary",
        )}
        onClick={() => setSection(section === "font" ? null : "font")}
        aria-expanded={section === "font"}
      >
        <Type className="size-4" />
        Text style
        <ChevronRight className="ml-auto size-4" />
      </Button>
      {section === "font" && (
        <div className="ml-4 mt-1 border-l border-border pl-2">
          {FONT_THEME_OPTIONS.map((option) => (
            <Button
              key={option.value}
              variant="ghost"
              size="xs"
              className={cn(
                "w-full justify-start transition-all duration-200 hover:!bg-primary/15 hover:!text-primary",
                font === option.value && "bg-primary/15 text-primary",
              )}
              style={{
                fontFamily:
                  option.value === "sans"
                    ? "sans-serif"
                    : option.value === "serif"
                      ? "serif"
                      : "monospace",
              }}
              onClick={() => setFont(option.value)}
              aria-pressed={font === option.value}
            >
              {option.label}
              {font === option.value && <Check className="ml-auto size-3" />}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

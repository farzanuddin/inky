import { TAG_COLOR_VALUES, type ColorTheme } from "@/types";

export function tagColorStyle(color: ColorTheme | undefined) {
  const value = TAG_COLOR_VALUES[color ?? "blue"];

  return {
    backgroundColor: `${value}18`,
    borderColor: "transparent",
    color: value,
  };
}

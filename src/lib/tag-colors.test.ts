import { describe, expect, it } from "vitest";
import { tagColorStyle } from "./tag-colors.ts";

describe("tagColorStyle", () => {
  it("uses a muted fill and solid text color for the selected theme color", () => {
    expect(tagColorStyle("rose")).toEqual({
      backgroundColor: "#e11d4818",
      borderColor: "transparent",
      color: "#e11d48",
    });
  });

  it("falls back to blue when a tag has no stored color", () => {
    expect(tagColorStyle(undefined)).toEqual({
      backgroundColor: "#2563eb18",
      borderColor: "transparent",
      color: "#2563eb",
    });
  });
});

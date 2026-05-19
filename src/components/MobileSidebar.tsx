import { useState } from "react";
import { Check, ChevronRight, Palette, Plus, Tag, Type, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NotesLogo } from "@/components/NotesLogo";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TAG_COLOR_OPTIONS, TAG_COLOR_VALUES, type ColorTheme } from "@/types";
import { tagColorStyle } from "@/lib/tag-colors";
import { cn } from "@/lib/utils";
import { useTheme } from "@/store/theme-context";

const COLOR_OPTIONS: { value: ColorTheme; label: string; color: string }[] = [
  { value: "blue", label: "Blue", color: "#2563eb" },
  { value: "green", label: "Green", color: "#16a34a" },
  { value: "purple", label: "Purple", color: "#7c3aed" },
  { value: "rose", label: "Rose", color: "#e11d48" },
  { value: "amber", label: "Amber", color: "#d97706" },
  { value: "slate", label: "Slate", color: "#475569" },
];

const FONT_OPTIONS = [
  { value: "sans", label: "Sans-serif" },
  { value: "serif", label: "Serif" },
  { value: "mono", label: "Monospace" },
] as const;

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
  activeView: "all" | "archived";
  onViewChange: (view: "all" | "archived") => void;
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
  tags: string[];
  tagColors: Record<string, ColorTheme>;
  onCreateTag: (tag: string, color?: ColorTheme) => boolean;
  onDeleteTag: (tag: string) => void;
  mode: "nav" | "tags" | "settings";
}

export function MobileSidebar({
  open,
  onClose,
  activeView,
  onViewChange,
  selectedTag,
  onTagSelect,
  tags,
  tagColors,
  onCreateTag,
  onDeleteTag,
  mode,
}: MobileSidebarProps) {
  const [newTag, setNewTag] = useState("");
  const [newTagColor, setNewTagColor] = useState<ColorTheme>("blue");
  const [showAddTag, setShowAddTag] = useState(false);
  const [tagToDelete, setTagToDelete] = useState<string | null>(null);
  const [settingsSection, setSettingsSection] = useState<
    "color" | "font" | null
  >(null);
  const { color, setColor, font, setFont } = useTheme();

  const handleCreateTag = () => {
    if (onCreateTag(newTag, newTagColor)) {
      setNewTag("");
      setShowAddTag(false);
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={(nextOpen) => !nextOpen && onClose()}>
      <SheetContent
        side="left"
        showCloseButton={false}
        className="w-full gap-0 bg-sidebar p-0 md:w-80 xl:hidden"
        aria-label={
          mode === "settings"
            ? "Settings menu"
            : mode === "nav"
              ? "Navigation menu"
              : "Tags menu"
        }
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-border">
          <NotesLogo className="rounded-md transition-all duration-200 hover:!text-primary [&_.logo-mark]:h-7 [&_.logo-mark]:w-7 [&_.logo-mark]:transition-transform [&_.logo-mark]:duration-200 [&_span]:text-[27px]" />
          <Button
            variant="ghost"
            size="icon-sm"
            className="transition-all duration-200 hover:!bg-primary/15 hover:!text-primary"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="size-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-3">
          {mode === "nav" && (
            <nav
              className="flex flex-col gap-0.5 px-3"
              aria-label="Main navigation"
            >
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "w-full justify-start transition-all duration-200 hover:!bg-primary/15 hover:!text-primary",
                  activeView === "all" && "bg-primary/15 text-primary",
                )}
                onClick={() => {
                  onViewChange("all");
                  onTagSelect(null);
                  onClose();
                }}
              >
                All Notes
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "w-full justify-start transition-all duration-200 hover:!bg-primary/15 hover:!text-primary",
                  activeView === "archived" && "bg-primary/15 text-primary",
                )}
                onClick={() => {
                  onViewChange("archived");
                  onTagSelect(null);
                  onClose();
                }}
              >
                Archived Notes
              </Button>
            </nav>
          )}

          {mode === "settings" && (
            <div className="px-3 py-2">
              <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Options
              </p>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "w-full justify-start gap-2 transition-all duration-200 hover:!bg-primary/15 hover:!text-primary hover:[&_svg]:!text-primary",
                  settingsSection === "color" && "bg-primary/15 text-primary",
                  settingsSection === "color" &&
                    "aria-expanded:!bg-primary/15 aria-expanded:!text-primary",
                )}
                onClick={() =>
                  setSettingsSection(
                    settingsSection === "color" ? null : "color",
                  )
                }
                aria-expanded={settingsSection === "color"}
              >
                <Palette className="size-4" />
                Theme
                <ChevronRight className="ml-auto size-4" />
              </Button>
              {settingsSection === "color" && (
                <div className="mb-2 ml-4 mt-1 border-l border-border pl-2">
                  {COLOR_OPTIONS.map((option) => (
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
                      {color === option.value && (
                        <Check className="ml-auto size-3" />
                      )}
                    </Button>
                  ))}
                </div>
              )}

              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "w-full justify-start gap-2 transition-all duration-200 hover:!bg-primary/15 hover:!text-primary hover:[&_svg]:!text-primary",
                  settingsSection === "font" && "bg-primary/15 text-primary",
                  settingsSection === "font" &&
                    "aria-expanded:!bg-primary/15 aria-expanded:!text-primary",
                )}
                onClick={() =>
                  setSettingsSection(settingsSection === "font" ? null : "font")
                }
                aria-expanded={settingsSection === "font"}
              >
                <Type className="size-4" />
                Text style
                <ChevronRight className="ml-auto size-4" />
              </Button>
              {settingsSection === "font" && (
                <div className="ml-4 mt-1 border-l border-border pl-2">
                  {FONT_OPTIONS.map((option) => (
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
                      {font === option.value && (
                        <Check className="ml-auto size-3" />
                      )}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}

          {(mode === "nav" || mode === "tags") && (
            <div className={mode === "nav" ? "mt-4" : ""}>
              <div className="px-3 py-2">
                <div className="relative mb-1.5 flex items-center justify-between px-2">
                  <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Tags
                  </h2>
                  <Popover open={showAddTag} onOpenChange={setShowAddTag}>
                    <PopoverTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          aria-label="Add tag"
                        />
                      }
                    >
                      <Plus className="size-4" />
                    </PopoverTrigger>
                    <PopoverContent
                      align="end"
                      sideOffset={8}
                      className="w-44 rounded-md p-2"
                      aria-label="Add tag"
                    >
                      <Input
                        value={newTag}
                        onChange={(event) => setNewTag(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") handleCreateTag();
                        }}
                        placeholder="Tag name"
                        className="mb-2 h-7 rounded-md !bg-transparent text-xs focus-visible:ring-2"
                        aria-label="New tag name"
                        autoFocus
                      />
                      <p className="mb-1 px-0.5 text-[11px] font-medium text-muted-foreground">
                        Color
                      </p>
                      <div className="mb-2 flex flex-wrap gap-1.5">
                        {TAG_COLOR_OPTIONS.map((color) => (
                          <button
                            key={color}
                            className={cn(
                              "size-4 rounded-full border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                              newTagColor === color &&
                                "ring-2 ring-primary/40",
                            )}
                            style={{ backgroundColor: TAG_COLOR_VALUES[color] }}
                            onClick={() => setNewTagColor(color)}
                            aria-label={`Use ${color} tag color`}
                            aria-pressed={newTagColor === color}
                          />
                        ))}
                      </div>
                      <div className="flex justify-end gap-1.5">
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => setShowAddTag(false)}
                        >
                          Cancel
                        </Button>
                        <Button size="xs" onClick={handleCreateTag}>
                          Add
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex flex-col gap-0.5">
                  {tags.map((tag) => (
                    <div key={tag} className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "min-w-0 flex-1 justify-start text-xs transition-all duration-200 hover:!bg-primary/15 hover:!text-primary",
                          selectedTag === tag && "bg-primary/15 text-primary",
                        )}
                        onClick={() => {
                          onTagSelect(selectedTag === tag ? null : tag);
                          onClose();
                        }}
                      >
                        <Tag
                          className="size-3.5"
                          style={{
                            color: "var(--color-muted-foreground)",
                            fill: `${tagColorStyle(tagColors[tag]).color}80`,
                          }}
                        />
                        <span className="truncate">{tag}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        className="hover:!bg-destructive/15 hover:!text-destructive"
                        onClick={() => setTagToDelete(tag)}
                        aria-label={`Delete tag ${tag}`}
                      >
                        <X className="size-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
      </Sheet>
      <Dialog open={tagToDelete !== null} onOpenChange={() => setTagToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Tag</DialogTitle>
            <DialogDescription>
              Delete "{tagToDelete}" permanently? This will remove it from every
              note that uses it.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setTagToDelete(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                if (tagToDelete) onDeleteTag(tagToDelete);
                setTagToDelete(null);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

import { useState } from "react";
import { Plus, Tag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NotesLogo } from "@/components/NotesLogo";
import { SettingsOptions } from "@/components/SettingsOptions";
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
import {
  TAG_COLOR_OPTIONS,
  TAG_COLOR_VALUES,
  type ColorTheme,
  type MobileSidebarMode,
} from "@/types";
import { tagColorStyle } from "@/lib/tag-colors";
import { cn } from "@/lib/utils";

const mobileSidebarItemClass =
  "transition-all duration-200 hover:!bg-primary/15 hover:!text-primary";
const mobileSidebarItemActiveClass = "bg-primary/15 text-primary";

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
  tags: string[];
  tagColors: Record<string, ColorTheme>;
  onCreateTag: (tag: string, color?: ColorTheme) => boolean;
  onDeleteTag: (tag: string) => void;
  mode: MobileSidebarMode;
}

export function MobileSidebar({
  open,
  onClose,
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
          aria-label={mode === "settings" ? "Settings menu" : "Tags menu"}
        >
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

        <div className="flex-1 overflow-y-auto py-3">
          {mode === "settings" && (
            <SettingsOptions
              className="px-3 py-2"
              optionLabelClassName="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            />
          )}

          {mode === "tags" && (
            <div>
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
                          "min-w-0 flex-1 justify-start text-xs",
                          mobileSidebarItemClass,
                          selectedTag === tag && mobileSidebarItemActiveClass,
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
      <Dialog
        open={tagToDelete !== null}
        onOpenChange={() => setTagToDelete(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Tag</DialogTitle>
            <DialogDescription>
              Delete "{tagToDelete}" permanently? This will remove it from every
              note that uses it.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTagToDelete(null)}
            >
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

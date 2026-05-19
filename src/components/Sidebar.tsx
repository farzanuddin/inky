import { useState } from "react";
import { Archive, ChevronRight, Home, Plus, Tag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NotesLogo } from "@/components/NotesLogo";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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

interface SidebarProps {
  activeView: "all" | "archived";
  onViewChange: (view: "all" | "archived") => void;
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
  tags: string[];
  tagColors: Record<string, ColorTheme>;
  onCreateTag: (tag: string, color?: ColorTheme) => boolean;
  onDeleteTag: (tag: string) => void;
}

export function Sidebar({
  activeView,
  onViewChange,
  selectedTag,
  onTagSelect,
  tags,
  tagColors,
  onCreateTag,
  onDeleteTag,
}: SidebarProps) {
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
    <aside className="flex flex-col h-full bg-sidebar border-r border-border w-[272px] shrink-0 overflow-y-auto">
      {/* Logo */}
      <div className="flex h-20 items-center gap-2 px-7">
        <NotesLogo
          variant="sidebar"
          showName={false}
          className="rounded-md transition-all duration-200 hover:!text-primary [&_.logo-mark]:transition-transform [&_.logo-mark]:duration-200"
        />
      </div>

      {/* Navigation */}
      <nav
        className="flex flex-col gap-2 px-7 pb-4"
        role="navigation"
        aria-label="Main navigation"
      >
        <Button
          variant="ghost"
          size="lg"
          className={cn(
            "h-10 w-full justify-start gap-3 px-3 text-[15px] transition-all duration-200 hover:!bg-primary/15 hover:!text-primary hover:[&_svg]:!text-primary",
            activeView === "all" && "bg-primary/15 text-primary",
          )}
          onClick={() => {
            onViewChange("all");
            onTagSelect(null);
          }}
        >
          <Home className="size-4" />
          All Notes
          <ChevronRight className="ml-auto size-4" />
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className={cn(
            "h-10 w-full justify-start gap-3 px-3 text-[15px] transition-all duration-200 hover:!bg-primary/15 hover:!text-primary hover:[&_svg]:!text-primary",
            activeView === "archived" && "bg-primary/15 text-primary",
          )}
          onClick={() => {
            onViewChange("archived");
            onTagSelect(null);
          }}
        >
          <Archive className="size-4" />
          Archived Notes
          <ChevronRight className="ml-auto size-4" />
        </Button>
      </nav>

      {/* Tags */}
      <div className="flex-1 overflow-y-auto">
        <div className="border-t border-border px-7 py-4">
          <div className="relative mb-5 flex items-center justify-between px-2">
            <h2 className="text-sm font-medium text-muted-foreground">Tags</h2>
            <Popover open={showAddTag} onOpenChange={setShowAddTag}>
              <PopoverTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    aria-label="Add tag"
                    title="Add tag"
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
                        newTagColor === color && "ring-2 ring-primary/40",
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
          <div className="flex flex-col gap-2">
            {tags.map((tag) => (
              <div key={tag} className="group/tag flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="lg"
                  className={cn(
                    "h-9 min-w-0 flex-1 justify-start gap-3 px-3 text-[15px] font-normal transition-all duration-200 hover:!bg-primary/15 hover:!text-primary hover:[&_svg]:!text-primary",
                    selectedTag === tag && "bg-primary/15 text-primary",
                  )}
                  onClick={() => {
                    onTagSelect(selectedTag === tag ? null : tag);
                  }}
                >
                  <Tag
                    className="size-4"
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
                  className="opacity-0 transition-opacity hover:!bg-destructive/15 hover:!text-destructive group-hover/tag:opacity-100 focus-visible:opacity-100"
                  onClick={() => setTagToDelete(tag)}
                  aria-label={`Delete tag ${tag}`}
                  title={`Delete ${tag}`}
                >
                  <X className="size-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
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

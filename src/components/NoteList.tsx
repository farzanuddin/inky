import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { tagColorStyle } from "@/lib/tag-colors";
import type { ColorTheme, Note } from "@/types";
import { format } from "date-fns";

interface NoteListProps {
  notes: Note[];
  selectedNoteId: string | null;
  onSelectNote: (id: string) => void;
  onCreateNew: () => void;
  searchQuery: string;
  tagColors: Record<string, ColorTheme>;
}

export function NoteList({
  notes,
  selectedNoteId,
  onSelectNote,
  onCreateNew,
  searchQuery,
  tagColors,
}: NoteListProps) {
  return (
    <div className="flex h-full w-[290px] shrink-0 flex-col border-r border-border bg-background">
      {/* Header */}
      <div className="px-8 pb-4 pt-5">
        <Button className="h-10 w-full text-sm" onClick={onCreateNew}>
          + Create New Note
        </Button>
      </div>

      {/* Notes list */}
      <div
        className="flex-1 overflow-y-auto"
        role="list"
        aria-label="Notes list"
      >
        {notes.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8 px-4">
            {searchQuery
              ? "No notes match your search."
              : "No notes yet. Create your first note!"}
          </p>
        ) : (
          notes.map((note) => (
            <button
              key={note.id}
              role="listitem"
              aria-current={selectedNoteId === note.id ? "true" : undefined}
              className={`mx-8 w-[calc(100%-4rem)] text-left border-b border-border px-2 py-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring ${
                selectedNoteId === note.id
                  ? "rounded bg-primary/10"
                  : "hover:bg-muted/50 focus-visible:bg-muted/50"
              }`}
              onClick={() => onSelectNote(note.id)}
            >
              <h3 className="text-base font-bold leading-5 text-foreground">
                {note.title || "Untitled"}
              </h3>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {note.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="h-5 rounded px-1.5 py-0 text-xs font-normal"
                    style={tagColorStyle(tagColors[tag])}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="mt-2 text-xs text-foreground/80">
                {format(new Date(note.updatedAt), "dd MMM yyyy")}
              </p>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

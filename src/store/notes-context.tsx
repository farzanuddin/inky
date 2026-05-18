import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  DEFAULT_TAGS,
  TAG_COLOR_OPTIONS,
  type ColorTheme,
  type Note,
} from "@/types";

function loadNotes(): Note[] {
  try {
    const stored = localStorage.getItem("inky-notes");
    if (stored) return JSON.parse(stored);
  } catch {
    /* ignore */
  }
  return [];
}

function saveNotes(notes: Note[]) {
  localStorage.setItem("inky-notes", JSON.stringify(notes));
}

function loadTags(): string[] {
  try {
    const stored = localStorage.getItem("inky-tags");
    if (stored) {
      return [...JSON.parse(stored)].sort((a, b) => a.localeCompare(b));
    }
  } catch {
    /* ignore */
  }
  return [...DEFAULT_TAGS].sort((a, b) => a.localeCompare(b));
}

function saveTags(tags: string[]) {
  localStorage.setItem("inky-tags", JSON.stringify(tags));
}

function defaultTagColors() {
  return DEFAULT_TAGS.reduce<Record<string, ColorTheme>>((acc, tag, index) => {
    acc[tag] = TAG_COLOR_OPTIONS[index % TAG_COLOR_OPTIONS.length];
    return acc;
  }, {});
}

function loadTagColors(): Record<string, ColorTheme> {
  try {
    const stored = localStorage.getItem("inky-tag-colors");
    if (stored) return { ...defaultTagColors(), ...JSON.parse(stored) };
  } catch {
    /* ignore */
  }
  return defaultTagColors();
}

function saveTagColors(tagColors: Record<string, ColorTheme>) {
  localStorage.setItem("inky-tag-colors", JSON.stringify(tagColors));
}

interface NotesContextValue {
  notes: Note[];
  tags: string[];
  tagColors: Record<string, ColorTheme>;
  createNote: (data: Pick<Note, "title" | "content" | "tags">) => Note;
  updateNote: (
    id: string,
    data: Partial<Pick<Note, "title" | "content" | "tags">>,
  ) => void;
  deleteNote: (id: string) => void;
  toggleArchive: (id: string) => void;
  createTag: (tag: string, color?: ColorTheme) => boolean;
  deleteTag: (tag: string) => void;
  updateTagColor: (tag: string, color: ColorTheme) => void;
}

const NotesContext = createContext<NotesContextValue | null>(null);

let idCounter = Date.now();

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>(loadNotes);
  const [tags, setTags] = useState<string[]>(loadTags);
  const [tagColors, setTagColors] =
    useState<Record<string, ColorTheme>>(loadTagColors);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  useEffect(() => {
    saveTags(tags);
  }, [tags]);

  useEffect(() => {
    saveTagColors(tagColors);
  }, [tagColors]);

  const createNote = useCallback(
    (data: Pick<Note, "title" | "content" | "tags">) => {
      const now = new Date().toISOString();
      const note: Note = {
        id: String(++idCounter),
        title: data.title,
        content: data.content,
        tags: data.tags,
        archived: false,
        createdAt: now,
        updatedAt: now,
      };
      setNotes((prev) => [note, ...prev]);
      return note;
    },
    [],
  );

  const updateNote = useCallback(
    (id: string, data: Partial<Pick<Note, "title" | "content" | "tags">>) => {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === id
            ? { ...n, ...data, updatedAt: new Date().toISOString() }
            : n,
        ),
      );
    },
    [],
  );

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const toggleArchive = useCallback((id: string) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id
          ? { ...n, archived: !n.archived, updatedAt: new Date().toISOString() }
          : n,
      ),
    );
  }, []);

  const createTag = useCallback(
    (tag: string, color: ColorTheme = "blue") => {
      const nextTag = tag.trim();
      if (!nextTag) return false;
      if (
        tags.some(
          (existing) => existing.toLowerCase() === nextTag.toLowerCase(),
        )
      ) {
        return false;
      }

      setTags((prev) => [...prev, nextTag].sort((a, b) => a.localeCompare(b)));
      setTagColors((prev) => ({ ...prev, [nextTag]: color }));
      return true;
    },
    [tags],
  );

  const deleteTag = useCallback((tag: string) => {
    setTags((prev) => prev.filter((existing) => existing !== tag));
    setTagColors((prev) => {
      const next = { ...prev };
      delete next[tag];
      return next;
    });
    setNotes((prev) =>
      prev.map((note) =>
        note.tags.includes(tag)
          ? {
              ...note,
              tags: note.tags.filter((existing) => existing !== tag),
              updatedAt: new Date().toISOString(),
            }
          : note,
      ),
    );
  }, []);

  const updateTagColor = useCallback((tag: string, color: ColorTheme) => {
    setTagColors((prev) => ({ ...prev, [tag]: color }));
  }, []);

  return (
    <NotesContext.Provider
      value={{
        notes,
        tags,
        tagColors,
        createNote,
        updateNote,
        deleteNote,
        toggleArchive,
        createTag,
        deleteTag,
        updateTagColor,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error("useNotes must be used within NotesProvider");
  return ctx;
}

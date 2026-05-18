import { useEffect, useRef, useState } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  RemoveFormatting,
  Underline,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  "aria-label"?: string;
}

const FORMAT_ACTIONS = [
  { command: "bold", label: "Bold", icon: Bold },
  { command: "italic", label: "Italic", icon: Italic },
  { command: "underline", label: "Underline", icon: Underline },
  { command: "insertUnorderedList", label: "Bullet list", icon: List },
  { command: "insertOrderedList", label: "Numbered list", icon: ListOrdered },
] as const;

function isEmptyHtml(html: string) {
  const text = html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

  return text.length === 0;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Start writing...",
  "aria-label": ariaLabel = "Note content",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeCommands, setActiveCommands] = useState<Set<string>>(
    () => new Set(),
  );
  const [isEmpty, setIsEmpty] = useState(() => isEmptyHtml(value));

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || document.activeElement === editor) return;
    if (editor.innerHTML !== value) {
      editor.innerHTML = value;
      setIsEmpty(isEmptyHtml(value));
    }
  }, [value]);

  const syncValue = () => {
    const html = editorRef.current?.innerHTML ?? "";
    setIsEmpty(isEmptyHtml(html));
    onChange(html);
  };

  const updateActiveCommands = () => {
    const next = new Set<string>();
    for (const action of FORMAT_ACTIONS) {
      if (document.queryCommandState(action.command)) {
        next.add(action.command);
      }
    }
    setActiveCommands(next);
  };

  const runCommand = (command: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false);
    syncValue();
    updateActiveCommands();
  };

  return (
    <div className="rounded-md border border-border">
      <div className="flex flex-wrap items-center gap-1 border-b border-border px-2 py-1.5">
        {FORMAT_ACTIONS.map((action) => {
          const Icon = action.icon;
          const active = activeCommands.has(action.command);

          return (
            <Button
              key={action.command}
              variant={active ? "secondary" : "ghost"}
              size="icon-sm"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => runCommand(action.command)}
              aria-label={action.label}
              aria-pressed={active}
              title={action.label}
            >
              <Icon className="size-4" />
            </Button>
          );
        })}
        <div className="mx-1 h-5 w-px bg-border" />
        <Button
          variant="ghost"
          size="icon-sm"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => runCommand("removeFormat")}
          aria-label="Clear formatting"
          title="Clear formatting"
        >
          <RemoveFormatting className="size-4" />
        </Button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className={cn(
          "rich-editor min-h-48 resize-y overflow-auto rounded-b-md px-3 py-2 text-sm leading-5 outline-none",
          "focus-visible:ring-0",
          isEmpty && "is-empty",
        )}
        data-placeholder={placeholder}
        aria-label={ariaLabel}
        role="textbox"
        aria-multiline="true"
        onInput={syncValue}
        onKeyUp={updateActiveCommands}
        onMouseUp={updateActiveCommands}
        onFocus={updateActiveCommands}
      />
    </div>
  );
}

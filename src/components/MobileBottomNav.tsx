import { Button } from "@/components/ui/button";
import { Home, Search, Archive, Tags, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileBottomNavProps {
  activeView: "all" | "archived";
  onViewChange: (view: "all" | "archived") => void;
  onOpenSearch: () => void;
  onOpenTags: () => void;
  onOpenSettings: () => void;
}

export function MobileBottomNav({
  activeView,
  onViewChange,
  onOpenSearch,
  onOpenTags,
  onOpenSettings,
}: MobileBottomNavProps) {
  return (
    <nav
      className="xl:hidden fixed bottom-0 left-0 right-0 z-30 bg-background border-t border-border safe-area-bottom"
      role="navigation"
      aria-label="Mobile navigation"
    >
      {/* Mobile: icon-only compact bar */}
      <div className="flex md:hidden items-center justify-around h-12 px-1">
        <Button
          variant="ghost"
          size="icon-sm"
          className={cn(
            "size-10 rounded-lg",
            activeView === "all" && "text-primary bg-accent",
          )}
          onClick={() => onViewChange("all")}
          aria-label="Home"
        >
          <Home className="size-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon-sm"
          className="size-10 rounded-lg"
          onClick={onOpenSearch}
          aria-label="Search"
        >
          <Search className="size-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon-sm"
          className={cn(
            "size-10 rounded-lg",
            activeView === "archived" && "text-primary bg-accent",
          )}
          onClick={() => onViewChange("archived")}
          aria-label="Archived"
        >
          <Archive className="size-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon-sm"
          className="size-10 rounded-lg"
          onClick={onOpenTags}
          aria-label="Tags"
        >
          <Tags className="size-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon-sm"
          className="size-10 rounded-lg"
          onClick={onOpenSettings}
          aria-label="Settings"
        >
          <Settings className="size-5" />
        </Button>
      </div>

      {/* Tablet: icons + labels */}
      <div className="hidden md:flex items-center justify-around h-14 px-1">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "flex-col gap-0.5 h-auto py-1 px-3 text-[10px] font-normal",
            activeView === "all" && "text-primary",
          )}
          onClick={() => onViewChange("all")}
          aria-label="Home"
        >
          <Home className="size-5" />
          Home
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex-col gap-0.5 h-auto py-1 px-3 text-[10px] font-normal"
          onClick={onOpenSearch}
          aria-label="Search"
        >
          <Search className="size-5" />
          Search
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "flex-col gap-0.5 h-auto py-1 px-3 text-[10px] font-normal",
            activeView === "archived" && "text-primary",
          )}
          onClick={() => onViewChange("archived")}
          aria-label="Archived"
        >
          <Archive className="size-5" />
          Archived
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex-col gap-0.5 h-auto py-1 px-3 text-[10px] font-normal"
          onClick={onOpenTags}
          aria-label="Tags"
        >
          <Tags className="size-5" />
          Tags
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex-col gap-0.5 h-auto py-1 px-3 text-[10px] font-normal"
          onClick={onOpenSettings}
          aria-label="Settings"
        >
          <Settings className="size-5" />
          Settings
        </Button>
      </div>
    </nav>
  );
}

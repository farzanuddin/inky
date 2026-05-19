import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Settings } from "lucide-react";
import { useState } from "react";
import { SettingsOptions } from "@/components/SettingsOptions";

export function ThemeSelector() {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger
        render={
          <Button variant="ghost" size="icon-sm" aria-label="Options" title="Options" />
        }
      >
        <Settings className="size-4" />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-56 rounded-lg p-2"
        aria-label="Options"
      >
        <SettingsOptions />
      </PopoverContent>
    </Popover>
  );
}

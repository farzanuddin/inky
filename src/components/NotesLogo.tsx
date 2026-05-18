interface NotesLogoProps {
  className?: string;
  showName?: boolean;
  variant?: "default" | "sidebar";
}

export function NotesLogo({
  className,
  showName = true,
  variant = "default",
}: NotesLogoProps) {
  return (
    <div
      className={
        variant === "sidebar"
          ? `grid grid-cols-[44px_1fr] items-center ${className ?? ""}`
          : `flex items-center gap-2.5 ${className ?? ""}`
      }
      aria-label="Inky"
    >
      <span
        className="logo-mark h-8 w-8 shrink-0 justify-self-center bg-primary"
        aria-hidden="true"
        style={{
          mask: "url('/logo.svg') center / contain no-repeat",
          WebkitMask: "url('/logo.svg') center / contain no-repeat",
        }}
      />
      {showName && (
        <span className="translate-y-[1px] text-[25px] font-semibold leading-none tracking-normal text-foreground [font-family:'Trebuchet_MS','Segoe_UI',system-ui,sans-serif]">
          Inky
        </span>
      )}
    </div>
  );
}

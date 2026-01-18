import { cn } from "@/lib/utils";

interface CraftLogoProps {
  className?: string;
}

export function CraftLogo({ className }: CraftLogoProps) {
  return (
    <span className={cn("font-bold", className)}>
      <span className="text-foreground">Craft</span>
      <span className="text-emerald-600">JS</span>
    </span>
  );
}

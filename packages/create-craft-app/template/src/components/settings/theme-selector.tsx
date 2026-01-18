"use client";

import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  const themes = [
    {
      name: "light",
      label: "Light",
      icon: Sun,
    },
    {
      name: "dark",
      label: "Dark",
      icon: Moon,
    },
    {
      name: "system",
      label: "System",
      icon: Monitor,
    },
  ];

  return (
    <div className="space-y-4">
      <Label>Theme</Label>
      <div className="flex gap-2">
        {themes.map((t) => (
          <Button
            key={t.name}
            variant="outline"
            onClick={() => setTheme(t.name)}
            className={cn("flex-1", theme === t.name && "border-primary bg-primary/5")}
          >
            <t.icon className="mr-2 h-4 w-4" />
            {t.label}
          </Button>
        ))}
      </div>
      <p className="text-muted-foreground text-sm">
        Select a theme for the dashboard. System will automatically match your device settings.
      </p>
    </div>
  );
}

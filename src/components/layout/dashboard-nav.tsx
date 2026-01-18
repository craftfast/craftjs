"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquare,
  Settings,
  CreditCard,
  Zap,
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Chat",
    href: "/chat",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Billing",
    href: "/settings/billing",
    icon: CreditCard,
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <aside className="bg-muted/40 hidden w-64 flex-col border-r md:flex">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <Zap className="h-6 w-6" />
          <span className="text-xl font-bold">CraftJS</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname?.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t p-4">
        <div className="bg-muted rounded-lg p-3">
          <p className="text-xs font-medium">Free Plan</p>
          <p className="text-muted-foreground mt-1 text-xs">
            24.5K / 50K tokens used
          </p>
          <div className="bg-muted-foreground/20 mt-2 h-1.5 rounded-full">
            <div
              className="bg-primary h-full rounded-full"
              style={{ width: "49%" }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}

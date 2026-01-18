"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  initPostHog,
  trackPageView,
  identifyUser,
  resetUser,
} from "@/lib/analytics/posthog-client";
import { useSession } from "@/lib/auth/client";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  // Initialize PostHog on mount
  useEffect(() => {
    initPostHog();
  }, []);

  // Track page views
  useEffect(() => {
    if (pathname) {
      const url = `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ""}`;
      trackPageView(url);
    }
  }, [pathname, searchParams]);

  // Identify user when session changes
  useEffect(() => {
    if (session?.user) {
      identifyUser(session.user.id, {
        email: session.user.email,
        name: session.user.name,
      });
    } else {
      resetUser();
    }
  }, [session]);

  return <>{children}</>;
}

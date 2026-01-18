"use client";

import { Suspense } from "react";
import { ThemeProvider } from "./theme-provider";
import { AnalyticsProvider } from "./analytics-provider";
import { TawkToProvider } from "./tawkto-provider";
import { ToastProvider } from "./toast-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <Suspense fallback={null}>
        <AnalyticsProvider>
          <TawkToProvider>
            {children}
            <ToastProvider />
          </TawkToProvider>
        </AnalyticsProvider>
      </Suspense>
    </ThemeProvider>
  );
}

"use client";

import { useEffect } from "react";
import { useSession } from "@/lib/auth/client";

declare global {
  interface Window {
    Tawk_API?: {
      onLoad?: () => void;
      setAttributes?: (
        attributes: Record<string, string>,
        callback?: (error?: Error) => void
      ) => void;
      visitor?: {
        name?: string;
        email?: string;
      };
      hideWidget?: () => void;
      showWidget?: () => void;
      maximize?: () => void;
      minimize?: () => void;
      toggle?: () => void;
    };
    Tawk_LoadStart?: Date;
  }
}

interface TawkToProviderProps {
  children: React.ReactNode;
  propertyId?: string;
  widgetId?: string;
}

export function TawkToProvider({
  children,
  propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID,
  widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID,
}: TawkToProviderProps) {
  const { data: session } = useSession();

  useEffect(() => {
    // Skip if no credentials
    if (!propertyId || !widgetId) {
      return;
    }

    // Skip if already loaded
    if (window.Tawk_API) {
      return;
    }

    // Load Tawk.to script
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    window.Tawk_LoadStart = new Date();

    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      const existingScript = document.querySelector(
        `script[src="https://embed.tawk.to/${propertyId}/${widgetId}"]`
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [propertyId, widgetId]);

  // Update visitor info when session changes
  useEffect(() => {
    if (!window.Tawk_API || !session?.user) {
      return;
    }

    // Set visitor attributes when Tawk loads
    window.Tawk_API.onLoad = () => {
      if (window.Tawk_API?.setAttributes) {
        window.Tawk_API.setAttributes(
          {
            name: session.user.name || "",
            email: session.user.email || "",
            id: session.user.id,
          },
          (error) => {
            if (error) {
              console.error("Tawk.to setAttributes error:", error);
            }
          }
        );
      }
    };
  }, [session]);

  return <>{children}</>;
}

/**
 * Utility functions to control Tawk.to widget
 */
export const tawkTo = {
  hide: () => window.Tawk_API?.hideWidget?.(),
  show: () => window.Tawk_API?.showWidget?.(),
  maximize: () => window.Tawk_API?.maximize?.(),
  minimize: () => window.Tawk_API?.minimize?.(),
  toggle: () => window.Tawk_API?.toggle?.(),
};

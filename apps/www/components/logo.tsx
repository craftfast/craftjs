import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "default" | "lg";
  showText?: boolean;
}

export function Logo({ className, size = "default", showText = true }: LogoProps) {
  const sizes = {
    sm: { icon: 24, text: "text-lg" },
    default: { icon: 28, text: "text-xl" },
    lg: { icon: 36, text: "text-2xl" },
  };

  const { icon, text } = sizes[size];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Logo Mark - Minimal geometric design */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Main square with corner accent */}
        <rect
          x="4"
          y="4"
          width="24"
          height="24"
          rx="4"
          className="fill-neutral-900 dark:fill-white"
        />
        {/* Inner diagonal line - represents craft/build */}
        <path
          d="M10 22L22 10"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="dark:stroke-neutral-900"
        />
        {/* Top right accent */}
        <path
          d="M18 10H22V14"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="dark:stroke-neutral-900"
        />
        {/* Bottom left accent */}
        <circle cx="10" cy="22" r="2" className="fill-white dark:fill-neutral-900" />
      </svg>

      {showText && (
        <span className={cn("font-semibold tracking-tight", text)}>
          <span className="text-neutral-900 dark:text-white">Craft</span>
          <span className="text-neutral-400">JS</span>
        </span>
      )}
    </div>
  );
}

export function LogoIcon({ className, size = 28 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="4"
        y="4"
        width="24"
        height="24"
        rx="4"
        className="fill-neutral-900 dark:fill-white"
      />
      <path
        d="M10 22L22 10"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="dark:stroke-neutral-900"
      />
      <path
        d="M18 10H22V14"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="dark:stroke-neutral-900"
      />
      <circle cx="10" cy="22" r="2" className="fill-white dark:fill-neutral-900" />
    </svg>
  );
}

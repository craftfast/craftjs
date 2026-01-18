import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-muted/50 flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-4">{children}</div>
    </div>
  );
}

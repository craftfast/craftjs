import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "@/components/settings/profile-form";
import { ThemeSelector } from "@/components/settings/theme-selector";

export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account settings and preferences.</p>
      </div>

      <Separator />

      {/* Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your personal information and profile settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm user={session?.user} />
        </CardContent>
      </Card>

      {/* Appearance Section */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize the appearance of the application.</CardDescription>
        </CardHeader>
        <CardContent>
          <ThemeSelector />
        </CardContent>
      </Card>
    </div>
  );
}

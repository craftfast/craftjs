import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MessageSquare, Zap, Clock, ArrowRight } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {session?.user.name?.split(" ")[0] || "there"}!
        </h1>
        <p className="text-muted-foreground mt-2">
          Here&apos;s an overview of your account and recent activity.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="AI Conversations"
          value="12"
          description="This month"
          icon={<MessageSquare className="text-muted-foreground h-4 w-4" />}
        />
        <StatsCard
          title="Tokens Used"
          value="24.5K"
          description="This month"
          icon={<Zap className="text-muted-foreground h-4 w-4" />}
        />
        <StatsCard
          title="Active Chats"
          value="3"
          description="Currently active"
          icon={<Clock className="text-muted-foreground h-4 w-4" />}
        />
        <StatsCard
          title="Plan"
          value="Free"
          description="Upgrade for more"
          icon={<Zap className="text-muted-foreground h-4 w-4" />}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Start a New Chat</CardTitle>
            <CardDescription>
              Begin a conversation with our AI assistant
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/chat">
                New Conversation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upgrade Your Plan</CardTitle>
            <CardDescription>
              Get access to more features and higher limits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" asChild>
              <Link href="/settings/billing">View Plans</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Your latest conversations and actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground py-8 text-center">
            <MessageSquare className="mx-auto mb-4 h-12 w-12 opacity-50" />
            <p>No recent activity yet</p>
            <p className="mt-1 text-sm">
              Start a conversation to see your activity here
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatsCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-muted-foreground text-xs">{description}</p>
      </CardContent>
    </Card>
  );
}

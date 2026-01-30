/**
 * Component Templates for CraftJS AI App Builder
 * Pre-built patterns the AI can use to generate common components
 */

/**
 * Page template
 */
export const pageTemplate = (config: {
  title: string;
  description?: string;
  hasForm?: boolean;
  hasList?: boolean;
}) => `import { Metadata } from "next";
${config.hasForm ? 'import { ContactForm } from "@/components/contact-form";' : ""}
${config.hasList ? 'import { ItemList } from "@/components/item-list";' : ""}

export const metadata: Metadata = {
  title: "${config.title}",
  ${config.description ? `description: "${config.description}",` : ""}
};

export default function ${config.title.replace(/\s+/g, "")}Page() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">${config.title}</h1>
      ${config.description ? `<p className="text-muted-foreground mb-8">${config.description}</p>` : ""}
      ${config.hasForm ? "<ContactForm />" : ""}
      ${config.hasList ? "<ItemList />" : ""}
    </div>
  );
}
`;

/**
 * Client component template
 */
export const clientComponentTemplate = (config: {
  name: string;
  hasState?: boolean;
  hasEffect?: boolean;
}) => `"use client";

import { ${[config.hasState && "useState", config.hasEffect && "useEffect"].filter(Boolean).join(", ")} } from "react";

interface ${config.name}Props {
  className?: string;
}

export function ${config.name}({ className }: ${config.name}Props) {
  ${config.hasState ? 'const [value, setValue] = useState<string>("");' : ""}
  ${
    config.hasEffect
      ? `
  useEffect(() => {
    // Component mounted
    return () => {
      // Cleanup
    };
  }, []);`
      : ""
  }

  return (
    <div className={className}>
      {/* TODO: Implement ${config.name} */}
    </div>
  );
}
`;

/**
 * Server component template
 */
export const serverComponentTemplate = (config: {
  name: string;
  hasData?: boolean;
}) => `${config.hasData ? 'import { db } from "@/lib/db";' : ""}

interface ${config.name}Props {
  className?: string;
}

export async function ${config.name}({ className }: ${config.name}Props) {
  ${config.hasData ? "const data = await db.query.items.findMany();" : ""}

  return (
    <div className={className}>
      {/* TODO: Implement ${config.name} */}
      ${
        config.hasData
          ? `{data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}`
          : ""
      }
    </div>
  );
}
`;

/**
 * API route template
 */
export const apiRouteTemplate = (config: {
  methods: ("GET" | "POST" | "PUT" | "DELETE")[];
  hasAuth?: boolean;
  hasDb?: boolean;
}) => `import { NextResponse } from "next/server";
${config.hasAuth ? 'import { auth } from "@/lib/auth";' : ""}
${config.hasDb ? 'import { db } from "@/lib/db";' : ""}

${
  config.methods.includes("GET")
    ? `export async function GET(request: Request) {
  ${
    config.hasAuth
      ? `const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }`
      : ""
  }
  
  ${config.hasDb ? "const data = await db.query.items.findMany();" : "const data = {};"}
  
  return NextResponse.json(data);
}
`
    : ""
}
${
  config.methods.includes("POST")
    ? `export async function POST(request: Request) {
  ${
    config.hasAuth
      ? `const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }`
      : ""
  }
  
  const body = await request.json();
  
  // TODO: Validate and process body
  
  return NextResponse.json({ success: true });
}
`
    : ""
}
${
  config.methods.includes("PUT")
    ? `export async function PUT(request: Request) {
  ${
    config.hasAuth
      ? `const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }`
      : ""
  }
  
  const body = await request.json();
  
  // TODO: Update resource
  
  return NextResponse.json({ success: true });
}
`
    : ""
}
${
  config.methods.includes("DELETE")
    ? `export async function DELETE(request: Request) {
  ${
    config.hasAuth
      ? `const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }`
      : ""
  }
  
  // TODO: Delete resource
  
  return NextResponse.json({ success: true });
}
`
    : ""
}`;

/**
 * Form component template
 */
export const formTemplate = (config: {
  name: string;
  fields: { name: string; type: string; label: string; required?: boolean }[];
}) => `"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ${config.name}Data {
  ${config.fields.map((f) => `${f.name}: ${f.type === "email" || f.type === "text" || f.type === "password" ? "string" : f.type};`).join("\n  ")}
}

export function ${config.name}() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<${config.name}Data>({
    ${config.fields.map((f) => `${f.name}: "",`).join("\n    ")}
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // TODO: Submit form data
      console.log(formData);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      ${config.fields
        .map(
          (f) => `<div className="space-y-2">
        <Label htmlFor="${f.name}">${f.label}</Label>
        <Input
          id="${f.name}"
          type="${f.type}"
          value={formData.${f.name}}
          onChange={(e) => setFormData({ ...formData, ${f.name}: e.target.value })}
          ${f.required ? "required" : ""}
        />
      </div>`
        )
        .join("\n      ")}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
`;

/**
 * Card list template
 */
export const cardListTemplate = (config: {
  name: string;
  itemType: string;
}) => `import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ${config.itemType} {
  id: string;
  title: string;
  description?: string;
}

interface ${config.name}Props {
  items: ${config.itemType}[];
}

export function ${config.name}({ items }: ${config.name}Props) {
  if (items.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No items found.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
            {item.description && (
              <CardDescription>{item.description}</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {/* TODO: Add card content */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
`;

/**
 * Dashboard layout template
 */
export const dashboardLayoutTemplate = () => `import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
`;

/**
 * Database schema template (Drizzle)
 */
export const schemaTemplate = (config: {
  tableName: string;
  columns: { name: string; type: string; nullable?: boolean }[];
}) => `import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const ${config.tableName} = pgTable("${config.tableName}", {
  id: uuid("id").primaryKey().defaultRandom(),
  ${config.columns.map((c) => `${c.name}: ${c.type}("${c.name}")${c.nullable ? "" : ".notNull()"},`).join("\n  ")}
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type ${config.tableName.charAt(0).toUpperCase() + config.tableName.slice(1)} = typeof ${config.tableName}.$inferSelect;
export type New${config.tableName.charAt(0).toUpperCase() + config.tableName.slice(1)} = typeof ${config.tableName}.$inferInsert;
`;

/**
 * Export all templates
 */
export const templates = {
  page: pageTemplate,
  clientComponent: clientComponentTemplate,
  serverComponent: serverComponentTemplate,
  apiRoute: apiRouteTemplate,
  form: formTemplate,
  cardList: cardListTemplate,
  dashboardLayout: dashboardLayoutTemplate,
  schema: schemaTemplate,
};

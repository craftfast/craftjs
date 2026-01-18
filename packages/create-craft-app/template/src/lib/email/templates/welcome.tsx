import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface WelcomeEmailProps {
  name: string;
  appName?: string;
  appUrl?: string;
}

export function WelcomeEmail({
  name,
  appName = "CraftJS",
  appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to {appName}!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Welcome to {appName}! 🎉</Heading>
          <Section style={section}>
            <Text style={text}>Hi {name},</Text>
            <Text style={text}>
              Thanks for signing up! We&apos;re excited to have you on board.
            </Text>
            <Text style={text}>
              You can now start using all the features of {appName}. Here are some things you can
              do:
            </Text>
            <ul style={list}>
              <li>Create AI-powered conversations</li>
              <li>Upload and manage files</li>
              <li>Customize your experience</li>
            </ul>
            <Text style={text}>
              <Link href={`${appUrl}/dashboard`} style={link}>
                Go to Dashboard →
              </Link>
            </Text>
            <Text style={text}>
              If you have any questions, feel free to reach out to our support team.
            </Text>
            <Text style={footer}>
              Best,
              <br />
              The {appName} Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  borderRadius: "8px",
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "600",
  color: "#484848",
  padding: "17px 0 0",
  textAlign: "center" as const,
};

const section = {
  padding: "0 48px",
};

const text = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#484848",
};

const list = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#484848",
  paddingLeft: "20px",
};

const link = {
  color: "#0066cc",
  textDecoration: "underline",
};

const footer = {
  fontSize: "14px",
  lineHeight: "24px",
  color: "#898989",
  marginTop: "32px",
};

export default WelcomeEmail;

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

interface ResetPasswordEmailProps {
  name: string;
  resetUrl: string;
  appName?: string;
}

export function ResetPasswordEmail({
  name,
  resetUrl,
  appName = "CraftJS",
}: ResetPasswordEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your {appName} password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Reset Your Password</Heading>
          <Section style={section}>
            <Text style={text}>Hi {name},</Text>
            <Text style={text}>
              We received a request to reset your password. Click the button
              below to choose a new password:
            </Text>
            <Section style={buttonContainer}>
              <Link href={resetUrl} style={button}>
                Reset Password
              </Link>
            </Section>
            <Text style={text}>
              This link will expire in 1 hour. If you didn&apos;t request a
              password reset, you can safely ignore this email.
            </Text>
            <Text style={text}>
              If the button doesn&apos;t work, copy and paste this URL into your
              browser:
            </Text>
            <Text style={linkText}>{resetUrl}</Text>
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

const buttonContainer = {
  textAlign: "center" as const,
  marginTop: "24px",
  marginBottom: "24px",
};

const button = {
  backgroundColor: "#0066cc",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
};

const linkText = {
  fontSize: "14px",
  lineHeight: "24px",
  color: "#0066cc",
  wordBreak: "break-all" as const,
};

const footer = {
  fontSize: "14px",
  lineHeight: "24px",
  color: "#898989",
  marginTop: "32px",
};

export default ResetPasswordEmail;

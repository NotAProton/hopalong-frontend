import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const app = new Hono();

// Validation Schemas
const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z
    .string()
    .email()
    .refine((email) => email.endsWith("@iiitkottayam.ac.in"), {
      message: "Only IIITK email addresses are allowed",
    }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const verifySchema = z.object({
  email: z.string().email(),
  code: z.string(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Mock database of users
const users = new Map<
  string,
  {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    verified: boolean;
    verificationCode?: string;
  }
>();

// Helper function to generate verification code
const generateVerificationCode = () =>
  Math.random().toString(36).substring(2, 8).toUpperCase();

// Helper function to generate session token
const generateSessionToken = () =>
  Array(64)
    .fill(0)
    .map(() => Math.random().toString(36)[2])
    .join("");

// Signup Endpoint
app.post("/auth/signup", zValidator("json", signupSchema), async (c) => {
  const { firstName, lastName, email, password } = c.req.valid("json");

  // Check if user already exists
  if (users.has(email)) {
    return c.json(
      {
        status: "error",
        payload: { message: "User already exists" },
      },
      400
    );
  }

  // Generate verification code
  const verificationCode = generateVerificationCode();

  // Store user (not verified initially)
  users.set(email, {
    firstName,
    lastName,
    email,
    password,
    verified: false,
    verificationCode,
  });

  return c.json({
    status: "success",
    payload: { message: "Verification email sent." },
  });
});

// Verify Endpoint
app.post("/auth/verify", zValidator("json", verifySchema), async (c) => {
  const { email, code } = c.req.valid("json");

  const user = users.get(email);
  if (!user) {
    return c.json(
      {
        status: "error",
        payload: { message: "User not found" },
      },
      404
    );
  }

  if (user.verificationCode !== code) {
    return c.json(
      {
        status: "error",
        payload: { message: "Invalid verification code" },
      },
      400
    );
  }

  // Mark user as verified
  user.verified = true;
  delete user.verificationCode;

  return c.json({
    status: "success",
    payload: { message: "Email verified. You can now log in." },
  });
});

// Login Endpoint
app.post("/auth/login", zValidator("json", loginSchema), async (c) => {
  const { email, password } = c.req.valid("json");

  const user = users.get(email);
  if (!user) {
    return c.json(
      {
        status: "error",
        payload: { message: "User not found" },
      },
      404
    );
  }

  if (!user.verified) {
    return c.json(
      {
        status: "error",
        payload: { message: "Account not verified" },
      },
      403
    );
  }

  if (user.password !== password) {
    return c.json(
      {
        status: "error",
        payload: { message: "Invalid credentials" },
      },
      401
    );
  }

  // Generate session token
  const token = generateSessionToken();

  return c.json({
    status: "success",
    payload: { token },
  });
});

// Example protected route to demonstrate token authorization
app.get("/api/protected", (c) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json(
      {
        status: "error",
        payload: { message: "Unauthorized" },
      },
      401
    );
  }

  const token = authHeader.split(" ")[1];

  // In a real implementation, you'd validate the token
  // Here we're just doing a simple check
  if (token.length !== 64 || !/^[a-z0-9]{64}$/.test(token)) {
    return c.json(
      {
        status: "error",
        payload: { message: "Invalid token" },
      },
      401
    );
  }

  return c.json({
    status: "success",
    payload: { message: "Access granted to protected resource" },
  });
});

// Seed with a test user
users.set("user@iiitkottayam.ac.in", {
  firstName: "John",
  lastName: "Doe",
  email: "user@iiitkottayam.ac.in",
  password: "password123",
  verified: true,
});

export default app;

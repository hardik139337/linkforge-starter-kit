import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextRequest } from "next/server";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(1, "Name is required"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .regex(/^[a-zA-Z0-9-]+$/, "Username can only contain letters, numbers, and hyphens"),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const result = registerSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      { error: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { email, password, name, username } = result.data;

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (existingUser) {
    if (existingUser.email === email) {
      return Response.json({ error: "Email already registered" }, { status: 409 });
    }
    return Response.json({ error: "Username already taken" }, { status: 409 });
  }

  const hashedPassword = await hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      username,
      hashedPassword,
    },
  });

  return Response.json(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
    },
    { status: 201 }
  );
}

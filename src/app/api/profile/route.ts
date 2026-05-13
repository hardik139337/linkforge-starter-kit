import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      bio: true,
      image: true,
      theme: true,
      plan: true,
      createdAt: true,
    },
  });

  return Response.json(user);
}

export async function PATCH(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, username, bio, theme } = body;

  if (username) {
    const existing = await prisma.user.findFirst({
      where: { username, NOT: { id: session.user.id } },
    });
    if (existing) {
      return Response.json({ error: "Username already taken" }, { status: 409 });
    }
  }

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      ...(name !== undefined && { name }),
      ...(username !== undefined && { username }),
      ...(bio !== undefined && { bio }),
      ...(theme !== undefined && { theme }),
    },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      bio: true,
      image: true,
      theme: true,
      plan: true,
    },
  });

  return Response.json(user);
}

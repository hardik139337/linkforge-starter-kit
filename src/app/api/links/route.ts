import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const links = await prisma.link.findMany({
    where: { userId: session.user.id },
    orderBy: { order: "asc" },
  });

  return Response.json(links);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, url, icon } = body;

  if (!title || !url) {
    return Response.json({ error: "Title and URL are required" }, { status: 400 });
  }

  const linkCount = await prisma.link.count({
    where: { userId: session.user.id },
  });

  if (session.user.plan === "free" && linkCount >= 5) {
    return Response.json(
      { error: "Free plan limited to 5 links. Upgrade to Pro for unlimited." },
      { status: 403 }
    );
  }

  const link = await prisma.link.create({
    data: {
      title,
      url,
      icon: icon || null,
      order: linkCount,
      userId: session.user.id,
    },
  });

  return Response.json(link, { status: 201 });
}

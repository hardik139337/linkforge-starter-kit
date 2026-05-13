import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { links } = await request.json();

  if (!Array.isArray(links)) {
    return Response.json({ error: "Links array required" }, { status: 400 });
  }

  await prisma.$transaction(
    links.map((link: { id: string; order: number }) =>
      prisma.link.updateMany({
        where: { id: link.id, userId: session.user.id },
        data: { order: link.order },
      })
    )
  );

  return Response.json({ success: true });
}

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const existing = await prisma.link.findUnique({ where: { id } });
  if (!existing || existing.userId !== session.user.id) {
    return Response.json({ error: "Link not found" }, { status: 404 });
  }

  const link = await prisma.link.update({
    where: { id },
    data: {
      title: body.title,
      url: body.url,
      icon: body.icon,
      active: body.active,
    },
  });

  return Response.json(link);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const existing = await prisma.link.findUnique({ where: { id } });
  if (!existing || existing.userId !== session.user.id) {
    return Response.json({ error: "Link not found" }, { status: 404 });
  }

  await prisma.link.delete({ where: { id } });

  return Response.json({ success: true });
}

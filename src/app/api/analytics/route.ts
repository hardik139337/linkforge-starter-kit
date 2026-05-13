import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const [links, pageViewsThisWeek, linkClicksThisWeek, recentPageViews] =
    await Promise.all([
      prisma.link.findMany({
        where: { userId },
        select: { id: true, title: true, clicks: true },
        orderBy: { clicks: "desc" },
      }),
      prisma.pageView.count({
        where: { userId, createdAt: { gte: oneWeekAgo } },
      }),
      prisma.linkClick.count({
        where: { link: { userId }, createdAt: { gte: oneWeekAgo } },
      }),
      prisma.pageView.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 20,
        select: {
          id: true,
          createdAt: true,
          referrer: true,
          country: true,
        },
      }),
    ]);

  return Response.json({
    links,
    pageViewsThisWeek,
    linkClicksThisWeek,
    recentPageViews,
  });
}

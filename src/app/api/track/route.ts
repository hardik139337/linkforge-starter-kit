import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { type, username, linkId } = body;

  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown";
  const userAgent = headersList.get("user-agent") || "unknown";
  const referrer = headersList.get("referer") || null;

  const device = /mobile/i.test(userAgent) ? "mobile" : "desktop";
  let browser = "unknown";
  if (userAgent.includes("Chrome")) browser = "Chrome";
  else if (userAgent.includes("Firefox")) browser = "Firefox";
  else if (userAgent.includes("Safari")) browser = "Safari";
  else if (userAgent.includes("Edge")) browser = "Edge";

  let os = "unknown";
  if (userAgent.includes("Windows")) os = "Windows";
  else if (userAgent.includes("Mac")) os = "macOS";
  else if (userAgent.includes("Linux")) os = "Linux";
  else if (userAgent.includes("Android")) os = "Android";
  else if (userAgent.includes("iPhone") || userAgent.includes("iPad")) os = "iOS";

  if (type === "pageview" && username) {
    const user = await prisma.user.findUnique({ where: { username } });
    if (user) {
      await prisma.pageView.create({
        data: {
          userId: user.id,
          ip: ip.split(",")[0].trim(),
          device,
          browser,
          os,
          referrer,
        },
      });
    }
  }

  if (type === "click" && linkId) {
    await prisma.$transaction([
      prisma.linkClick.create({
        data: {
          linkId,
          ip: ip.split(",")[0].trim(),
          device,
          browser,
          os,
          referrer,
        },
      }),
      prisma.link.update({
        where: { id: linkId },
        data: { clicks: { increment: 1 } },
      }),
    ]);
  }

  return Response.json({ success: true });
}

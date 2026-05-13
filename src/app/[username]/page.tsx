import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProfileClient from "./ProfileClient";

const themeStyles: Record<string, { bg: string; text: string; subtext: string; button: string; buttonText: string }> = {
  default: {
    bg: "bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500",
    text: "text-white",
    subtext: "text-white/80",
    button: "bg-white/90 backdrop-blur-sm hover:bg-white",
    buttonText: "text-gray-900",
  },
  dark: {
    bg: "bg-gradient-to-b from-gray-800 via-gray-900 to-gray-950",
    text: "text-white",
    subtext: "text-gray-400",
    button: "bg-gray-700 hover:bg-gray-600",
    buttonText: "text-white",
  },
  ocean: {
    bg: "bg-gradient-to-b from-cyan-400 via-blue-500 to-indigo-700",
    text: "text-white",
    subtext: "text-white/80",
    button: "bg-white/90 backdrop-blur-sm hover:bg-white",
    buttonText: "text-blue-900",
  },
  sunset: {
    bg: "bg-gradient-to-b from-orange-400 via-pink-500 to-rose-600",
    text: "text-white",
    subtext: "text-white/80",
    button: "bg-white/90 backdrop-blur-sm hover:bg-white",
    buttonText: "text-orange-900",
  },
  forest: {
    bg: "bg-gradient-to-b from-emerald-400 via-green-600 to-teal-800",
    text: "text-white",
    subtext: "text-white/80",
    button: "bg-white/90 backdrop-blur-sm hover:bg-white",
    buttonText: "text-green-900",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const user = await prisma.user.findUnique({
    where: { username },
    select: { name: true, bio: true },
  });

  if (!user) {
    return { title: "User Not Found | LinkForge" };
  }

  return {
    title: `${user.name} | LinkForge`,
    description: user.bio || `Check out ${user.name}'s links on LinkForge.`,
    openGraph: {
      title: `${user.name} | LinkForge`,
      description: user.bio || `Check out ${user.name}'s links on LinkForge.`,
      type: "profile",
    },
  };
}

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      name: true,
      username: true,
      bio: true,
      image: true,
      theme: true,
      links: {
        where: { active: true },
        orderBy: { order: "asc" },
        select: {
          id: true,
          title: true,
          url: true,
        },
      },
    },
  });

  if (!user) {
    notFound();
  }

  const theme = themeStyles[user.theme] || themeStyles.default;

  return (
    <ProfileClient
      user={{
        id: user.id,
        name: user.name || user.username,
        username: user.username,
        bio: user.bio,
        image: user.image,
      }}
      links={user.links}
      theme={theme}
    />
  );
}

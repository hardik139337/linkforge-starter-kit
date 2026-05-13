"use client";

import { useEffect } from "react";

interface ThemeStyle {
  bg: string;
  text: string;
  subtext: string;
  button: string;
  buttonText: string;
}

interface LinkData {
  id: string;
  title: string;
  url: string;
}

interface UserData {
  id: string;
  name: string;
  username: string;
  bio: string | null;
  image: string | null;
}

interface ProfileClientProps {
  user: UserData;
  links: LinkData[];
  theme: ThemeStyle;
}

export default function ProfileClient({
  user,
  links,
  theme,
}: ProfileClientProps) {
  // Track pageview on mount
  useEffect(() => {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "pageview",
        username: user.username,
      }),
    }).catch(() => {});
  }, [user.username]);

  const handleLinkClick = (linkId: string, url: string) => {
    // Track click (fire and forget)
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "click",
        linkId,
      }),
    }).catch(() => {});

    // Open link
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={`flex min-h-screen flex-col items-center ${theme.bg}`}>
      <div className="flex w-full max-w-md flex-col items-center px-6 py-16">
        {/* Avatar */}
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-white/20 ring-4 ring-white/30">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-4xl font-bold text-white">
              {user.name?.[0]?.toUpperCase() || "?"}
            </span>
          )}
        </div>

        {/* Name & bio */}
        <h1 className={`mt-5 text-2xl font-bold ${theme.text}`}>
          {user.name}
        </h1>
        {user.bio && (
          <p className={`mt-2 text-center text-sm leading-relaxed ${theme.subtext}`}>
            {user.bio}
          </p>
        )}

        {/* Links */}
        <div className="mt-8 flex w-full flex-col gap-3">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id, link.url)}
              className={`w-full rounded-full py-3.5 px-6 text-center text-sm font-semibold shadow-md transition-all duration-200 active:scale-95 ${theme.button} ${theme.buttonText}`}
            >
              {link.title}
            </button>
          ))}

          {links.length === 0 && (
            <p className={`py-12 text-center text-sm ${theme.subtext}`}>
              No links yet.
            </p>
          )}
        </div>

        {/* Footer branding */}
        <div className="mt-16">
          <a
            href="/"
            className={`text-xs ${theme.subtext} opacity-60 transition hover:opacity-100`}
          >
            Powered by LinkForge
          </a>
        </div>
      </div>
    </div>
  );
}

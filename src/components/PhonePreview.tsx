"use client";

interface UserProfile {
  name: string;
  bio: string;
  avatarUrl?: string;
}

interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon?: string;
  isActive: boolean;
}

interface PhonePreviewProps {
  profile: UserProfile;
  links: LinkItem[];
}

export default function PhonePreview({ profile, links }: PhonePreviewProps) {
  const activeLinks = links.filter((link) => link.isActive);

  return (
    <div className="flex justify-center">
      <div className="relative h-[580px] w-[290px] rounded-[2.5rem] border-[6px] border-foreground/15 bg-foreground/5 p-4 shadow-2xl">
        {/* Notch */}
        <div className="absolute left-1/2 top-0 h-6 w-24 -translate-x-1/2 rounded-b-xl bg-foreground/15" />

        <div className="flex h-full flex-col overflow-y-auto pt-4">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#7c3aed] to-[#6366f1] text-xl font-bold text-white">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                profile.name.charAt(0).toUpperCase()
              )}
            </div>
            <p className="mt-3 text-sm font-semibold text-foreground">
              {profile.name || "Your Name"}
            </p>
            <p className="mt-0.5 max-w-[200px] truncate text-center text-xs text-foreground/50">
              {profile.bio || "Your bio goes here"}
            </p>
          </div>

          {/* Links */}
          <div className="mt-6 flex flex-col gap-2.5 px-1 pb-6">
            {activeLinks.length === 0 ? (
              <p className="text-center text-xs text-foreground/40">
                No active links yet
              </p>
            ) : (
              activeLinks.map((link) => (
                <div
                  key={link.id}
                  className="flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#7c3aed]/10 to-[#6366f1]/10 px-4 py-3 transition-colors hover:from-[#7c3aed]/20 hover:to-[#6366f1]/20"
                >
                  <span className="text-sm">{link.icon || "🔗"}</span>
                  <span className="flex-1 truncate text-xs font-medium text-foreground/80">
                    {link.title}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

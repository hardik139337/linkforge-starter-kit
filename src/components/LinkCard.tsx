"use client";

export interface LinkData {
  id: string;
  title: string;
  url: string;
  icon?: string;
  clicks: number;
  isActive: boolean;
}

interface LinkCardProps {
  link: LinkData;
  onEdit: (link: LinkData) => void;
  onDelete: (linkId: string) => void;
  onToggleActive: (linkId: string, isActive: boolean) => void;
}

export default function LinkCard({
  link,
  onEdit,
  onDelete,
  onToggleActive,
}: LinkCardProps) {
  return (
    <div className="group flex items-center justify-between rounded-xl border border-foreground/10 bg-foreground/[0.02] px-5 py-4 transition-colors hover:border-[#7c3aed]/30">
      {/* Left: Info */}
      <div className="flex min-w-0 flex-1 items-center gap-4">
        {/* Icon */}
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#7c3aed]/10 text-base">
          {link.icon || "🔗"}
        </div>

        {/* Title & URL */}
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">
            {link.title}
          </p>
          <p className="truncate text-xs text-foreground/50">{link.url}</p>
        </div>
      </div>

      {/* Right: Stats & Actions */}
      <div className="flex items-center gap-4">
        {/* Click count */}
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-foreground">{link.clicks}</p>
          <p className="text-xs text-foreground/50">clicks</p>
        </div>

        {/* Active Toggle */}
        <button
          onClick={() => onToggleActive(link.id, !link.isActive)}
          className={`relative h-6 w-11 rounded-full transition-colors ${
            link.isActive ? "bg-[#7c3aed]" : "bg-foreground/20"
          }`}
          aria-label={`Toggle ${link.isActive ? "inactive" : "active"}`}
        >
          <span
            className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
              link.isActive ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>

        {/* Edit Button */}
        <button
          onClick={() => onEdit(link)}
          className="rounded-lg p-2 text-foreground/50 transition-colors hover:bg-foreground/5 hover:text-foreground"
          aria-label="Edit link"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M11.5 1.5l3 3L5 14H2v-3L11.5 1.5z" />
          </svg>
        </button>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(link.id)}
          className="rounded-lg p-2 text-foreground/50 transition-colors hover:bg-red-500/10 hover:text-red-500"
          aria-label="Delete link"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M2 4h12M5.33 4V2.67a1.33 1.33 0 011.34-1.34h2.66a1.33 1.33 0 011.34 1.34V4m2 0v9.33a1.33 1.33 0 01-1.34 1.34H4.67a1.33 1.33 0 01-1.34-1.34V4h9.34z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

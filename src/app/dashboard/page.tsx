"use client";

import { useEffect, useState, useCallback } from "react";
import LinkCard, { LinkData } from "@/components/LinkCard";
import LinkForm from "@/components/LinkForm";
import PhonePreview from "@/components/PhonePreview";

interface UserProfile {
  name: string;
  username: string;
  bio: string;
  image: string | null;
  plan: string;
}

export default function DashboardPage() {
  const [links, setLinks] = useState<LinkData[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingLink, setEditingLink] = useState<LinkData | null>(null);
  const [copied, setCopied] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [linksRes, profileRes] = await Promise.all([
        fetch("/api/links"),
        fetch("/api/profile"),
      ]);
      if (linksRes.ok) {
        const linksData = await linksRes.json();
        setLinks(
          linksData.map((l: Record<string, unknown>) => ({
            id: l.id as string,
            title: l.title as string,
            url: l.url as string,
            icon: l.icon as string | undefined,
            clicks: l.clicks as number,
            isActive: l.active as boolean,
          }))
        );
      }
      if (profileRes.ok) {
        setProfile(await profileRes.json());
      }
    } catch {
      /* ignore fetch errors during development */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const totalClicks = links.reduce((sum, l) => sum + l.clicks, 0);

  const handleAddLink = async (data: {
    title: string;
    url: string;
    icon?: string;
  }) => {
    const res = await fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setShowForm(false);
      fetchData();
    } else {
      const err = await res.json();
      alert(err.error || "Failed to add link");
    }
  };

  const handleEditLink = async (data: {
    title: string;
    url: string;
    icon?: string;
  }) => {
    if (!editingLink) return;
    const res = await fetch(`/api/links/${editingLink.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setEditingLink(null);
      fetchData();
    }
  };

  const handleDelete = async (linkId: string) => {
    if (!confirm("Delete this link?")) return;
    const res = await fetch(`/api/links/${linkId}`, { method: "DELETE" });
    if (res.ok) fetchData();
  };

  const handleToggleActive = async (linkId: string, isActive: boolean) => {
    const res = await fetch(`/api/links/${linkId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: isActive }),
    });
    if (res.ok) fetchData();
  };

  const handleCopyLink = () => {
    if (!profile) return;
    const url = `${window.location.origin}/${profile.username}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back{profile?.name ? `, ${profile.name}` : ""}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your links and track your performance.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="Total Links" value={links.length} />
          <StatCard label="Total Clicks" value={totalClicks} />
          <StatCard
            label="Plan"
            value={profile?.plan === "pro" ? "Pro" : "Free"}
          />
        </div>

        {profile?.username && (
          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
            <span className="text-sm text-gray-500">Your page:</span>
            <code className="flex-1 truncate text-sm font-medium text-indigo-600">
              {typeof window !== "undefined"
                ? `${window.location.origin}/${profile.username}`
                : `/${profile.username}`}
            </code>
            <button
              onClick={handleCopyLink}
              className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-indigo-700"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}

        {showForm ? (
          <LinkForm
            onSubmit={handleAddLink}
            onCancel={() => setShowForm(false)}
          />
        ) : editingLink ? (
          <LinkForm
            initialData={editingLink}
            onSubmit={handleEditLink}
            onCancel={() => setEditingLink(null)}
          />
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="w-full rounded-xl border-2 border-dashed border-gray-300 py-4 text-sm font-medium text-gray-500 transition-colors hover:border-indigo-600 hover:text-indigo-600"
          >
            + Add New Link
          </button>
        )}

        <div className="space-y-3">
          {links.map((link) => (
            <LinkCard
              key={link.id}
              link={link}
              onEdit={setEditingLink}
              onDelete={handleDelete}
              onToggleActive={handleToggleActive}
            />
          ))}
          {links.length === 0 && !showForm && (
            <p className="py-12 text-center text-sm text-gray-400">
              No links yet. Add your first link above!
            </p>
          )}
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="sticky top-20">
          <h3 className="mb-4 text-center text-sm font-medium text-gray-500">
            Preview
          </h3>
          <PhonePreview
            profile={{
              name: profile?.name || "Your Name",
              bio: profile?.bio || "",
              avatarUrl: profile?.image || undefined,
            }}
            links={links}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white px-5 py-4">
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

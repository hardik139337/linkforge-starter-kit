"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const themes = [
  {
    id: "default",
    name: "Default",
    bg: "bg-gradient-to-b from-indigo-500 to-purple-600",
    preview: "from-indigo-500 to-purple-600",
  },
  {
    id: "dark",
    name: "Dark",
    bg: "bg-gradient-to-b from-gray-800 to-gray-950",
    preview: "from-gray-800 to-gray-950",
  },
  {
    id: "ocean",
    name: "Ocean",
    bg: "bg-gradient-to-b from-cyan-500 to-blue-600",
    preview: "from-cyan-500 to-blue-600",
  },
  {
    id: "sunset",
    name: "Sunset",
    bg: "bg-gradient-to-b from-orange-400 to-pink-600",
    preview: "from-orange-400 to-pink-600",
  },
  {
    id: "forest",
    name: "Forest",
    bg: "bg-gradient-to-b from-emerald-500 to-teal-700",
    preview: "from-emerald-500 to-teal-700",
  },
] as const;

const profileSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username is too long")
    .regex(
      /^[a-z0-9_-]+$/,
      "Username can only contain lowercase letters, numbers, hyphens, and underscores"
    ),
  bio: z.string().max(200, "Bio must be 200 characters or less").optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface UserSettings {
  name: string;
  username: string;
  bio: string;
  theme: string;
  plan: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [selectedTheme, setSelectedTheme] = useState("default");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      username: "",
      bio: "",
    },
  });

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          setSettings(data);
          setSelectedTheme(data.theme || "default");
          reset({
            name: data.name || "",
            username: data.username || "",
            bio: data.bio || "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch settings", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, [reset]);

  const onSubmit = async (formData: ProfileFormData) => {
    setSaving(true);
    setSaveMessage(null);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          theme: selectedTheme,
        }),
      });

      if (res.ok) {
        setSaveMessage({ type: "success", text: "Settings saved successfully!" });
        const updated = await res.json();
        setSettings(updated);
      } else {
        const errData = await res.json();
        setSaveMessage({
          type: "error",
          text: errData.error || "Failed to save settings.",
        });
      }
    } catch {
      setSaveMessage({ type: "error", text: "Something went wrong." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      <p className="mt-1 text-sm text-gray-500">
        Manage your profile and customize your page.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-8">
        {/* Save message */}
        {saveMessage && (
          <div
            className={`rounded-lg px-4 py-3 text-sm font-medium ${
              saveMessage.type === "success"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {saveMessage.text}
          </div>
        )}

        {/* Profile section */}
        <section className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
          <p className="mt-1 text-sm text-gray-500">
            Your public profile information.
          </p>

          <div className="mt-5 space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Display Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                  linkforge.com/
                </span>
                <input
                  id="username"
                  type="text"
                  {...register("username")}
                  className="block w-full rounded-r-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700"
              >
                Bio
              </label>
              <textarea
                id="bio"
                rows={3}
                {...register("bio")}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Tell visitors a little about yourself..."
              />
              {errors.bio && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.bio.message}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Theme section */}
        <section className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">Theme</h2>
          <p className="mt-1 text-sm text-gray-500">
            Choose a color theme for your public page.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {themes.map((theme) => (
              <button
                key={theme.id}
                type="button"
                onClick={() => setSelectedTheme(theme.id)}
                className={`flex flex-col items-center rounded-lg border-2 p-3 transition ${
                  selectedTheme === theme.id
                    ? "border-indigo-600 ring-1 ring-indigo-600"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div
                  className={`h-10 w-10 rounded-full bg-gradient-to-br ${theme.preview}`}
                />
                <span className="mt-2 text-xs font-medium text-gray-700">
                  {theme.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Upgrade CTA */}
        {settings?.plan === "free" && (
          <section className="rounded-lg border-2 border-indigo-200 bg-indigo-50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-indigo-900">
                  Upgrade to Pro
                </h2>
                <p className="mt-1 text-sm text-indigo-700">
                  Unlock custom domains, advanced analytics, and unlimited links.
                </p>
              </div>
              <button
                type="button"
                className="shrink-0 rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
              >
                Upgrade
              </button>
            </div>
          </section>
        )}

        {/* Save button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

      {/* Danger zone */}
      <section className="mt-12 rounded-lg border-2 border-red-200 bg-red-50 p-6">
        <h2 className="text-lg font-semibold text-red-900">Danger Zone</h2>
        <p className="mt-1 text-sm text-red-700">
          Permanently delete your account and all associated data. This action
          cannot be undone.
        </p>

        {!showDeleteConfirm ? (
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="mt-4 rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50"
          >
            Delete Account
          </button>
        ) : (
          <div className="mt-4 space-y-3">
            <p className="text-sm font-medium text-red-800">
              Are you sure? Type your username to confirm.
            </p>
            <input
              type="text"
              placeholder={settings?.username || "username"}
              className="block w-full rounded-md border border-red-300 px-3 py-2 text-sm shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Permanently Delete
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

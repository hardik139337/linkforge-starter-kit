"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const linkSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z
    .string()
    .min(1, "URL is required")
    .url("Please enter a valid URL (e.g. https://example.com)"),
  icon: z.string().optional(),
});

type LinkFormData = z.infer<typeof linkSchema>;

interface LinkFormProps {
  initialData?: { title?: string; url?: string; icon?: string };
  onSubmit: (data: LinkFormData) => void;
  onCancel: () => void;
}

export default function LinkForm({
  initialData,
  onSubmit,
  onCancel,
}: LinkFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LinkFormData>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      url: initialData?.url ?? "",
      icon: initialData?.icon ?? "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6"
    >
      <h3 className="text-lg font-semibold text-foreground">
        {initialData ? "Edit Link" : "Add New Link"}
      </h3>

      {/* Title Field */}
      <div className="mt-5">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-foreground/70"
        >
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          placeholder="My Website"
          {...register("title")}
          className="mt-1.5 w-full rounded-lg border border-foreground/15 bg-transparent px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-[#7c3aed]"
        />
        {errors.title && (
          <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* URL Field */}
      <div className="mt-4">
        <label
          htmlFor="url"
          className="block text-sm font-medium text-foreground/70"
        >
          URL <span className="text-red-500">*</span>
        </label>
        <input
          id="url"
          type="text"
          placeholder="https://example.com"
          {...register("url")}
          className="mt-1.5 w-full rounded-lg border border-foreground/15 bg-transparent px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-[#7c3aed] font-mono"
        />
        {errors.url && (
          <p className="mt-1 text-xs text-red-500">{errors.url.message}</p>
        )}
      </div>

      {/* Icon Field */}
      <div className="mt-4">
        <label
          htmlFor="icon"
          className="block text-sm font-medium text-foreground/70"
        >
          Icon{" "}
          <span className="text-foreground/30">(optional - emoji or icon name)</span>
        </label>
        <input
          id="icon"
          type="text"
          placeholder="🔗"
          {...register("icon")}
          className="mt-1.5 w-full rounded-lg border border-foreground/15 bg-transparent px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-[#7c3aed]"
        />
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting
            ? "Saving..."
            : initialData
              ? "Save Changes"
              : "Add Link"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-foreground/15 px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { ImageIcon, Loader2, Pencil, PlusCircle, Trash2, Video } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { HeroMediaType, HeroSlide } from "@/types/heroSlide";

type HeroSlidesApiResponse = {
  data?: unknown;
  message?: unknown;
  error?: unknown;
};

type HeroSlideForm = {
  badgeText: string;
  title: string;
  subtitle: string;
  description: string;
  mediaType: HeroMediaType;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  position: string;
  isActive: boolean;
};

const IMAGE_MAX_BYTES = 2 * 1024 * 1024;
const VIDEO_MAX_BYTES = 20 * 1024 * 1024;
const RECOMMENDED_HERO_RATIO = "16:9";
const RECOMMENDED_HERO_RESOLUTION = "1920 x 1080";

function createInitialForm(): HeroSlideForm {
  return {
    badgeText: "NATIONAL SPACE DAY",
    title: "",
    subtitle: "",
    description: "",
    mediaType: "image",
    ctaText: "",
    ctaLink: "",
    secondaryCtaText: "",
    secondaryCtaLink: "",
    position: "",
    isActive: true,
  };
}

function toText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function toNullableText(value: unknown): string | null {
  const cleaned = toText(value);
  return cleaned || null;
}

function toPositiveInt(value: unknown): number {
  const numeric = Number(value);
  return Number.isInteger(numeric) && numeric > 0 ? numeric : 0;
}

function toMediaType(value: unknown): HeroMediaType | null {
  const cleaned = toText(value).toLowerCase();
  if (cleaned === "image" || cleaned === "video") {
    return cleaned;
  }

  return null;
}

function getApiMessage(payload: unknown): string {
  if (!payload || typeof payload !== "object") {
    return "";
  }

  const root = payload as HeroSlidesApiResponse;

  if (typeof root.message === "string" && root.message.trim()) {
    return root.message.trim();
  }

  if (typeof root.error === "string" && root.error.trim()) {
    return root.error.trim();
  }

  return "";
}

function normalizeSlide(item: unknown): HeroSlide | null {
  if (!item || typeof item !== "object" || Array.isArray(item)) {
    return null;
  }

  const row = item as Record<string, unknown>;
  const id = toPositiveInt(row.id);
  const mediaType = toMediaType(row.media_type);

  if (!id || !mediaType) {
    return null;
  }

  return {
    id,
    title: toText(row.title),
    subtitle: toNullableText(row.subtitle),
    description: toNullableText(row.description),
    badge_text: toNullableText(row.badge_text),
    media_type: mediaType,
    media_mime_type: toNullableText(row.media_mime_type),
    media_url: toText(row.media_url) || `/api/hero-slides/${id}/media`,
    cta_text: toNullableText(row.cta_text),
    cta_link: toNullableText(row.cta_link),
    secondary_cta_text: toNullableText(row.secondary_cta_text),
    secondary_cta_link: toNullableText(row.secondary_cta_link),
    is_active: typeof row.is_active === "boolean" ? row.is_active : undefined,
    position: toPositiveInt(row.position) || id,
    created_at: toNullableText(row.created_at),
    updated_at: toNullableText(row.updated_at),
  };
}

function formatDateTime(value: string | null | undefined): string {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return `${date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  })} ${date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}

function validateSelectedMedia(file: File | null, mediaType: HeroMediaType): string {
  if (!file) {
    return "Hero media file is required.";
  }

  const mimeType = file.type.toLowerCase();

  if (mediaType === "image") {
    if (!mimeType.startsWith("image/")) {
      return "For image media type, please upload an image/* file.";
    }

    if (file.size > IMAGE_MAX_BYTES) {
      return "Image file must be 2MB or smaller.";
    }
  }

  if (mediaType === "video") {
    if (!mimeType.startsWith("video/")) {
      return "For video media type, please upload a video/* file.";
    }

    if (file.size > VIDEO_MAX_BYTES) {
      return "Video file must be 20MB or smaller.";
    }
  }

  return "";
}

export default function HeroSlidesManager() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [editingSlideId, setEditingSlideId] = useState<number | null>(null);
  const [form, setForm] = useState<HeroSlideForm>(createInitialForm());
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const sortedSlides = useMemo(
    () => [...slides].sort((a, b) => a.position - b.position || a.id - b.id),
    [slides],
  );

  const resetEditorState = () => {
    setEditingSlideId(null);
    setForm(createInitialForm());
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const startEditSlide = (slide: HeroSlide) => {
    setError("");
    setSuccess("");
    setEditingSlideId(slide.id);
    setForm({
      badgeText: slide.badge_text || "",
      title: slide.title || "",
      subtitle: slide.subtitle || "",
      description: slide.description || "",
      mediaType: slide.media_type,
      ctaText: slide.cta_text || "",
      ctaLink: slide.cta_link || "",
      secondaryCtaText: slide.secondary_cta_text || "",
      secondaryCtaLink: slide.secondary_cta_link || "",
      position: String(slide.position || ""),
      isActive: slide.is_active ?? true,
    });
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const loadSlides = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/hero-slides", {
        method: "GET",
        cache: "no-store",
      });

      const payload = (await response.json().catch(() => ({}))) as unknown;

      if (!response.ok) {
        throw new Error(getApiMessage(payload) || "Unable to fetch hero slides.");
      }

      const root = payload as HeroSlidesApiResponse;
      const rows = Array.isArray(root?.data) ? root.data : [];

      const normalized = rows
        .map(normalizeSlide)
        .filter((slide): slide is HeroSlide => Boolean(slide));

      setSlides(normalized);
    } catch (err) {
      setSlides([]);
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Unable to fetch hero slides.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadSlides();
  }, []);

  const handleDeleteSlide = async (slideId: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this hero slide?");

    if (!confirmed) {
      return;
    }

    setError("");
    setSuccess("");
    setDeletingId(slideId);

    try {
      const response = await fetch(`/api/admin/hero-slides/${slideId}`, {
        method: "DELETE",
      });

      const payload = (await response.json().catch(() => ({}))) as unknown;

      if (!response.ok) {
        throw new Error(getApiMessage(payload) || "Unable to delete hero slide.");
      }

      setSlides((prev) => prev.filter((slide) => slide.id !== slideId));

      if (editingSlideId === slideId) {
        resetEditorState();
      }

      setSuccess("Hero slide deleted successfully.");
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Unable to delete hero slide.",
      );
    } finally {
      setDeletingId((currentId) => (currentId === slideId ? null : currentId));
    }
  };

  const isDeleting = (slideId: number) => deletingId === slideId;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const isEditMode = editingSlideId !== null;
    const editingSlide = isEditMode
      ? slides.find((slide) => slide.id === editingSlideId) || null
      : null;

    if (isEditMode && !editingSlide) {
      setError("Unable to edit this slide. Please refresh and try again.");
      return;
    }

    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }

    if (!isEditMode && !selectedFile) {
      setError("Hero media file is required.");
      return;
    }

    if (
      isEditMode
      && !selectedFile
      && editingSlide
      && form.mediaType !== editingSlide.media_type
    ) {
      setError("To change media type, upload a new media file.");
      return;
    }

    if (selectedFile) {
      const mediaValidationError = validateSelectedMedia(selectedFile, form.mediaType);
      if (mediaValidationError) {
        setError(mediaValidationError);
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("badge_text", form.badgeText.trim());
      formData.append("title", form.title.trim());
      formData.append("subtitle", form.subtitle.trim());
      formData.append("description", form.description.trim());
      formData.append("media_type", form.mediaType);
      formData.append("cta_text", form.ctaText.trim());
      formData.append("cta_link", form.ctaLink.trim());
      formData.append("secondary_cta_text", form.secondaryCtaText.trim());
      formData.append("secondary_cta_link", form.secondaryCtaLink.trim());
      formData.append("is_active", form.isActive ? "true" : "false");

      if (form.position.trim()) {
        formData.append("position", form.position.trim());
      }

      if (selectedFile) {
        formData.append("media", selectedFile);
      }

      const endpoint = isEditMode
        ? `/api/admin/hero-slides/${editingSlideId}`
        : "/api/admin/hero-slides";

      const response = await fetch(endpoint, {
        method: isEditMode ? "PUT" : "POST",
        body: formData,
      });

      const payload = (await response.json().catch(() => ({}))) as unknown;

      if (!response.ok) {
        throw new Error(
          getApiMessage(payload)
          || (isEditMode ? "Unable to update hero slide." : "Unable to create hero slide."),
        );
      }

      resetEditorState();
      setSuccess(isEditMode ? "Hero slide updated successfully." : "Hero slide created successfully.");
      await loadSlides();
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : (isEditMode ? "Unable to update hero slide." : "Unable to create hero slide."),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white text-xl flex items-center gap-2">
            {editingSlideId ? (
              <Pencil className="h-5 w-5 text-cyan-300" />
            ) : (
              <PlusCircle className="h-5 w-5 text-cyan-300" />
            )}
            {editingSlideId ? "Edit Hero Slide" : "Create Hero Slide"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label htmlFor="hero-badge-text" className="text-sm text-zinc-300">Badge</label>
                <input
                  id="hero-badge-text"
                  className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
                  value={form.badgeText}
                  onChange={(event) => setForm((prev) => ({ ...prev, badgeText: event.target.value }))}
                  placeholder="E.g. NATIONAL SPACE DAY"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="hero-title" className="text-sm text-zinc-300">Title</label>
                <textarea
                  id="hero-title"
                  className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
                  rows={2}
                  value={form.title}
                  onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                  placeholder="Main heading (line breaks allowed)"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="hero-media-type" className="text-sm text-zinc-300">Media Type</label>
                <select
                  id="hero-media-type"
                  className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
                  value={form.mediaType}
                  onChange={(event) => setForm((prev) => ({ ...prev, mediaType: event.target.value as HeroMediaType }))}
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="hero-subtitle" className="text-sm text-zinc-300">Subtitle</label>
              <textarea
                id="hero-subtitle"
                className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
                rows={3}
                value={form.subtitle}
                onChange={(event) => setForm((prev) => ({ ...prev, subtitle: event.target.value }))}
                placeholder="Optional subheading"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="hero-description" className="text-sm text-zinc-300">Description</label>
              <textarea
                id="hero-description"
                className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
                rows={3}
                value={form.description}
                onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                placeholder="Optional supporting description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label htmlFor="hero-cta-text" className="text-sm text-zinc-300">Primary CTA Text</label>
                <input
                  id="hero-cta-text"
                  className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
                  value={form.ctaText}
                  onChange={(event) => setForm((prev) => ({ ...prev, ctaText: event.target.value }))}
                  placeholder="E.g. Explore"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="hero-cta-link" className="text-sm text-zinc-300">Primary CTA Link</label>
                <input
                  id="hero-cta-link"
                  className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
                  value={form.ctaLink}
                  onChange={(event) => setForm((prev) => ({ ...prev, ctaLink: event.target.value }))}
                  placeholder="https://... or /path"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="hero-position" className="text-sm text-zinc-300">Position</label>
                <input
                  id="hero-position"
                  type="number"
                  min={1}
                  className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
                  value={form.position}
                  onChange={(event) => setForm((prev) => ({ ...prev, position: event.target.value }))}
                  placeholder="Optional"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="hero-secondary-cta-text" className="text-sm text-zinc-300">Secondary CTA Text</label>
                <input
                  id="hero-secondary-cta-text"
                  className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
                  value={form.secondaryCtaText}
                  onChange={(event) => setForm((prev) => ({ ...prev, secondaryCtaText: event.target.value }))}
                  placeholder="E.g. Internships"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="hero-secondary-cta-link" className="text-sm text-zinc-300">Secondary CTA Link</label>
                <input
                  id="hero-secondary-cta-link"
                  className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
                  value={form.secondaryCtaLink}
                  onChange={(event) => setForm((prev) => ({ ...prev, secondaryCtaLink: event.target.value }))}
                  placeholder="https://... or /path"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="hero-media" className="text-sm text-zinc-300">
                Media File ({form.mediaType === "image" ? "max 2MB" : "max 20MB"}
                {editingSlideId ? ", optional on edit" : ", required"})
              </label>
              <input
                ref={fileInputRef}
                id="hero-media"
                type="file"
                accept={form.mediaType === "image" ? "image/*" : "video/*"}
                className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 file:mr-3 file:rounded-md file:border-0 file:bg-zinc-800 file:px-3 file:py-1 file:text-zinc-100"
                onChange={(event) => setSelectedFile(event.target.files?.[0] || null)}
              />
              <p className="text-xs text-zinc-400">
                Recommended media ratio: {RECOMMENDED_HERO_RATIO} ({RECOMMENDED_HERO_RESOLUTION}). Keep key content near center for best desktop/mobile visibility.
              </p>
              {editingSlideId ? (
                <p className="text-xs text-zinc-500">
                  Leave media empty if you only want to update text, CTA, active state, or position.
                </p>
              ) : null}
            </div>

            <label className="inline-flex items-center gap-2 text-sm text-zinc-300">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(event) => setForm((prev) => ({ ...prev, isActive: event.target.checked }))}
              />
              Active slide
            </label>

            {error ? (
              <p className="rounded-md border border-rose-500/40 bg-rose-950/30 px-3 py-2 text-sm text-rose-200">
                {error}
              </p>
            ) : null}

            {success ? (
              <p className="rounded-md border border-emerald-500/40 bg-emerald-950/30 px-3 py-2 text-sm text-emerald-200">
                {success}
              </p>
            ) : null}

            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" className="bg-cyan-500 text-black hover:bg-cyan-400" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {editingSlideId ? "Save Changes" : "Upload Hero Slide"}
              </Button>

              {editingSlideId ? (
                <Button
                  type="button"
                  variant="ghost"
                  className="text-zinc-200 hover:bg-zinc-800"
                  onClick={resetEditorState}
                  disabled={isSubmitting}
                >
                  Cancel Edit
                </Button>
              ) : null}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white text-xl">Existing Hero Slides</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-28 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-zinc-400" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-800">
                    <TableHead className="text-white min-w-[140px]">Preview</TableHead>
                    <TableHead className="text-white min-w-[200px]">Title</TableHead>
                    <TableHead className="text-white min-w-[110px]">Type</TableHead>
                    <TableHead className="text-white min-w-[90px]">Position</TableHead>
                    <TableHead className="text-white min-w-[100px]">Active</TableHead>
                    <TableHead className="text-white min-w-[180px]">Updated</TableHead>
                    <TableHead className="text-white min-w-[120px] text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedSlides.length === 0 ? (
                    <TableRow className="border-zinc-800">
                      <TableCell colSpan={7} className="py-8 text-center text-zinc-400">
                        No hero slides found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedSlides.map((slide) => (
                      <TableRow key={slide.id} className="border-zinc-800">
                        <TableCell>
                          <div className="h-16 w-28 overflow-hidden rounded-md border border-zinc-700 bg-zinc-950">
                            {slide.media_type === "image" ? (
                              <img
                                src={slide.media_url}
                                alt={slide.title || "Hero slide"}
                                className="h-full w-full object-cover"
                                loading="lazy"
                              />
                            ) : (
                              <video
                                className="h-full w-full object-cover"
                                muted
                                loop
                                playsInline
                                autoPlay
                                preload="metadata"
                              >
                                <source src={slide.media_url} type={slide.media_mime_type || "video/mp4"} />
                              </video>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1 text-sm">
                            {slide.badge_text ? (
                              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-300/90">{slide.badge_text}</p>
                            ) : null}
                            <p className="font-medium text-zinc-100">{slide.title || "-"}</p>
                            {slide.subtitle ? (
                              <p className="line-clamp-2 text-zinc-400">{slide.subtitle}</p>
                            ) : null}
                            {slide.description ? (
                              <p className="line-clamp-2 text-zinc-500">{slide.description}</p>
                            ) : null}
                            {slide.cta_text || slide.secondary_cta_text ? (
                              <p className="text-xs text-zinc-500">
                                CTA: {slide.cta_text || "-"} | {slide.secondary_cta_text || "-"}
                              </p>
                            ) : null}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center gap-1 text-sm text-zinc-300">
                            {slide.media_type === "image" ? (
                              <ImageIcon className="h-4 w-4 text-cyan-300" />
                            ) : (
                              <Video className="h-4 w-4 text-cyan-300" />
                            )}
                            {slide.media_type}
                          </span>
                        </TableCell>
                        <TableCell className="text-zinc-300">{slide.position}</TableCell>
                        <TableCell className="text-zinc-300">{slide.is_active ? "Yes" : "No"}</TableCell>
                        <TableCell className="text-zinc-400">{formatDateTime(slide.updated_at)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              type="button"
                              variant="ghost"
                              className="text-cyan-300 hover:bg-cyan-900/20"
                              disabled={isDeleting(slide.id) || isSubmitting}
                              onClick={() => startEditSlide(slide)}
                            >
                              <Pencil className="mr-1.5 h-3.5 w-3.5" />
                              {editingSlideId === slide.id ? "Editing" : "Edit"}
                            </Button>

                            <Button
                              type="button"
                              variant="ghost"
                              className="text-rose-300 hover:bg-rose-900/20"
                              disabled={isDeleting(slide.id) || isSubmitting}
                              onClick={() => {
                                void handleDeleteSlide(slide.id);
                              }}
                            >
                              {isDeleting(slide.id) ? (
                                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                              )}
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

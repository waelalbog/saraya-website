"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Project = {
  id: number;
  name_en: string;
  name_ar: string;
  cover_image_url: string | null;
};

type ProjectImage = {
  id: number;
  project_id: number;
  image_url: string;
  sort_order: number;
  is_active: boolean;
};

export default function ProjectImagesPage() {
  const params = useParams();
  const router = useRouter();

  const projectId = Number(params.id);

  const [project, setProject] = useState<Project | null>(null);
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data: projectData } = await supabase
      .from("projects")
      .select("id, name_en, name_ar, cover_image_url")
      .eq("id", projectId)
      .single();

    const { data: imageData } = await supabase
      .from("project_images")
      .select("*")
      .eq("project_id", projectId)
      .order("sort_order", { ascending: true });

    setProject(projectData);
    setImages(imageData || []);
    setLoading(false);
  };

  const uploadImages = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    setUploading(true);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const extension = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${extension}`;

      const filePath = `projects/${projectId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(filePath, file);

      if (uploadError) {
        console.error(uploadError);
        continue;
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("project-images")
        .getPublicUrl(filePath);

      await supabase.from("project_images").insert({
        project_id: projectId,
        image_url: publicUrl,
        sort_order: images.length + i + 1,
        is_active: true,
      });
    }

    await loadData();
    setUploading(false);

    e.target.value = "";
  };

  const setCover = async (imageUrl: string) => {
    await supabase
      .from("projects")
      .update({
        cover_image_url: imageUrl,
      })
      .eq("id", projectId);

    await loadData();
  };

  const deleteImage = async (image: ProjectImage) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this image?"
    );

    if (!confirmed) return;

    const marker = "/project-images/";

    const path = image.image_url.includes(marker)
      ? image.image_url.split(marker)[1]
      : null;

    if (path) {
      await supabase.storage
        .from("project-images")
        .remove([path]);
    }

    await supabase
      .from("project_images")
      .delete()
      .eq("id", image.id);

    if (project?.cover_image_url === image.image_url) {
      await supabase
        .from("projects")
        .update({
          cover_image_url: null,
        })
        .eq("id", projectId);
    }

    await loadData();
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-100 p-10">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-100">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold text-[#2B347A]">
              Project Images
            </h1>

            <p className="mt-1 text-sm text-zinc-500">
              {project?.name_en} — {project?.name_ar}
            </p>
          </div>

          <button
            onClick={() => router.push("/admin")}
            className="rounded-lg border px-4 py-2"
          >
            Back
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold">
            Upload Images
          </h2>

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            disabled={uploading}
            onChange={uploadImages}
          />

          {uploading && (
            <p className="mt-3 text-sm text-zinc-500">
              Uploading...
            </p>
          )}
        </div>

        {images.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center text-zinc-500 shadow-sm">
            No images uploaded yet.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image) => {
              const isCover =
                project?.cover_image_url === image.image_url;

              return (
                <div
                  key={image.id}
                  className="overflow-hidden rounded-xl bg-white shadow-sm"
                >
                  <img
                    src={image.image_url}
                    alt=""
                    className="h-56 w-full object-cover"
                  />

                  <div className="p-4">
                    {isCover && (
                      <div className="mb-3 text-sm font-semibold text-green-600">
                        Cover Image
                      </div>
                    )}

                    <div className="flex gap-2">
                      {!isCover && (
                        <button
                          onClick={() =>
                            setCover(image.image_url)
                          }
                          className="rounded-lg bg-[#2B347A] px-3 py-2 text-sm text-white"
                        >
                          Set Cover
                        </button>
                      )}

                      <button
                        onClick={() => deleteImage(image)}
                        className="rounded-lg border border-red-300 px-3 py-2 text-sm text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
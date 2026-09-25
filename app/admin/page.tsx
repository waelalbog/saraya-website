"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
type Project = {
  id: number;
  name_ar: string;
  name_en: string;
  location_ar: string | null;
  location_en: string | null;
  owner_ar: string | null;
  owner_en: string | null;
  role_ar: string | null;
  role_en: string | null;
  units: string | null;
  area: string | null;
  status_ar: string | null;
  status_en: string | null;
  cost: string | null;
  is_active: boolean;
};

export default function AdminPage() {
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
    loadProjects();
  }, []);

  const checkUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/admin/login");
    }
  };

  const loadProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
  console.error("Supabase error:", {
    message: error.message,
    details: error.details,
    hint: error.hint,
    code: error.code,
  });
} else {
  console.log("Projects loaded:", data);
  setProjects(data || []);
}

    setLoading(false);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <main className="min-h-screen bg-zinc-100">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold text-[#2B347A]">
              SARAYA Admin
            </h1>

            <p className="text-sm text-zinc-500">
              Project Management Dashboard
            </p>
          </div>

          <button
            onClick={logout}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
          >
            Logout
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">
              Projects
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Manage SARAYA projects and project images.
            </p>
          </div>

          <Link
  href="/admin/projects/new"
  className="rounded-lg bg-[#2B347A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#20285f]"
>
  + Add Project
</Link>
        </div>

        {loading ? (
          <div className="rounded-xl bg-white p-8 text-center text-zinc-500 shadow-sm">
            Loading projects...
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b bg-zinc-50 text-zinc-600">
                  <tr>
                    <th className="px-5 py-4">ID</th>
                    <th className="px-5 py-4">Project</th>
                    <th className="px-5 py-4">Location</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Visible</th>
                    <th className="px-5 py-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {projects.map((project) => (
                    <tr
                      key={project.id}
                      className="border-b last:border-b-0"
                    >
                      <td className="px-5 py-4 text-zinc-500">
                        {project.id}
                      </td>

                      <td className="px-5 py-4">
                        <div className="font-semibold text-zinc-900">
                          {project.name_en}
                        </div>

                        <div className="mt-1 text-zinc-500">
                          {project.name_ar}
                        </div>
                      </td>

                      <td className="px-5 py-4 text-zinc-600">
                        {project.location_en || "-"}
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
                          {project.status_en || "-"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        {project.is_active ? (
                          <span className="font-medium text-green-600">
                            Active
                          </span>
                        ) : (
                          <span className="font-medium text-red-600">
                            Hidden
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <Link
  href={`/admin/projects/${project.id}/edit`}
  className="rounded-md border px-3 py-2 text-xs font-medium hover:bg-zinc-50"
>
  Edit
</Link>

                          <Link
  href={`/admin/projects/${project.id}/images`}
  className="rounded-md border px-3 py-2 text-xs font-medium hover:bg-zinc-50"
>
  Images
</Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type ProjectForm = {
  name_ar: string;
  name_en: string;

  location_ar: string;
  location_en: string;

  owner_ar: string;
  owner_en: string;

  role_ar: string;
  role_en: string;

  units: string;
  area: string;

  status_ar: string;
  status_en: string;

  description_ar: string;
  description_en: string;

  cost: string;
  duration_ar: string;
  duration_en: string;

  sort_order: number;

  is_active: boolean;
  is_featured: boolean;
};

const emptyForm: ProjectForm = {
  name_ar: "",
  name_en: "",

  location_ar: "",
  location_en: "",

  owner_ar: "",
  owner_en: "",

  role_ar: "",
  role_en: "",

  units: "",
  area: "",

  status_ar: "",
  status_en: "",

  description_ar: "",
  description_en: "",

  cost: "",

  duration_ar: "",
  duration_en: "",

  sort_order: 0,

  is_active: true,
  is_featured: false,
};

export default function NewProjectPage() {
  const router = useRouter();

  const [form, setForm] = useState<ProjectForm>(emptyForm);

  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const updateField = (
    field: keyof ProjectForm,
    value: string | number | boolean
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setSaving(true);
    setErrorMessage("");

    const { data, error } = await supabase
      .from("projects")
      .insert({
        name_ar: form.name_ar,
        name_en: form.name_en,

        location_ar: form.location_ar || null,
        location_en: form.location_en || null,

        owner_ar: form.owner_ar || null,
        owner_en: form.owner_en || null,

        role_ar: form.role_ar || null,
        role_en: form.role_en || null,

        units: form.units || null,
        area: form.area || null,

        status_ar: form.status_ar || null,
        status_en: form.status_en || null,

        description_ar: form.description_ar || null,
        description_en: form.description_en || null,

        cost: form.cost || null,

        duration_ar: form.duration_ar || null,
        duration_en: form.duration_en || null,

        sort_order: Number(form.sort_order),

        is_active: form.is_active,
        is_featured: form.is_featured,
      })
      .select("id")
      .single();

    if (error || !data) {
      console.error(error);
      setErrorMessage("Failed to add project.");
      setSaving(false);
      return;
    }

    router.push(`/admin/projects/${data.id}/images`);
  };

  return (
    <main className="min-h-screen bg-zinc-100">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold text-[#2B347A]">
              Add Project
            </h1>

            <p className="mt-1 text-sm text-zinc-500">
              Add a new SARAYA project.
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
          >
            Back
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-8">
        <form
          onSubmit={handleSubmit}
          className="space-y-8 rounded-2xl bg-white p-6 shadow-sm md:p-8"
        >
          <div>
            <h2 className="mb-5 text-lg font-bold text-zinc-900">
              Project Name
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Name English"
                value={form.name_en}
                required
                onChange={(value) =>
                  updateField("name_en", value)
                }
              />

              <Field
                label="الاسم بالعربية"
                value={form.name_ar}
                required
                dir="rtl"
                onChange={(value) =>
                  updateField("name_ar", value)
                }
              />
            </div>
          </div>

          <div>
            <h2 className="mb-5 text-lg font-bold text-zinc-900">
              Location
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Location English"
                value={form.location_en}
                onChange={(value) =>
                  updateField("location_en", value)
                }
              />

              <Field
                label="الموقع بالعربية"
                value={form.location_ar}
                dir="rtl"
                onChange={(value) =>
                  updateField("location_ar", value)
                }
              />
            </div>
          </div>

          <div>
            <h2 className="mb-5 text-lg font-bold text-zinc-900">
              Owner
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Owner English"
                value={form.owner_en}
                onChange={(value) =>
                  updateField("owner_en", value)
                }
              />

              <Field
                label="اسم المالك بالعربية"
                value={form.owner_ar}
                dir="rtl"
                onChange={(value) =>
                  updateField("owner_ar", value)
                }
              />
            </div>
          </div>

          <div>
            <h2 className="mb-5 text-lg font-bold text-zinc-900">
              Scope of Work
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Scope English"
                value={form.role_en}
                onChange={(value) =>
                  updateField("role_en", value)
                }
              />

              <Field
                label="نطاق العمل بالعربية"
                value={form.role_ar}
                dir="rtl"
                onChange={(value) =>
                  updateField("role_ar", value)
                }
              />
            </div>
          </div>

          <div>
            <h2 className="mb-5 text-lg font-bold text-zinc-900">
              Project Details
            </h2>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <Field
                label="Units"
                value={form.units}
                onChange={(value) =>
                  updateField("units", value)
                }
              />

              <Field
                label="Area"
                value={form.area}
                onChange={(value) =>
                  updateField("area", value)
                }
              />

              <Field
                label="Cost"
                value={form.cost}
                onChange={(value) =>
                  updateField("cost", value)
                }
              />
            </div>
          </div>

          <div>
            <h2 className="mb-5 text-lg font-bold text-zinc-900">
              Status
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Status English"
                value={form.status_en}
                placeholder="Completed"
                onChange={(value) =>
                  updateField("status_en", value)
                }
              />

              <Field
                label="الحالة بالعربية"
                value={form.status_ar}
                placeholder="مكتمل"
                dir="rtl"
                onChange={(value) =>
                  updateField("status_ar", value)
                }
              />
            </div>
          </div>

          <div>
            <h2 className="mb-5 text-lg font-bold text-zinc-900">
              Duration
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Duration English"
                value={form.duration_en}
                placeholder="10 Months"
                onChange={(value) =>
                  updateField("duration_en", value)
                }
              />

              <Field
                label="المدة بالعربية"
                value={form.duration_ar}
                placeholder="10 أشهر"
                dir="rtl"
                onChange={(value) =>
                  updateField("duration_ar", value)
                }
              />
            </div>
          </div>

          <div>
            <h2 className="mb-5 text-lg font-bold text-zinc-900">
              Description
            </h2>

            <div className="grid gap-5 lg:grid-cols-2">
              <TextArea
                label="Description English"
                value={form.description_en}
                onChange={(value) =>
                  updateField("description_en", value)
                }
              />

              <TextArea
                label="الوصف بالعربية"
                value={form.description_ar}
                dir="rtl"
                onChange={(value) =>
                  updateField("description_ar", value)
                }
              />
            </div>
          </div>

          <div>
            <h2 className="mb-5 text-lg font-bold text-zinc-900">
              Project Settings
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  Sort Order
                </label>

                <input
                  type="number"
                  value={form.sort_order}
                  onChange={(event) =>
                    updateField(
                      "sort_order",
                      Number(event.target.value)
                    )
                  }
                  className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-[#2B347A]"
                />
              </div>

              <Toggle
                label="Visible on Website"
                checked={form.is_active}
                onChange={(checked) =>
                  updateField("is_active", checked)
                }
              />

              <Toggle
                label="Featured Project"
                checked={form.is_featured}
                onChange={(checked) =>
                  updateField("is_featured", checked)
                }
              />
            </div>
          </div>

          {errorMessage && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {errorMessage}
            </div>
          )}

          <div className="border-t pt-6">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-[#2B347A] px-6 py-3 font-semibold text-white transition hover:bg-[#20285f] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Creating..." : "Create Project"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  required = false,
  placeholder = "",
  dir = "ltr",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  dir?: "ltr" | "rtl";
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-zinc-700">
        {label}
      </label>

      <input
        type="text"
        required={required}
        value={value}
        placeholder={placeholder}
        dir={dir}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none transition focus:border-[#2B347A]"
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  dir = "ltr",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  dir?: "ltr" | "rtl";
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-zinc-700">
        {label}
      </label>

      <textarea
        value={value}
        dir={dir}
        rows={8}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full resize-y rounded-lg border border-zinc-300 px-4 py-3 leading-7 outline-none transition focus:border-[#2B347A]"
      />
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-zinc-200 px-4 py-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) =>
          onChange(event.target.checked)
        }
        className="h-4 w-4"
      />

      <span className="text-sm font-medium text-zinc-700">
        {label}
      </span>
    </label>
  );
}
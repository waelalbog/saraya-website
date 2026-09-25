"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Language = "en" | "ar";

type Project = {
  id: number;

  title: {
    en: string;
    ar: string;
  };

  image: string;

  location: {
    en: string;
    ar: string;
  };

  status: {
    en: string;
    ar: string;
  };

  owner: {
    en: string;
    ar: string;
  } | null;

  role: {
    en: string;
    ar: string;
  } | null;

  units: string | null;
  area: string | null;

  description: {
    en: string;
    ar: string;
  } | null;
};
const fallbackProjectImages: Record<number, string> = {
  4: "/image/al-wajha-project.jpg",
  5: "/image/lavera-project.jpg",
  6: "/image/al-wurud-sales-center.jpg",
  7: "/image/mursia-mosque.jpg",
  8: "/image/al-drees-mosque.jpg",
  9: "/image/al-majhad-mosque.jpg",
  10: "/image/jira-makkah-project.jpg",
  11: "/image/living-project.jpg",
  12: "/image/misk-schools.jpg",
};
export default function ProjectsPage() {
  const [language, setLanguage] = useState<Language>("en");
  const [languageReady, setLanguageReady] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
const [projects, setProjects] = useState<Project[]>([]);
const [projectsLoading, setProjectsLoading] = useState(true);
  const isArabic = language === "ar";

  useEffect(() => {
    const savedLanguage = localStorage.getItem("saaco-language");

    if (savedLanguage === "ar" || savedLanguage === "en") {
      setLanguage(savedLanguage);
    }

    setLanguageReady(true);
  }, []);
useEffect(() => {
  const loadProjects = async () => {
    setProjectsLoading(true);

    const { data, error } = await supabase
      .from("projects")
      .select(`
        id,
        name_en,
        name_ar,
        cover_image_url,
        location_en,
        location_ar,
        status_en,
        status_ar,
        owner_en,
        owner_ar,
        role_en,
        role_ar,
        units,
        area,
        description_en,
        description_ar,
        sort_order,
        is_featured,
        is_active
      `)
      .eq("is_featured", false)
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Failed to load projects:", error);
      setProjectsLoading(false);
      return;
    }

    const formattedProjects: Project[] = (data || []).map((project) => ({
      id: project.id,

      title: {
        en: project.name_en,
        ar: project.name_ar,
      },

      image:
        project.cover_image_url ||
        fallbackProjectImages[project.id] ||
        "/image/projects-page-bg.jpg",

      location: {
        en: project.location_en || "",
        ar: project.location_ar || "",
      },

      status: {
        en: project.status_en || "",
        ar: project.status_ar || "",
      },

      owner:
        project.owner_en || project.owner_ar
          ? {
              en: project.owner_en || "",
              ar: project.owner_ar || "",
            }
          : null,

      role:
        project.role_en || project.role_ar
          ? {
              en: project.role_en || "",
              ar: project.role_ar || "",
            }
          : null,

      units: project.units,
      area: project.area,

      description:
        project.description_en || project.description_ar
          ? {
              en: project.description_en || "",
              ar: project.description_ar || "",
            }
          : null,
    }));

    setProjects(formattedProjects);
    setProjectsLoading(false);
  };

  loadProjects();
}, []);
  useEffect(() => {
    if (!selectedProject) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  const toggleLanguage = () => {
    const newLanguage: Language = language === "en" ? "ar" : "en";

    setLanguage(newLanguage);
    localStorage.setItem("saaco-language", newLanguage);
  };

  

  if (!languageReady || projectsLoading) {
  return null;
}

  return (
    <>
      <main
        dir={isArabic ? "rtl" : "ltr"}
        className="relative min-h-screen overflow-hidden bg-zinc-950"
      >
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/image/projects-page-bg.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-white/70" />
        </div>

        <div className="relative z-10">
          <section className="px-6 py-20 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-7xl">

              {/* Top controls */}
              <div className="mb-8 flex flex-wrap items-center gap-3">
                <a
                  href="/"
                  className="inline-flex items-center gap-3 rounded-full border border-[#2B347A] bg-white/90 px-5 py-2.5 text-sm font-bold text-[#2B347A] backdrop-blur transition-all duration-300 hover:bg-[#2B347A] hover:text-white"
                >
                  <span>{isArabic ? "←" : "←"}</span>

                  <span>
                    {isArabic ? "العودة للرئيسية" : "Back to Home"}
                  </span>
                </a>

                <button
                  type="button"
                  onClick={toggleLanguage}
                  className="rounded-full border border-[#2B347A]/30 bg-white/80 px-4 py-2.5 text-sm font-bold text-[#2B347A] backdrop-blur transition hover:bg-[#2B347A] hover:text-white"
                >
                  {isArabic ? "English" : "العربية"}
                </button>
              </div>

              {/* Header */}
              <div className="mb-14">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#2B347A]">
                  {isArabic
                    ? "سرايا العربية المتطورة"
                    : "SARAYA Advanced Arab Co"}
                </p>

                <h1 className="mt-4 text-4xl font-black text-zinc-950 sm:text-5xl lg:text-6xl">
                  {isArabic ? "مشاريعنا" : "Our Projects"}
                </h1>

                <div className="mt-6 h-1 w-20 bg-[#2B347A]" />
              </div>

              {/* Projects */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => {
                  const hasDetails =
                    project.owner &&
                    project.role &&
                    project.units &&
                    project.area &&
                    project.description;

                  return (
                    <article
                      key={project.id}
                      className="group overflow-hidden rounded-xl border border-white/60 bg-white/90 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      {/* Image */}
                      <div className="relative h-[200px] overflow-hidden bg-zinc-100">
                        <Image
                          src={project.image}
                          alt={project.title[language]}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h2 className="text-xl font-bold text-zinc-950">
                          {project.title[language]}
                        </h2>

                        <div className="mt-4 flex items-center justify-between gap-4">
                          <p className="text-sm text-zinc-500">
                            {project.location[language]}
                          </p>

                          <span className="rounded-full border border-[#2B347A]/20 bg-[#2B347A]/5 px-3 py-1 text-xs font-bold text-[#2B347A]">
                            {project.status[language]}
                          </span>
                        </div>

                        {hasDetails && (
                          <button
                            type="button"
                            onClick={() => setSelectedProject(project)}
                            className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#2B347A] px-4 py-2 text-xs font-bold text-[#2B347A] transition-all duration-300 hover:bg-[#2B347A] hover:text-white"
                          >
                            {isArabic
                              ? "معلومات المشروع"
                              : "Project Information"}

                            <span>
                              {isArabic ? "←" : "→"}
                            </span>
                          </button>
                        )}

                        <div className="mt-5 h-1 w-8 bg-[#2B347A] transition-all duration-300 group-hover:w-14" />
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* ================= PROJECT MODAL ================= */}
      {selectedProject && (
        <div
          dir={isArabic ? "rtl" : "ltr"}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8 lg:p-10"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              aria-label={isArabic ? "إغلاق" : "Close"}
              className={`absolute top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-xl font-bold text-zinc-700 shadow-sm transition hover:border-[#2B347A] hover:bg-[#2B347A] hover:text-white ${
  isArabic ? "left-5" : "right-5"
}`}
            >
              ×
            </button>

            {/* Modal Header */}
            <div className="border-b border-zinc-200 pb-6">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#2B347A]">
                {isArabic ? "تفاصيل المشروع" : "Project Details"}
              </p>

              <h2 className="mt-3 pe-12 text-3xl font-black text-zinc-950 sm:text-4xl">
                {selectedProject.title[language]}
              </h2>

              <div className="mt-5 h-1 w-16 bg-[#2B347A]" />
            </div>

            {/* Description */}
            {selectedProject.description && (
              <p className="mx-auto mt-7 max-w-4xl text-base leading-8 text-zinc-600 sm:text-lg sm:leading-9">
                {selectedProject.description[language]}
              </p>
            )}

            {/* Info Grid */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">

              {/* Location */}
              <InfoBox
                icon="location"
                label={isArabic ? "الموقع" : "Location"}
                value={selectedProject.location[language]}
              />

              {/* Units */}
              <InfoBox
                icon="units"
                label={isArabic ? "عدد الوحدات" : "Units"}
                value={selectedProject.units ?? "—"}
              />

              {/* Area */}
              <InfoBox
                icon="area"
                label={isArabic ? "المساحة" : "Area"}
                value={selectedProject.area ?? "—"}
              />

              {/* Owner */}
              <InfoBox
                icon="owner"
                label={isArabic ? "اسم المالك" : "Owner"}
                value={selectedProject.owner?.[language] ?? "—"}
              />

              {/* Role */}
              <InfoBox
                icon="role"
                label={isArabic ? "نطاق العمل" : "Scope of Work"}
                value={selectedProject.role?.[language] ?? "—"}
              />

              {/* Completion */}
              <InfoBox
                icon="status"
                label={isArabic ? "نسبة الإنجاز" : "Completion"}
                value={selectedProject.status[language]}
              />

            </div>
          </div>
        </div>
      )}
    </>
  );
}

function InfoBox({
  icon,
  label,
  value,
}: {
  icon: "location" | "units" | "area" | "owner" | "role" | "status";
  label: string;
  value: string;
}) {
  return (
    <div className="relative flex min-h-[150px] flex-col items-center justify-center rounded-2xl border border-[#2B347A]/70 bg-white px-4 py-5 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Decorative diamonds */}
      <div className="absolute -top-2 left-5 flex gap-1">
        <span className="h-3 w-3 rotate-45 bg-[#2B347A]" />
        <span className="h-3 w-3 rotate-45 bg-[#2B347A]" />
      </div>

      {/* Icon */}
      <div className="mb-3 flex h-10 w-10 items-center justify-center text-[#2B347A]">
        <InfoIcon type={icon} />
      </div>

      <p className="text-sm font-medium text-zinc-500">
        {label}
      </p>

      <p className="mt-1 text-base font-black text-[#2B347A] sm:text-lg">
        {value}
      </p>
    </div>
  );
}

function InfoIcon({
  type,
}: {
  type: "location" | "units" | "area" | "owner" | "role" | "status";
}) {
  if (type === "location") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-9 w-9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z" />
        <circle cx="12" cy="10" r="2.2" />
      </svg>
    );
  }

  if (type === "units") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-9 w-9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M4 21V8h6v13M10 21V3h7v18M17 21v-9h3v9" />
        <path d="M2 21h20" />
      </svg>
    );
  }

  if (type === "area") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-9 w-9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4" />
        <path d="M8 8h8v8H8z" />
      </svg>
    );
  }

  if (type === "owner") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-9 w-9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 20c.5-4 2.5-6 5.5-6s5 2 5.5 6" />
        <path d="M16 7h5v13h-5M18 10h1M18 13h1M18 16h1" />
      </svg>
    );
  }

  if (type === "role") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-9 w-9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M5 12a7 7 0 0 1 14 0" />
        <path d="M4 12h16M7 12v3M17 12v3M5 15h14" />
        <path d="M9 5V3h6v2" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-9 w-9"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="12" r="8" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </svg>
  );
}
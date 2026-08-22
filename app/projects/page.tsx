"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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

export default function ProjectsPage() {
  const [language, setLanguage] = useState<Language>("en");
  const [languageReady, setLanguageReady] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const isArabic = language === "ar";

  useEffect(() => {
    const savedLanguage = localStorage.getItem("saaco-language");

    if (savedLanguage === "ar" || savedLanguage === "en") {
      setLanguage(savedLanguage);
    }

    setLanguageReady(true);
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

  const projects: Project[] = [
    {
      id: 1,

      title: {
        en: "Al Wajha Residential Project",
        ar: "مشروع الواجهة السكنية",
      },

      image: "/image/al-wajha-project.jpg",

      location: {
        en: "Dammam",
        ar: "الدمام",
      },

      status: {
        en: "Completed",
        ar: "مكتمل",
      },

      owner: {
        en: "National Housing Company",
        ar: "الشركة الوطنية للإسكان",
      },

      role: {
        en: "Contractor",
        ar: "مقاول",
      },

      units: "590",

      area: "159,300 SM",

      description: {
        en: "Al Wajha Residential Project is a large-scale residential development located in Dammam and developed for the National Housing Company. The project spans a total area of 159,300 square meters and includes 590 residential units designed according to engineering standards that ensure efficient use of space. The project is supported by advanced infrastructure and high-quality construction specifications, reflecting the company's ability to execute major residential developments efficiently and in line with quality-of-life requirements.",

        ar: "يعد مشروع الواجهة السكنية مجمعاً سكنياً ضخماً يقع في مدينة الدمام، ويتم تطويره لصالح الشركة الوطنية للإسكان. يمتد المشروع على مساحة إجمالية واسعة تصل إلى 159,300 متر مربع، ويضم 590 وحدة سكنية صممت وفق معايير هندسية تضمن الاستغلال الفعال للمساحات. يرتكز المشروع على بنية تحتية متطورة ومواصفات إنشائية عالية الجودة تعكس قدرة الشركة على تنفيذ المشاريع السكنية الكبرى بكفاءة تشغيلية تتماشى مع متطلبات جودة الحياة.",
      },
    },

    {
  id: 2,

  title: {
    en: "Lavera Residential Compound",
    ar: "مجمع لافيرا السكني",
  },

  image: "/image/lavera-project.jpg",

  location: {
    en: "Al Khobar",
    ar: "الخبر",
  },

  status: {
    en: "Completed",
    ar: "مكتمل",
  },

  owner: {
    en: "AlKooheji Contracting",
    ar: "الكوهجي للمقاولات",
  },

  role: {
    en: "Contractor",
    ar: "مقاول",
  },

  units: "18",

  area: "7,200 SM",

  description: {
    en: "Lavera Residential Compound is strategically located in Al Khobar with direct views of the coastal strip. The project includes a variety of residential units, including villas and apartments, designed with high-quality luxury finishing standards. The project was executed using conventional cast-in-place concrete construction to ensure structural strength and durability, while the architectural design takes advantage of the sea view and the project's distinguished location.",

    ar: "يقع مجمع لافيرا السكني في موقع استراتيجي بمدينة الخبر بإطلالة مباشرة على الشريط الساحلي. يضم المشروع وحدات سكنية متنوعة تشمل فللاً وشققاً صممت بمعايير تشطيب فاخرة وعالية الجودة. تم تنفيذ المشروع باستخدام تقنية البناء التقليدية وصب الخرسانة في الموقع لضمان أقصى درجات المتانة والصلابة الإنشائية، مع توظيف التصاميم المعمارية التي تضمن الاستفادة من الإطلالة البحرية والموقع المتميز.",
  },
},
    {
  id: 3,

  title: {
    en: "Al Wurud Sales Center",
    ar: "مركز مبيعات الورود",
  },

  image: "/image/al-wurud-sales-center.jpg",

  location: {
    en: "Al Ahsa",
    ar: "الأحساء",
  },

  status: {
    en: "Completed",
    ar: "مكتمل",
  },

  owner: {
    en: "National Housing Company",
    ar: "الشركة الوطنية للإسكان",
  },

  role: {
    en: "Contractor",
    ar: "مقاول",
  },

  units: "1",

  area: "8,000 SM",

  description: {
    en: "Al Wurud Sales Center is a commercial and service project developed in Al Ahsa for the National Housing Company. The project spans an area of 8,000 square meters and was designed as an integrated center for receiving customers within a modern and practical working environment. The project was completed in full within a record period of 10 months, demonstrating the company’s efficiency in project management, strict adherence to schedules, and commitment to quality standards in execution.",

    ar: "يعد مركز مبيعات الورود مشروعاً تجارياً خدمياً تم تطويره في مدينة الأحساء لصالح الشركة الوطنية للإسكان. يمتد المشروع على مساحة 8,000 متر مربع، وصمم ليكون مركزاً متكاملاً لاستقبال العملاء ضمن بيئة عمل حديثة وعملية. تم إنجاز المشروع بالكامل بنسبة 100% خلال فترة قياسية بلغت 10 أشهر، مما يبرز كفاءة الشركة في إدارة المشاريع والالتزام الصارم بالجداول الزمنية مع الحفاظ على معايير الجودة في التنفيذ.",
  },
},
{
  id: 4,

  title: {
    en: "Mursia Mosque",
    ar: "مسجد مرسية",
  },

  image: "/image/mursia-mosque.jpg",

  location: {
    en: "Riyadh",
    ar: "الرياض",
  },

  status: {
    en: "Completed",
    ar: "مكتمل",
  },

  owner: {
    en: "National Housing Company",
    ar: "الشركة الوطنية للإسكان",
  },

  role: {
    en: "Contractor",
    ar: "مقاول",
  },

  units: "1",

  area: "2,064.97 SM",

  description: {
    en: "The Mursia Mosque project embodies the concept of contemporary Islamic architecture through a design that combines the spirituality of the place with modern architectural details, creating an integrated spiritual environment that serves worshippers and aligns with the needs of the modern community in Riyadh. The project spans an area of 2,064.97 square meters and was executed to the highest standards of quality and professionalism for the National Housing Company.",

    ar: "يجسد مشروع مسجد مرسية مفهوم العمارة الإسلامية المعاصرة من خلال تصميم يجمع بين روحانية المكان وحداثة التفاصيل المعمارية، ليشكل بيئة إيمانية متكاملة تخدم المصلين وتنسجم مع احتياجات المجتمع الحديث في مدينة الرياض. يمتد المشروع على مساحة 2,064.97 متر مربع، وتم تنفيذه وفق أعلى معايير الجودة والاحترافية لصالح الشركة الوطنية للإسكان.",
  },
},
{
  id: 5,

  title: {
    en: "Al Drees Mosque",
    ar: "مسجد الدريس",
  },

  image: "/image/al-drees-mosque.jpg",

  location: {
    en: "Riyadh",
    ar: "الرياض",
  },

  status: {
    en: "Completed",
    ar: "مكتمل",
  },

  owner: {
    en: "National Housing Company",
    ar: "الشركة الوطنية للإسكان",
  },

  role: {
    en: "Contractor",
    ar: "مقاول",
  },

  units: "1",

  area: "3,775.45 SM",

  description: {
    en: "The Al Drees Mosque project reflects an architectural vision that combines authentic Islamic character with contemporary design, within a spiritual environment carefully designed to provide comfort and tranquility for worshippers and serve the community with high quality and thoughtful details. The project spans an area of 3,775.45 square meters and was executed for the National Housing Company in accordance with the highest standards of quality and professionalism, within a design that aligns with modern architectural identity and enhances the presence of the place within Riyadh’s urban landscape.",

    ar: "يعكس مشروع مسجد الدريس رؤية معمارية تجمع بين الطابع الإسلامي الأصيل والتصميم المعاصر، ضمن بيئة إيمانية صممت بعناية لتوفر الراحة والسكينة للمصلين وتخدم المجتمع بجودة عالية وتفاصيل مدروسة. يمتد المشروع على مساحة 3,775.45 متر مربع، وتم تنفيذه لصالح الشركة الوطنية للإسكان وفق أعلى معايير الجودة والاحترافية ضمن تصميم ينسجم مع الهوية المعمارية الحديثة ويعزز حضور المكان ضمن المشهد العمراني في مدينة الرياض.",
  },
},
{
  id: 6,

  title: {
    en: "Al Majhad Mosque",
    ar: "مسجد المجحد",
  },

  image: "/image/al-majhad-mosque.jpg",

  location: {
    en: "Riyadh",
    ar: "الرياض",
  },

  status: {
    en: "Completed",
    ar: "مكتمل",
  },

  owner: {
    en: "National Housing Company",
    ar: "الشركة الوطنية للإسكان",
  },

  role: {
    en: "Contractor",
    ar: "مقاول",
  },

  units: "1",

  area: "1,786 SM",

  description: {
    en: "The Al Majhad Mosque project is located in Riyadh and features a modern architectural design that balances aesthetics and functionality while providing a comfortable spiritual environment for worshippers. The project spans an area of 1,786 square meters and was executed to high quality standards with integrated facilities for the National Housing Company.",

    ar: "يقع مشروع مسجد المجحد في مدينة الرياض، بتصميم معماري حديث يوازن بين الجمال والوظيفة، ويوفر بيئة روحانية مريحة للمصلين. يمتد المشروع على مساحة 1,786 متر مربع، وتم تنفيذه بمعايير جودة عالية ضمن مرافق متكاملة لصالح الشركة الوطنية للإسكان.",
  },
},
{
  id: 7,

  title: {
    en: "Jira Makkah Project",
    ar: "مشروع جيرا مكة",
  },

  image: "/image/jira-makkah-project.jpg",

  location: {
    en: "Makkah",
    ar: "مكة",
  },

  status: {
    en: "In Progress",
    ar: "تحت التنفيذ",
  },

  owner: {
    en: "Al Tahaluf Real Estate",
    ar: "التحالف العقارية",
  },

  role: {
    en: "Contractor",
    ar: "مقاول",
  },

  units: "1",

  area: "190,000 SM",

  description: {
    en: "Jira Makkah is one of the major development projects being executed by the company in Makkah for Al Tahaluf Real Estate. The project spans a total area of 190,000 square meters and is distinguished by its strategic location and engineering planning that aligns with modern urban development standards. The project focuses on delivering integrated infrastructure and facilities that ensure operational efficiency, while maintaining full commitment to the highest standards of quality and the structural capabilities required for large-scale developments.",

    ar: "يعد مشروع جيرا مكة من المشاريع التطويرية الكبرى التي تنفذها الشركة في مدينة مكة المكرمة لصالح شركة التحالف العقارية. يمتد المشروع على مساحة إجمالية واسعة تصل إلى 190,000 متر مربع، ويتميز بموقع استراتيجي وتخطيط هندسي يواكب معايير التطوير الحضري الحديثة. يرتكز العمل في المشروع على تقديم بنية تحتية ومنشآت متكاملة تضمن كفاءة التشغيل، مع الالتزام التام بأعلى معايير الجودة والقدرة الإنشائية التي تتطلبها المشاريع ذات المساحات الشاسعة.",
  },
},
{
  id: 8,

  title: {
  en: "Ishraq Living",
  ar: "إشراق ليفنج",
},

  image: "/image/living-project.jpg",

  location: {
    en: "Riyadh",
    ar: "الرياض",
  },

  status: {
    en: "Completed",
    ar: "مكتمل",
  },

  owner: {
    en: "Al Tahaluf Real Estate",
    ar: "التحالف العقارية",
  },

  role: {
    en: "Contractor",
    ar: "مقاول",
  },

  units: "2229",

  area: "612,975 SM",

  description: {
    en: "Living is one of the integrated residential projects in northern Riyadh, strategically located west of King Khalid International Airport and near Princess Nourah University. The project comprises 2,229 diverse residential units, including villas, townhouses, and duplex apartments, with designs that prioritize efficient use of space and residents’ privacy. The project utilizes precast insulated concrete technologies, along with advanced infrastructure that includes fiber-optic networks and electricity, water, and sewage services, providing an integrated residential environment that meets the requirements of modern living.",

    ar: "يعد مشروع ليفنج أحد المشاريع السكنية المتكاملة في شمال الرياض، ويقع في موقع استراتيجي غرب مطار الملك خالد الدولي وبالقرب من جامعة الأميرة نورة. يضم المشروع 2,229 وحدة سكنية متنوعة تشمل الفلل والتاون هاوس وشقق الدوبلكس، بتصاميم تراعي كفاءة استغلال المساحات وخصوصية السكان. يعتمد المشروع على تقنيات الخرسانة المعزولة مسبقة الصب، إلى جانب بنية تحتية متطورة تضم شبكات الألياف البصرية وخدمات الكهرباء والمياه والصرف الصحي، بما يوفر بيئة سكنية متكاملة تلبي متطلبات الحياة العصرية.",
  },
},
{
  id: 9,

  title: {
    en: "Misk Schools",
    ar: "مدارس مسك",
  },

  image: "/image/misk-schools.jpg",

  location: {
    en: "Riyadh",
    ar: "الرياض",
  },

  status: {
    en: "In Progress",
    ar: "تحت التنفيذ",
  },

  owner: {
    en: "National Housing Company",
    ar: "الشركة الوطنية للإسكان",
  },

  role: {
    en: "Contractor",
    ar: "مقاول",
  },

  units: "مدارس بنين وبنات",

  area: "30,444.31 SM",

  description: {
    en: "Misk Schools is a pioneering educational project in Riyadh that reflects our commitment to the highest standards of construction quality. The project spans more than 30,000 square meters and includes integrated educational facilities for boys and girls, designed according to modern architectural standards that meet the aspirations of future generations. We are proud to execute this project for the National Housing Company, applying rigorous international execution standards to provide an advanced and inspiring educational environment.",

    ar: "مشروع تعليمي رائد في مدينة الرياض يجسد التزامنا بأعلى معايير الجودة الإنشائية. يمتد المشروع على مساحة تتجاوز 30 ألف متر مربع، ويضم مرافق تعليمية متكاملة للبنين والبنات، صممت وفق أحدث الطرز المعمارية التي تلبي تطلعات الأجيال القادمة. نفخر بتنفيذ هذا المشروع لصالح الشركة الوطنية للإسكان، مطبقين أدق معايير التنفيذ العالمية لضمان بيئة تعليمية محفزة ومتطورة.",
  },
},
  ];

  if (!languageReady) {
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
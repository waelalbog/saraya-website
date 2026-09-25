"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const [languageReady, setLanguageReady] = useState(false);
const [selectedHomeProject, setSelectedHomeProject] = useState<
    "sama" | "sekak" | "rawa" | null
  >(null);
  const [homeProjectImages, setHomeProjectImages] = useState<string[]>([]);
const [homeProjectImagesLoading, setHomeProjectImagesLoading] = useState(false);
useEffect(() => {
  const loadHomeProjectImages = async () => {
    if (!selectedHomeProject) {
      setHomeProjectImages([]);
      return;
    }

    const projectIdMap = {
      sama: 1,
      sekak: 2,
      rawa: 3,
    };

    const projectId = projectIdMap[selectedHomeProject];

    setHomeProjectImagesLoading(true);

    const { data, error } = await supabase
      .from("project_images")
      .select("image_url")
      .eq("project_id", projectId)
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Failed to load home project images:", error);
      setHomeProjectImages([]);
    } else {
      setHomeProjectImages(
        (data || []).map((item) => item.image_url)
      );
    }

    setHomeProjectImagesLoading(false);
  };

  loadHomeProjectImages();
}, [selectedHomeProject]);
  const isArabic = language === "ar";
useEffect(() => {
  const savedLanguage = localStorage.getItem("saaco-language") as "en" | "ar" | null;

  if (savedLanguage) {
    setLanguage(savedLanguage);
  }

  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

  setLanguageReady(true);
}, [language]);
useEffect(() => {
  if (!selectedHomeProject) return;

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setSelectedHomeProject(null);
    }
  };

  document.addEventListener("keydown", handleEscape);
  document.body.style.overflow = "hidden";

  return () => {
    document.removeEventListener("keydown", handleEscape);
    document.body.style.overflow = "";
  };
}, [selectedHomeProject]);
  const services = [
  {
    number: "01",
    title: language === "ar" ? "المقاولات العامة" : "General Contracting",
    description:
      language === "ar"
        ? "خدمات مقاولات متكاملة من البداية إلى النهاية، مع إدارة احترافية للمشاريع وتنفيذ منظم ومدروس."
        : "End-to-end contracting services with professional project management and controlled execution.",
  },
  {
    number: "02",
    title: language === "ar" ? "الإنشاءات" : "Construction",
    description:
      language === "ar"
        ? "تنفيذ المشاريع السكنية والتجارية والصناعية وفق معايير الجودة والاهتمام بأدق التفاصيل."
        : "Residential, commercial, and industrial construction delivered with quality and attention to detail.",
  },
  {
    number: "03",
    title: language === "ar" ? "البنية التحتية" : "Infrastructure",
    description:
      language === "ar"
        ? "حلول موثوقة للبنية التحتية تشمل تطوير المواقع وتنفيذ أعمال البنية التحتية الأساسية."
        : "Reliable infrastructure solutions covering site development and essential infrastructure works.",
  },
  {
    number: "04",
    title: language === "ar" ? "خدمات MEP" : "MEP Services",
    description:
      language === "ar"
        ? "حلول متكاملة للأعمال الميكانيكية والكهربائية والصحية للمشاريع والمباني الحديثة."
        : "Integrated mechanical, electrical, and plumbing solutions for modern building projects.",
  },
  {
    number: "05",
    title: language === "ar" ? "الصيانة والتجديد" : "Maintenance & Renovation",
    description:
      language === "ar"
        ? "خدمات احترافية للصيانة والتجديد وإعادة التأهيل وتحسين وتطوير المباني."
        : "Professional maintenance, renovation, refurbishment, and building improvement services.",
  },
  {
    number: "06",
    title: language === "ar" ? "مشاريع تسليم مفتاح" : "Turnkey Projects",
    description:
      language === "ar"
        ? "تسليم متكامل للمشروع بدءاً من التخطيط والتوريد وصولاً إلى التنفيذ والتسليم النهائي."
        : "Complete project delivery from planning and procurement through execution and final handover.",
  },
];

const stats = [
  {
    number: "10+",
    label: language === "ar" ? "مشاريع" : "Projects",
  },
  {
    number: "5+",
    label: language === "ar" ? "خدمات" : "Services",
  },
  {
    number: "100%",
    label: language === "ar" ? "التزام" : "Commitment",
  },
  {
    number: "24/7",
    label: language === "ar" ? "دعم" : "Support",
  },
];
  if (!languageReady) {
  return null;
}

return (
    <main
  dir={isArabic ? "rtl" : "ltr"}
  className={`saaco-page min-h-screen bg-white text-zinc-950 ${
    isArabic
  ? "font-[var(--font-ibm-plex-arabic)]"
  : "font-[var(--font-montserrat)]"
  }`}
>
      {/* ================= NAVBAR ================= */}
      <header className="fixed left-0 top-0 z-50 w-full bg-zinc-950/25 backdrop-blur-sm transition-all duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8">
          {/* Logo */}
          <a
  href="#hero"
  className={`group ${
    isArabic ? "lg:translate-x-6" : "lg:-translate-x-6"
  }`}
>
            <Image
  src="/saraya-logo-horizontal1.png"
  alt="Saraya Advanced Arab Co"
  width={150}
  height={80}
  className="h-[88px] w-auto object-contain"
/>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            <a
              href="#hero"
              className="text-base font-medium text-white transition hover:text-[#2B347A]"
            >
              {language === "en" ? "Home" : "الرئيسية"}
            </a>

            <a
              href="#about"
              className="text-base font-medium text-white transition hover:text-[#2B347A]"
            >
              {language === "en" ? "About" : "من نحن"}
            </a>

            <a
              href="#services"
              className="text-base font-medium text-white transition hover:text-[#2B347A]"
            >
              {language === "en" ? "Services" : "خدماتنا"}
            </a>

            <a
              href="#projects"
              className="text-base font-medium text-white transition hover:text-[#2B347A]"
            >
              {language === "en" ? "Projects" : "مشاريعنا"}
            </a>

            <a href="#contact"
              className="text-base font-medium text-white transition hover:text-[#2B347A]"
>             
              {language === "en" ? "Contact" : "تواصل معنا"}
            </a>
          </nav>
{mobileMenuOpen && (
  <div className="absolute left-0 right-0 top-full border-t border-white/10 bg-zinc-950 px-6 py-6 lg:hidden">
    <div className="flex flex-col gap-5">

      <a
        href="#hero"
        onClick={() => setMobileMenuOpen(false)}
        className="text-sm font-medium text-white"
      >
        {language === "en" ? "Home" : "الرئيسية"}
      </a>

      <a
        href="#about"
        onClick={() => setMobileMenuOpen(false)}
        className="text-sm font-medium text-white/70"
      >
        {language === "en" ? "About" : "من نحن"}
      </a>

      <a
        href="#services"
        onClick={() => setMobileMenuOpen(false)}
        className="text-sm font-medium text-white/70"
      >
        {language === "en" ? "Services" : "خدماتنا"}
      </a>

      <a
        href="#projects"
        onClick={() => setMobileMenuOpen(false)}
        className="text-sm font-medium text-white/70"
      >
        {language === "en" ? "Projects" : "مشاريعنا"}
      </a>

      <a
        href="#contact"
        onClick={() => setMobileMenuOpen(false)}
        className="text-sm font-medium text-white/70"
      >
        {language === "en" ? "Contact" : "تواصل معنا"}
      </a>

    </div>
  </div>
)}
          {/* Contact + Language */}
<div className="flex items-center gap-3">
  <a
  href="https://wa.me/966566417000?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D9%85%D9%86%D8%A7%D9%82%D8%B4%D8%A9%20%D9%85%D8%B4%D8%B1%D9%88%D8%B9%20%D9%85%D8%B9%20%D8%A7%D9%84%D8%B3%D8%B1%D8%A7%D9%8A%D8%A7%20%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A%D8%A9%20%D8%A7%D9%84%D9%85%D8%AA%D8%B7%D9%88%D8%B1%D8%A9"
  target="_blank"
  rel="noopener noreferrer"
  className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2B347A]"
>
  {language === "en" ? "Contact Us" : "تواصل معنا"}
</a>

  <button
    type="button"
    onClick={() => {
      const newLanguage = language === "en" ? "ar" : "en";
      setLanguage(newLanguage);
      localStorage.setItem("saaco-language", newLanguage);
    }}
    className="rounded-full border border-white/20 px-4 py-2 text-xs font-bold text-white transition hover:border-[#2B347A] hover:bg-[#2B347A] hover:text-white"
  >
    {language === "en" ? "العربية" : "English"}
  </button>
</div>
          {/* Mobile Menu */}
          <button
  type="button"
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  className="rounded-lg border border-white/20 px-3 py-2 text-white lg:hidden"
  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
>
  {mobileMenuOpen ? "✕" : "☰"}
</button>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section
  id="hero"
  className="relative flex min-h-screen items-center overflow-hidden bg-zinc-950"
>
        {/* Background */}
        <Image
  src="/image/hero-main-2.jpg"
  alt="SARAYA Advanced Arab Co"
  fill
  priority
  className="object-cover object-[65%_center] lg:object-center"
  
/>
<div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/45 to-black/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(43,52,122,0.28),transparent_30%)]" />

        <div className="absolute right-[-15%] top-[-20%] h-[650px] w-[650px] rounded-full border border-white/[0.04]" />
        <div className="absolute right-[-5%] top-[-10%] h-[500px] w-[500px] rounded-full border border-white/[0.04]" />

  
        

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-zinc-950 to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-40 lg:px-8">
          <div className="w-full max-w-3xl lg:mr-auto lg:ml-16">
            <div className="mb-8 flex items-center gap-4 lg:justify-start" dir="ltr">
              <span className="h-[2px] w-14 bg-[#2B347A]" />

              <span className="text-sm font-bold uppercase tracking-[0.28em] text-[#2B347A]">
                {language === "en"
  ? "Contracting • Construction • Infrastructure"
  : "مقاولات • إنشاءات • بنية تحتية"}
              </span>
            </div>

            <h1
  className={`text-5xl font-black leading-[0.95] tracking-[-0.04em] text-white sm:text-7xl lg:text-[78px] ${
    isArabic ? "text-right lg:text-left" : "text-left"
  }`}
>
             {language === "en" ? (
  <>
    Building the Future,
    <br />
    <span className="text-[#2B347A]">Today.</span>
  </>
) : (
  <>
   نبني المستقبل
    <br />
    <span className="text-[#2B347A]">اليوم.</span>
  </>
)}
            </h1>

            <p
  className={`mt-8 max-w-xl text-lg leading-7 text-white/80 sm:text-xl lg:translate-y-22 ${
    isArabic
      ? "lg:translate-x-72 lg:text-right"
      : "lg:-translate-x-10 lg:text-left"
  }`}
>
              {language === "en"
  ? "SARAYA Advanced Arab Co delivers integrated contracting and construction solutions for residential, commercial, industrial, and infrastructure projects."
  : "تقدم السرايا العربية المتطورة حلولاً متكاملة في مجال المقاولات والإنشاءات للمشاريع السكنية والتجارية والصناعية ومشاريع البنية التحتية."}
            </p>

            <div
  className={`mt-10 flex flex-col gap-4 sm:flex-row lg:w-fit ${
    isArabic
      ? "lg:mr-auto"
      : "lg:ml-auto lg:translate-x-90"
  }`}
>
              <a
                href="#services"
                className="rounded-full bg-[#2B347A] px-8 py-4 text-center text-sm font-bold text-white transition hover:bg-[#3A4696]"
              >
                {language === "en" ? "Explore Our Services" : "اكتشف خدماتنا"}
              </a>

              <a
                href="#projects"
                className="rounded-full border border-white/20 px-8 py-4 text-center text-sm font-semibold text-white transition hover:border-white hover:bg-white hover:text-zinc-950"
              >
                {language === "en" ? "View Our Projects" : "استعرض مشاريعنا"}
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 mx-auto grid max-w-3xl grid-cols-2 border-t border-white/10 pt-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border-r border-white/10 px-5 first:pl-0 last:border-0"
              >
                <div className="text-3xl font-bold text-white">
                  {stat.number}
                </div>

                <div className="mt-1 text-xs uppercase tracking-widest text-zinc-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
<section
  id="about"
  className="relative overflow-hidden bg-white px-6 py-20 lg:px-8 lg:py-24"
>
  <div className="mx-auto max-w-7xl">

    <div className="grid gap-12 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-12">

      {/* ================= TOP 1: TITLE ================= */}
      <div>
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-[#2B347A]" />

          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#2B347A]">
            {language === "en"
              ? "About SARAYA Advanced Arab Co"
              : "عن سرايا العربية المتطورة"}
          </span>
        </div>

        <h2 className="mt-7 text-4xl font-black leading-tight tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl">
          {language === "en" ? (
            <>
              Building with
              <br />
              <span className="text-[#2B347A]">purpose.</span>
            </>
          ) : (
            <>
              نبني
              <br />
              <span className="text-[#2B347A]">برؤية وهدف.</span>
            </>
          )}
        </h2>

        <div className="mt-10 h-1 w-20 bg-[#2B347A]" />
      </div>


      {/* ================= TOP 2: ABOUT TEXT ================= */}
      <div>
        <p className="text-2xl font-medium leading-10 text-zinc-800 sm:text-3xl">
          {language === "en" ? (
            <>
              We believe great projects are built on more than concrete and
              steel. They are built on{" "}
              <span className="font-bold text-zinc-950">
                trust, precision, and commitment.
              </span>
            </>
          ) : (
            <>
              نؤمن بأن المشاريع الناجحة تُبنى بأكثر من الخرسانة والفولاذ،
              بل تُبنى على{" "}
              <span className="font-bold text-zinc-950">
                الثقة والدقة والالتزام.
              </span>
            </>
          )}
        </p>

        <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-500">
          {language === "en"
            ? "SARAYA Advanced Arab Co provides integrated contracting and construction solutions across residential, commercial, industrial, and infrastructure projects. Our approach combines professional project management, skilled execution, and attention to detail to deliver results that stand the test of time."
            : "تقدم سرايا العربية المتطورة حلولاً متكاملة في مجال المقاولات والإنشاءات للمشاريع السكنية والتجارية والصناعية ومشاريع البنية التحتية. ونجمع في عملنا بين الإدارة الاحترافية للمشاريع، والخبرة في التنفيذ، والاهتمام بأدق التفاصيل لتحقيق نتائج مستدامة."}
        </p>
      </div>


      {/* ================= BOTTOM 1: IMAGE ================= */}
      <div className="relative self-start overflow-hidden rounded-sm">
        <Image
          src="/image/about-saraya.jpg"
          alt={
            language === "en"
              ? "SARAYA Advanced Arab Co"
              : "سرايا العربية المتطورة"
          }
          width={900}
          height={1100}
          className="h-[280px] w-full object-cover object-center lg:h-[320px]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#2B347A]/25 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 h-1 w-full bg-[#2B347A]" />
      </div>


      {/* ================= BOTTOM 2: VALUES ================= */}
      <div>
        <div className="grid gap-5 border-t border-zinc-200 pt-10 sm:grid-cols-3">
          {[
            {
              number: "01",
              title: language === "en" ? "Quality" : "الجودة",
              text:
                language === "en"
                  ? "High standards at every stage of execution."
                  : "نلتزم بأعلى معايير الجودة في جميع مراحل التنفيذ.",
            },
            {
              number: "02",
              title: language === "en" ? "Precision" : "الدقة",
              text:
                language === "en"
                  ? "Careful planning and professional execution."
                  : "تخطيط دقيق وتنفيذ احترافي يضمن أفضل النتائج.",
            },
            {
              number: "03",
              title: language === "en" ? "Trust" : "الثقة",
              text:
                language === "en"
                  ? "Partnerships built on reliability and transparency."
                  : "نبني شراكاتنا على الموثوقية والشفافية.",
            },
          ].map((item) => (
            <div
              key={item.number}
              className="group rounded-xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#2B347A]/40 hover:shadow-lg"
            >
              <div className="text-4xl font-black text-[#2B347A]">
                {item.number}
              </div>

              <h3 className="mt-4 text-lg font-bold text-zinc-950">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-500">
                {item.text}
              </p>

              <div className="mt-5 h-1 w-8 bg-[#2B347A] transition-all duration-300 group-hover:w-14" />
            </div>
          ))}
        </div>


        {/* CTA */}
        <a
          href="#services"
          className="mt-10 inline-flex items-center gap-3 rounded-full border border-[#2B347A] px-6 py-3 text-sm font-bold text-[#2B347A] transition-all duration-300 hover:bg-[#2B347A] hover:text-white"
        >
          {language === "en"
            ? "Discover Our Capabilities"
            : "اكتشف قدراتنا"}

          <span className="text-lg">
            {language === "en" ? "→" : "←"}
          </span>
        </a>
      </div>

    </div>
  </div>


  {/* Decorative number */}
  <div className="pointer-events-none absolute -bottom-20 -right-10 select-none text-[240px] font-black leading-none text-zinc-100">
    
  </div>
</section>

      {/* ================= SERVICES ================= */}
<section
  id="services"
  className="relative overflow-hidden bg-[#090B14] px-6 py-24 lg:px-8 lg:py-32"
>
  {/* Decorative background */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full border border-white/[0.04]" />
    <div className="absolute -right-20 top-40 h-[350px] w-[350px] rounded-full border border-[#2B347A]/[0.08]" />

    <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:80px_80px]" />
  </div>

  <div className="relative mx-auto max-w-7xl">

    {/* ================= HEADER ================= */}
    <div className="grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">

      <div>
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-[#2B347A]" />

          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#2B347A]">
            {language === "en" ? "What We Do" : "ماذا نقدم"}
          </span>
        </div>

        <h2 className="mt-7 max-w-3xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
         {language === "en" ? (
  <>
    Integrated solutions
    <br />
    <span className="text-[#2B347A]">Built to perform.</span>
  </>
) : (
  <>
    حلول متكاملة
    <br />
    <span className="text-[#2B347A]">نُنفذها باحتراف.</span>
  </>
)}
        </h2>
      </div>

      <div>
        <p className="leading-8 text-zinc-300">
          {language === "en"
  ? "From construction and infrastructure to specialized building services, SARAYA Advanced Arab Co provides integrated solutions designed around quality, efficiency, and reliable project delivery."
  : "من أعمال الإنشاءات والبنية التحتية إلى خدمات البناء المتخصصة، تقدم سرايا العربية المتطورة حلولاً متكاملة ترتكز على الجودة والكفاءة والتنفيذ الموثوق للمشاريع."}
        </p>
      </div>
    </div>

    {/* ================= SERVICES LIST ================= */}
    <div className="mt-20 border-t border-white/10">

      {/* Service 01 */}
      <article className="group border-b border-white/10 transition-colors duration-300 hover:bg-white/[0.025]">
        <div className="grid gap-6 py-10 lg:grid-cols-[100px_1fr_1.1fr_60px] lg:items-center">

          <div className="text-sm font-bold text-[#2B347A]">
            01
          </div>

          <h3
  className={`text-2xl font-bold text-white transition duration-300 sm:text-3xl ${
    isArabic
      ? "group-hover:-translate-x-2"
      : "group-hover:translate-x-2"
  }`}
>
  {language === "en" ? "General Contracting" : "المقاولات العامة"}
</h3>

          <p className="max-w-xl text-sm leading-7 text-zinc-400">
            {language === "en"
  ? "Comprehensive contracting services covering project planning, coordination, execution, and professional project management."
  : "خدمات متكاملة تشمل تخطيط المشاريع، والتنسيق، والتنفيذ، والإدارة الاحترافية للمشاريع."}
          </p>

          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-lg text-zinc-500 transition-all duration-300 group-hover:rotate-45 group-hover:border-[#2B347A] group-hover:bg-[#2B347A] group-hover:text-white">
  ↗
</div>
        </div>
      </article>

      {/* Service 02 */}
      <article className="group border-b border-white/10 transition-colors duration-300 hover:bg-white/[0.025]">
        <div className="grid gap-6 py-10 lg:grid-cols-[100px_1fr_1.1fr_60px] lg:items-center">

          <div className="text-sm font-bold text-[#2B347A]">
            02
          </div>

          <h3
  className={`text-2xl font-bold text-white transition duration-300 sm:text-3xl ${
    isArabic
      ? "group-hover:-translate-x-2"
      : "group-hover:translate-x-2"
  }`}
>
            {language === "en" ? "Building Construction" : "تشييد المباني"}
          </h3>

          <p className="max-w-xl text-sm leading-7 text-zinc-400">
            {language === "en"
  ? "Construction solutions for residential, commercial, and industrial buildings with a focus on quality and precision."
  : "حلول متكاملة لتشييد المباني السكنية والتجارية والصناعية مع التركيز على الجودة والدقة."}
          </p>

          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-lg text-zinc-500 transition-all duration-300 group-hover:rotate-45 group-hover:border-[#2B347A] group-hover:bg-[#2B347A] group-hover:text-white">
  ↗
</div>
        </div>
      </article>

      {/* Service 03 */}
      <article className="group border-b border-white/10 transition-colors duration-300 hover:bg-white/[0.025]">
        <div className="grid gap-6 py-10 lg:grid-cols-[100px_1fr_1.1fr_60px] lg:items-center">

          <div className="text-sm font-bold text-[#2B347A]">
            03
          </div>

          <h3
  className={`text-2xl font-bold text-white transition duration-300 sm:text-3xl ${
    isArabic
      ? "group-hover:-translate-x-2"
      : "group-hover:translate-x-2"
  }`}
>
            {language === "en" ? "Infrastructure" : "البنية التحتية"}
          </h3>

          <p className="max-w-xl text-sm leading-7 text-zinc-400">
            {language === "en"
  ? "Infrastructure and site development services delivered with careful planning, coordination, and professional execution."
  : "خدمات البنية التحتية وتطوير المواقع من خلال التخطيط الدقيق والتنسيق والتنفيذ الاحترافي."}
          </p>

          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-lg text-zinc-500 transition-all duration-300 group-hover:rotate-45 group-hover:border-[#2B347A] group-hover:bg-[#2B347A] group-hover:text-white">
  ↗
</div>
        </div>
      </article>

      {/* Service 04 */}
      <article className="group border-b border-white/10 transition-colors duration-300 hover:bg-white/[0.025]">
        <div className="grid gap-6 py-10 lg:grid-cols-[100px_1fr_1.1fr_60px] lg:items-center">

          <div className="text-sm font-bold text-[#2B347A]">
            04
          </div>

          <h3
  className={`text-2xl font-bold text-white transition duration-300 sm:text-3xl ${
    isArabic
      ? "group-hover:-translate-x-2"
      : "group-hover:translate-x-2"
  }`}
>
            {language === "en" ? "MEP Services" : "خدمات الأعمال الكهروميكانيكية"}
          </h3>

          <p className="max-w-xl text-sm leading-7 text-zinc-400">
            {language === "en"
  ? "Integrated mechanical, electrical, and plumbing solutions for modern residential, commercial, and industrial projects."
  : "حلول متكاملة للأعمال الميكانيكية والكهربائية والسباكة للمشاريع السكنية والتجارية والصناعية الحديثة."}
          </p>

          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-lg text-zinc-500 transition-all duration-300 group-hover:rotate-45 group-hover:border-[#2B347A] group-hover:bg-[#2B347A] group-hover:text-white">
  ↗
</div>
        </div>
      </article>

      {/* Service 05 */}
      <article className="group border-b border-white/10 transition-colors duration-300 hover:bg-white/[0.025]">
        <div className="grid gap-6 py-10 lg:grid-cols-[100px_1fr_1.1fr_60px] lg:items-center">

          <div className="text-sm font-bold text-[#2B347A]">
            05
          </div>

          <h3
  className={`text-2xl font-bold text-white transition duration-300 sm:text-3xl ${
    isArabic
      ? "group-hover:-translate-x-2"
      : "group-hover:translate-x-2"
  }`}
>
            {language === "en"
  ? "Maintenance & Renovation"
  : "الصيانة والتجديد"}
          </h3>

          <p className="max-w-xl text-sm leading-7 text-zinc-400">
            {language === "en"
  ? "Professional maintenance, renovation, refurbishment, and improvement solutions that extend the life of existing assets."
  : "حلول احترافية للصيانة والتجديد وإعادة التأهيل والتطوير بما يساهم في إطالة عمر الأصول والمرافق."}
          </p>

          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-lg text-zinc-500 transition-all duration-300 group-hover:rotate-45 group-hover:border-[#2B347A] group-hover:bg-[#2B347A] group-hover:text-white">
  ↗
</div>
        </div>
      </article>

      {/* Service 06 */}
      <article className="group border-b border-white/10 transition-colors duration-300 hover:bg-white/[0.025]">
        <div className="grid gap-6 py-10 lg:grid-cols-[100px_1fr_1.1fr_60px] lg:items-center">

          <div className="text-sm font-bold text-[#2B347A]">
            06
          </div>

          <h3
  className={`text-2xl font-bold text-white transition duration-300 sm:text-3xl ${
    isArabic
      ? "group-hover:-translate-x-2"
      : "group-hover:translate-x-2"
  }`}
>
           {language === "en"
  ? "Turnkey Projects"
  : "المشاريع المتكاملة"}
          </h3>

          <p className="max-w-xl text-sm leading-7 text-zinc-400">
           {language === "en"
  ? "Complete project delivery from planning and procurement through execution, coordination, and final handover."
  : "تسليم متكامل للمشاريع بدءاً من التخطيط والتوريد وصولاً إلى التنفيذ والتنسيق والتسليم النهائي."}
          </p>

          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-lg text-zinc-500 transition-all duration-300 group-hover:rotate-45 group-hover:border-[#2B347A] group-hover:bg-[#2B347A] group-hover:text-white">
  ↗
</div>
        </div>
      </article>

    </div>

    {/* ================= BOTTOM CTA ================= */}
    <div className="mt-16 flex flex-col justify-between gap-8 rounded-2xl border border-[#2B347A]/30 bg-gradient-to-r from-[#2B347A]/10 via-white/[0.03] to-transparent p-8 transition duration-300 hover:border-[#2B347A]/50 sm:p-10 lg:flex-row lg:items-center">

      <div>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#2B347A]">
          {language === "en" ? "Our Approach" : "منهجيتنا"}
        </p>

        <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
          {language === "en"
  ? "One partner. Multiple capabilities."
  : "شريك واحد. إمكانيات متعددة."}
        </h3>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-500">
         {language === "en"
  ? "We bring different disciplines together to simplify project delivery and create better results."
  : "نجمع مختلف التخصصات والخبرات لتبسيط تنفيذ المشاريع وتحقيق نتائج أفضل."}
        </p>
      </div>

      <a
        href="#contact"
        className="inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-[#2B347A] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#3A4696]"
      >
        {language === "en"
  ? "Discuss Your Project"
  : "ناقش مشروعك معنا"}

        <span className="text-lg">
  {language === "en" ? "→" : "←"}
</span>
      </a>

    </div>

  </div>
</section>
      {/* ================= PROJECTS ================= */}
<section
  id="projects"
  className="relative overflow-hidden px-6 py-20 lg:px-8 lg:py-14"
>
  <div className="absolute inset-0">
    <Image
      src="/image/خلفية تحت المشاريع.jpg"
      alt=""
      fill
      className="object-cover opacity-45"
      sizes="100vw"
    />
    <div className="absolute inset-0 bg-white/8" />
  </div>

  <div className="relative z-10 mx-auto max-w-7xl">

    {/* Header */}
    <div
      className={`max-w-3xl ${
        isArabic
          ? "ml-auto mr-0 pt-4 text-right lg:pt-6"
          : "ml-0 mr-auto pt-4 text-left lg:pt-6"
      }`}
    >
      <h2 className="mt-0 text-4xl font-black leading-[1.15] tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl">
        {language === "en" ? (
          <>
            Projects built
            <br />
            <span className="text-[#2B347A]">to make an impact.</span>
          </>
        ) : (
          <>
            مشاريع نبنيها
            <br />
            <span className="text-[#2B347A]">لتصنع أثراً.</span>
          </>
        )}
      </h2>

      <p className="mt-6 max-w-2xl text-[17px] leading-8 text-zinc-800 sm:text-lg">
        {language === "en"
          ? "A selection of residential, commercial, and community projects delivered with a focus on quality, precision, and professional execution."
          : "مجموعة مختارة من مشاريعنا السكنية والتجارية والمجتمعية، نعمل على تنفيذها بجودة عالية ودقة واحترافية في جميع مراحل المشروع."}
      </p>
    </div>

    {/* Projects */}
    <div className="mt-10 grid gap-6 lg:grid-cols-12">

      {/* Project 01 */}
      <article className="group relative min-h-[520px] overflow-hidden rounded-2xl bg-zinc-900 lg:col-span-7">

        <Image
          src="/image/مشروع سما الفرسان.jpg"
          alt={
            language === "en"
              ? "Sama Al Fursan residential project in Riyadh"
              : "مشروع سما الفرسان السكني في الرياض"
          }
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(min-width: 1024px) 58vw, 100vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        <div className="absolute left-8 top-8">
          <span className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/70">
            {language === "en" ? "Residential" : "سكني"}
          </span>
        </div>

        <div
          className={`absolute bottom-0 left-0 right-0 p-8 lg:p-10 ${
            isArabic ? "text-right" : "text-left"
          }`}
        >
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-white/70">
            {language === "en" ? "Residential" : "سكني"}
          </div>

          <h3 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            {language === "en" ? "Sama Al Fursan" : "سما الفرسان"}
          </h3>

          <button
            type="button"
            onClick={() => setSelectedHomeProject("sama")}
            className="mt-7 inline-flex items-center gap-3 text-sm font-bold text-white transition hover:text-[#2B347A]"
          >
            {language === "en" ? "View Project" : "عرض المشروع"}

            <span
              className={`text-lg transition-transform duration-300 ${
                isArabic
                  ? "rotate-180 group-hover:-translate-x-1"
                  : "group-hover:translate-x-1"
              }`}
            >
              →
            </span>
          </button>
        </div>
      </article>

      {/* Project 02 */}
      <article className="group relative min-h-[520px] overflow-hidden rounded-2xl bg-zinc-800 lg:col-span-5">

        <Image
          src="/image/مشروع سكك تلاله.jpg"
          alt={
            language === "en"
              ? "Sekak Talalah residential project in Al Narjis, Riyadh"
              : "مشروع سكك تلاله السكني في حي النرجس بالرياض"
          }
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(min-width: 1024px) 42vw, 100vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        <div className="absolute left-8 top-8">
          <span className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/70">
            {language === "en" ? "Residential" : "سكني"}
          </span>
        </div>

        <div
          className={`absolute bottom-0 left-0 right-0 p-8 ${
            isArabic ? "text-right" : "text-left"
          }`}
        >
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-white/70">
            {language === "en" ? "Residential" : "سكني"}
          </div>

          <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
            {language === "en" ? "Sekak Talalah" : "سكك تلاله"}
          </h3>

          <button
            type="button"
            onClick={() => setSelectedHomeProject("sekak")}
            className="mt-7 inline-flex items-center gap-3 text-sm font-bold text-white transition hover:text-[#2B347A]"
          >
            {language === "en" ? "View Project" : "عرض المشروع"}

            <span
              className={`text-lg transition-transform duration-300 ${
                isArabic
                  ? "rotate-180 group-hover:-translate-x-1"
                  : "group-hover:translate-x-1"
              }`}
            >
              →
            </span>
          </button>
        </div>
      </article>

      {/* Project 03 */}
      <article className="group relative min-h-[420px] overflow-hidden rounded-2xl bg-zinc-100 lg:col-span-5">

        <Image
          src="/image/مسجد رواء.jpg"
          alt={
            language === "en"
              ? "Rawa Mosque project in Riyadh"
              : "مشروع مسجد رواء في الرياض"
          }
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(min-width: 1024px) 42vw, 100vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

        <div className="absolute left-8 top-8">
          <span className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/70">
            {language === "en" ? "Religious" : "ديني"}
          </span>
        </div>

        <div
          className={`absolute bottom-0 left-0 right-0 p-8 pb-10 ${
            isArabic ? "text-right" : "text-left"
          }`}
        >
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-white/70">
            {language === "en" ? "Religious" : "ديني"}
          </div>

          <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
            {language === "en" ? "Rawa Mosque" : "مسجد رواء"}
          </h3>

          <button
            type="button"
            onClick={() => setSelectedHomeProject("rawa")}
            className="mt-7 inline-flex items-center gap-3 text-sm font-bold text-white transition hover:text-[#2B347A]"
          >
            {language === "en" ? "View Project" : "عرض المشروع"}

            <span
              className={`text-lg transition-transform duration-300 ${
                isArabic
                  ? "rotate-180 group-hover:-translate-x-1"
                  : "group-hover:translate-x-1"
              }`}
            >
              →
            </span>
          </button>
        </div>
      </article>

      {/* CTA */}
      <div className="flex min-h-[380px] flex-col justify-between rounded-2xl bg-[#2B347A]/95 p-8 shadow-xl shadow-black/10 backdrop-blur-sm lg:col-span-7 lg:p-10">

        <div>
          <div className="text-xs font-black uppercase tracking-[0.3em] text-white/60">
            {language === "en"
              ? "Have a project in mind?"
              : "لديك مشروع في ذهنك؟"}
          </div>

          <h3 className="mt-6 max-w-xl text-4xl font-black leading-tight text-white sm:text-5xl">
            {language === "en"
              ? "Let's turn your vision into reality."
              : "لنحوّل رؤيتك إلى واقع."}
          </h3>
        </div>

        <a
          href="#contact"
          className="inline-flex w-fit items-center gap-3 rounded-full bg-zinc-950 px-7 py-4 text-sm font-bold text-white transition hover:bg-zinc-800"
        >
          {language === "en"
            ? "Start a Conversation"
            : "ابدأ محادثة معنا"}

          <span className="text-lg">→</span>
        </a>
      </div>
    </div>

    {/* Bottom link */}
    <div className="mt-7 flex justify-end">
      <a
        href="/projects"
        className="group inline-flex items-center gap-3 rounded-full border border-zinc-950/15 bg-white/70 px-6 py-3 text-sm font-bold text-zinc-950 backdrop-blur-sm transition hover:border-[#2B347A]/30 hover:bg-white"
      >
        {language === "en"
          ? "View all projects"
          : "عرض جميع المشاريع"}

        <span
          className={`transition-transform duration-300 ${
            isArabic
              ? "rotate-180 group-hover:-translate-x-2"
              : "group-hover:translate-x-2"
          }`}
        >
          →
        </span>
      </a>
    </div>
  </div>
</section>

{/* ================= HOME PROJECT MODAL ================= */}
{selectedHomeProject && (
  <div
    dir={isArabic ? "rtl" : "ltr"}
    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    onClick={() => setSelectedHomeProject(null)}
  >
    <div
      className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8 lg:p-10"
      onClick={(event) => event.stopPropagation()}
    >
      {/* Close */}
      <button
        type="button"
        onClick={() => setSelectedHomeProject(null)}
        aria-label={isArabic ? "إغلاق" : "Close"}
        className={`absolute top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-xl font-bold text-zinc-700 shadow-sm transition hover:border-[#2B347A] hover:bg-[#2B347A] hover:text-white ${
          isArabic ? "left-5" : "right-5"
        }`}
      >
        ×
      </button>

      {/* ================= SAMA AL FURSAN ================= */}
      {selectedHomeProject === "sama" && (
        <>
          {/* Modal Header */}
          <div className="border-b border-zinc-200 pb-6">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#2B347A]">
              {isArabic ? "تفاصيل المشروع" : "Project Details"}
            </p>

            <h2 className="mt-3 pe-12 text-3xl font-black text-zinc-950 sm:text-4xl">
              {isArabic ? "سما الفرسان" : "Sama Al Fursan"}
            </h2>

            <div className="mt-5 h-1 w-16 bg-[#2B347A]" />
          </div>

          {/* Description */}
          <p className="mx-auto mt-7 max-w-4xl text-base leading-8 text-zinc-600 sm:text-lg sm:leading-9">
            {isArabic
              ? "يعد مشروع ضاحية سما الفرسان أحد المشاريع السكنية الكبرى التي نفذتها سرايا العربية المتطورة في مدينة الرياض لصالح شركة التحالف العقارية، بقيمة إجمالية بلغت 220 مليون ريال سعودي. شمل المشروع تنفيذ 833 فيلا سكنية، وتم إنجازه بالكامل بنسبة 100% وفق أعلى المعايير الهندسية والتنفيذية."
              : "Sama Al Fursan District is one of the major residential projects delivered by SARAYA Advanced Arab Co in Riyadh for Al Tahaluf Real Estate Company, with a total project value of SAR 220 million. The project included the construction of 833 residential villas and was completed 100% in accordance with high engineering and execution standards."}
          </p>

          {/* Info Grid */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <InfoBox
              icon="location"
              label={isArabic ? "الموقع" : "Location"}
              value={isArabic ? "الرياض" : "Riyadh"}
            />

            <InfoBox
              icon="units"
              label={isArabic ? "عدد الوحدات" : "Units"}
              value="833"
            />

            <InfoBox
              icon="area"
              label={isArabic ? "المساحة" : "Area"}
              value="160,000 SM"
            />

            <InfoBox
              icon="owner"
              label={isArabic ? "اسم المالك" : "Owner"}
              value={
                isArabic
                  ? "شركة التحالف العقارية"
                  : "Al Tahaluf Real Estate Company"
              }
            />

            <InfoBox
              icon="role"
              label={isArabic ? "نطاق العمل" : "Scope of Work"}
              value={isArabic ? "مقاول" : "Contractor"}
            />

            <InfoBox
              icon="status"
              label={isArabic ? "نسبة الإنجاز" : "Completion"}
              value={isArabic ? "مكتمل" : "Completed"}
            />
          </div>
        </>
      )}

      {/* ================= SEKAK TALALAH ================= */}
      {selectedHomeProject === "sekak" && (
        <>
          {/* Modal Header */}
          <div className="border-b border-zinc-200 pb-6">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#2B347A]">
              {isArabic ? "تفاصيل المشروع" : "Project Details"}
            </p>

            <h2 className="mt-3 pe-12 text-3xl font-black text-zinc-950 sm:text-4xl">
              {isArabic ? "سكك تلاله" : "Sekak Talalah"}
            </h2>

            <div className="mt-5 h-1 w-16 bg-[#2B347A]" />
          </div>

          {/* Description */}
          <p className="mx-auto mt-7 max-w-4xl text-base leading-8 text-zinc-600 sm:text-lg sm:leading-9">
            {isArabic
              ? "مجمع سكني في حي النرجس شمال الرياض يضم 104 وحدات سكنية، ويعتمد في تنفيذه على تقنية قوالب الألمنيوم الحديثة لتحقيق سرعة ودقة التنفيذ مع الحفاظ على أعلى معايير المتانة."
              : "A residential compound in Al Narjis district, north Riyadh, comprising 104 residential units. The project utilizes modern aluminum formwork technology to achieve speed and precision in execution while maintaining high standards of durability."}
          </p>

          {/* Info Grid */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <InfoBox
              icon="location"
              label={isArabic ? "الموقع" : "Location"}
              value={isArabic ? "الرياض" : "Riyadh"}
            />

            <InfoBox
              icon="units"
              label={isArabic ? "عدد الوحدات" : "Units"}
              value="104"
            />

            <InfoBox
              icon="area"
              label={isArabic ? "المساحة" : "Area"}
              value="6,000 SM"
            />

            <InfoBox
              icon="owner"
              label={isArabic ? "اسم المالك" : "Owner"}
              value={
                isArabic
                  ? "شركة وثبه للاستثمار"
                  : "Wathbah Investment Company"
              }
            />

            <InfoBox
              icon="role"
              label={isArabic ? "نطاق العمل" : "Scope of Work"}
              value={isArabic ? "مقاول" : "Contractor"}
            />

            <InfoBox
              icon="status"
              label={isArabic ? "نسبة الإنجاز" : "Completion"}
              value={isArabic ? "تحت التنفيذ" : "Under Construction"}
            />
          </div>
         

        </>
      )}

      {/* ================= RAWA MOSQUE ================= */}
      {selectedHomeProject === "rawa" && (
        <>
          {/* Modal Header */}
          <div className="border-b border-zinc-200 pb-6">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#2B347A]">
              {isArabic ? "تفاصيل المشروع" : "Project Details"}
            </p>

            <h2 className="mt-3 pe-12 text-3xl font-black text-zinc-950 sm:text-4xl">
              {isArabic ? "مسجد رواء" : "Rawa Mosque"}
            </h2>

            <div className="mt-5 h-1 w-16 bg-[#2B347A]" />
          </div>

          {/* Description */}
          <p className="mx-auto mt-7 max-w-4xl text-base leading-8 text-zinc-600 sm:text-lg sm:leading-9">
            {isArabic
              ? "مشروع مسجد معاصر في مدينة الرياض يجسد روح العمارة الإسلامية برؤية حديثة، وصُمم لتوفير بيئة مريحة وملهمة للمصلين. يمتد المشروع على مساحة إجمالية تبلغ 2,865.47 م²، ونُفذ لصالح الشركة الوطنية للإسكان."
              : "A contemporary mosque project in Riyadh that reflects the spirit of Islamic architecture through a modern vision and was designed to provide a comfortable and inspiring environment for worshippers. The project spans a total area of 2,865.47 m² and was executed for the National Housing Company."}
          </p>

          {/* Info Grid */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <InfoBox
              icon="location"
              label={isArabic ? "الموقع" : "Location"}
              value={isArabic ? "الرياض" : "Riyadh"}
            />

            <InfoBox
              icon="units"
              label={isArabic ? "عدد الوحدات" : "Units"}
              value={isArabic ? "مبنى واحد" : "1 Building"}
            />

            <InfoBox
              icon="area"
              label={isArabic ? "المساحة" : "Area"}
              value="2,865.47 SM"
            />

            <InfoBox
              icon="owner"
              label={isArabic ? "اسم المالك" : "Owner"}
              value={
                isArabic
                  ? "الوطنية للإسكان"
                  : "National Housing Company"
              }
            />

            <InfoBox
              icon="role"
              label={isArabic ? "نطاق العمل" : "Scope of Work"}
              value={isArabic ? "مقاول" : "Contractor"}
            />

            <InfoBox
              icon="status"
              label={isArabic ? "نسبة الإنجاز" : "Completion"}
              value={isArabic ? "مكتمل" : "Completed"}
            />
          </div>
        </>
      )}
      {/* ================= HOME PROJECT GALLERY ================= */}
<div className="mt-12 border-t border-zinc-200 pt-8">
  <div className="mb-6">
    <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#2B347A]">
      {isArabic ? "صور المشروع" : "Project Images"}
    </p>

    <h3 className="mt-2 text-2xl font-black text-zinc-950">
      {isArabic ? "معرض المشروع" : "Project Gallery"}
    </h3>
  </div>

  {homeProjectImagesLoading ? (
    <p className="text-sm text-zinc-500">
      {isArabic ? "جاري تحميل الصور..." : "Loading images..."}
    </p>
  ) : homeProjectImages.length === 0 ? (
    <p className="text-sm text-zinc-500">
      {isArabic
        ? "لا توجد صور إضافية لهذا المشروع حالياً."
        : "No additional images available for this project."}
    </p>
  ) : (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {homeProjectImages.map((imageUrl, index) => (
        <div
          key={`${imageUrl}-${index}`}
          className="overflow-hidden rounded-2xl bg-zinc-100"
        >
          <img
            src={imageUrl}
            alt={`Project image ${index + 1}`}
            className="h-[300px] w-full object-cover"
          />
        </div>
      ))}
    </div>
  )}
</div>
    </div>
  </div>
)}
      {/* ================= WHY SARAYA Advanced Arab Co ================= */}
<section
  id="why-us"
  className="relative overflow-hidden bg-[#090B14] px-6 py-16 lg:px-8 lg:py-20"
>
  {/* Background */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-[#2B347A]/[0.04] blur-3xl" />

    <div className="absolute right-[-180px] top-[-100px] h-[550px] w-[550px] rounded-full border border-white/[0.04]" />

    <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:80px_80px]" />
  </div>

  <div className="relative mx-auto max-w-7xl">

    {/* ================= HEADER ================= */}
<div
  className={`grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 ${
    language === "ar" ? "text-right" : "text-left"
  }`}
>
  {/* Title */}
  <div>
    <div
      className={`flex items-center gap-4 text-sm font-medium text-[#2B347A] ${
        language === "ar" ? "justify-start" : "justify-start"
      }`}
    >
      <span className="h-px w-12 bg-[#2B347A]" />

      <span>
        {language === "en"
          ? "Why SARAYA Advanced Arab Co"
          : "لماذا سرايا العربية المتطورة"}
      </span>
    </div>

    <h2 className="mt-5 text-4xl font-black leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl">
      {language === "en" ? (
        <>
  Built with confidence.
  <br />
  <span className="text-zinc-500">Delivered with quality.</span>
</>
      ) : (
        <>
  نبني بثقة.
  <br />
  <span className="text-zinc-500">ونسلّم بجودة.</span>
</>
      )}
    </h2>
  </div>

  {/* Content */}
  <div className="max-w-2xl lg:pt-12">
    <p className="text-xl leading-9 text-zinc-200 sm:text-2xl">
      {language === "en"
        ? "Great projects are not only measured by what is built, but by how it is built."
        : "المشاريع الناجحة لا تقاس بما يتم بناؤه فقط، بل بالطريقة التي يتم بها البناء."}
    </p>

    <p className="mt-5 max-w-xl text-base leading-8 text-zinc-400 sm:text-lg">
      {language === "en"
        ? "SARAYA Advanced Arab Co combines professional planning, skilled execution, attention to detail, and reliable communication to deliver projects with confidence from start to final handover."
        : "تجمع سرايا العربية المتطورة بين التخطيط الاحترافي، والخبرة في التنفيذ، والاهتمام بالتفاصيل، والتواصل الموثوق لتنفيذ المشاريع بثقة من البداية وحتى التسليم النهائي."}
    </p>
  </div>
</div>

    {/* ================= VALUES ================= */}
    <div className="mt-16 grid overflow-hidden border border-white/10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">

  {/* 01 */}
  <article className="group border-b border-white/10 px-6 py-9 transition-colors duration-300 hover:bg-white/[0.02] sm:border-r lg:border-b-0 lg:px-8">
    <div className="flex items-start justify-between">
      <span className="text-sm font-bold tracking-wider text-[#2B347A]">
        01
      </span>

      <span className="text-xl font-light text-zinc-700 transition-colors duration-300 group-hover:text-[#2B347A]">
        +
      </span>
    </div>

    <h3 className="mt-10 text-2xl font-bold text-white">
      {language === "en" ? "Quality" : "الجودة"}
    </h3>

    <p className="mt-4 max-w-xs text-sm leading-7 text-zinc-400">
      {language === "en"
        ? "High standards at every stage, from planning and material selection to execution and final delivery."
        : "معايير عالية في جميع المراحل، من التخطيط واختيار المواد إلى التنفيذ والتسليم النهائي."}
    </p>
  </article>

  {/* 02 */}
  <article className="group border-b border-white/10 px-6 py-9 transition-colors duration-300 hover:bg-white/[0.02] lg:border-b-0 lg:border-r lg:px-8">
    <div className="flex items-start justify-between">
      <span className="text-sm font-bold tracking-wider text-[#2B347A]">
        02
      </span>

      <span className="text-xl font-light text-zinc-700 transition-colors duration-300 group-hover:text-[#2B347A]">
        +
      </span>
    </div>

    <h3 className="mt-10 text-2xl font-bold text-white">
      {language === "en" ? "Precision" : "الدقة"}
    </h3>

    <p className="mt-4 max-w-xs text-sm leading-7 text-zinc-400">
      {language === "en"
        ? "Careful planning and professional execution focused on accuracy, efficiency, and lasting results."
        : "تخطيط دقيق وتنفيذ احترافي يركز على الدقة والكفاءة وتحقيق نتائج مستدامة."}
    </p>
  </article>

  {/* 03 */}
  <article className="group border-b border-white/10 px-6 py-9 transition-colors duration-300 hover:bg-white/[0.02] sm:border-r lg:border-b-0 lg:px-8">
    <div className="flex items-start justify-between">
      <span className="text-sm font-bold tracking-wider text-[#2B347A]">
        03
      </span>

      <span className="text-xl font-light text-zinc-700 transition-colors duration-300 group-hover:text-[#2B347A]">
        +
      </span>
    </div>

    <h3 className="mt-10 text-2xl font-bold text-white">
      {language === "en" ? "Reliability" : "الموثوقية"}
    </h3>

    <p className="mt-4 max-w-xs text-sm leading-7 text-zinc-400">
      {language === "en"
        ? "Clear communication, dependable execution, and a commitment to delivering what we promise."
        : "تواصل واضح، وتنفيذ موثوق، والتزام بتقديم ما نعد به."}
    </p>
  </article>

  {/* 04 */}
  <article className="group px-6 py-9 transition-colors duration-300 hover:bg-white/[0.02] lg:border-r lg:border-white/10 lg:px-8">
    <div className="flex items-start justify-between">
      <span className="text-sm font-bold tracking-wider text-[#2B347A]">
        04
      </span>

      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-sm text-zinc-600 transition-all duration-300 group-hover:border-[#2B347A]/50 group-hover:text-[#2B347A]">
  +
</span>
    </div>

    <h3 className="mt-10 text-2xl font-bold text-white">
      {language === "en" ? "Commitment" : "الالتزام"}
    </h3>

    <p className="mt-4 max-w-xs text-sm leading-7 text-zinc-400">
      {language === "en"
        ? "We stay involved throughout the project to ensure every detail meets the required standard."
        : "نبقى على تواصل ومتابعة مستمرة طوال المشروع لضمان تحقيق كل التفاصيل للمعايير المطلوبة."}
    </p>
  </article>

</div>

    {/* ================= APPROACH ================= */}
    <div className="mt-20 grid gap-8 lg:grid-cols-[1fr_1.4fr]">

      {/* Left */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
        <div className="text-xs font-bold uppercase tracking-[0.3em] text-[#2B347A]">
          {language === "en" ? "Our Commitment" : "التزامنا"}
        </div>

        <h3 className="mt-6 text-3xl font-bold leading-tight text-white">
         {language === "en" ? (
  <>
    From first conversation
    <br />
    to final handover.
  </>
) : (
  <>
    من أول تواصل
    <br />
    حتى التسليم النهائي.
  </>
)}
        </h3>

        <p className="mt-6 text-sm leading-7 text-zinc-500">
          {language === "en"
  ? "Every stage is managed with the same focus: delivering professional results while keeping communication clear and expectations aligned."
  : "ندير كل مرحلة بالتركيز نفسه، ونحرص على تقديم نتائج احترافية مع الحفاظ على وضوح التواصل وتوافق التوقعات."}
        </p>
      </div>

     {/* Right */}
<div className="rounded-2xl border border-white/10 bg-[#2B347A] p-8 sm:p-10">

  <div className="flex h-full flex-col justify-between">

    <div>
      <div className="text-xs font-black uppercase tracking-[0.3em] text-white/70">
        {language === "en" ? "Our Philosophy" : "فلسفتنا"}
      </div>

      <blockquote className="mt-6 max-w-2xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
        {language === "en"
          ? "We don't just build structures. We build trust, value, and long-term relationships."
          : "نحن لا نبني المنشآت فقط، بل نبني الثقة والقيمة والعلاقات طويلة الأمد."}
      </blockquote>
    </div>

    <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">

      <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
        SARAYA Advanced Arab Co
      </span>

      <span className="text-sm font-bold text-white">
        {language === "en"
          ? "Contracting & Construction"
          : "المقاولات والإنشاءات"}
      </span>

    </div>

  </div>
</div>

    </div>

  </div>
</section>

{/* ================= STATS ================= */}
<section
  id="stats"
  className="relative overflow-hidden bg-white px-6 py-16 lg:px-8 lg:py-20"
>
  <div className="mx-auto max-w-7xl">

    {/* Intro */}
    <div
      className={`grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20 ${
        language === "ar" ? "text-right" : "text-left"
      }`}
    >
      <div>
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-[#2B347A]" />

          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#2B347A]">
            {language === "ar" ? "لمحة عن الشركة" : "At a Glance"}
          </span>
        </div>

        <h2 className="mt-5 text-4xl font-black leading-[1.15] tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl">
          {language === "ar" ? (
            <>
              نبني وفقاً
              <br />
              <span className="text-zinc-400">لأهدافك.</span>
            </>
          ) : (
            <>
              Built around
              <br />
              <span className="text-zinc-400">your goals.</span>
            </>
          )}
        </h2>
      </div>

      <p className="max-w-2xl text-lg leading-9 text-zinc-500 sm:text-xl">
        {language === "ar"
          ? "يجمع نهجنا بين الإدارة الاحترافية والتنفيذ المتقن والتنسيق الموثوق، لتقديم مشاريع إنشائية بكفاءة وجودة وثقة."
          : "Our approach brings together professional management, skilled execution, and dependable coordination to deliver construction projects with confidence."}
      </p>
    </div>

    {/* Stats Grid */}
    <div className="mt-10 grid overflow-hidden border border-zinc-200 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">

      {/* Stat 01 */}
      <div className="group border-b border-zinc-200 p-7 transition-colors duration-300 hover:bg-zinc-50 sm:border-r lg:border-b-0 lg:p-8">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
            01
          </span>

          <span className="h-2.5 w-2.5 rounded-full bg-[#2B347A] transition-transform duration-300 group-hover:scale-150" />
        </div>

        <h3 className="mt-10 text-2xl font-bold text-zinc-950">
          {language === "ar" ? "المشاريع السكنية" : "Residential"}
        </h3>

        <p className="mt-3 text-sm leading-7 text-zinc-500">
          {language === "ar"
            ? "حلول إنشائية مصممة وفق أعلى معايير الجودة والوظيفية والقيمة طويلة الأمد."
            : "Construction solutions designed around quality, functionality, and long-term value."}
        </p>
      </div>

      {/* Stat 02 */}
      <div className="group border-b border-zinc-200 p-7 transition-colors duration-300 hover:bg-zinc-50 lg:border-b-0 lg:border-r lg:p-8">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
            02
          </span>

          <span className="h-2.5 w-2.5 rounded-full bg-[#2B347A] transition-transform duration-300 group-hover:scale-150" />
        </div>

        <h3 className="mt-10 text-2xl font-bold text-zinc-950">
          {language === "ar" ? "المشاريع التجارية" : "Commercial"}
        </h3>

        <p className="mt-3 text-sm leading-7 text-zinc-500">
          {language === "ar"
            ? "تنفيذ احترافي للمشاريع يركز على الكفاءة والجودة ومتطلبات الأعمال."
            : "Professional project delivery focused on efficiency, quality, and business requirements."}
        </p>
      </div>

      {/* Stat 03 */}
      <div className="group border-b border-zinc-200 p-7 transition-colors duration-300 hover:bg-zinc-50 sm:border-r lg:border-b-0 lg:p-8">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
            03
          </span>

          <span className="h-2.5 w-2.5 rounded-full bg-[#2B347A] transition-transform duration-300 group-hover:scale-150" />
        </div>

        <h3 className="mt-10 text-2xl font-bold text-zinc-950">
          {language === "ar" ? "المشاريع الصناعية" : "Industrial"}
        </h3>

        <p className="mt-3 text-sm leading-7 text-zinc-500">
          {language === "ar"
            ? "حلول موثوقة في الإنشاء والبنية التحتية للمشاريع التي تتطلب أعلى مستويات الكفاءة."
            : "Reliable construction and infrastructure solutions for demanding project environments."}
        </p>
      </div>

      {/* Stat 04 */}
      <div className="group p-7 transition-colors duration-300 hover:bg-zinc-50 lg:border-r lg:border-zinc-200 lg:p-8">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
            04
          </span>

          <span className="h-2.5 w-2.5 rounded-full bg-[#2B347A] transition-transform duration-300 group-hover:scale-150" />
        </div>

        <h3 className="mt-10 text-2xl font-bold text-zinc-950">
          {language === "ar" ? "البنية التحتية" : "Infrastructure"}
        </h3>

        <p className="mt-3 text-sm leading-7 text-zinc-500">
          {language === "ar"
            ? "تنفيذ متكامل لأعمال البنية التحتية وتطوير المواقع بدقة وتنسيق احترافي."
            : "Integrated infrastructure and site development delivered with precision and professional coordination."}
        </p>
      </div>

    </div>

    {/* Bottom statement */}
    <div
  className={`mt-10 flex flex-col gap-8 pb-4 lg:mt-12 lg:flex-row lg:items-center lg:justify-between ${
        language === "ar" ? "text-right" : "text-left"
      }`}
    >
      <p className="max-w-3xl text-2xl font-medium leading-relaxed tracking-tight text-zinc-950 sm:text-3xl">
        {language === "ar" ? (
          <>
            كل مشروع له خصوصيته.
            <span className="text-zinc-400">
              {" "}لكن التزامنا بالجودة يبقى ثابتاً.
            </span>
          </>
        ) : (
          <>
            Every project is different.
            <span className="text-zinc-400">
              {" "}Our commitment to quality remains the same.
            </span>
          </>
        )}
      </p>

      <a
  href="https://wa.me/966566417000?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D9%85%D9%86%D8%A7%D9%82%D8%B4%D8%A9%20%D9%85%D8%B4%D8%B1%D9%88%D8%B9%20%D9%85%D8%B9%20%D8%A7%D9%84%D8%B3%D8%B1%D8%A7%D9%8A%D8%A7%20%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A%D8%A9%20%D8%A7%D9%84%D9%85%D8%AA%D8%B7%D9%88%D8%B1%D8%A9"
  target="_blank"
  rel="noopener noreferrer"
  className="group inline-flex shrink-0 items-center gap-4 text-sm font-bold text-zinc-950"
>
        {language === "ar" ? "ناقش مشروعك معنا" : "Discuss your project"}

        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 transition duration-300 group-hover:border-[#2B347A] group-hover:bg-[#2B347A] group-hover:text-white">
          {language === "ar" ? "←" : "→"}
        </span>
      </a>
    </div>

  </div>
</section>
      {/* ================= CTA ================= */}
<section
  id="contact"
  className="relative overflow-hidden px-6 py-24 lg:px-8 lg:py-28"
>
  {/* Background Image */}
  <div className="absolute inset-0">
    <img
      src="/image/contact-bg.jpg"
      alt=""
      className="h-full w-full scale-105 object-cover object-[center_45%]"
    />

    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-zinc-950/35" />

    {/* SARAYA Brand Overlay */}
    <div className="absolute inset-0 bg-[#2B347A]/10" />

    {/* Soft Gradient */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/5 to-black/25" />
  </div>

  {/* Content */}
  <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-10 lg:flex-row lg:items-center">

    <div>
      <p className="text-xs font-black uppercase tracking-[0.3em] text-white/70">
        {language === "en"
          ? "Start Your Project"
          : "ابدأ مشروعك معنا"}
      </p>

      <h2 className="mt-2 max-w-3xl text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl">
        {language === "en"
          ? "Let's build something great together."
          : "لنبنِ شيئاً عظيماً معاً."}
      </h2>
    </div>

    <a
      href="https://wa.me/966566417000?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D9%85%D9%86%D8%A7%D9%82%D8%B4%D8%A9%20%D9%85%D8%B4%D8%B1%D9%88%D8%B9%20%D9%85%D8%B9%20%D8%A7%D9%84%D8%B3%D8%B1%D8%A7%D9%8A%D8%A7%20%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A%D8%A9%20%D8%A7%D9%84%D9%85%D8%AA%D8%B7%D9%88%D8%B1%D8%A9"
target="_blank"
rel="noopener noreferrer"
      className="shrink-0 rounded-full border border-white/20 bg-white px-8 py-4 text-center text-sm font-bold text-zinc-950 transition duration-300 hover:bg-[#2B347A] hover:text-white"
    >
      {language === "en" ? "Contact Us →" : "تواصل معنا ←"}
    </a>

  </div>
</section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-zinc-950 px-6 py-6 text-zinc-400 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="text-xl font-black text-white">
  {language === "en"
    ? "SARAYA Advanced Arab Co"
    : "سرايا العربية المتطورة"}
</div>
<a
  href="mailto:ceo@saaco-sa.com"
  className="transition hover:text-white"
>
  ceo@saaco-sa.com
</a>
            <p className="mt-2 text-xs text-zinc-600">
              {language === "en"
  ? "Contracting & Construction"
  : "المقاولات والإنشاءات"}
            </p>
          </div>

          <p className="text-xs">
           {language === "en"
  ? "© 2026 SARAYA Advanced Arab Co. All rights reserved."
  : "© 2026 سرايا العربية المتطورة. جميع الحقوق محفوظة."}
          </p>
        </div>
      </footer>
    </main>
  );
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
}
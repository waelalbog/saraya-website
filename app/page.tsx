"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const [languageReady, setLanguageReady] = useState(false);
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
              className="text-base font-medium text-white/70 transition hover:text-white"
            >
              {language === "en" ? "About" : "من نحن"}
            </a>

            <a
              href="#services"
              className="text-base font-medium text-white/70 transition hover:text-white"
            >
              {language === "en" ? "Services" : "خدماتنا"}
            </a>

            <a
              href="#projects"
              className="text-base font-medium text-white/70 transition hover:text-white"
            >
              {language === "en" ? "Projects" : "مشاريعنا"}
            </a>

            <a
              href="#contact"
              className="text-base font-medium text-white/70 transition hover:text-white"
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
    href="#contact"
    className="hidden rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#2B347A] hover:bg-[#2B347A] hover:text-white sm:block"
  >
    {language === "en" ? "Get In Touch" : "تواصل معنا"}
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
  className="relative overflow-hidden bg-white px-6 py-24 lg:px-8 lg:py-32"
>
  <div className="mx-auto max-w-7xl">
    <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
      
      {/* Left */}
      <div>
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-[#2B347A]" />

          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#2B347A]">
            {language === "en" ? "About SARAYA Advanced Arab Co" : "عن سرايا العربية المتطورة"}
          </span>
        </div>

        <h2 className="mt-7 text-4xl font-black leading-tight tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl">
          {language === "en" ? (
  <>
    Building with
    <br />
    <span className="text-zinc-400">purpose.</span>
  </>
) : (
  <>
    نبني
    <br />
    <span className="text-zinc-400">برؤية وهدف.</span>
  </>
)}
        </h2>

        <div className="mt-10 h-1 w-20 bg-[#2B347A]" />
      </div>

      {/* Right */}
      <div>
        <p className="text-2xl font-medium leading-10 text-zinc-800 sm:text-3xl">
         {language === "en" ? (
  <>
    We believe great projects are built on more than concrete and steel.
    They are built on{" "}
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

        {/* Values */}
        <div className="mt-12 grid gap-8 border-t border-zinc-200 pt-10 sm:grid-cols-3">
          <div>
            <div className="text-3xl font-black text-zinc-950">01</div>

            <h3 className="mt-4 font-bold text-zinc-950">
              {language === "en" ? "Quality" : "الجودة"}
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              {language === "en"
  ? "High standards at every stage of execution."
  : "نلتزم بأعلى معايير الجودة في جميع مراحل التنفيذ."}
            </p>
          </div>

          <div>
            <div className="text-3xl font-black text-zinc-950">02</div>

            <h3 className="mt-4 font-bold text-zinc-950">
              {language === "en" ? "Precision" : "الدقة"}
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              {language === "en"
  ? "Careful planning and professional execution."
  : "تخطيط دقيق وتنفيذ احترافي يضمن أفضل النتائج."}
            </p>
          </div>

          <div>
            <div className="text-3xl font-black text-zinc-950">03</div>

            <h3 className="mt-4 font-bold text-zinc-950">
              {language === "en" ? "Trust" : "الثقة"}
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              {language === "en"
  ? "Partnerships built on reliability and transparency."
  : "نبني شراكاتنا على الموثوقية والشفافية."}
            </p>
          </div>
        </div>

        {/* Link */}
        <a
          href="#services"
          className="mt-10 inline-flex items-center gap-3 text-sm font-bold text-zinc-950 transition hover:text-[#2B347A]"
        >
          {language === "en"
  ? "Discover Our Capabilities"
  : "اكتشف قدراتنا"}
          <span className="text-lg transition-transform group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </div>
  </div>

  {/* Decorative number */}
  <div className="pointer-events-none absolute -bottom-20 -right-10 select-none text-[240px] font-black leading-none text-zinc-100">
    01
  </div>
</section>

      {/* ================= SERVICES ================= */}
<section
  id="services"
  className="relative overflow-hidden bg-zinc-950 px-6 py-24 lg:px-8 lg:py-32"
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
    Integrated solutions.
    <br />
    <span className="text-zinc-600">Built to perform.</span>
  </>
) : (
  <>
    حلول متكاملة.
    <br />
    <span className="text-zinc-600">نُنفذها باحتراف.</span>
  </>
)}
        </h2>
      </div>

      <div>
        <p className="leading-8 text-zinc-400">
          {language === "en"
  ? "From construction and infrastructure to specialized building services, SARAYA Advanced Arab Co provides integrated solutions designed around quality, efficiency, and reliable project delivery."
  : "من أعمال الإنشاءات والبنية التحتية إلى خدمات البناء المتخصصة، تقدم سرايا العربية المتطورة حلولاً متكاملة ترتكز على الجودة والكفاءة والتنفيذ الموثوق للمشاريع."}
        </p>
      </div>
    </div>

    {/* ================= SERVICES LIST ================= */}
    <div className="mt-20 border-t border-white/10">

      {/* Service 01 */}
      <article className="group border-b border-white/10">
        <div className="grid gap-6 py-10 lg:grid-cols-[100px_1fr_1.1fr_60px] lg:items-center">

          <div className="text-sm font-bold text-[#2B347A]">
            01
          </div>

          <h3 className="text-2xl font-bold text-white transition duration-300 group-hover:translate-x-2 sm:text-3xl">
            {language === "en" ? "General Contracting" : "المقاولات العامة"}
          </h3>

          <p className="max-w-xl text-sm leading-7 text-zinc-500">
            {language === "en"
  ? "Comprehensive contracting services covering project planning, coordination, execution, and professional project management."
  : "خدمات متكاملة تشمل تخطيط المشاريع، والتنسيق، والتنفيذ، والإدارة الاحترافية للمشاريع."}
          </p>

          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-lg text-zinc-500 transition duration-300 group-hover:border-[#2B347A] group-hover:bg-[#2B347A] group-hover:text-zinc-950">
            ↗
          </div>
        </div>
      </article>

      {/* Service 02 */}
      <article className="group border-b border-white/10">
        <div className="grid gap-6 py-10 lg:grid-cols-[100px_1fr_1.1fr_60px] lg:items-center">

          <div className="text-sm font-bold text-[#2B347A]">
            02
          </div>

          <h3 className="text-2xl font-bold text-white transition duration-300 group-hover:translate-x-2 sm:text-3xl">
            {language === "en" ? "Building Construction" : "تشييد المباني"}
          </h3>

          <p className="max-w-xl text-sm leading-7 text-zinc-500">
            {language === "en"
  ? "Construction solutions for residential, commercial, and industrial buildings with a focus on quality and precision."
  : "حلول متكاملة لتشييد المباني السكنية والتجارية والصناعية مع التركيز على الجودة والدقة."}
          </p>

          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-lg text-zinc-500 transition duration-300 group-hover:border-[#2B347A] group-hover:bg-[#2B347A] group-hover:text-zinc-950">
            ↗
          </div>
        </div>
      </article>

      {/* Service 03 */}
      <article className="group border-b border-white/10">
        <div className="grid gap-6 py-10 lg:grid-cols-[100px_1fr_1.1fr_60px] lg:items-center">

          <div className="text-sm font-bold text-[#2B347A]">
            03
          </div>

          <h3 className="text-2xl font-bold text-white transition duration-300 group-hover:translate-x-2 sm:text-3xl">
            {language === "en" ? "Infrastructure" : "البنية التحتية"}
          </h3>

          <p className="max-w-xl text-sm leading-7 text-zinc-500">
            {language === "en"
  ? "Infrastructure and site development services delivered with careful planning, coordination, and professional execution."
  : "خدمات البنية التحتية وتطوير المواقع من خلال التخطيط الدقيق والتنسيق والتنفيذ الاحترافي."}
          </p>

          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-lg text-zinc-500 transition duration-300 group-hover:border-[#2B347A] group-hover:bg-[#2B347A] group-hover:text-zinc-950">
            ↗
          </div>
        </div>
      </article>

      {/* Service 04 */}
      <article className="group border-b border-white/10">
        <div className="grid gap-6 py-10 lg:grid-cols-[100px_1fr_1.1fr_60px] lg:items-center">

          <div className="text-sm font-bold text-[#2B347A]">
            04
          </div>

          <h3 className="text-2xl font-bold text-white transition duration-300 group-hover:translate-x-2 sm:text-3xl">
            {language === "en" ? "MEP Services" : "خدمات الأعمال الكهروميكانيكية"}
          </h3>

          <p className="max-w-xl text-sm leading-7 text-zinc-500">
            {language === "en"
  ? "Integrated mechanical, electrical, and plumbing solutions for modern residential, commercial, and industrial projects."
  : "حلول متكاملة للأعمال الميكانيكية والكهربائية والسباكة للمشاريع السكنية والتجارية والصناعية الحديثة."}
          </p>

          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-lg text-zinc-500 transition duration-300 group-hover:border-[#2B347A] group-hover:bg-[#2B347A] group-hover:text-zinc-950">
            ↗
          </div>
        </div>
      </article>

      {/* Service 05 */}
      <article className="group border-b border-white/10">
        <div className="grid gap-6 py-10 lg:grid-cols-[100px_1fr_1.1fr_60px] lg:items-center">

          <div className="text-sm font-bold text-[#2B347A]">
            05
          </div>

          <h3 className="text-2xl font-bold text-white transition duration-300 group-hover:translate-x-2 sm:text-3xl">
            {language === "en"
  ? "Maintenance & Renovation"
  : "الصيانة والتجديد"}
          </h3>

          <p className="max-w-xl text-sm leading-7 text-zinc-500">
            {language === "en"
  ? "Professional maintenance, renovation, refurbishment, and improvement solutions that extend the life of existing assets."
  : "حلول احترافية للصيانة والتجديد وإعادة التأهيل والتطوير بما يساهم في إطالة عمر الأصول والمرافق."}
          </p>

          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-lg text-zinc-500 transition duration-300 group-hover:border-[#2B347A] group-hover:bg-[#2B347A] group-hover:text-zinc-950">
            ↗
          </div>
        </div>
      </article>

      {/* Service 06 */}
      <article className="group border-b border-white/10">
        <div className="grid gap-6 py-10 lg:grid-cols-[100px_1fr_1.1fr_60px] lg:items-center">

          <div className="text-sm font-bold text-[#2B347A]">
            06
          </div>

          <h3 className="text-2xl font-bold text-white transition duration-300 group-hover:translate-x-2 sm:text-3xl">
           {language === "en"
  ? "Turnkey Projects"
  : "المشاريع المتكاملة"}
          </h3>

          <p className="max-w-xl text-sm leading-7 text-zinc-500">
           {language === "en"
  ? "Complete project delivery from planning and procurement through execution, coordination, and final handover."
  : "تسليم متكامل للمشاريع بدءاً من التخطيط والتوريد وصولاً إلى التنفيذ والتنسيق والتسليم النهائي."}
          </p>

          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-lg text-zinc-500 transition duration-300 group-hover:border-[#2B347A] group-hover:bg-[#2B347A] group-hover:text-zinc-950">
            ↗
          </div>
        </div>
      </article>

    </div>

    {/* ================= BOTTOM CTA ================= */}
    <div className="mt-16 flex flex-col justify-between gap-8 rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:p-10 lg:flex-row lg:items-center">

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

        <span className="text-lg">→</span>
      </a>

    </div>

  </div>
</section>
      {/* ================= PROJECTS ================= */}
<section
  id="projects"
  className="relative overflow-hidden bg-white px-6 py-24 lg:px-8 lg:py-32"
>
  <div className="mx-auto max-w-7xl">

    {/* Header */}
    <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
      <div>
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-[#2B347A]" />

          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#2B347A]">
            {language === "en" ? "Selected Work" : "أعمالنا "}
          </span>
        </div>

        <h2 className="mt-7 text-4xl font-black leading-tight tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl">
          {language === "en" ? (
  <>
    Projects that
    <br />
    <span className="text-zinc-400">make an impact.</span>
  </>
) : (
  <>
    مشاريع
    <br />
    <span className="text-zinc-400">تصنع الفرق.</span>
  </>
)}
        </h2>
      </div>

      <div className="max-w-md">
        <p className="leading-8 text-zinc-500">
          {language === "en"
  ? "From construction and infrastructure to integrated building solutions, every project reflects our commitment to quality and professional delivery."
  : "من مشاريع الإنشاءات والبنية التحتية إلى حلول البناء المتكاملة، يعكس كل مشروع التزامنا بالجودة والتنفيذ الاحترافي."}
        </p>
      </div>
    </div>

    {/* Projects */}
    <div className="mt-16 grid gap-6 lg:grid-cols-12">

      {/* Project 01 */}
      <article className="group relative min-h-[520px] overflow-hidden rounded-2xl bg-zinc-900 lg:col-span-7">

        {/* Placeholder visual */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(43,52,122,0.35),transparent_28%),linear-gradient(135deg,#27272a,#09090b)] transition duration-700 group-hover:scale-105" />

        {/* Architectural lines */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-[15%] top-0 h-full w-px bg-white" />
          <div className="absolute left-[45%] top-0 h-full w-px bg-white" />
          <div className="absolute right-[20%] top-0 h-full w-px bg-white" />
          <div className="absolute bottom-[30%] left-0 h-px w-full bg-white" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        <div className="absolute left-8 top-8">
          <span className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/70">
            {language === "en" ? "Construction" : "إنشاءات"}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">

          <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#2B347A]">
            {language === "en" ? "Project 01" : "المشروع 01"}
          </div>

          <h3 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            {language === "en"
  ? "Commercial Development"
  : "تطوير مشروع تجاري"}
          </h3>

          <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-400">
            {language === "en"
  ? "A complete construction project delivered through coordinated planning, execution, and professional project management."
  : "مشروع إنشائي متكامل تم تنفيذه من خلال التخطيط المنسق والتنفيذ والإدارة الاحترافية للمشروع."}
          </p>

          <button
            type="button"
            className="mt-7 inline-flex items-center gap-3 text-sm font-bold text-white transition hover:text-[#2B347A]"
          >
            {language === "en" ? "View Project" : "عرض المشروع"}
            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>

        </div>
      </article>

      {/* Project 02 */}
      <article className="group relative min-h-[520px] overflow-hidden rounded-2xl bg-zinc-800 lg:col-span-5">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.28),transparent_30%),linear-gradient(135deg,#3f3f46,#18181b)] transition duration-700 group-hover:scale-105" />

        {/* Building blocks */}
        <div className="absolute bottom-0 left-[12%] h-[55%] w-[25%] bg-white/[0.04] shadow-2xl" />
        <div className="absolute bottom-0 left-[42%] h-[75%] w-[20%] bg-white/[0.06]" />
        <div className="absolute bottom-0 right-[12%] h-[45%] w-[20%] bg-white/[0.04]" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        <div className="absolute left-8 top-8">
          <span className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/70">
            {language === "en" ? "Infrastructure" : "البنية التحتية"}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8">

          <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#2B347A]">
            {language === "en" ? "Project 02" : "المشروع 02"}
          </div>

          <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
            {language === "en"
  ? "Infrastructure Works"
  : "أعمال البنية التحتية"}
          </h3>

          <p className="mt-4 text-sm leading-7 text-zinc-400">
            {language === "en"
  ? "Infrastructure and site development delivered with precision and attention to project requirements."
  : "أعمال البنية التحتية وتطوير المواقع بتنفيذ دقيق ووفقاً لمتطلبات المشروع."}
          </p>

          <button
            type="button"
            className="mt-7 inline-flex items-center gap-3 text-sm font-bold text-white transition hover:text-[#2B347A]"
          >
            {language === "en" ? "View Project" : "عرض المشروع"}
            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>

        </div>
      </article>

      {/* Project 03 */}
      <article className="group relative min-h-[380px] overflow-hidden rounded-2xl bg-zinc-100 lg:col-span-5">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(43,52,122,0.20),transparent_30%),linear-gradient(135deg,#f4f4f5,#d4d4d8)] transition duration-700 group-hover:scale-105" />

        <div className="absolute right-10 top-10 h-40 w-40 rounded-full border border-zinc-400/30" />
        <div className="absolute right-20 top-20 h-20 w-20 rounded-full border border-[#2B347A]/30" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="absolute left-8 top-8">
          <span className="rounded-full border border-zinc-950/20 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-zinc-800">
            {language === "en" ? "MEP" : "أعمال كهروميكانيكية"}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8">

          <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#2B347A]">
            {language === "en" ? "Project 03" : "المشروع 03"}
          </div>

          <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
            {language === "en"
  ? "Integrated Building Systems"
  : "أنظمة المباني المتكاملة"}
          </h3>

          <p className="mt-4 text-sm leading-7 text-zinc-300">
            {language === "en"
  ? "Integrated mechanical, electrical, and plumbing solutions for modern buildings."
  : "حلول متكاملة للأعمال الميكانيكية والكهربائية والسباكة للمباني الحديثة."}
          </p>

        </div>
      </article>

      {/* CTA */}
      <div className="flex min-h-[380px] flex-col justify-between rounded-2xl bg-[#2B347A] p-8 lg:col-span-7 lg:p-10">

        <div>
          <div className="text-xs font-black uppercase tracking-[0.3em] text-zinc-700">
            {language === "en"
  ? "Have a project in mind?"
  : "لديك مشروع في ذهنك؟"}
          </div>

          <h3 className="mt-6 max-w-xl text-4xl font-black leading-tight text-zinc-950 sm:text-5xl">
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
    <div className="mt-12 flex justify-end">
      <a
        href="#contact"
        className="group inline-flex items-center gap-3 text-sm font-bold text-zinc-950"
      >
        {language === "en"
  ? "View all projects"
  : "عرض جميع المشاريع"}
        <span className="transition-transform duration-300 group-hover:translate-x-2">
          →
        </span>
      </a>
    </div>

  </div>
</section>

      {/* ================= WHY SARAYA Advanced Arab Co ================= */}
<section
  id="why-us"
  className="relative overflow-hidden bg-zinc-950 px-6 py-24 lg:px-8 lg:py-32"
>
  {/* Background */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-[#2B347A]/[0.04] blur-3xl" />

    <div className="absolute right-[-180px] top-[-100px] h-[550px] w-[550px] rounded-full border border-white/[0.04]" />

    <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:80px_80px]" />
  </div>

  <div className="relative mx-auto max-w-7xl">

    {/* ================= HEADER ================= */}
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">

      <div>
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-[#2B347A]" />

          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#2B347A]">
            {language === "en" ? "Why SARAYA Advanced Arab Co" : "لماذا سرايا العربية المتطورة"}
          </span>
        </div>

        <h2 className="mt-7 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          {language === "en" ? (
  <>
    Built on
    <br />
    <span className="text-zinc-600">what matters.</span>
  </>
) : (
  <>
    نبني على
    <br />
    <span className="text-zinc-600">ما يهمك.</span>
  </>
)}
        </h2>
      </div>

      <div className="max-w-2xl">
        <p className="text-xl leading-9 text-zinc-300 sm:text-2xl">
          {language === "en"
  ? "Great projects are not only measured by what is built, but by how it is built."
  : "المشاريع الناجحة لا تُقاس بما يتم بناؤه فقط، بل بالطريقة التي يتم بها البناء."}
        </p>

        <p className="mt-5 max-w-xl leading-8 text-zinc-500">
          {language === "en"
  ? "SARAYA Advanced Arab Co combines professional planning, skilled execution, attention to detail, and reliable communication to deliver projects with confidence from start to finish."
  : "تجمع سرايا العربية المتطورة بين التخطيط الاحترافي، والخبرة في التنفيذ، والاهتمام بالتفاصيل، والتواصل الموثوق لتنفيذ المشاريع بثقة من البداية وحتى التسليم النهائي."}
        </p>
      </div>

    </div>

    {/* ================= VALUES ================= */}
    <div className="mt-20 grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">

      {/* 01 */}
      <article className="group border-b border-white/10 py-10 sm:border-r lg:border-b-0">
        <div className="flex items-start justify-between pr-8">
          <span className="text-sm font-bold text-[#2B347A]">
            01
          </span>

          <span className="text-2xl text-zinc-700 transition duration-300 group-hover:text-[#2B347A]">
            +
          </span>
        </div>

        <h3 className="mt-14 text-2xl font-bold text-white">
          {language === "en" ? "Quality" : "الجودة"}
        </h3>

        <p className="mt-4 max-w-xs pr-8 text-sm leading-7 text-zinc-500">
          {language === "en"
  ? "High standards at every stage, from planning and material selection to execution and final delivery."
  : "معايير عالية في جميع المراحل، من التخطيط واختيار المواد إلى التنفيذ والتسليم النهائي."}
        </p>
      </article>

      {/* 02 */}
      <article className="group border-b border-white/10 py-10 sm:pl-8 lg:border-b-0 lg:border-r">
        <div className="flex items-start justify-between pr-8">
          <span className="text-sm font-bold text-[#2B347A]">
            02
          </span>

          <span className="text-2xl text-zinc-700 transition duration-300 group-hover:text-[#2B347A]">
            +
          </span>
        </div>

        <h3 className="mt-14 text-2xl font-bold text-white">
          {language === "en" ? "Precision" : "الدقة"}
        </h3>

        <p className="mt-4 max-w-xs pr-8 text-sm leading-7 text-zinc-500">
          {language === "en"
  ? "Careful planning and professional execution focused on accuracy, efficiency, and lasting results."
  : "تخطيط دقيق وتنفيذ احترافي يركز على الدقة والكفاءة وتحقيق نتائج مستدامة."}
        </p>
      </article>

      {/* 03 */}
      <article className="group border-b border-white/10 py-10 sm:border-r sm:pl-8 lg:border-b-0">
        <div className="flex items-start justify-between pr-8">
          <span className="text-sm font-bold text-[#2B347A]">
            03
          </span>

          <span className="text-2xl text-zinc-700 transition duration-300 group-hover:text-[#2B347A]">
            +
          </span>
        </div>

        <h3 className="mt-14 text-2xl font-bold text-white">
          {language === "en" ? "Reliability" : "الموثوقية"}
        </h3>

        <p className="mt-4 max-w-xs pr-8 text-sm leading-7 text-zinc-500">
          {language === "en"
  ? "Clear communication, dependable execution, and a commitment to delivering what we promise."
  : "تواصل واضح، وتنفيذ موثوق، والتزام بتقديم ما نعد به."}
        </p>
      </article>

      {/* 04 */}
      <article className="group py-10 sm:pl-8">
        <div className="flex items-start justify-between pr-8">
          <span className="text-sm font-bold text-[#2B347A]">
            04
          </span>

          <span className="text-2xl text-zinc-700 transition duration-300 group-hover:text-[#2B347A]">
            +
          </span>
        </div>

        <h3 className="mt-14 text-2xl font-bold text-white">
          {language === "en" ? "Commitment" : "الالتزام"}
        </h3>

        <p className="mt-4 max-w-xs pr-8 text-sm leading-7 text-zinc-500">
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
            <div className="text-xs font-black uppercase tracking-[0.3em] text-zinc-700">
              {language === "en" ? "Our Philosophy" : "فلسفتنا"}
            </div>

            <blockquote className="mt-8 max-w-2xl text-3xl font-black leading-tight tracking-tight text-zinc-950 sm:text-4xl">
              {language === "en"
  ? "We don't just build structures. We build trust, value, and long-term relationships."
  : "نحن لا نبني المنشآت فقط، بل نبني الثقة والقيمة والعلاقات طويلة الأمد."}
            </blockquote>
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-zinc-950/10 pt-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-700">
              SARAYA Advanced Arab Co
            </span>

            <span className="text-sm font-bold text-zinc-950">
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
  className="relative overflow-hidden bg-white px-6 py-24 lg:px-8 lg:py-28"
>
  <div className="mx-auto max-w-7xl">

    {/* Intro */}
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">

      <div>
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-[#2B347A]" />

          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#2B347A]">
            {language === "ar" ? "لمحة عن الشركة" : "At a Glance"}
          </span>
        </div>

        <h2 className="mt-6 text-4xl font-black tracking-tight text-zinc-950 sm:text-5xl">
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

      <p className="max-w-2xl text-lg leading-8 text-zinc-500">
        {language === "ar"
          ? "يجمع نهجنا بين الإدارة الاحترافية والتنفيذ المتقن والتنسيق الموثوق، لتقديم مشاريع إنشائية بكفاءة وجودة وثقة."
          : "Our approach brings together professional management, skilled execution, and dependable coordination to deliver construction projects with confidence."}
      </p>

    </div>

    {/* Stats Grid */}
    <div className="mt-16 grid border-y border-zinc-200 sm:grid-cols-2 lg:grid-cols-4">

      {/* Stat 01 */}
      <div className="group border-b border-zinc-200 p-8 sm:border-r lg:border-b-0 lg:p-10">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
            01
          </span>

          <span className="h-2 w-2 rounded-full bg-[#2B347A] transition-transform duration-300 group-hover:scale-150" />
        </div>

        <h3 className="mt-14 text-2xl font-bold text-zinc-950">
          {language === "ar" ? "المشاريع السكنية" : "Residential"}
        </h3>

        <p className="mt-3 text-sm leading-7 text-zinc-500">
          {language === "ar"
            ? "حلول إنشائية مصممة وفق أعلى معايير الجودة والوظيفية والقيمة طويلة الأمد."
            : "Construction solutions designed around quality, functionality, and long-term value."}
        </p>
      </div>

      {/* Stat 02 */}
      <div className="group border-b border-zinc-200 p-8 sm:border-r lg:border-b-0 lg:p-10">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
            02
          </span>

          <span className="h-2 w-2 rounded-full bg-[#2B347A] transition-transform duration-300 group-hover:scale-150" />
        </div>

        <h3 className="mt-14 text-2xl font-bold text-zinc-950">
          {language === "ar" ? "المشاريع التجارية" : "Commercial"}
        </h3>

        <p className="mt-3 text-sm leading-7 text-zinc-500">
          {language === "ar"
            ? "تنفيذ احترافي للمشاريع يركز على الكفاءة والجودة ومتطلبات الأعمال."
            : "Professional project delivery focused on efficiency, quality, and business requirements."}
        </p>
      </div>

      {/* Stat 03 */}
      <div className="group border-b border-zinc-200 p-8 sm:border-r lg:border-b-0 lg:p-10">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
            03
          </span>

          <span className="h-2 w-2 rounded-full bg-[#2B347A] transition-transform duration-300 group-hover:scale-150" />
        </div>

        <h3 className="mt-14 text-2xl font-bold text-zinc-950">
          {language === "ar" ? "المشاريع الصناعية" : "Industrial"}
        </h3>

        <p className="mt-3 text-sm leading-7 text-zinc-500">
          {language === "ar"
            ? "حلول موثوقة في الإنشاء والبنية التحتية للمشاريع التي تتطلب أعلى مستويات الكفاءة."
            : "Reliable construction and infrastructure solutions for demanding project environments."}
        </p>
      </div>

      {/* Stat 04 */}
      <div className="group p-8 lg:p-10">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
            04
          </span>

          <span className="h-2 w-2 rounded-full bg-[#2B347A] transition-transform duration-300 group-hover:scale-150" />
        </div>

        <h3 className="mt-14 text-2xl font-bold text-zinc-950">
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
    <div className="mt-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

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
        href="#contact"
        className="group inline-flex shrink-0 items-center gap-4 text-sm font-bold text-zinc-950"
      >
        {language === "ar" ? "ناقش مشروعك معنا" : "Discuss your project"}

        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 transition duration-300 group-hover:border-[#2B347A] group-hover:bg-[#2B347A]">
          {language === "ar" ? "←" : "→"}
        </span>
      </a>

    </div>

  </div>
</section>
      {/* ================= CTA ================= */}
      <section
        id="contact"
        className="relative overflow-hidden bg-[#2B347A] px-6 py-24 lg:px-8 lg:py-28"
      >
        <div className="absolute right-0 top-0 h-full w-1/3 bg-black/5 [clip-path:polygon(35%_0,100%_0,100%_100%,0_100%)]" />

        <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-10 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-white/70">
              {language === "en"
  ? "Start Your Project"
  : "ابدأ مشروعك معنا"}
            </p>

            <h2 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-6xl">
             {language === "en"
  ? "Let's build something great together."
  : "لنبنِ شيئاً عظيماً معاً."}
            </h2>
          </div>

          <a
            href="mailto:info@saaco-sa.com"
            className="shrink-0 rounded-full bg-zinc-950 px-8 py-4 text-center text-sm font-bold text-white transition hover:bg-zinc-800"
          >
            {language === "en" ? "Contact Us →" : "تواصل معنا ←"}
          </a>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-zinc-950 px-6 py-10 text-zinc-400 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="text-xl font-black text-white">
  {language === "en"
    ? "SARAYA Advanced Arab Co"
    : "سرايا العربية المتطورة"}
</div>

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
}
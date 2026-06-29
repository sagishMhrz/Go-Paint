import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeImage from "../../assets/Home.png";

const TONE_TABS = ["All", "Warm", "Cool", "Pastel", "Neutral"];

const TRENDING_COLORS = [
  { name: "Terracotta Bliss", hex: "#C4714A", tones: ["Warm", "Neutral"] },
  { name: "Sage Whisper", hex: "#8FAF8A", tones: ["Cool", "Pastel"] },
  { name: "Dusty Rose", hex: "#D4A5A5", tones: ["Pastel", "Warm"] },
  { name: "Midnight Slate", hex: "#3D4A5C", tones: ["Cool", "Neutral"] },
  { name: "Warm Ivory", hex: "#F5ECD7", tones: ["Warm", "Neutral", "Pastel"] },
  { name: "Forest Moss", hex: "#5C7A4E", tones: ["Cool"] },
  { name: "Peach Sorbet", hex: "#F4A97F", tones: ["Warm", "Pastel"] },
  { name: "Lavender Mist", hex: "#C5BBD8", tones: ["Pastel", "Cool"] },
  { name: "Charcoal Smoke", hex: "#5A5A5A", tones: ["Neutral", "Cool"] },
  { name: "Coral Reef", hex: "#E8735A", tones: ["Warm"] },
  { name: "Sky Haze", hex: "#A8C5D8", tones: ["Cool", "Pastel"] },
  { name: "Butter Cream", hex: "#F7E8B0", tones: ["Warm", "Pastel"] },
];

const FEATURED_PALETTES = [
  {
    name: "Himalayan Sunrise",
    colors: ["#C4714A", "#F4A97F", "#F5ECD7", "#D4A5A5"],
    likes: 342,
  },
  {
    name: "Urban Minimal",
    colors: ["#3D4A5C", "#5A5A5A", "#F5ECD7", "#8FAF8A"],
    likes: 218,
  },
  {
    name: "Garden Fresh",
    colors: ["#5C7A4E", "#8FAF8A", "#F7E8B0", "#F5ECD7"],
    likes: 195,
  },
  {
    name: "Pastel Dreams",
    colors: ["#C5BBD8", "#D4A5A5", "#F4A97F", "#F7E8B0"],
    likes: 287,
  },
];

function StepIconAi() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2l2.2 6.8H21l-5.5 4 2.1 6.7-5.6-3.9-5.6 3.9 2.1-6.7L3 8.8h6.8L12 2z"
        fill="#c2410c"
        stroke="#c2410c"
        strokeWidth="0.5"
      />
    </svg>
  );
}

function StepIconPost() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="4"
        y="4"
        width="16"
        height="18"
        rx="2"
        stroke="#ca8a04"
        strokeWidth="1.6"
      />
      <path
        d="M8 9h8M8 13h5M8 17h8"
        stroke="#ca8a04"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StepIconBid() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 20h4l10-10a2 2 0 000-3l-1-1a2 2 0 00-3 0L4 16v4z"
        stroke="#b91c1c"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M13 7l4 4"
        stroke="#b91c1c"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StepIconHire() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 13l4 4L19 7"
        stroke="#15803d"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const PROCESS_STEPS = [
  {
    n: "01",
    title: "Design with AI",
    body: "Use our AI-powered tool to generate room designs, explore color palettes, and visualize your space before committing.",
    iconBg: "bg-orange-50",
    icon: <StepIconAi />,
  },
  {
    n: "02",
    title: "Post Your Project",
    body: "Describe your painting needs—rooms, budget, timeline, and location. It takes less than 3 minutes.",
    iconBg: "bg-amber-50",
    icon: <StepIconPost />,
  },
  {
    n: "03",
    title: "Receive Bids",
    body: "Verified painters in your area submit competitive bids. Compare profiles, ratings, and prices easily.",
    iconBg: "bg-rose-50",
    icon: <StepIconBid />,
  },
  {
    n: "04",
    title: "Hire & Track",
    body: "Award the project to your chosen painter, track progress in real-time, and pay securely on completion.",
    iconBg: "bg-emerald-50",
    icon: <StepIconHire />,
  },
];

const PAINTERS = [
  {
    name: "Rajesh Shrestha",
    city: "Kathmandu",
    rating: 4.9,
    reviews: 127,
    projects: 214,
    startingNpr: "15,000",
    tags: ["Interior", "Exterior", "Texture"],
    avatarBg: "#d1d5db",
  },
  {
    name: "Sita Maharjan",
    city: "Lalitpur",
    rating: 5.0,
    reviews: 89,
    projects: 156,
    startingNpr: "12,500",
    tags: ["Interior", "Woodwork"],
    avatarBg: "#cbd5e1",
  },
  {
    name: "Anil Thapa",
    city: "Bhaktapur",
    rating: 4.8,
    reviews: 203,
    projects: 312,
    startingNpr: "18,000",
    tags: ["Exterior", "Texture", "Commercial"],
    avatarBg: "#e2e8f0",
  },
  {
    name: "Priya Sharma",
    city: "Kathmandu",
    rating: 4.9,
    reviews: 64,
    projects: 98,
    startingNpr: "10,000",
    tags: ["Interior", "Pastel"],
    avatarBg: "#e5e7eb",
  },
];

function StarRatingPainter({ rating, reviews }) {
  const full = Math.floor(rating);
  const partial = rating - full;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div
        className="flex text-amber-400"
        role="img"
        aria-label={`${rating} out of 5 stars`}
      >
        {Array.from({ length: 5 }, (_, i) => {
          if (i < full) {
            return (
              <span key={i} className="text-lg leading-none" aria-hidden>
                ★
              </span>
            );
          }
          if (i === full && partial > 0.05) {
            return (
              <span
                key={i}
                className="relative inline-block text-lg leading-none"
                aria-hidden
              >
                <span className="text-neutral-300">★</span>
                <span
                  className="absolute left-0 top-0 overflow-hidden text-amber-400"
                  style={{ width: `${partial * 100}%` }}
                >
                  ★
                </span>
              </span>
            );
          }
          return (
            <span
              key={i}
              className="text-lg leading-none text-neutral-300"
              aria-hidden
            >
              ★
            </span>
          );
        })}
      </div>
      <span className="text-sm font-medium text-slate-800">
        {rating.toFixed(1)}
      </span>
      <span className="text-sm text-slate-400">({reviews})</span>
    </div>
  );
}

function AiFeatureIconWrap({ children }) {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FF7A30]/15 text-[#FF7A30]">
      {children}
    </div>
  );
}

const AI_FEATURES = [
  {
    title: "AI Room Design Generator",
    desc: "Generate layouts and wall treatments tuned to your room photos in seconds.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6L12 2z" />
      </svg>
    ),
  },
  {
    title: "Image-Based Color Detection",
    desc: "Sample real hues from your furniture, art, or flooring for cohesive schemes.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="8.5" cy="10" r="1.5" fill="currentColor" stroke="none" />
        <path
          d="M21 15l-5-5L5 19"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Smart Color Matching",
    desc: "Pair trims, ceilings, and accents with palettes proven in Nepali lighting.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden
      >
        <path d="M12 3c-4 4-7 7-7 10a4 4 0 008 0 4 4 0 008 0c0-3-3-6-7-10z" />
        <circle cx="12" cy="13" r="1.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Design to Project Conversion",
    desc: "Turn approved visuals into a scoped job brief painters can bid on instantly.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden
      >
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

function filterByTone(colors, tone) {
  if (tone === "All") return colors;
  return colors.filter((c) => c.tones.includes(tone));
}

export default function Home() {
  const [activeTone, setActiveTone] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem("gopaint-tone-tab");
    if (stored && TONE_TABS.includes(stored)) {
      setActiveTone(stored);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("gopaint-tone-tab", activeTone);
  }, [activeTone]);

  const filteredColors = filterByTone(TRENDING_COLORS, activeTone);

  return (
    <div className="text-slate-900">
      <section
        id="top"
        className="relative flex min-h-[88vh] flex-col justify-end overflow-hidden pb-16 pt-28 sm:min-h-[90vh] sm:pb-20 sm:pt-32 md:pt-36"
      >
        <img
          src={HomeImage}
          alt="Modern living room with terracotta accent wall"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/70"
          aria-hidden
        />

        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 text-center sm:px-6">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Transform Your Space with{" "}
            <span className="text-[#FF7A30]">Perfect Colors</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-body text-base leading-relaxed text-white/90 sm:text-lg">
            Connect with verified painters, visualize your dream home with Al,
            and get competitive bids—all in one platform built for Nepal.
          </p>

          <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 rounded-2xl bg-white p-2 shadow-xl sm:flex-row sm:items-stretch">
            <label className="flex flex-1 items-center gap-3 rounded-xl px-4 py-2 text-left">
              <span className="text-neutral-400" aria-hidden>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M20 20l-3.5-3.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by city, project type, or color..."
                className="min-w-0 flex-1 border-0 bg-transparent font-body text-sm text-neutral-800 outline-none placeholder:text-neutral-400 sm:text-base"
              />
            </label>
            <a
              href="#cta"
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#FF7A30] px-6 py-3 font-body text-sm font-semibold text-white transition hover:bg-[#e86d28] sm:rounded-full sm:py-0"
            >
              Search
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/find-painters"
              className="rounded-full border border-white/30 bg-white/10 px-4 py-2 font-body text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Find a Painter
            </Link>
            <a
              href="#services"
              className="rounded-full border border-white/30 bg-white/10 px-4 py-2 font-body text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              See our work
            </a>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4">
            {[
              { label: "2,400+", sub: "Projects" },
              { label: "10,000+", sub: "Happy Customers" },
              { label: "4.8/5", sub: "Star Rating" },
              { label: "200+", sub: "Professional Painters" },
            ].map((s) => (
              <div key={s.sub} className="text-center">
                <p className="text-xl font-bold text-white sm:text-2xl">
                  {s.label}
                </p>
                <p className="mt-1 font-body text-xs font-medium text-white/75 sm:text-sm">
                  {s.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="services"
        className="scroll-mt-24 bg-white py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Trending Colors in Nepal
              </h2>
              <p className="mt-2 max-w-xl font-body text-sm text-slate-500 sm:text-base">
                Curated by our design team based on popular choices this season.
              </p>
            </div>
            <Link
              to="/colors"
              className="inline-flex items-center gap-1 font-body text-sm font-semibold text-[#FF7A30] transition hover:text-[#e86d28]"
            >
              View All Colors
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div
            className="mt-8 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filter by tone"
          >
            {TONE_TABS.map((tab) => {
              const selected = activeTone === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveTone(tab)}
                  className={`rounded-full px-4 py-2 font-body text-sm font-semibold transition ${
                    selected
                      ? "bg-[#FF7A30] text-white shadow-sm"
                      : "border border-neutral-200 bg-white text-slate-600 hover:bg-neutral-50"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {filteredColors.map((c) => (
              <article
                key={c.name}
                className="overflow-hidden rounded-xl border border-neutral-100 bg-white shadow-sm"
              >
                <div
                  className="aspect-[5/4] w-full rounded-t-xl"
                  style={{ backgroundColor: c.hex }}
                />
                <div className="p-3">
                  <p className="font-body text-sm font-semibold text-slate-900">
                    {c.name}
                  </p>
                  <p className="mt-0.5 font-mono text-xs text-slate-400">
                    {c.hex}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h3 className="text-xl font-bold tracking-tight text-slate-900">
              Featured Palettes
            </h3>
            <a
              href="#"
              className="inline-flex items-center gap-1 font-body text-sm font-semibold text-[#FF7A30] transition hover:text-[#e86d28]"
            >
              View All
              <span aria-hidden>→</span>
            </a>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_PALETTES.map((p) => (
              <article
                key={p.name}
                className="flex flex-col rounded-xl border border-neutral-100 bg-white p-4 shadow-sm"
              >
                <div className="flex gap-2">
                  {p.colors.map((hex) => (
                    <div
                      key={hex}
                      className="h-10 flex-1 rounded-lg ring-1 ring-black/5"
                      style={{ backgroundColor: hex }}
                      title={hex}
                    />
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="font-body text-sm font-semibold text-slate-900">
                    {p.name}
                  </p>
                  {/* <span className="flex items-center gap-1 font-body text-xs text-slate-400">
                    <span aria-hidden>♥</span>
                    {p.likes}
                  </span> */}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="ai-design"
        className="scroll-mt-24 bg-[#1a1412] py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#FF7A30]/20 px-3 py-1 font-body text-xs font-semibold uppercase tracking-wide text-[#FF7A30]">
              AI-powered
            </span>
            <h2 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Design Your Dream Space with{" "}
              <span className="text-[#FF7A30]">Artificial Intelligence</span>
            </h2>
            <p className="mt-4 font-body text-base leading-relaxed text-[#a39e9b]">
              Visualize palettes on your walls, harmonize finishes, and brief
              pros with one click — tuned for real Nepali homes and daylight.
            </p>
            <ul className="mt-10 space-y-5">
              {AI_FEATURES.map((f) => (
                <li key={f.title} className="flex gap-4">
                  <AiFeatureIconWrap>{f.icon}</AiFeatureIconWrap>
                  <div>
                    <p className="font-body font-semibold text-white">
                      {f.title}
                    </p>
                    <p className="mt-1 font-body text-sm text-[#a39e9b]">
                      {f.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <a
              href="#cta"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#FF7A30] px-6 py-3.5 font-body text-sm font-semibold text-white transition hover:bg-[#e86d28]"
            >
              Try AI Design Free
            </a>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-3xl sm:min-h-[400px] lg:min-h-[440px]">
            {/* TODO: replace with real image */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#6b3d2e] via-[#4a3228] to-[#1a1412]"
              aria-hidden
            />
            <div className="absolute right-4 top-4 rounded-xl bg-[#FF7A30] px-3 py-2 font-body text-xs font-semibold text-white shadow-lg">
              <p className="text-[10px] font-bold uppercase tracking-wide text-white/90">
                AI Confidence
              </p>
              <p className="text-lg font-bold leading-tight">94%</p>
            </div>
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-black/5 sm:left-6 sm:right-6 sm:p-5">
              <div className="flex items-center justify-between gap-2">
                <p className="font-body text-sm font-semibold text-slate-900">
                  AI Generated Design
                </p>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 font-body text-xs font-semibold text-emerald-800">
                  3 Variations
                </span>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div className="flex gap-1.5">
                  {["#C4714A", "#F4A97F", "#F5ECD7", "#D4A5A5", "#8FAF8A"].map(
                    (hex) => (
                      <div
                        key={hex}
                        className="h-9 w-9 rounded-full ring-2 ring-white shadow"
                        style={{ backgroundColor: hex }}
                      />
                    ),
                  )}
                </div>
                <p className="font-body text-xs font-medium text-slate-600">
                  Himalayan Sunrise Palette
                </p>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-100 pt-4">
                <p className="font-body text-xs text-slate-600">
                  Est. Cost:{" "}
                  <span className="font-semibold text-slate-900">
                    NPR 35,000 - 45,000
                  </span>
                </p>
                <button
                  type="button"
                  className="rounded-full bg-[#FF7A30] px-4 py-2 font-body text-xs font-semibold text-white"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="painters"
        className="scroll-mt-24 bg-white py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-[#FF7A30]">
                Top rated
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Featured Painters
              </h2>
              <p className="mt-2 max-w-xl font-body text-sm text-slate-500 sm:text-base">
                Verified professionals with proven track records across Nepal.
              </p>
            </div>
            <Link
              to="/find-painters"
              className="inline-flex items-center gap-1 font-body text-sm font-semibold text-[#FF7A30] transition hover:text-[#e86d28] lg:shrink-0"
            >
              Browse All Painters <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PAINTERS.map((p) => (
              <article
                key={p.name}
                className="flex flex-col rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm"
              >
                <div className="relative mx-auto w-fit">
                  {/* TODO: replace with real image */}
                  <div
                    className="h-28 w-28 rounded-full ring-4 ring-neutral-50"
                    style={{ backgroundColor: p.avatarBg }}
                  />
                  <span className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#FF7A30] text-white shadow-md ring-2 ring-white">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
                <h3 className="mt-4 text-center text-lg font-bold text-slate-900">
                  {p.name}
                </h3>
                <p className="mt-1 flex items-center justify-center gap-1 font-body text-sm text-slate-400">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-slate-400"
                    aria-hidden
                  >
                    <path
                      d="M12 21s-6-4.35-6-9a6 6 0 1112 0c0 4.65-6 9-6 9Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <circle cx="12" cy="11" r="2" fill="currentColor" />
                  </svg>
                  {p.city}
                </p>
                <div className="mt-3 flex justify-center">
                  <StarRatingPainter rating={p.rating} reviews={p.reviews} />
                </div>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-orange-50 px-2.5 py-1 font-body text-xs font-medium text-[#c2410c]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="my-5 border-t border-neutral-100" />
                <div className="flex justify-between gap-4 font-body text-sm">
                  <div>
                    <p className="text-xs text-slate-400">Projects</p>
                    <p className="text-lg font-bold text-slate-900">
                      {p.projects}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Starting from</p>
                    <p className="text-lg font-bold text-slate-900">
                      NPR {p.startingNpr}
                    </p>
                  </div>
                </div>
                <a
                  href="#cta"
                  className="mt-5 block rounded-xl bg-orange-50 py-3 text-center font-body text-sm font-bold text-[#FF7A30] transition hover:bg-orange-100"
                >
                  View Profile
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="cta"
        className="scroll-mt-24 relative overflow-hidden py-20 sm:py-24 lg:py-28"
      >
        {/* TODO: replace with real image */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#1a2332] via-[#252a35] to-[#0f141c]"
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden />

        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Transform Your Space?
          </h2>
          <p className="mt-4 font-body text-base text-white/85 sm:text-lg">
            Join 18,000+ happy homeowners who found their perfect painter on
            GoPaint Nepal.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/signup"
              className="inline-flex w-full max-w-xs items-center justify-center rounded-full bg-[#FF7A30] px-8 py-3.5 font-body text-sm font-semibold text-white transition hover:bg-[#e86d28] sm:w-auto"
            >
              Get Started Now
            </Link>
            <Link
              to="/painter-signup"
              className="inline-flex w-full max-w-xs items-center justify-center rounded-full border-2 border-white/80 bg-transparent px-8 py-3.5 font-body text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
            >
              Join as Painter
            </Link>
          </div>

          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 font-body text-sm text-white/80 sm:grid-cols-4">
            {[
              "Verified Professionals",
              "Quality Guaranteed",
              "On-time Completion",
              "Best Price Guarantee",
            ].map((label) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-4 text-center"
              >
                <span
                  className="h-8 w-8 rounded-full bg-[#FF7A30]/30"
                  aria-hidden
                />
                <span className="text-xs font-medium leading-snug sm:text-sm">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const STEPS = [
  {
    n: "01",
    title: "Design with AI",
    body: "Use our AI tools to visualize room designs, explore palettes, and preview finishes before you hire.",
    accent: "bg-orange-50 text-[#c2410c]",
  },
  {
    n: "02",
    title: "Find Verified Painters",
    body: "Browse verified painters near you. Compare specialties, ratings, price ranges, and past work.",
    accent: "bg-amber-50 text-[#92400e]",
  },
  {
    n: "03",
    title: "Post Your Project",
    body: "Describe your rooms, timeline, and budget. It takes just a couple minutes to share what you need.",
    accent: "bg-rose-50 text-[#9f1239]",
  },
  {
    n: "04",
    title: "Receive & Compare Bids",
    body: "Get competitive bids from interested painters. Compare and chat to finalize details quickly.",
    accent: "bg-sky-50 text-[#075985]",
  },
  {
    n: "05",
    title: "Hire & Track Progress",
    body: "Hire your painter, track progress, and keep everything organized from start to finish.",
    accent: "bg-emerald-50 text-[#065f46]",
  },
];

const BUSINESS_CARDS = [
  {
    title: "More Leads",
    body: "Get discovered by homeowners actively looking for painters in your area.",
    iconBg: "bg-white",
  },
  {
    title: "Verified Profile",
    body: "Build trust with verification, reviews, and a portfolio that showcases your work.",
    iconBg: "bg-white",
  },
  {
    title: "Faster Payments",
    body: "Secure payments and transparent milestones help you get paid on time.",
    iconBg: "bg-white",
  },
  {
    title: "Simple Scheduling",
    body: "Coordinate timelines, updates, and client communication in one place.",
    iconBg: "bg-white",
  },
  {
    title: "Smart Pricing",
    body: "Quote confidently with clearer scope and smarter project briefs.",
    iconBg: "bg-white",
  },
  {
    title: "Grow Reputation",
    body: "Collect reviews, highlight completed projects, and stand out from the crowd.",
    iconBg: "bg-white",
  },
];

const WHY_CARDS = [
  {
    title: "Verified Professionals",
    body: "We prioritize verified painters with transparent profiles and reviews.",
  },
  {
    title: "Better Matchmaking",
    body: "Find pros by location, specialty, and ratings—no guesswork.",
  },
  {
    title: "Transparent Pricing",
    body: "Compare bids, price ranges, and scope details before hiring.",
  },
  {
    title: "Quality Guaranteed",
    body: "Clear communication and accountability help ensure quality outcomes.",
  },
  {
    title: "Faster Turnaround",
    body: "Post a project and receive responses quickly from interested painters.",
  },
  {
    title: "Support When Needed",
    body: "Get help with questions, issues, and next steps along the way.",
  },
];

const FAQS = [
  {
    q: "Is GoPaint free to use?",
    a: "Browsing painters and exploring the platform is free. Some advanced features and services may have fees depending on your needs.",
  },
  {
    q: "How do you verify painters?",
    a: "Painters go through a verification process and build reputation through completed projects and customer reviews.",
  },
  {
    q: "Can I hire painters outside my city?",
    a: "Yes. You can browse across Nepal and filter by location to find the best fit for your project.",
  },
  {
    q: "How do bids work?",
    a: "When you post a project, interested painters can send bids. You can compare price ranges, timelines, and profiles before choosing.",
  },
  {
    q: "What if I need help during the project?",
    a: "GoPaint provides support and guidance to help you resolve issues and keep your project on track.",
  },
];

function IconSquare({ children }) {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-900 text-white">
      {children}
    </div>
  );
}

function PlusMinus({ open }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 5v14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ opacity: open ? 0 : 1 }}
      />
      <path
        d="M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-slate-900 sm:text-base">
          {item.q}
        </span>
        <span className="shrink-0 rounded-full border border-neutral-200 p-2 text-slate-700">
          <PlusMinus open={open} />
        </span>
      </button>
      {open ? (
        <div className="px-5 pb-5 text-sm leading-relaxed text-slate-500">
          {item.a}
        </div>
      ) : null}
    </div>
  );
}

export default function HowItWorks() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqPairs = useMemo(
    () =>
      FAQS.map((f, i) => ({
        key: `${i}-${f.q}`,
        item: f,
      })),
    [],
  );

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="h-20 sm:h-24" aria-hidden />

      <section className="bg-white px-4 pb-12 pt-10 sm:px-6 sm:pb-16 lg:pt-12">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              How GoPaint Works
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
              A simple process to help you design, find the right painter, and
              complete your project with confidence.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pb-14 sm:px-6 sm:pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl rounded-3xl border border-neutral-100 bg-white shadow-sm">
            <div className="border-b border-neutral-100 px-6 py-5">
              <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
                Your Journey to a Beautiful Home
              </h2>
            </div>

            <div className="p-6">
              <ol className="space-y-4">
                {STEPS.map((s) => (
                  <li
                    key={s.n}
                    className="flex flex-col gap-3 rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm sm:flex-row sm:items-start sm:gap-4"
                  >
                    <div className="flex items-center justify-between gap-3 sm:block sm:w-40">
                      <div
                        className={`inline-flex items-center justify-center rounded-xl px-3 py-2 text-xs font-bold ${s.accent}`}
                      >
                        {s.n}
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#FF8022] sm:hidden">
                        GoPaint
                      </span>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                          {s.title}
                        </h3>
                        <span className="hidden text-xs font-semibold uppercase tracking-wider text-[#FF8022] sm:inline">
                          GoPaint
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                        {s.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pb-14 sm:px-6 sm:pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Grow Your Painting Business
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
              Create a profile, receive project requests, and build a trusted
              reputation—everything you need to grow.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BUSINESS_CARDS.map((c) => (
              <article
                key={c.title}
                className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <IconSquare>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M12 2v20" />
                      <path d="M2 12h20" />
                    </svg>
                  </IconSquare>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {c.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                      {c.body}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              to="/painter-signup"
              className="inline-flex items-center justify-center rounded-full bg-[#121212] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-black"
            >
              Join as a Painter
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pb-14 sm:px-6 sm:pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Why Choose GoPaint?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
              Built for Nepal—with verified pros, simpler hiring, and better
              outcomes.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_CARDS.map((c) => (
              <article
                key={c.title}
                className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-[#FF8022]">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {c.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                      {c.body}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pb-14 sm:px-6 sm:pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
              Quick answers to help you get started.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-4xl space-y-3">
            {faqPairs.map(({ key, item }, idx) => (
              <FaqItem
                key={key}
                item={item}
                open={openIdx === idx}
                onToggle={() => setOpenIdx((prev) => (prev === idx ? -1 : idx))}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#121212] px-4 py-16 text-white sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Transform Your Space?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
            Explore colors, find verified painters, and bring your vision to
            life.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/signup"
              className="inline-flex w-full max-w-xs items-center justify-center rounded-full bg-[#FF8022] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#e8721a] sm:w-auto"
            >
              Get Started Now
            </Link>
            <Link
              to="/find-painters"
              className="inline-flex w-full max-w-xs items-center justify-center rounded-full border-2 border-white/80 bg-transparent px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
            >
              Find Painters
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

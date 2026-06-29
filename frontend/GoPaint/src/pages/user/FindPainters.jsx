import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const LOCATIONS = [
  "All",
  "Kathmandu",
  "Lalitpur",
  "Bhaktapur",
  "Pokhara",
  "Chitwan",
];

const SPECIALTIES = [
  "All",
  "Interior",
  "Exterior",
  "Decorative",
  "Texture",
  "Waterproofing",
  "Luxury Finish",
];

const PAINTERS = [
  {
    id: "rajesh",
    name: "Rajesh Shrestha",
    location: "Kathmandu",
    verified: true,
    rating: 4.9,
    reviews: 121,
    completedProjects: 214,
    priceMin: 15000,
    priceMax: 45000,
    specialties: ["Interior", "Exterior", "Texture"],
  },
  {
    id: "suman",
    name: "Suman Tamang",
    location: "Lalitpur",
    verified: true,
    rating: 4.8,
    reviews: 89,
    completedProjects: 176,
    priceMin: 12000,
    priceMax: 30000,
    specialties: ["Decorative", "Waterproofing", "Texture"],
  },
  {
    id: "bikash",
    name: "Bikash Gurung",
    location: "Pokhara",
    verified: true,
    rating: 4.7,
    reviews: 67,
    completedProjects: 143,
    priceMin: 18000,
    priceMax: 55000,
    specialties: ["Exterior", "Waterproofing", "Luxury Finish"],
  },
  {
    id: "sita",
    name: "Sita Maharjan",
    location: "Bhaktapur",
    verified: true,
    rating: 4.9,
    reviews: 64,
    completedProjects: 156,
    priceMin: 12500,
    priceMax: 32000,
    specialties: ["Interior", "Decorative"],
  },
  {
    id: "anil",
    name: "Anil Thapa",
    location: "Chitwan",
    verified: true,
    rating: 4.8,
    reviews: 203,
    completedProjects: 312,
    priceMin: 18000,
    priceMax: 60000,
    specialties: ["Exterior", "Texture", "Waterproofing"],
  },
  {
    id: "priya",
    name: "Priya Sharma",
    location: "Kathmandu",
    verified: true,
    rating: 4.9,
    reviews: 98,
    completedProjects: 107,
    priceMin: 10000,
    priceMax: 28000,
    specialties: ["Interior", "Luxury Finish"],
  },
];

function formatNpr(n) {
  try {
    return new Intl.NumberFormat("en-IN").format(n);
  } catch {
    return String(n);
  }
}

function VerifiedIcon() {
  return (
    <span
      className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#FF8022] text-white"
      title="Verified"
      aria-label="Verified"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M5 13l4 4L19 7"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function StarRow({ rating }) {
  const full = Math.floor(rating);
  const partial = rating - full;
  return (
    <div className="flex items-center gap-2">
      <div className="flex text-amber-400" aria-hidden>
        {Array.from({ length: 5 }, (_, i) => {
          if (i < full) return <span key={i}>★</span>;
          if (i === full && partial > 0.05) {
            return (
              <span key={i} className="relative inline-block">
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
            <span key={i} className="text-neutral-300">
              ★
            </span>
          );
        })}
      </div>
      <span className="text-sm font-semibold text-slate-800">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

function Chip({ selected, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition sm:px-3.5 sm:py-2 sm:text-sm ${
        selected
          ? "bg-[#FF8022] text-white shadow-sm"
          : "border border-neutral-200 bg-white text-slate-600 hover:bg-neutral-50"
      }`}
    >
      {children}
    </button>
  );
}

function InitialsAvatar({ name }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  return (
    <div className="relative h-12 w-12 shrink-0 rounded-full bg-neutral-200 ring-2 ring-white">
      <div className="flex h-full w-full items-center justify-center text-sm font-bold text-slate-700">
        {initials}
      </div>
    </div>
  );
}

export default function FindPainters() {
  const [query, setQuery] = useState("");
  const [activeLocation, setActiveLocation] = useState("All");
  const [activeSpecialty, setActiveSpecialty] = useState("All");
  const [minRating, setMinRating] = useState("Any");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const ratingFloor =
      minRating === "Any" ? null : Number.parseFloat(minRating);

    return PAINTERS.filter((p) => {
      const matchesLocation =
        activeLocation === "All" ? true : p.location === activeLocation;

      const matchesSpecialty =
        activeSpecialty === "All"
          ? true
          : p.specialties.includes(activeSpecialty);

      const matchesRating = ratingFloor ? p.rating >= ratingFloor : true;

      const matchesQuery = q
        ? `${p.name} ${p.location} ${p.specialties.join(" ")}`
            .toLowerCase()
            .includes(q)
        : true;

      return (
        matchesLocation && matchesSpecialty && matchesRating && matchesQuery
      );
    });
  }, [activeLocation, activeSpecialty, minRating, query]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="h-20 sm:h-24" aria-hidden />

      <section className="bg-white px-4 pb-10 pt-8 sm:px-6 sm:pb-12 sm:pt-10 lg:pt-12">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Find Verified Painters
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
              Browse skilled painters across Nepal. Filter by location,
              specialty, and ratings to find your perfect match.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-3xl">
            <label className="relative block">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
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
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.3-4.3" />
                </svg>
              </span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or specialty..."
                className="w-full rounded-xl border border-neutral-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#FF8022] focus:ring-0"
              />
            </label>
          </div>

          <div className="mx-auto mt-6 max-w-6xl space-y-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between lg:flex-1 lg:justify-start">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Location
                </p>
                <div className="flex max-w-full gap-2 overflow-x-auto pb-1">
                  {LOCATIONS.map((l) => (
                    <Chip
                      key={l}
                      selected={activeLocation === l}
                      onClick={() => setActiveLocation(l)}
                    >
                      {l}
                    </Chip>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center lg:shrink-0">
                <div className="flex items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Specialty
                  </span>
                  <select
                    value={activeSpecialty}
                    onChange={(e) => setActiveSpecialty(e.target.value)}
                    className="bg-transparent text-sm font-semibold text-slate-700 outline-none"
                    aria-label="Specialty"
                  >
                    {SPECIALTIES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Min rating
                  </span>
                  <select
                    value={minRating}
                    onChange={(e) => setMinRating(e.target.value)}
                    className="bg-transparent text-sm font-semibold text-slate-700 outline-none"
                    aria-label="Minimum rating"
                  >
                    <option value="Any">Any</option>
                    <option value="4.0">4.0+</option>
                    <option value="4.5">4.5+</option>
                    <option value="4.7">4.7+</option>
                    <option value="4.9">4.9+</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pb-14 sm:px-6 sm:pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-slate-900">
              Available Painters
            </h2>
            <span className="text-xs font-medium text-slate-500">
              {results.length} results
            </span>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => (
              <article
                key={p.id}
                className="flex flex-col rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <InitialsAvatar name={p.name} />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900">
                          {p.name}
                        </h3>
                        {p.verified ? <VerifiedIcon /> : null}
                      </div>
                      <p className="mt-0.5 text-sm text-slate-400">
                        {p.location}
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-sm">
                        <StarRow rating={p.rating} />
                        <span className="text-sm text-slate-400">
                          ({p.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.specialties.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold text-[#c2410c]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="my-5 border-t border-neutral-100" />

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-slate-400">Completed</p>
                    <p className="text-base font-bold text-slate-900">
                      {p.completedProjects} projects
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Price Range</p>
                    <p className="text-base font-bold text-slate-900">
                      NPR {formatNpr(p.priceMin)} - {formatNpr(p.priceMax)}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="rounded-xl border border-neutral-200 bg-white py-3 text-center text-sm font-bold text-slate-700 transition hover:bg-neutral-50"
                  >
                    View Profile
                  </button>
                  <Link
                    to={`/hire-painter/${p.id}`}
                    state={{ painter: p }}
                    className="rounded-xl bg-[#FF8022] py-3 text-center text-sm font-bold text-white transition hover:bg-[#e8721a]"
                  >
                    Hire Now
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#121212] px-4 py-16 text-white sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Are You a Painter?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
            Join our platform and connect with thousands of property owners
            looking for skilled painters.
          </p>
          <Link
            to="/painter-signup"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#FF8022] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#e8721a]"
          >
            Join as a Painter
          </Link>
        </div>
      </section>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PROFILE_STORAGE_KEY = "gopaint_painter_profile";

const DEFAULT_PROFILE = {
  name: "Rajesh Shrestha",
  location: "Kathmandu, Nepal",
  rating: 4.9,
  reviews: 127,
  projects: 214,
  experience: "10+ yrs",
  priceMin: "15,000",
  priceMax: "45,000",
  about:
    "Professional painter with over 10 years of experience in residential and commercial projects across the Kathmandu Valley. I specialize in interior and exterior painting, texture finishes, and decorative work. Committed to quality craftsmanship, on-time delivery, and customer satisfaction.",
  specializations: ["Interior", "Exterior", "Texture", "Decorative"],
  serviceAreas: ["Kathmandu", "Lalitpur", "Bhaktapur"],
};

const STATS = [
  { label: "Projects", value: "214", icon: "document" },
  { label: "Rating", value: "4.9", icon: "star" },
  { label: "Reviews", value: "127", icon: "message" },
  { label: "Experience", value: "10+ yrs", icon: "clock" },
];

const RECENT_REVIEWS = [
  {
    id: 1,
    name: "Priya Sharma",
    project: "3BHK Interior",
    date: "2024-04-15",
    rating: 5,
    text: "Rajesh did an excellent job on our full interior repaint. Very professional, clean work, and finished on time. Highly recommend!",
  },
  {
    id: 2,
    name: "Ramesh Karki",
    project: "2BHK Apartment",
    date: "2024-03-28",
    rating: 5,
    text: "Great attention to detail. The color suggestions were spot on. Will hire again for future projects.",
  },
];

const ALL_REVIEWS = [
  ...RECENT_REVIEWS,
  {
    id: 3,
    name: "Anita Sharma",
    project: "Living Room Repaint",
    date: "2024-03-10",
    rating: 5,
    text: "Very professional and punctual. The finish quality exceeded our expectations.",
  },
  {
    id: 4,
    name: "Sunita Thapa",
    project: "Exterior Repaint",
    date: "2024-02-20",
    rating: 4,
    text: "Quality work on our exterior. Minor delay due to weather but communicated well throughout.",
  },
];

const PORTFOLIO_ITEMS = [
  { id: 1, title: "Modern Villa Exterior", location: "Budhanilkantha" },
  { id: 2, title: "Boutique Hotel Lobby", location: "Thamel" },
  { id: 3, title: "3BHK Interior", location: "Sanepa" },
  { id: 4, title: "Restaurant Refresh", location: "Patan" },
  { id: 5, title: "Office Renovation", location: "Baneshwor" },
  { id: 6, title: "Kids Room Accent", location: "Lalitpur" },
];

const QUICK_LINKS = [
  { label: "Dashboard", href: "/painter-dashboard", icon: "grid" },
  { label: "Browse Projects", href: "/browse-projects", icon: "search" },
  { label: "My Bids", href: "/my-bids", icon: "gavel" },
];

const TABS = ["Overview", "Portfolio", "Reviews"];

function loadProfile() {
  const storedName = localStorage.getItem("fullName");
  try {
    const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (stored) {
      return { ...DEFAULT_PROFILE, ...JSON.parse(stored) };
    }
  } catch {
    /* ignore */
  }
  if (storedName) {
    return { ...DEFAULT_PROFILE, name: storedName };
  }
  return { ...DEFAULT_PROFILE };
}

function saveProfile(profile) {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
}

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function PinIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path
        d="M12 21s-6-4.35-6-10a6 6 0 1112 0c0 5.65-6 10-6 10z"
        strokeLinecap="round"
      />
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path
        d="M12 20h9M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4 12.5-12.5z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        aria-hidden
      >
        <path
          d="M5 13l4 4L19 7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Verified
    </span>
  );
}

function StarRating({ rating }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-[#FF8022]">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <path d="M12 2l2.2 6.8H21l-5.5 4 2.1 6.7-5.6-3.9-5.6 3.9 2.1-6.7L3 8.8h6.8L12 2z" />
        </svg>
      ))}
    </span>
  );
}

function StatIcon({ type }) {
  const props = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    "aria-hidden": true,
  };

  const icons = {
    document: (
      <path
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    star: (
      <path
        d="M12 2l2.2 6.8H21l-5.5 4 2.1 6.7-5.6-3.9-5.6 3.9 2.1-6.7L3 8.8h6.8L12 2z"
        fill="currentColor"
        stroke="none"
      />
    ),
    message: (
      <path
        d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" strokeLinecap="round" />
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3-3" strokeLinecap="round" />
      </>
    ),
    gavel: (
      <>
        <path d="M14 4l6 6M8 8l8 8M4 20l4-4" strokeLinecap="round" />
        <path d="M3 21l3-3" strokeLinecap="round" />
      </>
    ),
  };

  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-[#FF8022]">
      <svg {...props}>{icons[type]}</svg>
    </span>
  );
}

function ReviewItem({ review }) {
  return (
    <li className="flex gap-3 border-b border-neutral-100 py-4 last:border-0 last:pb-0">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-[#FF8022] text-sm font-bold text-white">
        {getInitials(review.name)}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-slate-900">{review.name}</p>
          <StarRating rating={review.rating} />
        </div>
        <p className="mt-0.5 text-xs text-slate-400">
          {review.project} • {review.date}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {review.text}
        </p>
      </div>
    </li>
  );
}

function EditProfileModal({ open, profile, onClose, onSave }) {
  const [form, setForm] = useState(profile);

  useEffect(() => {
    if (open) setForm(profile);
  }, [open, profile]);

  if (!open) return null;

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSave({
      ...form,
      name: form.name.trim(),
      location: form.location.trim(),
      about: form.about.trim(),
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-profile-title"
    >
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-xl sm:p-6">
        <h2
          id="edit-profile-title"
          className="text-lg font-bold text-slate-900"
        >
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="painter-name"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Full Name
            </label>
            <input
              id="painter-name"
              type="text"
              value={form.name}
              onChange={handleChange("name")}
              className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm outline-none focus:border-[#FF8022] focus:ring-2 focus:ring-[#FF8022]/20"
              required
            />
          </div>
          <div>
            <label
              htmlFor="painter-location"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Location
            </label>
            <input
              id="painter-location"
              type="text"
              value={form.location}
              onChange={handleChange("location")}
              className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm outline-none focus:border-[#FF8022] focus:ring-2 focus:ring-[#FF8022]/20"
            />
          </div>
          <div>
            <label
              htmlFor="painter-about"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              About
            </label>
            <textarea
              id="painter-about"
              rows={4}
              value={form.about}
              onChange={handleChange("about")}
              className="w-full resize-none rounded-xl border border-neutral-200 px-4 py-2.5 text-sm outline-none focus:border-[#FF8022] focus:ring-2 focus:ring-[#FF8022]/20"
            />
          </div>
          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-neutral-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#FF8022] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e8721a]"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function OverviewContent({ profile }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
      <div className="space-y-6 lg:col-span-2">
        <section className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-bold text-slate-900">About</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {profile.about}
          </p>
        </section>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-neutral-100 bg-white p-4 shadow-sm"
            >
              <StatIcon type={stat.icon} />
              <p className="mt-3 text-xl font-bold text-slate-900">
                {stat.value}
              </p>
              <p className="mt-0.5 text-xs font-medium text-slate-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <section className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-bold text-slate-900">Recent Reviews</h2>
          <ul className="mt-2">
            {RECENT_REVIEWS.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </ul>
        </section>
      </div>

      <aside className="space-y-6">
        <section className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-bold text-slate-900">Price Range</h2>
          <p className="mt-3 text-xl font-bold text-slate-900">
            NPR {profile.priceMin} – {profile.priceMax}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Per project, varies by scope
          </p>
        </section>

        <section className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-bold text-slate-900">Service Areas</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {profile.serviceAreas.map((area) => (
              <span
                key={area}
                className="rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-medium text-slate-600"
              >
                {area}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-bold text-slate-900">Quick Links</h2>
          <ul className="mt-3 space-y-1">
            {QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-neutral-50"
                >
                  <StatIcon type={link.icon} />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </div>
  );
}

function PortfolioContent() {
  return (
    <section className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-base font-bold text-slate-900">Portfolio</h2>
      <p className="mt-1 text-sm text-slate-500">
        Showcase of completed painting projects
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PORTFOLIO_ITEMS.map((item) => (
          <article
            key={item.id}
            className="overflow-hidden rounded-xl border border-neutral-100"
          >
            <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-orange-100 via-amber-50 to-teal-50">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FF8022"
                strokeWidth="1.25"
                aria-hidden
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <circle cx="8.5" cy="10.5" r="1.5" fill="#FF8022" stroke="none" />
                <path d="M21 15l-5-5L5 19" strokeLinecap="round" />
              </svg>
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-0.5 text-xs text-slate-500">{item.location}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ReviewsContent() {
  return (
    <section className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-base font-bold text-slate-900">All Reviews</h2>
      <p className="mt-1 text-sm text-slate-500">
        {ALL_REVIEWS.length} reviews from clients
      </p>
      <ul className="mt-4">
        {ALL_REVIEWS.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>
    </section>
  );
}

export default function PainterProfile() {
  const [profile, setProfile] = useState(loadProfile);
  const [activeTab, setActiveTab] = useState("Overview");
  const [editOpen, setEditOpen] = useState(false);

  const handleSaveProfile = (updated) => {
    setProfile(updated);
    saveProfile(updated);
    localStorage.setItem("fullName", updated.name);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 font-heading sm:px-6 lg:px-8 lg:py-8">
      <section className="mb-6 rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <div
              className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-200 via-orange-100 to-teal-100 text-2xl font-bold text-slate-600 shadow-inner sm:h-28 sm:w-28"
              aria-hidden
            >
              {getInitials(profile.name)}
            </div>
            <div className="text-center sm:text-left">
              <div className="flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap">
                <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  {profile.name}
                </h1>
                <VerifiedBadge />
              </div>
              <p className="mt-2 flex items-center justify-center gap-1.5 text-sm text-slate-500 sm:justify-start">
                <PinIcon />
                {profile.location}
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm sm:justify-start">
                <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                  <StarRating rating={5} />
                  <span>
                    {profile.rating}{" "}
                    <span className="font-normal text-slate-500">
                      ({profile.reviews} reviews)
                    </span>
                  </span>
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600">
                  {profile.projects} projects completed
                </span>
              </div>
              <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                {profile.specializations.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-[#FF8022]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setEditOpen(true)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#FF8022] bg-white px-5 py-2.5 text-sm font-semibold text-[#FF8022] transition hover:bg-orange-50 sm:w-auto"
          >
            <EditIcon />
            Edit Profile
          </button>
        </div>
      </section>

      <div className="-mx-1 mb-6 flex gap-2 overflow-x-auto px-1 pb-1">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition ${
              activeTab === tab
                ? "bg-[#FF8022] text-white shadow-sm"
                : "text-slate-600 hover:bg-neutral-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Overview" && <OverviewContent profile={profile} />}
      {activeTab === "Portfolio" && <PortfolioContent />}
      {activeTab === "Reviews" && <ReviewsContent />}

      <EditProfileModal
        open={editOpen}
        profile={profile}
        onClose={() => setEditOpen(false)}
        onSave={handleSaveProfile}
      />
    </div>
  );
}

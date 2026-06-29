import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header, { clearLoggedIn } from "../../components/user/Header";
import Footer from "../../components/user/Footer";

const PROFILE_STORAGE_KEY = "gopaint_user_profile";

const DEFAULT_PROFILE = {
  name: "Priya Sharma",
  location: "Baneshwor, Kathmandu",
  email: "priya.sharma@email.com",
  phone: "+977 98XXXXXXXX",
  about:
    "Homeowner looking to renovate my 3BHK apartment. Love warm, earthy tones and modern design.",
};

const STATS = [
  { label: "Projects", value: "5", icon: "document" },
  { label: "Completed", value: "3", icon: "check" },
  { label: "Saved Colors", value: "18", icon: "palette" },
  { label: "Palettes", value: "5", icon: "grid" },
];

const RECENT_ACTIVITY = [
  {
    icon: "document",
    title: "Posted a new project",
    detail: "Living Room & Master Bedroom Repaint",
    time: "2 days ago",
  },
  {
    icon: "heart",
    title: "Saved a color palette",
    detail: "Himalayan Sunrise",
    time: "3 days ago",
  },
  {
    icon: "gavel",
    title: "Received a bid",
    detail: "From Suman Tamang – NPR 28,000",
    time: "4 days ago",
  },
  {
    icon: "check",
    title: "Completed a project",
    detail: "Exterior Repaint – Bhaktapur",
    time: "2 weeks ago",
  },
];

const QUICK_LINKS = [
  { label: "My Projects", href: "/user-projects", icon: "document" },
  { label: "My Colors", href: "/colors", icon: "heart" },
  { label: "Visualizations", href: "/#visualize", icon: "monitor" },
  { label: "AI Designs", href: "/#ai-design", icon: "star" },
];

function loadProfile() {
  try {
    const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (stored) return { ...DEFAULT_PROFILE, ...JSON.parse(stored) };
  } catch {
    /* ignore */
  }
  return { ...DEFAULT_PROFILE };
}

function saveProfile(profile) {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
}

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function ActivityIcon({ type, className }) {
  const icons = {
    document: (
      <path
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
        stroke="currentColor"
        strokeWidth="1.75"
        fill="none"
      />
    ),
    heart: (
      <path
        d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
        stroke="currentColor"
        strokeWidth="1.75"
        fill="none"
      />
    ),
    gavel: (
      <>
        <path
          d="M14 4l6 6M8 8l8 8M4 20l4-4"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <path
          d="M3 21l3-3"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </>
    ),
    check: (
      <path
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        stroke="currentColor"
        strokeWidth="1.75"
        fill="none"
      />
    ),
    monitor: (
      <>
        <rect
          x="2"
          y="4"
          width="20"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.75"
          fill="none"
        />
        <path d="M8 20h8M12 18v2" stroke="currentColor" strokeWidth="1.75" />
      </>
    ),
    star: (
      <path
        d="M12 2l2.2 6.8H21l-5.5 4 2.1 6.7-5.6-3.9-5.6 3.9 2.1-6.7L3 8.8h6.8L12 2z"
        stroke="currentColor"
        strokeWidth="1.75"
        fill="none"
      />
    ),
    lock: (
      <>
        <rect
          x="5"
          y="11"
          width="14"
          height="10"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.75"
          fill="none"
        />
        <path
          d="M8 11V8a4 4 0 018 0v3"
          stroke="currentColor"
          strokeWidth="1.75"
          fill="none"
        />
      </>
    ),
    bell: (
      <path
        d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
        stroke="currentColor"
        strokeWidth="1.75"
        fill="none"
      />
    ),
    logout: (
      <>
        <path
          d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </>
    ),
    palette: (
      <>
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="1.75"
          fill="none"
        />
        <circle cx="8" cy="10" r="1.25" fill="currentColor" />
        <circle cx="14" cy="8" r="1.25" fill="currentColor" />
        <circle cx="16" cy="14" r="1.25" fill="currentColor" />
      </>
    ),
    grid: (
      <>
        <rect
          x="3"
          y="3"
          width="7"
          height="7"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.75"
          fill="none"
        />
        <rect
          x="14"
          y="3"
          width="7"
          height="7"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.75"
          fill="none"
        />
        <rect
          x="3"
          y="14"
          width="7"
          height="7"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.75"
          fill="none"
        />
        <rect
          x="14"
          y="14"
          width="7"
          height="7"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.75"
          fill="none"
        />
      </>
    ),
  };

  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      {icons[type]}
    </svg>
  );
}

function StatIcon({ type }) {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-[#FF8022]">
      <ActivityIcon type={type} className="h-5 w-5" />
    </span>
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
    if (!form.name.trim() || !form.email.trim()) return;
    onSave({
      name: form.name.trim(),
      location: form.location.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
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
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-xl sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2
            id="edit-profile-title"
            className="font-heading text-lg font-bold text-slate-900"
          >
            Edit Profile
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-neutral-100 hover:text-slate-600"
            aria-label="Close"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="profile-name"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Full name
            </label>
            <input
              id="profile-name"
              type="text"
              value={form.name}
              onChange={handleChange("name")}
              className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-[#FF8022]"
              required
            />
          </div>
          <div>
            <label
              htmlFor="profile-location"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Location
            </label>
            <input
              id="profile-location"
              type="text"
              value={form.location}
              onChange={handleChange("location")}
              className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-[#FF8022]"
            />
          </div>
          <div>
            <label
              htmlFor="profile-email"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              id="profile-email"
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-[#FF8022]"
              required
            />
          </div>
          <div>
            <label
              htmlFor="profile-phone"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Phone
            </label>
            <input
              id="profile-phone"
              type="tel"
              value={form.phone}
              onChange={handleChange("phone")}
              className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-[#FF8022]"
            />
          </div>
          <div>
            <label
              htmlFor="profile-about"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              About
            </label>
            <textarea
              id="profile-about"
              rows={4}
              value={form.about}
              onChange={handleChange("about")}
              className="w-full resize-none rounded-xl border border-neutral-200 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-[#FF8022]"
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

export default function UserProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(loadProfile);
  const [editOpen, setEditOpen] = useState(false);

  const handleSaveProfile = (updated) => {
    setProfile(updated);
    saveProfile(updated);
  };

  const handleSignOut = () => {
    clearLoggedIn();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F8F9FA]">
      <Header forceScrolled />

      <main className="flex-1 pt-20">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {/* Profile header card */}
          <section className="mb-6 rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm sm:p-6 lg:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
                <span
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 via-orange-400 to-amber-300 text-2xl font-bold text-white shadow-md sm:h-24 sm:w-24"
                  aria-hidden
                >
                  {getInitials(profile.name)}
                </span>
                <div className="text-center sm:text-left">
                  <h1 className="font-heading text-xl font-bold text-slate-900 sm:text-2xl">
                    {profile.name}
                  </h1>
                  <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-slate-500 sm:justify-start">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="shrink-0 text-slate-400"
                      aria-hidden
                    >
                      <path
                        d="M12 21s7-4.5 7-10a7 7 0 10-14 0c0 5.5 7 10 7 10z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="12" cy="11" r="2.5" />
                    </svg>
                    {profile.location}
                  </p>
                  <div className="mt-3 space-y-1">
                    <p className="flex items-center justify-center gap-2 text-sm text-slate-600 sm:justify-start">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="shrink-0 text-slate-400"
                        aria-hidden
                      >
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="M3 7l9 6 9-6" />
                      </svg>
                      {profile.email}
                    </p>
                    <p className="flex items-center justify-center gap-2 text-sm text-slate-600 sm:justify-start">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="shrink-0 text-slate-400"
                        aria-hidden
                      >
                        <path
                          d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {profile.phone}
                    </p>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditOpen(true)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-[#FF8022] bg-white px-5 py-2.5 text-sm font-semibold text-[#FF8022] transition hover:bg-orange-50 sm:w-auto"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path
                    d="M12 20h9M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Edit Profile
              </button>
            </div>
          </section>

          <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
            {/* Main column */}
            <div className="space-y-6 lg:col-span-2">
              {/* About */}
              <section className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="mb-3 font-heading text-base font-bold text-slate-900 sm:text-lg">
                  About
                </h2>
                <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                  {profile.about}
                </p>
              </section>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-neutral-100 bg-white p-4 shadow-sm"
                  >
                    <StatIcon type={stat.icon} />
                    <p className="mt-3 font-heading text-2xl font-bold text-[#FF8022]">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-slate-500 sm:text-sm">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <section className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="mb-4 font-heading text-base font-bold text-slate-900 sm:text-lg">
                  Recent Activity
                </h2>
                <ul className="space-y-4">
                  {RECENT_ACTIVITY.map((item) => (
                    <li
                      key={`${item.title}-${item.time}`}
                      className="flex gap-3 sm:gap-4"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50 text-[#FF8022]">
                        <ActivityIcon type={item.icon} className="h-[18px] w-[18px]" />
                      </span>
                      <div className="min-w-0 flex-1 border-b border-neutral-100 pb-4 last:border-0 last:pb-0">
                        <p className="text-sm font-semibold text-slate-900">
                          {item.title}
                        </p>
                        <p className="mt-0.5 truncate text-sm text-slate-600">
                          {item.detail}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">{item.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <section className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="mb-4 font-heading text-base font-bold text-slate-900">
                  Quick Links
                </h2>
                <ul className="space-y-1">
                  {QUICK_LINKS.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-neutral-50 hover:text-[#FF8022]"
                      >
                        <ActivityIcon
                          type={link.icon}
                          className="h-[18px] w-[18px] text-slate-400"
                        />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="mb-4 font-heading text-base font-bold text-slate-900">
                  Account
                </h2>
                <ul className="space-y-1">
                  <li>
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-neutral-50 hover:text-[#FF8022]"
                    >
                      <ActivityIcon
                        type="lock"
                        className="h-[18px] w-[18px] text-slate-400"
                      />
                      Change Password
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-neutral-50 hover:text-[#FF8022]"
                    >
                      <ActivityIcon
                        type="bell"
                        className="h-[18px] w-[18px] text-slate-400"
                      />
                      Notification Settings
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                      <ActivityIcon
                        type="logout"
                        className="h-[18px] w-[18px] text-red-500"
                      />
                      Sign Out
                    </button>
                  </li>
                </ul>
              </section>
            </aside>
          </div>
        </div>
      </main>

      <Footer />

      <EditProfileModal
        open={editOpen}
        profile={profile}
        onClose={() => setEditOpen(false)}
        onSave={handleSaveProfile}
      />
    </div>
  );
}

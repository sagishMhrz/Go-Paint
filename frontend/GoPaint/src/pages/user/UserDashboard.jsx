import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";
import axios from "axios";

const STATS = [
  {
    label: "Active Projects",
    value: "0",
    sub: "+0 this week",
    iconBg: "bg-orange-100",
    iconColor: "text-[#FF8022]",
    icon: "folder",
  },
  {
    label: "Completed Projects",
    value: "0",
    sub: "All time",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    icon: "check",
  },
  {
    label: "Total Spent",
    value: "NPR 0",
    sub: "Across all projects",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    icon: "wallet",
  },
  {
    label: "Saved Colors",
    value: "18",
    sub: "+3 this week",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-500",
    icon: "heart",
  },
  {
    label: "Palettes Created",
    value: "5",
    sub: "Custom palettes",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    icon: "palette",
  },
  {
    label: "Visualizations",
    value: "4",
    sub: "Saved designs",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
    icon: "image",
  },
];

const PROJECT_FILTERS = ["All", "Bidding", "In Progress", "Completed"];

const RECENT_BIDS = [
  {
    name: "Rajesh Shrestha",
    rating: 4,
    amount: "NPR 32,000",
    time: "6 days ago",
    initials: "RS",
  },
  {
    name: "Suman Tamang",
    rating: 5,
    amount: "NPR 28,500",
    time: "4 days ago",
    initials: "ST",
  },
  {
    name: "Bikash Gurung",
    rating: 4,
    amount: "NPR 35,000",
    time: "2 days ago",
    initials: "BG",
  },
];

const PALETTES = [
  {
    name: "Living Room Palette",
    colors: ["#C4714A", "#F4A97F", "#F5ECD7", "#D4A5A5"],
    ago: "2 days ago",
  },
  {
    name: "Bedroom Calm",
    colors: ["#8FAF8A", "#C5BBD8", "#F5ECD7", "#3D4A5C"],
    ago: "5 days ago",
  },
  {
    name: "Kitchen Warmth",
    colors: ["#E8735A", "#F7E8B0", "#F5ECD7", "#5A5A5A"],
    ago: "1 week ago",
  },
  {
    name: "Office Focus",
    colors: ["#3D4A5C", "#5A5A5A", "#A8C5D8", "#F5ECD7"],
    ago: "2 weeks ago",
  },
];

const NOTIFICATIONS = [
  {
    icon: "bid",
    text: "Suman Tamang submitted a bid on",
    project: "Living Room & Master Bedroom Repaint",
    time: "2 hours ago",
    unread: true,
  },
  {
    icon: "progress",
    text: "Your project reached 60% completion",
    project: "Full Apartment Interior – 2BHK",
    time: "1 day ago",
    unread: true,
  },
  {
    icon: "star",
    text: "New painter review available for",
    project: "Exterior Repaint – 2 Storey House",
    time: "3 days ago",
    unread: false,
  },
  {
    icon: "bell",
    text: "Reminder: Review pending bids on",
    project: "Kids Room Accent Wall",
    time: "5 days ago",
    unread: false,
  },
];

const VISUALIZATIONS = [
  {
    title: "Living Room Viz",
    gradient: "from-amber-200 via-orange-100 to-rose-100",
  },
  {
    title: "Bedroom Viz",
    gradient: "from-violet-200 via-purple-100 to-indigo-100",
  },
  {
    title: "Kitchen Viz",
    gradient: "from-lime-200 via-green-100 to-emerald-100",
  },
  { title: "Office Viz", gradient: "from-slate-300 via-slate-200 to-zinc-100" },
];

const QUICK_ACTIONS = [
  {
    title: "Post New Project",
    desc: "Get bids from painters",
    bg: "bg-[#FF8022] hover:bg-[#e8721a]",
    icon: "plus",
    href: "/new-project",
  },
  {
    title: "AI Design",
    desc: "Generate room ideas",
    bg: "bg-[#1a1a1a] hover:bg-black",
    icon: "star",
  },
  {
    title: "Visualize Room",
    desc: "Preview paint colors",
    bg: "bg-amber-400 hover:bg-amber-500",
    icon: "monitor",
  },
  {
    title: "Explore Colors",
    desc: "Browse color library",
    bg: "bg-pink-500 hover:bg-pink-600",
    icon: "palette",
    href: "/colors",
  },
];

function StatIcon({ type, className }) {
  const icons = {
    folder: (
      <path
        d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
        stroke="currentColor"
        strokeWidth="1.75"
        fill="none"
      />
    ),
    check: (
      <path
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        stroke="currentColor"
        strokeWidth="1.75"
        fill="none"
      />
    ),
    wallet: (
      <>
        <rect
          x="2"
          y="6"
          width="20"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.75"
          fill="none"
        />
        <path d="M2 10h20" stroke="currentColor" strokeWidth="1.75" />
      </>
    ),
    heart: (
      <path
        d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
        stroke="currentColor"
        strokeWidth="1.75"
        fill="none"
      />
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
    image: (
      <>
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.75"
          fill="none"
        />
        <circle cx="8.5" cy="10" r="1.5" fill="currentColor" />
        <path
          d="M21 15l-5-5L5 19"
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
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      {icons[type]}
    </svg>
  );
}

function StarRating({ rating }) {
  return (
    <span
      className="inline-flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={i <= rating ? "#FBBF24" : "none"}
          stroke={i <= rating ? "#FBBF24" : "#D1D5DB"}
          strokeWidth="1.5"
          aria-hidden
        >
          <path d="M12 2l2.2 6.8H21l-5.5 4 2.1 6.7-5.6-3.9-5.6 3.9 2.1-6.7L3 8.8h6.8L12 2z" />
        </svg>
      ))}
    </span>
  );
}

export default function UserDashboard() {
  const navigate = useNavigate();
  const [projectFilter, setProjectFilter] = useState("All");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
      return;
    }
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/projects/user/${userId}`);
        setProjects(response.data);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [navigate]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Bidding":
      case "In Progress":
        return "bg-orange-50 text-[#FF8022] border-orange-200";
      case "Completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  const filteredProjects =
    projectFilter === "All"
      ? projects
      : projects.filter((p) => p.status === projectFilter);

  return (
    <div className="flex min-h-screen flex-col bg-[#F3F4F6]">
      <Header forceScrolled />

      <main className="flex-1 pt-20">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <nav className="mb-5 text-sm text-slate-500" aria-label="Breadcrumb">
            <Link to="/" className="transition hover:text-[#FF8022]">
              Home
            </Link>
            <span className="mx-2 text-slate-300">/</span>
            <span className="font-medium text-slate-800">Dashboard</span>
          </nav>

          {/* Stats row */}
          <div className="-mx-4 mb-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 xl:grid-cols-6">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="min-w-[140px] shrink-0 snap-start rounded-xl border border-neutral-100 bg-white p-4 shadow-sm sm:min-w-0"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      {stat.label}
                    </p>
                    <p className="mt-1 font-heading text-xl font-bold text-slate-900">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-emerald-600">
                      {stat.sub}
                    </p>
                  </div>
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${stat.iconBg}`}
                  >
                    <StatIcon type={stat.icon} className={stat.iconColor} />
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
            {/* Main column */}
            <div className="space-y-6 lg:col-span-2">
              {/* My Projects */}
              <section
                id="projects"
                className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm sm:p-6"
              >
                <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="font-heading text-lg font-bold text-slate-900">
                    My Projects
                  </h2>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="flex flex-wrap gap-1.5">
                      {PROJECT_FILTERS.map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setProjectFilter(f)}
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                            projectFilter === f
                              ? "bg-[#FF8022] text-white shadow-sm"
                              : "bg-neutral-100 text-slate-600 hover:bg-neutral-200"
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                    <Link
                      to="/new-project"
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#FF8022] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e8721a]"
                    >
                      <span className="text-lg leading-none">+</span>
                      New Project
                    </Link>
                  </div>
                </div>

                <ul className="space-y-4">
                  {loading ? (
                    <li className="text-center py-10 text-slate-500">Loading projects...</li>
                  ) : filteredProjects.length === 0 ? (
                    <li className="text-center py-10 text-slate-500">No projects yet. Create your first one!</li>
                  ) : (
                    filteredProjects.map((project) => (
                      <li
                        key={project.id}
                        className="rounded-xl border border-neutral-100 bg-neutral-50/50 p-4 transition hover:border-neutral-200 sm:p-5"
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-heading text-sm font-bold text-slate-900 sm:text-base">
                                {project.title}
                              </h3>
                              <span
                                className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getStatusClass(project.status)}`}
                              >
                                {project.status}
                              </span>
                            </div>
                            <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
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
                              {project.location}
                            </p>
                            {project.budget && (
                              <p className="mt-1 text-xs text-slate-600">
                                <span className="font-medium">Budget:</span>{" "}
                                {project.budget}
                              </p>
                            )}
                          </div>
                          <div className="flex shrink-0 flex-wrap gap-2">
                            <Link
                              to={`/view-bids/${project.id}`}
                              className="rounded-lg border border-[#FF8022] bg-white px-3 py-2 text-xs font-semibold text-[#FF8022] transition hover:bg-orange-50"
                            >
                              View Bids
                            </Link>
                            <Link
                              to={`/view-project/${project.id}`}
                              className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-neutral-50"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </section>

              {/* Recent Bids */}
              <section className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-heading text-lg font-bold text-slate-900">
                    Recent Bids
                  </h2>
                  <button
                    type="button"
                    className="text-sm font-semibold text-[#FF8022] hover:underline"
                  >
                    View All
                  </button>
                </div>
                <ul className="divide-y divide-neutral-100">
                  {RECENT_BIDS.map((bid) => (
                    <li
                      key={bid.name}
                      className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-200 to-slate-300 text-xs font-bold text-slate-700">
                          {bid.initials}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {bid.name}
                          </p>
                          <StarRating rating={bid.rating} />
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-4 sm:justify-end">
                        <div className="text-right sm:text-left">
                          <p className="text-sm font-bold text-slate-900">
                            {bid.amount}
                          </p>
                          <p className="text-xs text-slate-400">{bid.time}</p>
                        </div>
                        <button
                          type="button"
                          className="rounded-lg border border-neutral-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-neutral-50"
                        >
                          Review
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Color Palettes */}
              <section className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-heading text-lg font-bold text-slate-900">
                    My Color Palettes
                  </h2>
                  <button
                    type="button"
                    className="text-sm font-semibold text-[#FF8022] hover:underline"
                  >
                    Manage Palettes
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {PALETTES.map((palette) => (
                    <div
                      key={palette.name}
                      className="rounded-xl border border-neutral-100 p-3 transition hover:border-neutral-200 hover:shadow-sm"
                    >
                      <div className="flex gap-1">
                        {palette.colors.map((c) => (
                          <span
                            key={c}
                            className="h-8 flex-1 rounded-md first:rounded-l-lg last:rounded-r-lg"
                            style={{ backgroundColor: c }}
                            aria-hidden
                          />
                        ))}
                      </div>
                      <p className="mt-2 text-sm font-semibold text-slate-800">
                        {palette.name}
                      </p>
                      <p className="text-xs text-slate-400">{palette.ago}</p>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-neutral-200 py-3 text-sm font-semibold text-slate-600 transition hover:border-[#FF8022] hover:text-[#FF8022]"
                >
                  <span className="text-lg leading-none">+</span>
                  Create New Palette
                </button>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Quick Actions */}
              <section className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm sm:p-5">
                <h2 className="mb-4 font-heading text-base font-bold text-slate-900">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {QUICK_ACTIONS.map((action) => {
                    const inner = (
                      <>
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20">
                          {action.icon === "plus" && (
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              aria-hidden
                            >
                              <path
                                d="M12 5v14M5 12h14"
                                strokeLinecap="round"
                              />
                            </svg>
                          )}
                          {action.icon === "star" && (
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="#fff"
                              aria-hidden
                            >
                              <path d="M12 2l2.2 6.8H21l-5.5 4 2.1 6.7-5.6-3.9-5.6 3.9 2.1-6.7L3 8.8h6.8L12 2z" />
                            </svg>
                          )}
                          {action.icon === "monitor" && (
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              aria-hidden
                            >
                              <rect x="2" y="4" width="20" height="14" rx="2" />
                              <path d="M8 20h8M12 18v2" strokeLinecap="round" />
                            </svg>
                          )}
                          {action.icon === "palette" && (
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              aria-hidden
                            >
                              <circle cx="12" cy="12" r="9" />
                              <circle
                                cx="8"
                                cy="10"
                                r="1"
                                fill="currentColor"
                              />
                              <circle
                                cx="14"
                                cy="8"
                                r="1"
                                fill="currentColor"
                              />
                              <circle
                                cx="16"
                                cy="14"
                                r="1"
                                fill="currentColor"
                              />
                            </svg>
                          )}
                        </span>
                        <span className="mt-2 block text-sm font-bold leading-tight">
                          {action.title}
                        </span>
                        <span className="mt-0.5 block text-[10px] leading-snug opacity-90">
                          {action.desc}
                        </span>
                      </>
                    );
                    const className = `${action.bg} flex min-h-[100px] flex-col rounded-xl p-3 text-left text-white shadow-sm transition`;
                    return action.href ? (
                      <Link
                        key={action.title}
                        to={action.href}
                        className={className}
                      >
                        {inner}
                      </Link>
                    ) : (
                      <button
                        key={action.title}
                        type="button"
                        className={className}
                      >
                        {inner}
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Notifications */}
              <section className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm sm:p-5">
                <div className="mb-4 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h2 className="font-heading text-base font-bold text-slate-900">
                      Notifications
                    </h2>
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FF8022] px-1.5 text-[10px] font-bold text-white">
                      2
                    </span>
                  </div>
                  <button
                    type="button"
                    className="text-xs font-semibold text-[#FF8022] hover:underline"
                  >
                    Mark all read
                  </button>
                </div>
                <ul className="space-y-3">
                  {NOTIFICATIONS.map((n, i) => (
                    <li
                      key={i}
                      className="flex gap-3 border-b border-neutral-50 pb-3 last:border-0 last:pb-0"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-slate-500">
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
                            d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs leading-relaxed text-slate-600">
                          {n.text}{" "}
                          <span className="font-semibold text-[#FF8022]">
                            {n.project}
                          </span>
                        </p>
                        <p className="mt-0.5 text-[10px] text-slate-400">
                          {n.time}
                        </p>
                      </div>
                      {n.unread && (
                        <span
                          className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#FF8022]"
                          aria-label="Unread"
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </section>

              {/* AI Design promo */}
              <section
                id="ai-design"
                className="rounded-2xl bg-gradient-to-br from-[#2d2419] to-[#1a1510] p-5 text-white shadow-md"
              >
                <div className="flex items-start gap-2">
                  <h2 className="font-heading text-base font-bold">
                    Try AI Design
                  </h2>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="#FF8022"
                    aria-hidden
                  >
                    <path d="M12 2l2.2 6.8H21l-5.5 4 2.1 6.7-5.6-3.9-5.6 3.9 2.1-6.7L3 8.8h6.8L12 2z" />
                  </svg>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-white/75">
                  Generate stunning room designs with AI. Upload a photo and get
                  personalized color recommendations.
                </p>
                <button
                  type="button"
                  className="mt-4 w-full rounded-lg bg-[#FF8022] py-2.5 text-sm font-semibold text-white transition hover:bg-[#e8721a]"
                >
                  Generate Design
                </button>
              </section>

              {/* Saved Visualizations */}
              <section
                id="visualize"
                className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-heading text-base font-bold text-slate-900">
                    Saved Visualizations
                  </h2>
                  <button
                    type="button"
                    className="text-xs font-semibold text-[#FF8022] hover:underline"
                  >
                    View All
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {VISUALIZATIONS.map((viz) => (
                    <button
                      key={viz.title}
                      type="button"
                      className={`relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br ${viz.gradient}`}
                    >
                      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-2 py-2 text-left text-[10px] font-semibold text-white sm:text-xs">
                        {viz.title}
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

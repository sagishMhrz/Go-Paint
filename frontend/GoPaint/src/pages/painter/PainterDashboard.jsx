import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ASSIGNED_PROJECTS = [
  {
    id: 1,
    title: "Living Room & Master Bedroom Repaint",
    status: "In Progress",
    statusClass: "bg-orange-50 text-[#FF8022] border-orange-200",
    client: "Anita Sharma",
    dueDate: "Mar 28, 2026",
    price: "NPR 32,000",
    progress: 45,
  },
  {
    id: 2,
    title: "Full Apartment Interior – 2BHK",
    status: "In Progress",
    statusClass: "bg-orange-50 text-[#FF8022] border-orange-200",
    client: "Ramesh Karki",
    dueDate: "Apr 5, 2026",
    price: "NPR 48,000",
    progress: 70,
  },
  {
    id: 3,
    title: "Exterior Repaint – 2 Storey House",
    status: "Completed",
    statusClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    client: "Sunita Thapa",
    dueDate: "Feb 14, 2026",
    price: "NPR 55,000",
  },
];

const BID_FILTERS = ["All", "Pending", "Shortlisted", "Awarded", "Rejected"];

const MY_BIDS = [
  {
    id: 1,
    title: "Kids Room Accent Wall",
    status: "Pending",
    statusClass: "bg-slate-100 text-slate-600 border-slate-200",
    client: "Priya Maharjan",
    date: "Mar 10, 2026",
    amount: "NPR 12,500",
    action: "Edit Bid",
    filter: "Pending",
  },
  {
    id: 2,
    title: "Office Space Renovation",
    status: "Shortlisted",
    statusClass: "bg-amber-50 text-amber-700 border-amber-200",
    client: "Himal Tech Pvt. Ltd.",
    date: "Mar 8, 2026",
    amount: "NPR 85,000",
    action: "View Project",
    filter: "Shortlisted",
  },
  {
    id: 3,
    title: "Restaurant Interior Refresh",
    status: "Awarded",
    statusClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    client: "Kathmandu Bites",
    date: "Mar 1, 2026",
    amount: "NPR 120,000",
    action: "View Project",
    filter: "Awarded",
  },
  {
    id: 4,
    title: "Balcony & Terrace Paint",
    status: "Rejected",
    statusClass: "bg-red-50 text-red-600 border-red-200",
    client: "Nabin Rai",
    date: "Feb 25, 2026",
    amount: "NPR 18,000",
    action: "View Project",
    filter: "Rejected",
  },
];

const AVAILABLE_PROJECTS = [
  {
    id: 1,
    title: "Modern Villa Exterior Paint",
    location: "Budhanilkantha, Kathmandu",
    budget: "NPR 60,000 – 80,000",
    bids: 4,
    dueDate: "Bidding closes Mar 20",
    description: "Full exterior repaint for a 3-storey modern villa. Includes prep work.",
  },
  {
    id: 2,
    title: "Boutique Hotel Lobby",
    location: "Thamel, Kathmandu",
    budget: "NPR 150,000 – 200,000",
    bids: 8,
    dueDate: "Bidding closes Mar 22",
    description: "Premium finish required. Experience with commercial spaces preferred.",
  },
  {
    id: 3,
    title: "Residential Kitchen & Dining",
    location: "Patan, Lalitpur",
    budget: "NPR 22,000 – 30,000",
    bids: 2,
    dueDate: "Bidding closes Mar 18",
    description: "Kitchen and dining area repaint with moisture-resistant paint.",
  },
];

const RECENT_REVIEWS = [
  {
    id: 1,
    name: "Anita Sharma",
    project: "Living Room Repaint",
    date: "Mar 5, 2026",
    rating: 5,
    text: "Rajesh did an excellent job! Very professional, clean work, and finished on time. Highly recommend.",
  },
  {
    id: 2,
    name: "Ramesh Karki",
    project: "2BHK Apartment",
    date: "Feb 28, 2026",
    rating: 5,
    text: "Great attention to detail. The color suggestions were spot on. Will hire again for future projects.",
  },
  {
    id: 3,
    name: "Sunita Thapa",
    project: "Exterior Repaint",
    date: "Feb 15, 2026",
    rating: 4,
    text: "Quality work on our exterior. Minor delay due to weather but communicated well throughout.",
  },
];

const SIDEBAR_STATS = [
  {
    label: "Active Bids",
    value: "5",
    iconBg: "bg-orange-100",
    iconColor: "text-[#FF8022]",
    icon: "bid",
  },
  {
    label: "Assigned Projects",
    value: "3",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    icon: "folder",
  },
  {
    label: "Completed",
    value: "47",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    icon: "check",
  },
  {
    label: "Rating",
    value: "4.8★",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    icon: "star",
  },
  {
    label: "Response Rate",
    value: "96%",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    icon: "clock",
  },
  {
    label: "Reviews",
    value: "89",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-500",
    icon: "message",
  },
];

const QUICK_ACTIONS = [
  { label: "Browse New Projects", icon: "search", href: "#available-projects" },
  { label: "Update Profile", icon: "user", href: "#profile" },
  { label: "Add Portfolio Photos", icon: "image", href: "#profile" },
  { label: "Notifications", icon: "bell", href: "#" },
];

function StatIcon({ type, className }) {
  const icons = {
    bid: (
      <path
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    ),
    folder: (
      <path
        d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    ),
    check: (
      <path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    star: (
      <path
        d="M12 2l2.2 6.8H21l-5.5 4 2.1 6.7-5.6-3.9-5.6 3.9 2.1-6.7L3 8.8h6.8L12 2z"
        fill="currentColor"
      />
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
        <path
          d="M12 7v5l3 2"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </>
    ),
    message: (
      <path
        d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
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

function QuickActionIcon({ type }) {
  const props = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    "aria-hidden": true,
  };

  if (type === "search") {
    return (
      <svg {...props}>
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3-3" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "user") {
    return (
      <svg {...props}>
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    );
  }
  if (type === "image") {
    return (
      <svg {...props}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="8.5" cy="10.5" r="1.5" fill="currentColor" stroke="none" />
        <path d="M21 15l-5-5L5 19" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <path
        d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
          width="14"
          height="14"
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

export default function PainterDashboard() {
  const navigate = useNavigate();
  const [bidFilter, setBidFilter] = useState("All");
  const [assignedProjects, setAssignedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
      return;
    }
    const fetchAssignedProjects = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/projects/painter/${userId}/assigned`
        );
        
        // We need to get the accepted bid amount for each project to display price
        const projectsWithBidInfo = await Promise.all(
          response.data.map(async (project) => {
            // Get all bids for this project
            const bidsResponse = await axios.get(
              `http://localhost:8080/api/bids/project/${project.id}`
            );
            // Find the accepted bid
            const acceptedBid = bidsResponse.data.find(
              (bid) => bid.status === "ACCEPTED"
            );
            
            return {
              ...project,
              client: project.user?.fullName || "Unknown Client",
              dueDate: project.timeline || "Flexible",
              price: acceptedBid ? `NPR ${acceptedBid.amount}` : "N/A",
              progress: 0, // Default progress, can be updated later
            };
          })
        );
        setAssignedProjects(projectsWithBidInfo);
      } catch (err) {
        console.error("Failed to fetch assigned projects", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignedProjects();
  }, [navigate]);

  const filteredBids =
    bidFilter === "All"
      ? MY_BIDS
      : MY_BIDS.filter((b) => b.filter === bidFilter);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 font-heading sm:px-6 lg:px-8 lg:py-8">
      <nav className="mb-6 text-sm text-slate-500" aria-label="Breadcrumb">
            <Link to="/" className="transition hover:text-[#FF8022]">
              Home
            </Link>
            <span className="mx-2 text-slate-300">/</span>
            <span className="font-medium text-slate-800">Painter Dashboard</span>
          </nav>

          <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
            {/* Main column */}
            <div className="space-y-6 lg:col-span-2">
              {/* Assigned Projects */}
              <section className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm sm:p-6">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-lg font-bold text-slate-900">
                    Assigned Projects
                  </h2>
                  <a
                    href="#available-projects"
                    className="text-sm font-semibold text-[#FF8022] hover:underline"
                  >
                    Browse More
                  </a>
                </div>
                <ul className="space-y-4">
                  {loading ? (
                    <li className="text-center py-10 text-slate-500">Loading projects...</li>
                  ) : assignedProjects.length > 0 ? (
                    assignedProjects.map((project) => {
                      const statusClass = 
                        project.status === "Completed" 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                          : "bg-orange-50 text-[#FF8022] border-orange-200";
                      return (
                        <li
                          key={project.id}
                          className="rounded-xl border border-neutral-100 bg-neutral-50/50 p-4 sm:p-5"
                        >
                          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-sm font-bold text-slate-900 sm:text-base">
                                  {project.title}
                                </h3>
                                <span
                                  className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusClass}`}
                                >
                                  {project.status}
                                </span>
                              </div>
                              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                                <span>Client: {project.client}</span>
                                <span>Due: {project.dueDate}</span>
                                <span className="font-medium text-slate-700">
                                  {project.price}
                                </span>
                              </div>
                              {project.progress != null && (
                                <div className="mt-3 max-w-md">
                                  <div className="mb-1 flex justify-between text-xs font-medium text-slate-600">
                                    <span>Progress</span>
                                    <span className="text-[#FF8022]">
                                      {project.progress}%
                                    </span>
                                  </div>
                                  <div className="h-1.5 overflow-hidden rounded-full bg-neutral-200">
                                    <div
                                      className="h-full rounded-full bg-[#FF8022] transition-all"
                                      style={{ width: `${project.progress}%` }}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="flex shrink-0 flex-wrap gap-2">
                              {project.status === "Completed" ? (
                                <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                                  <svg
                                    width="14"
                                    height="14"
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
                                  Done
                                </span>
                              ) : (
                                <>
                                  <button
                                    type="button"
                                    className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-neutral-300"
                                  >
                                    Update Progress
                                  </button>
                                  <button
                                    type="button"
                                    className="rounded-lg border border-[#FF8022] bg-white px-3 py-2 text-xs font-semibold text-[#FF8022] transition hover:bg-orange-50"
                                  >
                                    Message Client
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <li className="text-center py-10 text-slate-500">No assigned projects yet!</li>
                  )}
                </ul>
              </section>

              {/* My Bids */}
              <section
                id="my-bids"
                className="scroll-mt-28 rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm sm:p-6"
              >
                <div className="mb-5 flex flex-col gap-4">
                  <h2 className="text-lg font-bold text-slate-900">My Bids</h2>
                  <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
                    {BID_FILTERS.map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setBidFilter(f)}
                        className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                          bidFilter === f
                            ? "bg-[#FF8022] text-white shadow-sm"
                            : "bg-neutral-100 text-slate-600 hover:bg-neutral-200"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
                <ul className="space-y-4">
                  {filteredBids.map((bid) => (
                    <li
                      key={bid.id}
                      className="rounded-xl border border-neutral-100 bg-neutral-50/50 p-4 sm:p-5"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-bold text-slate-900 sm:text-base">
                              {bid.title}
                            </h3>
                            <span
                              className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${bid.statusClass}`}
                            >
                              {bid.status}
                            </span>
                          </div>
                          <p className="mt-2 text-xs text-slate-500">
                            {bid.client} · {bid.date} ·{" "}
                            <span className="font-semibold text-slate-800">
                              {bid.amount}
                            </span>
                          </p>
                        </div>
                        <button
                          type="button"
                          className={`shrink-0 rounded-lg px-4 py-2 text-xs font-semibold transition ${
                            bid.action === "Edit Bid"
                              ? "border border-[#FF8022] bg-white text-[#FF8022] hover:bg-orange-50"
                              : "border border-neutral-200 bg-white text-slate-700 hover:bg-neutral-50"
                          }`}
                        >
                          {bid.action}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Available Projects */}
              <section
                id="available-projects"
                className="scroll-mt-28 rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm sm:p-6"
              >
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <h2 className="text-lg font-bold text-slate-900">
                    Available Projects
                  </h2>
                  <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-bold text-[#FF8022]">
                    3 new
                  </span>
                </div>
                <ul className="space-y-4">
                  {AVAILABLE_PROJECTS.map((project) => (
                    <li
                      key={project.id}
                      className="rounded-xl border border-neutral-100 bg-neutral-50/50 p-4 sm:p-5"
                    >
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-bold text-slate-900 sm:text-base">
                            {project.title}
                          </h3>
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
                          <p className="mt-1 text-xs text-slate-600">
                            <span className="font-medium">Budget:</span>{" "}
                            {project.budget}
                            <span className="text-slate-400">
                              {" "}
                              · {project.bids} bids
                            </span>
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {project.dueDate}
                          </p>
                          <p className="mt-2 text-xs leading-relaxed text-slate-600">
                            {project.description}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="shrink-0 rounded-lg bg-[#FF8022] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#e8721a] sm:px-5"
                        >
                          Submit Bid
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Recent Reviews */}
              <section className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900">
                    Recent Reviews
                  </h2>
                  <button
                    type="button"
                    className="text-sm font-semibold text-[#FF8022] hover:underline"
                  >
                    View All
                  </button>
                </div>
                <ul className="divide-y divide-neutral-100">
                  {RECENT_REVIEWS.map((review) => (
                    <li
                      key={review.id}
                      className="py-4 first:pt-0 last:pb-0"
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {review.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {review.project} · {review.date}
                          </p>
                        </div>
                        <StarRating rating={review.rating} />
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {review.text}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Total Earnings */}
              <section className="rounded-2xl bg-[#1A1A1A] p-5 text-white shadow-sm sm:p-6">
                <p className="text-sm font-medium text-neutral-400">
                  Total Earnings
                </p>
                <p className="mt-1 font-heading text-3xl font-bold sm:text-4xl">
                  NPR 1245K
                </p>
                <div className="mt-4 space-y-1.5 border-t border-neutral-700 pt-4 text-sm">
                  <p className="flex justify-between text-neutral-300">
                    <span>This Month</span>
                    <span className="font-semibold text-white">NPR 85K</span>
                  </p>
                  <p className="flex justify-between text-neutral-300">
                    <span>Avg per Project</span>
                    <span className="font-semibold text-white">NPR 26K</span>
                  </p>
                </div>
              </section>

              {/* Stats grid */}
              <section className="grid grid-cols-2 gap-3">
                {SIDEBAR_STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-neutral-100 bg-white p-4 shadow-sm"
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${stat.iconBg}`}
                    >
                      <StatIcon type={stat.icon} className={stat.iconColor} />
                    </span>
                    <p className="mt-3 font-heading text-xl font-bold text-slate-900">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-slate-500">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </section>

              {/* Quick Actions */}
              <section
                id="profile"
                className="scroll-mt-28 rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm sm:p-5"
              >
                <h2 className="mb-4 text-base font-bold text-slate-900">
                  Quick Actions
                </h2>
                <ul className="space-y-1">
                  {QUICK_ACTIONS.map((action) => (
                    <li key={action.label}>
                      <a
                        href={action.href}
                        className="flex items-center justify-between rounded-lg px-2 py-3 text-sm font-medium text-slate-700 transition hover:bg-neutral-50"
                      >
                        <span className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-slate-600">
                            <QuickActionIcon type={action.icon} />
                          </span>
                          {action.label}
                        </span>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-slate-400"
                          aria-hidden
                        >
                          <path
                            d="M9 18l6-6-6-6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            </aside>
          </div>
    </div>
  );
}

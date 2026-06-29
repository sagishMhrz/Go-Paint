import { useMemo, useState, useEffect } from "react";
import axios from "axios";

function PinIcon({ className = "" }) {
  return (
    <svg
      className={className}
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

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3-3" strokeLinecap="round" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      className="text-slate-300"
      aria-hidden
    >
      <path
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" />
    </svg>
  );
}

function MetaIcon({ type }) {
  const props = {
    width: 14,
    height: 14,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    "aria-hidden": true,
  };

  if (type === "budget") {
    return (
      <svg {...props}>
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <circle cx="12" cy="12" r="2.5" />
        <path d="M6 10h.01M18 14h.01" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "posted") {
    return (
      <svg {...props}>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
        <path d="M12 14v4M10 16h4" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "due") {
    return (
      <svg {...props}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function ProjectMeta({ project }) {
  const roomLabel =
    project.rooms === 0
      ? "Exterior"
      : `${project.rooms} room${project.rooms !== 1 ? "s" : ""}`;

  const items = [
    { type: "budget", label: project.budget },
    { type: "posted", label: `Posted ${project.postedDate}` },
    { type: "due", label: `Due ${project.dueDate}` },
    { type: "rooms", label: roomLabel },
  ];

  return (
    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
      {items.map((item) => (
        <span key={item.type} className="inline-flex items-center gap-1.5">
          <MetaIcon type={item.type} />
          {item.label}
        </span>
      ))}
    </div>
  );
}

function ProjectCard({ project, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(project.id)}
      className={`w-full rounded-xl border bg-white p-4 text-left shadow-sm transition sm:p-5 ${
        isSelected
          ? "border-[#FF8022] ring-2 ring-[#FF8022]/20"
          : "border-neutral-100 hover:border-neutral-200 hover:shadow-md"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-slate-900 sm:text-base">
            {project.title}
          </h3>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
            <PinIcon />
            {project.location}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold text-[#FF8022]">
          {project.bids} bid{project.bids !== 1 ? "s" : ""}
        </span>
      </div>
      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600">
        {project.description}
      </p>
      <ProjectMeta project={project} />
    </button>
  );
}

function ProjectDetail({ project, onClose }) {
  const [bidAmount, setBidAmount] = useState("");
  const [timeline, setTimeline] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Please log in first!");
        return;
      }
      await axios.post("http://localhost:8080/api/bids", {
        amount: bidAmount.replace(/,/g, ""), // Remove commas for number format
        timeline,
        description: message,
        projectId: project.id,
        painterId: Number(userId)
      });
      setBidAmount("");
      setTimeline("");
      setMessage("");
      alert("Bid submitted successfully!");
    } catch (err) {
      console.error("Failed to submit bid", err);
      alert(err.response?.data || "Failed to submit bid. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isBiddingOpen = project.status === "Bidding";

  return (
    <div className="flex h-full flex-col rounded-2xl border border-neutral-100 bg-white shadow-sm">
      <div className="border-b border-neutral-100 p-4 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
              {project.title}
            </h2>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
              <PinIcon />
              {project.location}
            </p>
          </div>
          <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
            isBiddingOpen ? "bg-orange-50 text-[#FF8022]" : "bg-slate-100 text-slate-600"
          }`}>
            {isBiddingOpen ? `${project.bids} bid${project.bids !== 1 ? "s" : ""}` : project.status}
          </span>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="mt-3 text-sm font-medium text-slate-500 transition hover:text-slate-800 lg:hidden"
          >
            ← Back to list
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <p className="text-sm leading-relaxed text-slate-600">
          {project.description}
        </p>

        <dl className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-neutral-50 px-3 py-2.5">
            <dt className="text-xs font-medium text-slate-500">Budget</dt>
            <dd className="mt-0.5 text-sm font-semibold text-slate-900">
              {project.budget}
            </dd>
          </div>
          <div className="rounded-lg bg-neutral-50 px-3 py-2.5">
            <dt className="text-xs font-medium text-slate-500">Paint Type</dt>
            <dd className="mt-0.5 text-sm font-semibold text-slate-900">
              {project.paintType}
            </dd>
          </div>
          <div className="rounded-lg bg-neutral-50 px-3 py-2.5">
            <dt className="text-xs font-medium text-slate-500">Surface Area</dt>
            <dd className="mt-0.5 text-sm font-semibold text-slate-900">
              {project.surfaceArea}
            </dd>
          </div>
          <div className="rounded-lg bg-neutral-50 px-3 py-2.5">
            <dt className="text-xs font-medium text-slate-500">Due Date</dt>
            <dd className="mt-0.5 text-sm font-semibold text-slate-900">
              {project.dueDate}
            </dd>
          </div>
        </dl>

        <div className="mt-5 rounded-lg border border-neutral-100 bg-neutral-50/50 p-4">
          <h3 className="text-sm font-semibold text-slate-900">Client Notes</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {project.clientNotes}
          </p>
        </div>

        {isBiddingOpen ? (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Submit Your Bid</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="bid-amount"
                  className="mb-1.5 block text-xs font-medium text-slate-600"
                >
                  Your Bid (NPR)
                </label>
                <input
                  id="bid-amount"
                  type="text"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder="e.g. 45,000"
                  className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#FF8022] focus:ring-2 focus:ring-[#FF8022]/20"
                />
              </div>
              <div>
                <label
                  htmlFor="bid-timeline"
                  className="mb-1.5 block text-xs font-medium text-slate-600"
                >
                  Estimated Timeline
                </label>
                <input
                  id="bid-timeline"
                  type="text"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  placeholder="e.g. 7 days"
                  className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#FF8022] focus:ring-2 focus:ring-[#FF8022]/20"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="bid-message"
                className="mb-1.5 block text-xs font-medium text-slate-600"
              >
                Message to Client
              </label>
              <textarea
                id="bid-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your approach, materials, and experience..."
                className="w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#FF8022] focus:ring-2 focus:ring-[#FF8022]/20"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#FF8022] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e8721a] sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Submit Bid"}
            </button>
          </form>
        ) : (
          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-sm font-semibold text-slate-800">
              Bidding is closed for this project
            </p>
            <p className="mt-1 text-xs text-slate-600">
              {project.status === "In Progress" ? "This project is currently in progress." : "This project has been completed."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyDetail() {
  return (
    <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-2xl border border-neutral-100 bg-white p-8 shadow-sm sm:min-h-[360px] lg:min-h-[480px]">
      <DocumentIcon />
      <p className="mt-4 text-center text-sm text-slate-500 sm:text-base">
        Select a project to view details and bid
      </p>
    </div>
  );
}

export default function BrowseProject() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/projects");
        setProjects(response.data.map(p => ({
          ...p,
          bids: p.bids?.length || 0,
          postedDate: new Date(p.createdAt).toLocaleDateString(),
          dueDate: p.timeline || "Flexible",
          rooms: p.rooms?.length || 0,
          paintType: "Interior",
          surfaceArea: "N/A",
          clientNotes: p.description || ""
        })));
      } catch (err) {
        console.error("Failed to fetch projects", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();
    // Only show projects that are in Bidding status
    let filtered = projects.filter(p => p.status === "Bidding");
    if (query) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query) ||
          (p.description && p.description.toLowerCase().includes(query))
      );
    }
    return filtered;
  }, [search, projects]);

  const selectedProject = projects.find((p) => p.id === selectedId) ?? null;
  const showDetailOnMobile = selectedId !== null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 font-heading sm:px-6 lg:px-8 lg:py-8">
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Browse Projects
          </h1>
          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            Find painting projects in your area
          </p>
        </div>
        <div className="relative w-full sm:max-w-xs lg:max-w-sm">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <SearchIcon />
          </span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full rounded-full border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#FF8022] focus:ring-2 focus:ring-[#FF8022]/20"
            aria-label="Search projects"
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
        <div
          className={`space-y-4 lg:col-span-3 ${
            showDetailOnMobile ? "hidden lg:block" : "block"
          }`}
        >
          {loading ? (
            <div className="rounded-xl border border-neutral-100 bg-white p-8 text-center shadow-sm">
              <p className="text-sm text-slate-500">Loading projects...</p>
            </div>
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isSelected={selectedId === project.id}
                onSelect={setSelectedId}
              />
            ))
          ) : (
            <div className="rounded-xl border border-neutral-100 bg-white p-8 text-center shadow-sm">
              <p className="text-sm text-slate-500">
                No projects match your search.
              </p>
            </div>
          )}
        </div>

        <div
          className={`lg:col-span-2 ${
            showDetailOnMobile ? "block" : "hidden lg:block"
          }`}
        >
          {selectedProject ? (
            <ProjectDetail
              key={selectedProject.id}
              project={selectedProject}
              onClose={() => setSelectedId(null)}
            />
          ) : (
            <EmptyDetail />
          )}
        </div>
      </div>
    </div>
  );
}

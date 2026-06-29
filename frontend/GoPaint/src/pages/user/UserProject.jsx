import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";
import axios from "axios";

const FILTERS = ["All", "Bidding", "In Progress", "Completed"];

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

function MetaIcon({ children }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-slate-500">
      {children}
    </span>
  );
}

function getStatusClass(status) {
  switch (status) {
    case "Bidding":
      return "bg-orange-50 text-[#FF8022] border-orange-200";
    case "In Progress":
      return "bg-blue-50 text-blue-600 border-blue-200";
    case "Completed":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    default:
      return "bg-slate-100 text-slate-600 border-slate-200";
  }
}

function ProjectCard({ project, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(project)}
      className={`w-full rounded-xl border bg-white p-4 text-left shadow-sm transition sm:p-5 ${
        selected
          ? "border-[#FF8022] ring-2 ring-[#FF8022]/20"
          : "border-neutral-100 hover:border-neutral-200 hover:shadow-md"
      }`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="font-heading text-sm font-bold text-slate-900 sm:text-base">
              {project.title}
            </h3>
            <span
              className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusClass(project.status)}`}
            >
              {project.status}
            </span>
          </div>

          <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
            <PinIcon />
            {project.location}
          </p>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
            <MetaIcon>
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
                  d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
                  strokeLinecap="round"
                />
              </svg>
              {project.budget}
            </MetaIcon>
            <MetaIcon>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                aria-hidden
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
              </svg>
              {new Date(project.createdAt).toLocaleDateString()}
            </MetaIcon>
            {project.rooms && project.rooms.length > 0 && (
              <MetaIcon>
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
                    d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {project.rooms.length} {project.rooms.length === 1 ? "room" : "rooms"}
              </MetaIcon>
            )}
            <MetaIcon>
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
                  d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {project.bidsCount} bids
            </MetaIcon>
          </div>

          {project.status === "In Progress" && (
            <div className="mt-4">
              <div className="mb-1.5 flex justify-between text-xs font-medium text-slate-600">
                <span>Progress</span>
                <span className="text-[#FF8022]">0%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
                <div
                  className="h-full rounded-full bg-[#FF8022] transition-all"
                  style={{ width: "0%" }}
                />
              </div>
              {project.assignedPainter && (
                <p className="mt-2 text-xs text-slate-600">
                  Assigned to:{" "}
                  <span className="font-semibold text-slate-800">
                    {project.assignedPainter}
                  </span>
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {project.status === "Bidding" && (
        <div
          className="mt-4 flex flex-wrap gap-2 border-t border-neutral-100 pt-4"
          onClick={(e) => e.stopPropagation()}
        >
          <Link
            to={`/view-bids/${project.id}`}
            className="rounded-lg border border-[#FF8022] bg-white px-4 py-2 text-xs font-semibold text-[#FF8022] transition hover:bg-orange-50"
          >
            View Bids
          </Link>
          <Link
            to={`/view-project/${project.id}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-neutral-50"
          >
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
                d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Edit
          </Link>
        </div>
      )}
    </button>
  );
}

function ProjectDetail({ project, onClose }) {
  if (!project) {
    return (
      <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-neutral-100 bg-white p-8 text-center shadow-sm lg:min-h-[480px]">
        <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 text-slate-400">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden
          >
            <path
              d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <p className="text-sm font-medium text-slate-500">
          Select a project to view details
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <h2 className="font-heading text-lg font-bold text-slate-900">
          {project.title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-lg p-1.5 text-slate-400 transition hover:bg-neutral-100 hover:text-slate-600 lg:hidden"
          aria-label="Close project details"
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
      <span
        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusClass(project.status)}`}
      >
        {project.status}
      </span>
      <p className="mt-4 flex items-center gap-1.5 text-sm text-slate-500">
        <PinIcon />
        {project.location}
      </p>
      <dl className="mt-5 space-y-3 border-t border-neutral-100 pt-5 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">Budget</dt>
          <dd className="font-medium text-slate-800">{project.budget}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">Posted</dt>
          <dd className="font-medium text-slate-800">
            {new Date(project.createdAt).toLocaleDateString()}
          </dd>
        </div>
        {project.rooms && project.rooms.length > 0 && (
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">Rooms</dt>
            <dd className="font-medium text-slate-800">{project.rooms.length}</dd>
          </div>
        )}
        <div className="flex justify-between gap-4">
          <dt className="text-slate-500">Bids</dt>
          <dd className="font-medium text-slate-800">{project.bidsCount}</dd>
        </div>
        {project.assignedPainter && (
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">Painter</dt>
            <dd className="font-medium text-slate-800">{project.assignedPainter}</dd>
          </div>
        )}
      </dl>
      {project.description && (
        <div className="mt-5 border-t border-neutral-100 pt-5">
          <dt className="text-sm text-slate-500 mb-2">Description</dt>
          <p className="text-sm text-slate-800">{project.description}</p>
        </div>
      )}
      {project.status === "In Progress" && (
        <div className="mt-5 border-t border-neutral-100 pt-5">
          <div className="mb-1.5 flex justify-between text-xs font-medium text-slate-600">
            <span>Progress</span>
            <span className="text-[#FF8022]">0%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
            <div
              className="h-full rounded-full bg-[#FF8022]"
              style={{ width: "0%" }}
            />
          </div>
        </div>
      )}
      {project.status === "Bidding" && (
        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            to={`/view-bids/${project.id}`}
            className="flex-1 rounded-lg border border-[#FF8022] bg-white px-4 py-2.5 text-center text-sm font-semibold text-[#FF8022] transition hover:bg-orange-50 sm:flex-none"
          >
            View Bids
          </Link>
          <Link
            to={`/view-project/${project.id}`}
            className="flex-1 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-neutral-50 sm:flex-none"
          >
            Edit Project
          </Link>
        </div>
      )}
      {project.status !== "Bidding" && (
        <div className="mt-6">
          <Link
            to={`/view-project/${project.id}`}
            className="w-full rounded-lg bg-[#FF8022] px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#e8721a]"
          >
            View Details
          </Link>
        </div>
      )}
    </div>
  );
}

export default function UserProject() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
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
        const response = await axios.get(
          `http://localhost:8080/api/projects/user/${userId}`
        );

        const projectsWithDetails = await Promise.all(
          response.data.map(async (project) => {
            let bidsCount = 0;
            let assignedPainter = null;
            try {
              const bidsResponse = await axios.get(
                `http://localhost:8080/api/bids/project/${project.id}`
              );
              bidsCount = bidsResponse.data.length;
              const acceptedBid = bidsResponse.data.find(
                (bid) => bid.status === "ACCEPTED"
              );
              if (acceptedBid) {
                assignedPainter = acceptedBid.painter?.fullName || "Unknown Painter";
              }
            } catch (err) {
              console.error("Failed to fetch bids for project", project.id, err);
            }
            return { ...project, bidsCount, assignedPainter };
          })
        );

        setProjects(projectsWithDetails);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [navigate]);

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p) => p.status === filter);

  return (
    <div className="flex min-h-screen flex-col bg-[#F9FAFB]">
      <Header forceScrolled />

      <main className="flex-1 pt-20">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <nav className="mb-5 text-sm text-slate-500" aria-label="Breadcrumb">
            <Link to="/user-dashboard" className="transition hover:text-[#FF8022]">
              Dashboard
            </Link>
            <span className="mx-2 text-slate-300">/</span>
            <span className="font-medium text-slate-800">Projects</span>
          </nav>

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-heading text-2xl font-bold text-slate-900 sm:text-3xl">
                My Projects
              </h1>
              <p className="mt-1 text-sm text-slate-500 sm:text-base">
                Manage your painting projects and track progress
              </p>
            </div>
            <Link
              to="/new-project"
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#FF8022] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e8721a] sm:w-auto"
            >
              <span className="text-lg leading-none">+</span>
              New Project
            </Link>
          </div>

          <div className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                  filter === f
                    ? "bg-[#FF8022] text-white shadow-sm"
                    : "border border-neutral-200 bg-white text-slate-600 hover:border-neutral-300 hover:bg-neutral-50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
            <div className="space-y-4 lg:col-span-3">
              {loading ? (
                <div className="text-center py-10 text-slate-500">Loading projects...</div>
              ) : filteredProjects.length === 0 ? (
                <div className="rounded-xl border border-dashed border-neutral-200 bg-white p-8 text-center">
                  <p className="text-sm text-slate-500">
                    No projects match this filter.
                  </p>
                </div>
              ) : (
                filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    selected={selected?.id === project.id}
                    onSelect={setSelected}
                  />
                ))
              )}
            </div>

            <aside className="hidden lg:col-span-2 lg:block">
              <div className="sticky top-24">
                <ProjectDetail
                  project={selected}
                  onClose={() => setSelected(null)}
                />
              </div>
            </aside>
          </div>

          {selected && (
            <div className="mt-6 lg:hidden">
              <ProjectDetail
                project={selected}
                onClose={() => setSelected(null)}
              />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

import { useMemo, useState, useEffect } from "react";
import axios from "axios";

const BID_FILTERS = ["All", "PENDING", "ACCEPTED", "REJECTED"];

const STATUS_STYLES = {
  PENDING: "bg-slate-100 text-slate-600",
  ACCEPTED: "bg-emerald-50 text-emerald-700",
  REJECTED: "bg-red-50 text-red-600",
};

function EditIcon() {
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
        d="M12 20h9M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4 12.5-12.5z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ViewIcon() {
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
        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[status] ?? "bg-slate-100 text-slate-600"}`}
    >
      {status}
    </span>
  );
}

function BidActions({ status }) {
  if (status === "PENDING") {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold text-[#FF8022] transition hover:bg-orange-50 sm:text-sm"
        >
          <EditIcon />
          Edit
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-neutral-100 sm:text-sm"
        >
          <ViewIcon />
          View
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-neutral-100 sm:text-sm"
    >
      <ViewIcon />
      View
    </button>
  );
}

function BidCard({ bid }) {
  return (
    <article className="rounded-xl border border-neutral-100 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-slate-900">{bid.title}</h3>
          <p className="mt-0.5 text-xs text-slate-400">{bid.postedDate}</p>
        </div>
        <StatusBadge status={bid.status} />
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-xs font-medium text-slate-400">Client</dt>
          <dd className="mt-0.5 font-medium text-slate-700">{bid.client}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-slate-400">Bid Amount</dt>
          <dd className="mt-0.5 font-bold text-slate-900">{bid.amount}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-slate-400">Timeline</dt>
          <dd className="mt-0.5 text-slate-700">{bid.timeline}</dd>
        </div>
        <div className="flex items-end">
          <BidActions status={bid.status} />
        </div>
      </dl>
    </article>
  );
}

export default function MyBids() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setLoading(false);
          return;
        }
        const response = await axios.get(`http://localhost:8080/api/bids/painter/${userId}`);
        setBids(response.data.map(b => ({
          ...b,
          title: b.project?.title || "Unknown Project",
          postedDate: b.createdAt ? new Date(b.createdAt).toLocaleDateString() : "N/A",
          client: b.project?.user?.fullName || "Unknown Client",
          amount: `NPR ${b.amount}`,
          timeline: b.timeline || "N/A",
          status: b.status || "PENDING"
        })));
      } catch (err) {
        console.error("Failed to fetch bids", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBids();
  }, []);

  const filteredBids = useMemo(() => {
    if (activeFilter === "All") return bids;
    return bids.filter((bid) => bid.status === activeFilter);
  }, [activeFilter, bids]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 font-heading sm:px-6 lg:px-8 lg:py-8">
      <div className="mb-6 flex flex-col gap-4 lg:mb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            My Bids
          </h1>
          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            Track and manage your project bids
          </p>
        </div>
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {BID_FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                activeFilter === filter
                  ? "border-[#FF8022] bg-[#FF8022] text-white shadow-sm"
                  : "border-neutral-200 bg-white text-slate-600 hover:border-neutral-300 hover:bg-neutral-50"
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile / tablet cards */}
      <div className="space-y-4 lg:hidden">
        {loading ? (
          <div className="rounded-xl border border-neutral-100 bg-white p-8 text-center shadow-sm">
            <p className="text-sm text-slate-500">Loading bids...</p>
          </div>
        ) : filteredBids.length > 0 ? (
          filteredBids.map((bid) => <BidCard key={bid.id} bid={bid} />)
        ) : (
          <div className="rounded-xl border border-neutral-100 bg-white p-8 text-center shadow-sm">
            <p className="text-sm text-slate-500">
              No bids found for this filter.
            </p>
          </div>
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/80">
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Project
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Client
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Bid Amount
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Timeline
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-sm text-slate-500"
                  >
                    Loading bids...
                  </td>
                </tr>
              ) : filteredBids.length > 0 ? (
                filteredBids.map((bid) => (
                  <tr
                    key={bid.id}
                    className="transition hover:bg-neutral-50/50"
                  >
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900">{bid.title}</p>
                      <p className="mt-0.5 text-xs text-slate-400">
                        {bid.postedDate}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-slate-700">{bid.client}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">
                      {bid.amount}
                    </td>
                    <td className="px-6 py-4 text-slate-700">{bid.timeline}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={bid.status} />
                    </td>
                    <td className="px-6 py-4">
                      <BidActions status={bid.status} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-sm text-slate-500"
                  >
                    No bids found for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

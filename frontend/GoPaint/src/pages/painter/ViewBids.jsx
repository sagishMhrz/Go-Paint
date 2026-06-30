import { useEffect, useState } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function formatDate(dateStr) {
  if (!dateStr) return "N/A";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toISOString().slice(0, 10);
}

function formatAmount(amount) {
  if (amount == null) return "N/A";
  const num =
    typeof amount === "string"
      ? parseFloat(amount.replace(/[^\d.]/g, ""))
      : Number(amount);
  if (Number.isNaN(num)) return amount;
  return `NPR ${num.toLocaleString()}`;
}

function getInitials(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 1)
    .toUpperCase();
}

function ChevronRight() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
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

function WithdrawIcon() {
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
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

function MessageIcon() {
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
        d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BackArrowIcon() {
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
        d="M19 12H5M12 19l-7-7 7-7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TimelineCheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GavelIcon() {
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
        d="M14 4l6 6M4 20l4-4M16 6L8 14l-4 4 4-4 8-8z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon() {
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
        d="M12 2l2.2 6.8H21l-5.5 4 2.1 6.7-5.6-3.9-5.6 3.9 2.1-6.7L3 8.8h6.8L12 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TimelineStep({ icon, title, date, description, active, isLast }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
            active ? "bg-[#FF8022] text-white" : "bg-neutral-100 text-slate-400"
          }`}
        >
          {icon}
        </div>
        {!isLast && (
          <div
            className={`mt-1 w-0.5 flex-1 min-h-[2.5rem] ${active ? "bg-[#FF8022]/30" : "bg-neutral-200"}`}
          />
        )}
      </div>
      <div className={`pb-8 ${isLast ? "pb-0" : ""}`}>
        <p
          className={`text-sm font-bold ${active ? "text-slate-900" : "text-slate-400"}`}
        >
          {title}
        </p>
        {active && date ? (
          <p className="mt-0.5 text-xs text-slate-500">
            {date} — {description}
          </p>
        ) : (
          <p className="mt-0.5 text-xs text-slate-400">{description}</p>
        )}
      </div>
    </div>
  );
}

function InfoBox({ label, value, highlight }) {
  return (
    <div className="rounded-xl bg-neutral-50 px-4 py-3">
      <p className="text-xs font-medium text-slate-400">{label}</p>
      <p
        className={`mt-1 text-sm font-bold ${highlight ? "text-slate-900" : "text-slate-900"}`}
      >
        {value}
      </p>
    </div>
  );
}

function DetailRow({ label, value, highlight }) {
  return (
    <div className="flex items-center justify-between border-b border-neutral-50 py-3 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span
        className={`text-sm font-semibold ${highlight ? "text-[#FF8022]" : "text-slate-900"}`}
      >
        {value}
      </span>
    </div>
  );
}

function Card({ title, badge, children }) {
  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm sm:p-6">
      {(title || badge) && (
        <div className="mb-5 flex items-center justify-between gap-3">
          {title && (
            <h2 className="text-base font-bold text-slate-900">{title}</h2>
          )}
          {badge}
        </div>
      )}
      {children}
    </div>
  );
}

export default function ViewBids() {
  const { bidId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [bid, setBid] = useState(location.state?.bid ?? null);
  const [loading, setLoading] = useState(!location.state?.bid);

  useEffect(() => {
    const fetchBid = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;
        const response = await axios.get(
          `http://localhost:8080/api/bids/painter/${userId}`,
        );
        const found = response.data.find((b) => String(b.id) === String(bidId));
        if (found) {
          setBid({
            id: found.id,
            title: found.project?.title || bid?.title || "Unknown Project",
            client:
              found.project?.user?.fullName || bid?.client || "Unknown Client",
            amount: found.amount,
            timeline: found.timeline || "N/A",
            status: found.status || "PENDING",
            createdAt: found.createdAt,
            updatedAt: found.updatedAt,
            description: found.description,
          });
        }
      } catch (err) {
        console.error("Failed to fetch bid", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBid();
  }, [bidId]);

  const isAccepted = bid?.status === "ACCEPTED";
  const isPending = bid?.status === "PENDING";
  const amountFormatted = formatAmount(bid?.amount);
  const submittedDate = formatDate(bid?.createdAt);
  const acceptedDate = formatDate(bid?.updatedAt);

  const shortlistedDate = (() => {
    if (!bid?.createdAt || !bid?.updatedAt) return null;
    const created = new Date(bid.createdAt);
    const updated = new Date(bid.updatedAt);
    const mid = new Date((created.getTime() + updated.getTime()) / 2);
    return formatDate(mid);
  })();

  const handleWithdraw = () => {
    if (window.confirm("Are you sure you want to withdraw this bid?")) {
      alert("Withdraw functionality will be available soon.");
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-6 font-heading sm:px-6 lg:px-8 lg:py-8">
        <p className="text-sm text-slate-500">Loading bid details...</p>
      </div>
    );
  }

  if (!bid) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-6 font-heading sm:px-6 lg:px-8 lg:py-8">
        <p className="text-sm text-slate-500">Bid not found.</p>
        <Link
          to="/my-bids"
          className="mt-4 inline-block text-sm font-semibold text-[#FF8022] hover:underline"
        >
          Back to My Bids
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 font-heading sm:px-6 lg:px-8 lg:py-8">
      <nav
        className="mb-6 flex flex-wrap items-center gap-1 text-sm text-slate-500"
        aria-label="Breadcrumb"
      >
        <Link to="/" className="transition hover:text-[#FF8022]">
          Home
        </Link>
        <ChevronRight />
        <Link
          to="/painter-dashboard"
          className="transition hover:text-[#FF8022]"
        >
          Dashboard
        </Link>
        <ChevronRight />
        <Link to="/my-bids" className="transition hover:text-[#FF8022]">
          My Bids
        </Link>
        <ChevronRight />
        <span className="font-medium text-slate-800">Bid #B{bid.id}</span>
      </nav>

      {isAccepted && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4 sm:px-5">
          <span className="shrink-0 text-emerald-600">
            <CheckCircleIcon />
          </span>
          <div>
            <p className="text-sm font-bold text-emerald-800">
              Congratulations! This bid was accepted.
            </p>
            <p className="mt-0.5 text-sm text-emerald-700">
              The client has chosen your bid. Get ready to start the project.
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card
            title="Bid Details"
            badge={
              isAccepted ? (
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Awarded
                </span>
              ) : (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  Pending Review
                </span>
              )
            }
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <InfoBox label="Bid Amount" value={amountFormatted} highlight />
              <InfoBox label="Timeline" value={bid.timeline} />
              <InfoBox label="Submitted" value={submittedDate} />
              <InfoBox label="Project" value={bid.title} />
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {isPending && (
                <>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-xl border border-[#FF8022] bg-white px-4 py-2.5 text-sm font-semibold text-[#FF8022] transition hover:bg-orange-50"
                  >
                    <EditIcon />
                    Edit Bid
                  </button>
                  <button
                    type="button"
                    onClick={handleWithdraw}
                    className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    <WithdrawIcon />
                    Withdraw
                  </button>
                </>
              )}
              {isAccepted && (
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#FF8022] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e8721a]"
                >
                  <MessageIcon />
                  Message Client
                </button>
              )}
            </div>
          </Card>

          <Card title="Project Details">
            <DetailRow label="Project" value={bid.title} />
            <DetailRow label="Client" value={bid.client} />
            <DetailRow label="Your Bid" value={amountFormatted} highlight />
            <DetailRow label="Timeline" value={bid.timeline} />
            <DetailRow label="Submitted" value={submittedDate} />
          </Card>

          <Card title="Bid Timeline">
            <TimelineStep
              icon={<GavelIcon />}
              title="Bid Submitted"
              date={submittedDate}
              description={`You submitted a bid of ${amountFormatted}`}
              active
            />
            <TimelineStep
              icon={<StarIcon />}
              title="Shortlisted"
              date={isAccepted ? shortlistedDate : null}
              description={
                isAccepted
                  ? "Client shortlisted your bid"
                  : "Waiting for client to shortlist"
              }
              active={isAccepted}
            />
            <TimelineStep
              icon={<TimelineCheckIcon />}
              title="Bid Accepted"
              date={isAccepted ? acceptedDate : null}
              description={
                isAccepted
                  ? "Client accepted your bid!"
                  : "Waiting for client decision"
              }
              active={isAccepted}
              isLast
            />
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card title="Client">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-lg font-bold text-slate-600">
                {getInitials(bid.client)}
              </div>
              <div>
                <p className="font-bold text-slate-900">{bid.client}</p>
                <p className="text-xs text-slate-500">Project Owner</p>
              </div>
            </div>

            <div className="mt-5 space-y-2 rounded-xl bg-neutral-50 px-4 py-3 text-sm">
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">Project</span>
                <span className="truncate font-medium text-slate-800">
                  {bid.title}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">Your Offer</span>
                <span className="font-bold text-slate-900">
                  {amountFormatted}
                </span>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <button
                type="button"
                onClick={() => navigate("/my-bids")}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-neutral-50"
              >
                <BackArrowIcon />
                Back to All Bids
              </button>
              {isPending && (
                <button
                  type="button"
                  onClick={handleWithdraw}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <WithdrawIcon />
                  Withdraw Bid
                </button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

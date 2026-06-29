import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const ROOMS = [
  "Living Room",
  "Master Bedroom",
  "Bedroom",
  "Kitchen",
  "Bathroom",
  "Exterior",
  "Balcony",
  "Hallway",
  "Dining Room",
  "Kids Room",
];

const BUDGET_RANGES = [
  "NPR 10,000 – 20,000",
  "NPR 20,000 – 35,000",
  "NPR 30,000 – 50,000",
  "NPR 50,000 – 75,000",
  "NPR 75,000 – 100,000",
  "NPR 100,000+",
];

const TIMELINE_OPTIONS = [
  "Within 1 week",
  "Within 2 weeks",
  "Within 1 month",
  "Within 2 months",
  "Flexible",
];

const COLOR_SWATCHES = [
  { id: "terracotta", hex: "#C4714A" },
  { id: "sage", hex: "#8FAF8A" },
  { id: "rose", hex: "#D4A5A5" },
  { id: "slate", hex: "#3D4A5C" },
  { id: "cream", hex: "#F5ECD7" },
  { id: "olive", hex: "#6B7F5E" },
  { id: "peach", hex: "#F4A97F" },
  { id: "lavender", hex: "#C5BBD8" },
  { id: "charcoal", hex: "#5A5A5A" },
  { id: "coral", hex: "#E8735A" },
  { id: "sky", hex: "#A8C5D8" },
  { id: "yellow", hex: "#F7E8B0" },
];

const PALETTES = [
  {
    id: "none",
    name: "No Palette",
    subtitle: "I'll choose colors directly",
    colors: [],
  },
  {
    id: "himalayan",
    name: "Himalayan Sunrise",
    subtitle: "by GoPaint Team",
    colors: ["#C4714A", "#F4A97F", "#F5ECD7", "#D4A5A5"],
  },
  {
    id: "urban",
    name: "Urban Minimal",
    subtitle: "by Anita M.",
    colors: ["#3D4A5C", "#5A5A5A", "#F5ECD7", "#A8C5D8"],
  },
  {
    id: "garden",
    name: "Garden Fresh",
    subtitle: "by Rajesh S.",
    colors: ["#8FAF8A", "#6B7F5E", "#F5ECD7", "#C5BBD8"],
  },
  {
    id: "pastel",
    name: "Pastel Dreams",
    subtitle: "by GoPaint Team",
    colors: ["#D4A5A5", "#C5BBD8", "#F7E8B0", "#F4A97F"],
  },
];

const PAINTER_NAMES = {
  rajesh: "Rajesh Shrestha",
  suman: "Suman Tamang",
  bikash: "Bikash Gurung",
  sita: "Sita Maharjan",
  anil: "Anil Thapa",
  priya: "Priya Sharma",
};

const inputClass =
  "w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-[#FF8022] focus:outline-none focus:ring-2 focus:ring-[#FF8022]/20";

const labelClass = "mb-1.5 block text-sm font-semibold text-slate-800";

function RequiredMark() {
  return <span className="text-red-500"> *</span>;
}

function Stepper({ step }) {
  const steps = [1, 2, 3];

  const circleClass = (s) => {
    if (step > s) return "bg-[#FF8022] text-white";
    if (step === s) {
      if (s === 2) return "bg-blue-600 text-white";
      if (s === 3) return "bg-slate-700 text-white";
      return "bg-[#FF8022] text-white";
    }
    return "border-2 border-neutral-200 bg-white text-slate-400";
  };

  const lineClass = (s) => (step > s ? "bg-[#FF8022]" : "bg-neutral-200");

  return (
    <div
      className="flex items-center justify-center"
      aria-label={`Step ${step} of 3`}
    >
      {steps.map((s, i) => (
        <div key={s} className="flex items-center">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold sm:h-10 sm:w-10 ${circleClass(s)}`}
          >
            {step > s ? (
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
                  d="M5 13l4 4L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              s
            )}
          </div>
          {i < steps.length - 1 && (
            <div
              className={`h-0.5 w-12 sm:w-20 md:w-28 ${lineClass(s)}`}
              aria-hidden
            />
          )}
        </div>
      ))}
    </div>
  );
}

function ReviewRow({ label, children, highlight }) {
  return (
    <div className="flex flex-col gap-1 border-b border-neutral-100 py-3 last:border-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <dt className="text-sm text-slate-500">{label}</dt>
      <dd
        className={`text-sm font-medium sm:text-right ${
          highlight ? "font-bold text-[#FF8022]" : "text-slate-800"
        }`}
      >
        {children}
      </dd>
    </div>
  );
}

export default function HirePainter() {
  const { painterId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const painterFromState = location.state?.painter;
  const painterName =
    painterFromState?.name ??
    PAINTER_NAMES[painterId] ??
    (painterId ? "Selected Painter" : null);

  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const [rooms, setRooms] = useState([]);
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("Within 2 weeks");
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedPalette, setSelectedPalette] = useState("none");
  const [posted, setPosted] = useState(false);

  const step1Valid =
    title.trim().length > 0 &&
    projectLocation.trim().length > 0 &&
    rooms.length > 0;

  const step2Valid = budget.length > 0;

  const displayColors = useMemo(() => {
    if (selectedPalette !== "none") {
      const palette = PALETTES.find((p) => p.id === selectedPalette);
      return palette?.colors ?? [];
    }
    return selectedColors.map(
      (id) => COLOR_SWATCHES.find((c) => c.id === id)?.hex ?? id
    );
  }, [selectedColors, selectedPalette]);

  const toggleRoom = (room) => {
    setRooms((prev) =>
      prev.includes(room) ? prev.filter((r) => r !== room) : [...prev, room]
    );
  };

  const toggleColor = (colorId) => {
    setSelectedPalette("none");
    setSelectedColors((prev) => {
      if (prev.includes(colorId)) {
        return prev.filter((c) => c !== colorId);
      }
      if (prev.length >= 8) return prev;
      return [...prev, colorId];
    });
  };

  const selectPalette = (paletteId) => {
    setSelectedPalette(paletteId);
    if (paletteId !== "none") {
      setSelectedColors([]);
    }
  };

  const handlePost = () => {
    setPosted(true);
    setTimeout(() => navigate("/user-projects"), 1800);
  };

  if (posted) {
    return (
      <div className="bg-[#F9FAFB] px-4 pb-16 pt-8 sm:px-6">
        <div className="mx-auto max-w-lg rounded-2xl border border-emerald-200 bg-white p-8 text-center shadow-sm">
          <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path
                d="M5 13l4 4L19 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <h2 className="font-heading text-xl font-bold text-slate-900">
            Project Posted!
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {painterName
              ? `${painterName} and other painters can now view your project.`
              : "Verified painters can now view your project and submit bids."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9FAFB] pb-16">
      <div className="h-20 sm:h-24" aria-hidden />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:pt-2">
        <nav className="mb-5 text-sm text-slate-500" aria-label="Breadcrumb">
          <Link to="/" className="transition hover:text-[#FF8022]">
            Home
          </Link>
          <span className="mx-2 text-slate-300">/</span>
          <Link to="/user-dashboard" className="transition hover:text-[#FF8022]">
            Dashboard
          </Link>
          <span className="mx-2 text-slate-300">/</span>
          <span className="font-medium text-slate-800">New Project</span>
        </nav>

        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-slate-900 sm:text-3xl">
            Post a New Project
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500 sm:text-base">
            Describe your painting needs and get bids from verified painters
          </p>
          {painterName && (
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-1.5 text-xs font-semibold text-[#FF8022] sm:text-sm">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path
                  d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
                  strokeLinecap="round"
                />
              </svg>
              Hiring: {painterName}
            </p>
          )}
        </div>

        <div className="mt-8">
          <Stepper step={step} />
        </div>

        <div className="mt-8 rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm sm:p-6 md:p-8">
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <p className="text-sm">
                  <span className="font-semibold text-[#FF8022]">Step 1</span>{" "}
                  <span className="font-bold text-slate-900">
                    Project Details
                  </span>
                </p>
              </div>

              <div>
                <label htmlFor="title" className={labelClass}>
                  Project Title
                  <RequiredMark />
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 3BHK Full Interior Painting"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="location" className={labelClass}>
                  Location
                  <RequiredMark />
                </label>
                <input
                  id="location"
                  type="text"
                  value={projectLocation}
                  onChange={(e) => setProjectLocation(e.target.value)}
                  placeholder="e.g. Baneshwor, Kathmandu"
                  className={inputClass}
                />
              </div>

              <fieldset>
                <legend className={labelClass}>
                  Rooms to Paint
                  <RequiredMark />
                </legend>
                <div className="flex flex-wrap gap-2">
                  {ROOMS.map((room) => {
                    const selected = rooms.includes(room);
                    return (
                      <button
                        key={room}
                        type="button"
                        onClick={() => toggleRoom(room)}
                        className={`rounded-full border px-3.5 py-2 text-sm font-medium transition sm:px-4 ${
                          selected
                            ? "border-[#FF8022] bg-orange-50 text-[#FF8022]"
                            : "border-neutral-200 bg-neutral-50 text-slate-700 hover:border-neutral-300"
                        }`}
                      >
                        {room}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div>
                <label htmlFor="description" className={labelClass}>
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your painting needs, preferred finishes, any specific requirements..."
                  rows={5}
                  className={`${inputClass} min-h-[120px] resize-y`}
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  disabled={!step1Valid}
                  onClick={() => setStep(2)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition sm:w-auto sm:min-w-[220px] disabled:cursor-not-allowed disabled:bg-neutral-300 enabled:bg-[#FF8022] enabled:hover:bg-[#e8721a]"
                >
                  Next: Budget &amp; Color
                  <span aria-hidden>→</span>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <p className="text-sm">
                  <span className="font-semibold text-[#FF8022]">Step 2</span>{" "}
                  <span className="font-bold text-slate-900">
                    Budget &amp; Color Preferences
                  </span>
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="budget" className={labelClass}>
                    Budget Range
                    <RequiredMark />
                  </label>
                  <div className="relative">
                    <select
                      id="budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className={`${inputClass} appearance-none pr-10 ${
                        !budget ? "text-slate-400" : ""
                      }`}
                    >
                      <option value="">Select budget range</option>
                      {BUDGET_RANGES.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
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
                          d="M6 9l6 6 6-6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <div>
                  <label htmlFor="timeline" className={labelClass}>
                    Timeline
                  </label>
                  <div className="relative">
                    <select
                      id="timeline"
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className={`${inputClass} appearance-none pr-10`}
                    >
                      {TIMELINE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
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
                          d="M6 9l6 6 6-6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <p className={labelClass}>
                  Preferred Colors{" "}
                  <span className="font-normal text-slate-500">
                    (optional, up to 8)
                  </span>
                </p>
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 sm:gap-3">
                  {COLOR_SWATCHES.map((color) => {
                    const selected = selectedColors.includes(color.id);
                    return (
                      <button
                        key={color.id}
                        type="button"
                        onClick={() => toggleColor(color.id)}
                        disabled={
                          selectedPalette !== "none" ||
                          (!selected && selectedColors.length >= 8)
                        }
                        className={`aspect-[4/3] rounded-lg border-2 transition sm:rounded-xl ${
                          selected
                            ? "border-[#FF8022] ring-2 ring-[#FF8022]/30"
                            : "border-transparent hover:scale-105"
                        } disabled:cursor-not-allowed disabled:opacity-40`}
                        style={{ backgroundColor: color.hex }}
                        aria-label={`Color ${color.id}`}
                        aria-pressed={selected}
                      />
                    );
                  })}
                </div>
              </div>

              <div>
                <p className={labelClass}>Choose a Palette</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {PALETTES.map((palette) => {
                    const selected = selectedPalette === palette.id;
                    return (
                      <button
                        key={palette.id}
                        type="button"
                        onClick={() => selectPalette(palette.id)}
                        className={`rounded-xl border p-4 text-left transition ${
                          selected
                            ? "border-[#FF8022] bg-orange-50 ring-1 ring-[#FF8022]/20"
                            : "border-neutral-200 bg-neutral-50 hover:border-neutral-300"
                        }`}
                      >
                        <p className="text-sm font-bold text-slate-900">
                          {palette.name}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {palette.subtitle}
                        </p>
                        {palette.colors.length > 0 && (
                          <div className="mt-3 flex gap-1.5">
                            {palette.colors.map((hex) => (
                              <span
                                key={hex}
                                className="h-6 w-6 rounded-md border border-white/50 shadow-sm sm:h-7 sm:w-7"
                                style={{ backgroundColor: hex }}
                                aria-hidden
                              />
                            ))}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-neutral-50 sm:justify-start"
                >
                  <span aria-hidden>←</span>
                  Back
                </button>
                <button
                  type="button"
                  disabled={!step2Valid}
                  onClick={() => setStep(3)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition sm:min-w-[180px] disabled:cursor-not-allowed disabled:bg-neutral-300 enabled:bg-[#FF8022] enabled:hover:bg-[#e8721a]"
                >
                  Next: Review
                  <span aria-hidden>→</span>
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <p className="text-sm">
                  <span className="font-semibold text-[#FF8022]">Step 3</span>{" "}
                  <span className="font-bold text-slate-900">
                    Review &amp; Post
                  </span>
                </p>
              </div>

              <dl className="rounded-xl bg-neutral-50 px-4 py-1 sm:px-5">
                <ReviewRow label="Title">{title}</ReviewRow>
                <ReviewRow label="Location">{projectLocation}</ReviewRow>
                <ReviewRow label="Budget" highlight>
                  {budget}
                </ReviewRow>
                <ReviewRow label="Timeline">{timeline}</ReviewRow>
                <ReviewRow label="Rooms">{rooms.join(", ")}</ReviewRow>
                <ReviewRow label="Colors">
                  {displayColors.length > 0 ? (
                    <span className="inline-flex flex-wrap justify-end gap-1.5">
                      {displayColors.map((hex) => (
                        <span
                          key={hex}
                          className="inline-block h-6 w-6 rounded-md border border-neutral-200 shadow-sm"
                          style={{ backgroundColor: hex }}
                          aria-hidden
                        />
                      ))}
                    </span>
                  ) : (
                    <span className="text-slate-400">None selected</span>
                  )}
                </ReviewRow>
                {description.trim() && (
                  <ReviewRow label="Description">{description}</ReviewRow>
                )}
                {painterName && (
                  <ReviewRow label="Preferred Painter">{painterName}</ReviewRow>
                )}
              </dl>

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-neutral-50"
                >
                  <span aria-hidden>←</span>
                  Back
                </button>
                <button
                  type="button"
                  onClick={handlePost}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF8022] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e8721a] sm:min-w-[180px]"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden
                  >
                    <path
                      d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Post Project
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

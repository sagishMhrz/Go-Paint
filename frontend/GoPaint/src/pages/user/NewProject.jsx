import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";
import axios from "axios";

const ROOMS = ["Living Room", "Bedroom", "Kitchen", "Bathroom", "Exterior"];

const TIMELINE_OPTIONS = [
  "Within 1 week",
  "Within 2 weeks",
  "Within 1 month",
  "Within 2 months",
  "Flexible",
];

const inputClass =
  "w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-[#FF8022] focus:outline-none focus:ring-2 focus:ring-[#FF8022]/20";

const labelClass = "mb-1.5 block text-sm font-semibold text-slate-800";

export default function NewProject() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("Within 1 week");
  const [rooms, setRooms] = useState([]);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const toggleRoom = (room) => {
    setRooms((prev) =>
      prev.includes(room) ? prev.filter((r) => r !== room) : [...prev, room]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        navigate("/login");
        return;
      }
      await axios.post("http://localhost:8080/api/projects", {
        title,
        location,
        budget,
        timeline,
        rooms,
        description,
        userId: Number(userId),
      });
      navigate("/user-dashboard");
    } catch (err) {
      setError(err.response?.data || "Failed to create project");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F9FAFB]">
      <Header forceScrolled />

      <main className="flex-1 pt-20">
        <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-8 lg:py-10">
          <nav className="mb-5 text-sm text-slate-500" aria-label="Breadcrumb">
            <Link to="/user-dashboard" className="transition hover:text-[#FF8022]">
              Dashboard
            </Link>
            <span className="mx-2 text-slate-300">/</span>
            <span className="font-medium text-slate-800">New Project</span>
          </nav>

          <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm sm:p-6 md:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <h1 className="font-heading text-xl font-bold text-slate-900 sm:text-2xl">
                Create New Project
              </h1>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="shrink-0 rounded-lg p-1.5 text-slate-400 transition hover:bg-neutral-100 hover:text-slate-600"
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

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="project-title" className={labelClass}>
                  Project Title
                </label>
                <input
                  id="project-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 2BHK Interior Painting"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label htmlFor="location" className={labelClass}>
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Baneshwor, Kathmandu"
                  className={inputClass}
                  required
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="budget" className={labelClass}>
                    Budget (NPR)
                  </label>
                  <input
                    id="budget"
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g. 30,000 - 50,000"
                    className={inputClass}
                    required
                  />
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

              <fieldset>
                <legend className={labelClass}>Rooms to Paint</legend>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {ROOMS.map((room) => {
                    const checked = rooms.includes(room);
                    return (
                      <label
                        key={room}
                        className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm transition sm:px-3.5 sm:py-2.5 ${
                          checked
                            ? "border-[#FF8022]/40 bg-orange-50 text-slate-800"
                            : "border-neutral-200 bg-neutral-50 text-slate-700 hover:border-neutral-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleRoom(room)}
                          className="h-4 w-4 rounded border-neutral-300 text-[#FF8022] focus:ring-[#FF8022]/30"
                        />
                        <span className="font-medium">{room}</span>
                      </label>
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
                  placeholder="Describe your painting needs..."
                  rows={5}
                  className={`${inputClass} resize-y min-h-[120px]`}
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#FF8022] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e8721a] sm:py-3.5 sm:text-base"
              >
                Post Project
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

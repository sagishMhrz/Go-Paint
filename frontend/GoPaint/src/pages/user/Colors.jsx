import { useMemo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { isUserLoggedIn, AUTH_CHANGE_EVENT } from "../../components/user/Header";

const TONE_TABS_PUBLIC = ["All Colors", "Warm", "Cool", "Pastel", "Neutral"];
const TONE_TABS_AUTH = ["All", "Warm", "Cool", "Pastel", "Neutral"];

const ALL_COLORS = [
  { name: "Terracotta Bliss", hex: "#C4714A", tones: ["Warm", "Neutral"], category: "Warm" },
  { name: "Sage Whisper", hex: "#8FAF8A", tones: ["Cool", "Pastel"], category: "Cool" },
  { name: "Dusty Rose", hex: "#D4A5A5", tones: ["Pastel", "Warm"], category: "Pastel" },
  { name: "Midnight Slate", hex: "#3D4A5C", tones: ["Cool", "Neutral"], category: "Cool" },
  {
    name: "Warm Ivory",
    hex: "#F5ECD7",
    tones: ["Warm", "Neutral", "Pastel"],
    category: "Warm",
  },
  { name: "Forest Moss", hex: "#5C7A4E", tones: ["Cool"], category: "Cool" },
  { name: "Peach Sorbet", hex: "#F4A97F", tones: ["Warm", "Pastel"], category: "Warm" },
  { name: "Lavender Mist", hex: "#C5BBD8", tones: ["Pastel", "Cool"], category: "Pastel" },
  { name: "Charcoal Smoke", hex: "#5A5A5A", tones: ["Neutral", "Cool"], category: "Neutral" },
  { name: "Coral Reef", hex: "#E8735A", tones: ["Warm"], category: "Warm" },
  { name: "Sky Haze", hex: "#A8C5D8", tones: ["Cool", "Pastel"], category: "Cool" },
  { name: "Butter Cream", hex: "#F7E8B0", tones: ["Warm", "Pastel"], category: "Warm" },
];

const FEATURED_PALETTES = [
  {
    id: "featured-1",
    name: "Himalayan Sunrise",
    author: "GoPaint Team",
    colors: ["#C4714A", "#F4A97F", "#F5ECD7", "#D4A5A5"],
    likes: 342,
  },
  {
    id: "featured-2",
    name: "Urban Minimal",
    author: "GoPaint Team",
    colors: ["#3D4A5C", "#5A5A5A", "#F5ECD7", "#8FAF8A"],
    likes: 218,
  },
  {
    id: "featured-3",
    name: "Garden Fresh",
    author: "GoPaint Team",
    colors: ["#5C7A4E", "#8FAF8A", "#F7E8B0", "#F5ECD7"],
    likes: 195,
  },
  {
    id: "featured-4",
    name: "Pastel Dreams",
    author: "GoPaint Team",
    colors: ["#C5BBD8", "#D4A5A5", "#F4A97F", "#F7E8B0"],
    likes: 287,
  },
];

function HeartIcon({ filled = false, className = "" }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill={filled ? "#EF4444" : "none"}
      stroke={filled ? "#EF4444" : "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function filterByTone(colors, activeTone, isAuth) {
  const tone =
    activeTone === "All Colors" || activeTone === "All" ? null : activeTone;
  if (!tone) return colors;
  return colors.filter((c) => c.tones.includes(tone));
}

function NewPaletteModal({ open, onClose, onCreate, draftColors }) {
  const [name, setName] = useState("");
  const [selected, setSelected] = useState(() => new Set());

  useEffect(() => {
    if (open) {
      setName("");
      setSelected(new Set(draftColors));
    }
  }, [open, draftColors]);

  if (!open) return null;

  const toggleColor = (hex) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(hex)) next.delete(hex);
      else if (next.size < 5) next.add(hex);
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || selected.size < 2) return;
    onCreate({
      name: name.trim(),
      colors: Array.from(selected),
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-palette-title"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-xl sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2
            id="new-palette-title"
            className="font-heading text-lg font-bold text-slate-900"
          >
            Create New Palette
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-neutral-100 hover:text-slate-600"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="palette-name" className="mb-1.5 block text-sm font-medium text-slate-700">
              Palette name
            </label>
            <input
              id="palette-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Living Room Warmth"
              className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-[#FF8022]"
              required
            />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-slate-700">
              Pick 2–5 colors ({selected.size}/5)
            </p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {ALL_COLORS.map((c) => {
                const picked = selected.has(c.hex);
                return (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => toggleColor(c.hex)}
                    className={`overflow-hidden rounded-lg border-2 transition ${
                      picked ? "border-[#FF8022] ring-2 ring-[#FF8022]/30" : "border-transparent"
                    }`}
                  >
                    <div className="aspect-square w-full" style={{ backgroundColor: c.hex }} aria-hidden />
                    <p className="truncate px-1 py-1 text-[10px] font-medium text-slate-700">{c.name}</p>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-neutral-200 py-2.5 text-sm font-semibold text-slate-700 hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim() || selected.size < 2}
              className="flex-1 rounded-xl bg-[#FF8022] py-2.5 text-sm font-semibold text-white transition hover:bg-[#e8721a] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Create Palette
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function PublicColorsView() {
  const [activeTone, setActiveTone] = useState("All Colors");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState(() => new Set());

  const filteredColors = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const toneFiltered = filterByTone(ALL_COLORS, activeTone, false);

    if (!q) return toneFiltered;
    return toneFiltered.filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.hex.toLowerCase().includes(q),
    );
  }, [activeTone, searchQuery]);

  const toggleFavorite = (hex) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(hex)) next.delete(hex);
      else next.add(hex);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="h-20 sm:h-24" aria-hidden />

      <section className="scroll-mt-24 bg-white px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Color Explorer
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
              Discover trending colors, create palettes, and find the perfect
              shade for your space.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-2xl">
            <label className="relative block">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.3-4.3" />
                </svg>
              </span>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search colors by name..."
                className="w-full rounded-xl border border-neutral-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#FF7A30] focus:ring-0"
              />
            </label>
          </div>

          <div className="mx-auto mt-6 flex flex-wrap justify-center gap-2">
            {TONE_TABS_PUBLIC.map((tab) => {
              const selected = activeTone === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTone(tab)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    selected
                      ? "bg-[#FF7A30] text-white shadow-sm"
                      : "border border-neutral-200 bg-white text-slate-600 hover:bg-neutral-50"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="mt-10 flex items-center justify-between gap-4">
            <h2 className="text-sm font-semibold text-slate-900">{activeTone}</h2>
            <span className="text-xs font-medium text-slate-500">
              {filteredColors.length} colors
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-6">
            {filteredColors.map((c) => {
              const fav = favorites.has(c.hex);
              return (
                <article
                  key={c.hex}
                  className="group relative overflow-hidden rounded-xl border border-neutral-100 bg-white shadow-sm"
                >
                  <div
                    className="aspect-[5/4] w-full rounded-t-xl"
                    style={{ backgroundColor: c.hex }}
                    aria-hidden
                  />
                  <button
                    type="button"
                    aria-label={fav ? "Remove favorite" : "Add favorite"}
                    onClick={() => toggleFavorite(c.hex)}
                    className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm"
                  >
                    <HeartIcon filled={fav} />
                  </button>
                  <div className="p-3">
                    <p className="font-body text-sm font-semibold text-slate-900">
                      {c.name}
                    </p>
                    <p className="mt-0.5 font-mono text-xs text-slate-400">{c.hex}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pb-12 sm:px-6 sm:pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Featured Palettes
            </h2>
            <a
              href="#"
              className="inline-flex items-center gap-1 font-body text-sm font-semibold text-[#FF7A30] transition hover:text-[#e86d28]"
              onClick={(e) => e.preventDefault()}
            >
              View All
              <span aria-hidden>→</span>
            </a>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_PALETTES.map((p) => (
              <article
                key={p.id}
                className="flex flex-col rounded-xl border border-neutral-100 bg-white p-4 shadow-sm"
              >
                <div className="flex gap-2">
                  {p.colors.map((hex) => (
                    <div
                      key={hex}
                      className="h-10 flex-1 rounded-lg ring-1 ring-black/5"
                      style={{ backgroundColor: hex }}
                      title={hex}
                      aria-hidden
                    />
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="font-body text-sm font-semibold text-slate-900">
                    {p.name}
                  </p>
                  <span className="flex items-center gap-1 font-body text-xs text-slate-400">
                    <span aria-hidden className="text-[#FF7A30]">♥</span>
                    {p.likes}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#121212] px-4 py-16 text-white sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Create Your Own Palette
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
            Mix and match colors, save your favorites and share your unique
            palettes with the community.
          </p>
          <button
            type="button"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#FF7A30] px-8 py-3.5 font-body text-sm font-semibold text-white transition hover:bg-[#e86d28]"
          >
            Try AI Design
          </button>
        </div>
      </section>
    </div>
  );
}

function LoggedInColorsView() {
  const [activeTone, setActiveTone] = useState("All");
  const [favorites, setFavorites] = useState(
    () => new Set(["#C4714A", "#8FAF8A", "#D4A5A5"]),
  );
  const [myPalettes, setMyPalettes] = useState(FEATURED_PALETTES);
  const [paletteDraft, setPaletteDraft] = useState(() => new Set());
  const [modalOpen, setModalOpen] = useState(false);
  const [addedHex, setAddedHex] = useState(null);

  const filteredColors = useMemo(
    () => filterByTone(ALL_COLORS, activeTone, true),
    [activeTone],
  );

  const favoriteColors = useMemo(
    () => ALL_COLORS.filter((c) => favorites.has(c.hex)),
    [favorites],
  );

  const toggleFavorite = (hex) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(hex)) next.delete(hex);
      else next.add(hex);
      return next;
    });
  };

  const addToDraft = (hex) => {
    setPaletteDraft((prev) => {
      const next = new Set(prev);
      if (next.has(hex)) next.delete(hex);
      else if (next.size < 5) next.add(hex);
      return next;
    });
    setAddedHex(hex);
    setTimeout(() => setAddedHex(null), 1200);
  };

  const handleCreatePalette = ({ name, colors }) => {
    setMyPalettes((prev) => [
      {
        id: `user-${Date.now()}`,
        name,
        author: "You",
        colors,
        likes: 0,
      },
      ...prev,
    ]);
    setPaletteDraft(new Set());
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="h-20 sm:h-24" aria-hidden />

      <section className="px-4 py-8 sm:px-6 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-heading text-2xl font-bold text-slate-900 sm:text-3xl">
                My Colors
              </h1>
              <p className="mt-1 text-sm text-slate-500 sm:text-base">
                Explore, save, and create color palettes
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-neutral-50"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  aria-hidden
                >
                  <rect x="2" y="4" width="20" height="14" rx="2" />
                  <path d="M8 20h8M12 18v2" strokeLinecap="round" />
                </svg>
                Visualize
              </button>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#FF8022] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e8721a]"
              >
                <span className="text-lg leading-none">+</span>
                New Palette
              </button>
            </div>
          </div>

          <div className="-mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
            {TONE_TABS_AUTH.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTone(tab)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                  activeTone === tab
                    ? "bg-[#FF8022] text-white shadow-sm"
                    : "border border-neutral-200 bg-white text-slate-600 hover:border-neutral-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {filteredColors.map((c) => {
              const fav = favorites.has(c.hex);
              const inDraft = paletteDraft.has(c.hex);
              const justAdded = addedHex === c.hex;
              return (
                <article
                  key={c.hex}
                  className="overflow-hidden rounded-xl border border-neutral-100 bg-white shadow-sm"
                >
                  <div className="relative">
                    <div
                      className="aspect-[4/3] w-full sm:aspect-[5/4]"
                      style={{ backgroundColor: c.hex }}
                      aria-hidden
                    />
                    <button
                      type="button"
                      aria-label={fav ? "Remove from favorites" : "Add to favorites"}
                      onClick={() => toggleFavorite(c.hex)}
                      className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 shadow-sm"
                    >
                      <HeartIcon filled={fav} />
                    </button>
                  </div>
                  <div className="flex items-end justify-between gap-2 p-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {c.name}
                      </p>
                      <p className="font-mono text-xs text-slate-400">{c.hex}</p>
                      <p className="mt-0.5 text-xs text-slate-400">{c.category}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => addToDraft(c.hex)}
                      className={`shrink-0 text-xs font-semibold transition ${
                        inDraft || justAdded
                          ? "text-emerald-600"
                          : "text-[#FF8022] hover:text-[#e8721a]"
                      }`}
                    >
                      {justAdded ? "Added" : inDraft ? "Added" : "+ Add"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6 sm:pb-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="font-heading text-lg font-bold text-slate-900 sm:text-xl">
              My Palettes
            </h2>
            <span className="text-sm text-slate-500">
              {myPalettes.length} palettes
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {myPalettes.map((p) => (
              <article
                key={p.id}
                className="flex flex-col rounded-xl border border-neutral-100 bg-white p-4 shadow-sm"
              >
                <div className="flex gap-1.5 sm:gap-2">
                  {p.colors.map((hex) => (
                    <div
                      key={hex}
                      className="h-9 flex-1 rounded-md ring-1 ring-black/5 sm:h-10 sm:rounded-lg"
                      style={{ backgroundColor: hex }}
                      title={hex}
                      aria-hidden
                    />
                  ))}
                </div>
                <div className="mt-3">
                  <p className="text-sm font-semibold text-slate-900">{p.name}</p>
                  <p className="text-xs text-slate-400">by {p.author}</p>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-3">
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <HeartIcon filled className="!fill-[#FF8022] !stroke-[#FF8022]" />
                    {p.likes}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#FF8022] hover:text-[#e8721a]"
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
                          d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Use
                    </button>
                    <button
                      type="button"
                      className="rounded p-1 text-slate-400 hover:bg-neutral-100 hover:text-slate-600"
                      aria-label="More options"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <circle cx="12" cy="5" r="1.5" />
                        <circle cx="12" cy="12" r="1.5" />
                        <circle cx="12" cy="19" r="1.5" />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-neutral-200 bg-white py-4 text-sm font-semibold text-slate-600 transition hover:border-[#FF8022] hover:text-[#FF8022] sm:hidden"
          >
            <span className="text-lg leading-none">+</span>
            Create New Palette
          </button>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 sm:pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="font-heading text-lg font-bold text-slate-900 sm:text-xl">
              Favorites
            </h2>
            <span className="text-sm text-slate-500">
              {favoriteColors.length} colors
            </span>
          </div>

          {favoriteColors.length === 0 ? (
            <div className="rounded-xl border border-dashed border-neutral-200 bg-white p-8 text-center">
              <p className="text-sm text-slate-500">
                Tap the heart on any color to save it here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
              {favoriteColors.map((c) => (
                <article
                  key={c.hex}
                  className="overflow-hidden rounded-xl border border-neutral-100 bg-white shadow-sm"
                >
                  <div
                    className="aspect-[4/3] w-full"
                    style={{ backgroundColor: c.hex }}
                    aria-hidden
                  />
                  <div className="p-3">
                    <p className="text-sm font-semibold text-slate-900">{c.name}</p>
                    <p className="font-mono text-xs text-slate-400">{c.hex}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <NewPaletteModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreatePalette}
        draftColors={paletteDraft}
      />
    </div>
  );
}

export default function Colors() {
  const { pathname } = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(() => isUserLoggedIn());

  useEffect(() => {
    const syncAuth = () => setIsLoggedIn(isUserLoggedIn());
    syncAuth();
    window.addEventListener(AUTH_CHANGE_EVENT, syncAuth);
    return () => window.removeEventListener(AUTH_CHANGE_EVENT, syncAuth);
  }, [pathname]);

  return isLoggedIn ? <LoggedInColorsView /> : <PublicColorsView />;
}

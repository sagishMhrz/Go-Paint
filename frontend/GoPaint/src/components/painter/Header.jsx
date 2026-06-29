import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const PAINTER_NAV_LINKS = [
  { label: "Dashboard", href: "/painter-dashboard" },
  { label: "Browse Projects", href: "/browse-projects" },
  { label: "My Bids", href: "/my-bids" },
  { label: "Profile", href: "/painter-profile" },
];

const AUTH_STORAGE_KEY = "gopaint_auth";
export const PAINTER_AUTH_CHANGE_EVENT = "gopaint-painter-auth-change";

function syncAuthState() {
  window.dispatchEvent(new Event(PAINTER_AUTH_CHANGE_EVENT));
}

export function setPainterLoggedIn() {
  localStorage.setItem(AUTH_STORAGE_KEY, "painter");
  syncAuthState();
}

export function clearPainterLoggedIn() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem("userId");
  localStorage.removeItem("role");
  localStorage.removeItem("fullName");
  syncAuthState();
}

export function isPainterLoggedIn() {
  return (
    localStorage.getItem(AUTH_STORAGE_KEY) === "painter" ||
    localStorage.getItem("role") === "PAINTER"
  );
}

function getInitials(name) {
  if (!name) return "P";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Header() {
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => isPainterLoggedIn());
  const fullName = localStorage.getItem("fullName") || "Painter";
  const initials = getInitials(fullName);

  useEffect(() => {
    const syncAuth = () => setIsLoggedIn(isPainterLoggedIn());
    syncAuth();
    window.addEventListener(PAINTER_AUTH_CHANGE_EVENT, syncAuth);
    return () => window.removeEventListener(PAINTER_AUTH_CHANGE_EVENT, syncAuth);
  }, [pathname]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const closeOnWide = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", closeOnWide);
    return () => mq.removeEventListener("change", closeOnWide);
  }, []);

  useEffect(() => {
    if (!menuOpen && !profileOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setProfileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, profileOpen]);

  const isActiveLink = (href) => {
    const [path, linkHash] = href.split("#");
    if (linkHash) {
      return pathname === path && hash === `#${linkHash}`;
    }
    return pathname === href;
  };

  const navLinkClass = (href) => {
    const active = isActiveLink(href);
    if (active) {
      return "relative text-sm font-medium text-[#FF8022] after:absolute after:-bottom-3 after:left-0 after:right-0 after:h-0.5 after:rounded-full after:bg-[#FF8022]";
    }
    return "text-sm font-medium text-slate-600 transition hover:text-slate-900";
  };

  const mobileNavLinkClass = (href) => {
    const active = isActiveLink(href);
    if (active) {
      return "rounded-lg bg-orange-50 px-2 py-2.5 text-sm font-medium text-[#FF8022]";
    }
    return "rounded-lg px-2 py-2.5 text-sm font-medium text-slate-700 hover:bg-neutral-50";
  };

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  const signOut = () => {
    clearPainterLoggedIn();
    setIsLoggedIn(false);
    setProfileOpen(false);
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-neutral-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <Link
          to="/painter-dashboard"
          aria-label="GoPaint painter dashboard"
          className="shrink-0 outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF8022]"
        >
          <span className="font-heading text-2xl font-bold tracking-tight text-slate-900">
            Go<span className="text-[#FF8022]">Paint</span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-6 lg:gap-8 md:flex"
          aria-label="Painter navigation"
        >
          {PAINTER_NAV_LINKS.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={navLinkClass(item.href)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {isLoggedIn ? (
          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-neutral-100"
              aria-label="Notifications"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                aria-hidden
              >
                <path
                  d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#FF8022]"
                aria-hidden
              />
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((o) => !o)}
                className="flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 py-1 pl-1 pr-2 transition hover:bg-neutral-100"
                aria-expanded={profileOpen}
                aria-haspopup="true"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-[#FF8022] text-xs font-bold text-white">
                  {initials}
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-slate-500"
                  aria-hidden
                >
                  <path
                    d="M6 9l6 6 6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-full z-10 mt-2 w-44 rounded-xl border border-neutral-200 bg-white py-1 shadow-lg">
                  <Link
                    to="/painter-profile"
                    onClick={() => setProfileOpen(false)}
                    className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-neutral-50"
                  >
                    My Profile
                  </Link>
                  <button
                    type="button"
                    className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-neutral-50"
                  >
                    Settings
                  </button>
                  <hr className="my-1 border-neutral-100" />
                  <button
                    type="button"
                    onClick={signOut}
                    className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="hidden md:block">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="rounded-lg bg-[#FF8022] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e8721a]"
            >
              Sign In
            </button>
          </div>
        )}

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-neutral-200 text-slate-700 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="painter-mobile-nav"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="sr-only">Toggle menu</span>
          {menuOpen ? (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      <div
        id="painter-mobile-nav"
        className={`border-t border-neutral-200 bg-white px-4 py-4 md:hidden ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <nav className="flex flex-col gap-1" aria-label="Mobile painter navigation">
          {PAINTER_NAV_LINKS.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={mobileNavLinkClass(item.href)}
              onClick={handleNavClick}
            >
              {item.label}
            </Link>
          ))}
          {isLoggedIn ? (
            <button
              type="button"
              onClick={signOut}
              className="mt-2 w-full rounded-lg border border-red-200 px-4 py-3 text-center text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              Sign Out
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="mt-2 w-full rounded-lg bg-[#FF8022] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#e8721a]"
            >
              Sign In
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

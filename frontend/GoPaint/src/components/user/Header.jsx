import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PUBLIC_NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Colors", href: "/colors" },
  { label: "Find Painters", href: "/find-painters" },
  { label: "How It Works", href: "/how-it-works" },
];

const AUTH_NAV_LINKS = [
  // { label: "Home", href: "/" },
  { label: "Dashboard", href: "/user-dashboard" },
  { label: "Projects", href: "/user-projects" },
  { label: "Colors", href: "/colors" },
  { label: "Find Painters", href: "/find-painters" },
  { label: "Visualize", href: "/#visualize" },
];

const AUTH_STORAGE_KEY = "gopaint_auth";
export const AUTH_CHANGE_EVENT = "gopaint-auth-change";

function syncAuthState() {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function setLoggedIn(role = "user") {
  localStorage.setItem(AUTH_STORAGE_KEY, role);
  syncAuthState();
}

export function clearLoggedIn() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  syncAuthState();
}

export function isUserLoggedIn() {
  return localStorage.getItem(AUTH_STORAGE_KEY) === "user";
}

export default function Header({ forceScrolled = false } = {}) {
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => isUserLoggedIn());

  const navLinks = isLoggedIn ? AUTH_NAV_LINKS : PUBLIC_NAV_LINKS;

  const goToLogin = () => {
    setMenuOpen(false);
    navigate("/login");
  };

  const goToProfile = () => {
    setProfileOpen(false);
    setMenuOpen(false);
    navigate("/user-profile");
  };

  const signOut = () => {
    clearLoggedIn();
    setIsLoggedIn(false);
    setProfileOpen(false);
    setMenuOpen(false);
    navigate("/login");
  };

  useEffect(() => {
    const syncAuth = () => setIsLoggedIn(isUserLoggedIn());
    syncAuth();
    window.addEventListener(AUTH_CHANGE_EVENT, syncAuth);
    return () => window.removeEventListener(AUTH_CHANGE_EVENT, syncAuth);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const effectiveScrolled = forceScrolled || scrolled || isLoggedIn;

  const isActiveLink = (href) => {
    if (href.includes("#")) {
      const [path, linkHash] = href.split("#");
      return pathname === path && hash === `#${linkHash}`;
    }
    return pathname === href;
  };

  const navLinkClass = (href) => {
    const active = isLoggedIn && isActiveLink(href);
    if (active) {
      return "relative text-sm font-medium text-[#FF8022] after:absolute after:-bottom-3 after:left-0 after:right-0 after:h-0.5 after:rounded-full after:bg-[#FF8022]";
    }
    return effectiveScrolled
      ? "text-sm font-medium text-slate-600 transition hover:text-slate-900"
      : "text-sm font-medium text-white/90 transition hover:text-white";
  };

  const mobileNavLinkClass = (href) => {
    const active = isLoggedIn && isActiveLink(href);
    if (active) {
      return "rounded-lg bg-orange-50 px-2 py-2.5 text-sm font-medium text-[#FF8022]";
    }
    return `rounded-lg px-2 py-2.5 text-sm font-medium ${
      effectiveScrolled
        ? "text-slate-700 hover:bg-neutral-50"
        : "text-white/90 hover:bg-white/10"
    }`;
  };

  const menuBtnClass = effectiveScrolled
    ? "inline-flex h-11 w-11 items-center justify-center rounded-lg border border-neutral-200 text-slate-700 md:hidden"
    : "inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/25 text-white md:hidden";

  const handleNavClick = (href, e) => {
    if (href.startsWith("/")) {
      e.preventDefault();
      const [path, linkHash] = href.split("#");
      navigate(linkHash ? `${path}#${linkHash}` : path);
    }
    setMenuOpen(false);
  };

  const logoHref = isLoggedIn ? "/user-dashboard" : "/";

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        effectiveScrolled
          ? "border-b border-neutral-200 bg-white shadow-sm"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <a
          href={logoHref}
          aria-label="GoPaint home"
          className="shrink-0 outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF8022]"
          onClick={(e) => {
            e.preventDefault();
            navigate(logoHref);
          }}
        >
          <span className="font-heading text-2xl font-bold tracking-tight">
            <span
              className={`transition-colors duration-300 ${
                effectiveScrolled ? "text-slate-900" : "text-white"
              }`}
            >
              Go
            </span>
            <span className="text-[#FF8022]">Paint</span>
          </span>
        </a>

        <nav
          className="hidden items-center gap-6 lg:gap-8 md:flex"
          aria-label="Primary navigation"
        >
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={navLinkClass(item.href)}
              onClick={(e) => handleNavClick(item.href, e)}
            >
              {item.label}
            </a>
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
                  AK
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
                  <button
                    type="button"
                    onClick={goToProfile}
                    className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-neutral-50"
                  >
                    My Profile
                  </button>
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
              onClick={goToLogin}
              className="rounded-lg bg-[#FF8022] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e8721a]"
            >
              Sign In
            </button>
          </div>
        )}

        <button
          type="button"
          className={menuBtnClass}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
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
        id="mobile-nav"
        className={`border-t px-4 py-4 md:hidden ${
          effectiveScrolled
            ? "border-neutral-200 bg-white"
            : "border-white/15 bg-black/50 backdrop-blur-md"
        } ${menuOpen ? "block" : "hidden"}`}
      >
        <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={mobileNavLinkClass(item.href)}
              onClick={(e) => handleNavClick(item.href, e)}
            >
              {item.label}
            </a>
          ))}
          {isLoggedIn ? (
            <>
              <button
                type="button"
                onClick={goToProfile}
                className={`mt-2 w-full rounded-lg px-4 py-3 text-center text-sm font-semibold transition ${
                  effectiveScrolled
                    ? "border border-neutral-200 text-slate-700 hover:bg-neutral-50"
                    : "border border-white/25 text-white hover:bg-white/10"
                }`}
              >
                My Profile
              </button>
              <button
                type="button"
                onClick={signOut}
                className="mt-2 w-full rounded-lg border border-red-200 px-4 py-3 text-center text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={goToLogin}
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

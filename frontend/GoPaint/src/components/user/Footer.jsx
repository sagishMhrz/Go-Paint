import { Link, useLocation } from "react-router-dom";

const DASHBOARD_PATHS = ["/user-dashboard", "/user-projects", "/new-project"];

const PLATFORM_BASE = [
  { label: "Color Explorer", href: "/colors" },
  { label: "Room Visualizer", href: "#ai-design" },
  { label: "Find Painters", href: "/find-painters" },
];

const FOR_PAINTERS = [
  { label: "Join as Painter", href: "/painter-signup" },
  { label: "Painter Dashboard", href: "#" },
  { label: "Browse Projects", href: "#" },
  { label: "Pricing & Fees", href: "#" },
  { label: "Painter Resources", href: "#" },
];

const SUPPORT = [
  { label: "Help Center", href: "#contact" },
  { label: "Contact Us", href: "#contact" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

export default function Footer() {
  const { pathname } = useLocation();
  const isDashboardArea = DASHBOARD_PATHS.some((p) => pathname.startsWith(p));

  const platformLinks = [
    ...PLATFORM_BASE,
    {
      label: "Post a Project",
      href: isDashboardArea ? "/new-project" : "#cta",
    },
  ];

  return (
    <footer id="contact" className="scroll-mt-24 bg-[#121212] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="space-y-5">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-teal-600 to-[#FF7A30] shadow-lg ring-2 ring-white/10"
              aria-label="Logo placeholder"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M6 18l2-8 4-2 2 6-4 2-4 2z"
                  fill="white"
                  fillOpacity="0.95"
                />
                <path d="M14 6l4 2-2 6-2-8z" fill="white" fillOpacity="0.6" />
              </svg>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-gray-400">
              Nepal&apos;s smartest paint service marketplace. Connect with
              verified painters, visualize your space, and bring your vision to
              life.
            </p>
            <div className="flex gap-3">
              {[
                { label: "Facebook", letter: "f" },
                { label: "Instagram", letter: "◎" },
                { label: "X", letter: "𝕏" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 bg-gray-900/80 text-sm text-gray-400 transition hover:border-gray-500 hover:text-white"
                  aria-label={s.label}
                >
                  <span aria-hidden className="font-semibold">
                    {s.letter}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-sm font-bold text-white">
              Platform
            </h3>
            <ul className="space-y-2.5">
              {platformLinks.map((l) => (
                <li key={l.label}>
                  {l.href.startsWith("/") ? (
                    <Link
                      to={l.href}
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  ) : (
                    <a
                      href={l.href}
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-sm font-bold text-white">
              For Painters
            </h3>
            <ul className="space-y-2.5">
              {FOR_PAINTERS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-sm font-bold text-white">
              Support
            </h3>
            <ul className="space-y-2.5">
              {SUPPORT.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 space-y-1">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Contact
              </p>
              <a
                href="mailto:hello@gopaint.com.np"
                className="block text-sm text-gray-400 transition-colors hover:text-white"
              >
                gopaint001@gmail.com
              </a>
              <a
                href="tel:+977014000000"
                className="block text-sm text-gray-400 transition-colors hover:text-white"
              >
                +977 01-4XXXXXX
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-gray-800 pt-8 text-sm text-gray-500 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} GoPaint Nepal. All rights reserved.
          </p>
          <p className="text-gray-400">
            Made with{" "}
            <span className="font-semibold text-[#FF7A30]">paint</span> &amp;
            passion in Nepal
          </p>
        </div>
      </div>
    </footer>
  );
}

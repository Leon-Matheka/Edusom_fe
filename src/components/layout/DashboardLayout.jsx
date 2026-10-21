import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Bell, Search, X, LogOut, GraduationCap } from 'lucide-react';

/**
 * Shared shell for the Teacher, Student and Parent dashboards:
 * a deep-teal side panel, a slim top bar and a content area.
 *
 * nav items: { label, icon, to }   -> router link (matches the exact path)
 *            { label, icon, hash } -> in-page section link, e.g. '#performance'
 */
export default function DashboardLayout({
  role,
  nav,
  user,
  title,
  subtitle,
  searchPlaceholder = 'Search…',
  children,
}) {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const path = pathname.replace(/\/$/, '') || '/';

  const isActive = (item) =>
    item.hash ? hash === item.hash : path === item.to && !hash;

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const itemClass = (active) =>
    `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors border-l-2 ${
      active
        ? 'bg-primary-700/60 text-white border-primary-300'
        : 'text-primary-100/80 border-transparent hover:bg-primary-800 hover:text-white'
    }`;

  return (
    <div className="min-h-screen bg-page text-ink">
      {open && (
        <div
          className="fixed inset-0 z-30 bg-primary-900/50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-primary-900 transition-transform duration-200 md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-primary-800">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-400 text-primary-900">
              <GraduationCap size={20} />
            </div>
            <div className="leading-tight">
              <p className="text-base font-semibold text-white">EduSom</p>
              <p className="text-xs text-primary-200">{role}</p>
            </div>
          </div>
          <button
            className="md:hidden text-primary-200 hover:text-white"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label={`${role} navigation`}>
          {nav.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);
            const content = (
              <>
                <Icon size={18} className={active ? 'text-primary-200' : 'text-primary-300'} />
                {item.label}
              </>
            );
            return item.hash ? (
              <a
                key={item.label}
                href={item.hash}
                onClick={() => setOpen(false)}
                className={itemClass(active)}
                aria-current={active ? 'page' : undefined}
              >
                {content}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setOpen(false)}
                className={itemClass(active)}
                aria-current={active ? 'page' : undefined}
              >
                {content}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-primary-800 p-3">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-semibold text-white">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">{user.name}</p>
              <p className="truncate text-xs text-primary-200">{user.detail || role}</p>
            </div>
          </div>
          <button className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-primary-200 transition-colors hover:bg-primary-800 hover:text-white">
            <LogOut size={18} />
            Log out
          </button>
        </div>
      </aside>

      <div className="md:pl-64">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-border bg-page/90 px-6 py-3.5 backdrop-blur">
          <div className="flex items-center gap-3">
            <button
              className="rounded-lg p-2 text-subtle hover:bg-panel md:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
            <div>
              <h1 className="text-lg font-semibold leading-tight">{title}</h1>
              {subtitle && <p className="hidden text-sm text-subtle md:block">{subtitle}</p>}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-subtle" size={16} />
              <input
                type="text"
                placeholder={searchPlaceholder}
                className="w-64 rounded-lg border border-border bg-white py-2 pl-9 pr-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
              />
            </div>
            <button className="relative rounded-full p-2 text-subtle hover:bg-panel" aria-label="Notifications">
              <Bell size={20} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-page bg-primary-500" />
            </button>
          </div>
        </header>

        <main className="p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}

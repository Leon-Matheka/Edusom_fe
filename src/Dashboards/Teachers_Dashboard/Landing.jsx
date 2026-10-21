import { Link } from 'react-router-dom';
import { Upload, FolderOpen, BarChart3 } from 'lucide-react';

const goals = [
  'Streamline academic workflows',
  'Enhance student performance tracking',
  'Support personalized teaching plans',
];

const actions = [
  { label: 'Upload marks', to: '/teacher/upload', icon: Upload },
  { label: 'Browse resources', to: '/teacher/resources', icon: FolderOpen },
  { label: 'View class analytics', to: '/teacher/analytics', icon: BarChart3 },
];

export default function Landing() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-primary-800 p-8 text-white">
        <h2 className="text-2xl font-semibold">Welcome to the Edusom teacher portal</h2>
        <p className="mt-2 max-w-xl text-primary-100">
          Manage your classes, share resources and follow how every student is progressing.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {actions.map(({ label, to, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-3 rounded-xl border border-border bg-white p-5 transition-colors hover:border-primary-400"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
              <Icon size={20} />
            </span>
            <span className="font-medium">{label}</span>
          </Link>
        ))}
      </section>

      <section className="rounded-2xl border border-border bg-white p-6">
        <h3 className="font-semibold">What Edusom helps you do</h3>
        <ul className="mt-3 space-y-2 text-subtle">
          {goals.map((g) => (
            <li key={g} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
              {g}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

const field =
  'mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200';

function Field({ label, children }) {
  return (
    <label className="block text-sm font-medium text-subtle">
      {label}
      {children}
    </label>
  );
}

export default function Profile() {
  return (
    <div className="max-w-3xl space-y-6">
      <section className="flex items-center gap-5 rounded-2xl border border-border bg-white p-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-600 text-2xl font-semibold text-white">
          LO
        </div>
        <div className="grid flex-1 gap-4 sm:grid-cols-2">
          <Field label="Full name">
            <input className={field} defaultValue="Leon Otieno" />
          </Field>
          <Field label="ID number">
            <input className={field} defaultValue="TCH-2025-001" />
          </Field>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-border bg-white p-6">
        <Field label="Achievements">
          <textarea rows={3} className={field} defaultValue="Best Math Teacher 2024, STEM Club Mentor" />
        </Field>
        <Field label="Teaching history">
          <textarea rows={3} className={field} defaultValue="5 years teaching Mathematics and Physics at NYS" />
        </Field>
        <Field label="Specialization">
          <textarea rows={2} className={field} defaultValue="Mathematics, Physics, Data Analysis" />
        </Field>
        <button className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
          Save changes
        </button>
      </section>
    </div>
  );
}

import { useState } from "react";
import { CalendarDays, Link as LinkIcon, Plus, Share2, StickyNote, Trash2, Upload, X } from "lucide-react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// Fixed school day. `break` rows span the whole week and can't hold lessons.
const periods = [
  { id: "p1", label: "8:00 – 8:40" },
  { id: "p2", label: "8:40 – 9:20" },
  { id: "p3", label: "9:20 – 10:00" },
  { id: "break", label: "10:00 – 10:30", isBreak: true },
  { id: "p4", label: "10:30 – 11:10" },
  { id: "p5", label: "11:10 – 11:50" },
  { id: "p6", label: "11:50 – 12:30" },
];

const blank = () => ({ files: [], links: [], notes: "" });

// Starter timetable so the grid isn't empty on first load — edit or delete freely.
const starter = [
  ["Monday", "p1", "Mathematics — Grade 7B"],
  ["Monday", "p4", "Physics — Grade 8A"],
  ["Tuesday", "p2", "Mathematics — Grade 7B"],
  ["Wednesday", "p1", "Data Analysis — Grade 8A"],
  ["Thursday", "p5", "Physics — Grade 8A"],
  ["Friday", "p3", "Mathematics — Grade 7B"],
].map(([day, period, title]) => ({ id: `${day}-${period}`, day, period, title, resources: blank() }));

const input =
  "rounded-lg border border-border bg-white px-3 py-1.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200";

export default function Resources() {
  const [lessons, setLessons] = useState(starter);
  const [plannerOpen, setPlannerOpen] = useState(true);
  const [notesOpen, setNotesOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [adding, setAdding] = useState(null); // { day, period } | null
  const [shared, setShared] = useState([]);

  const selected = lessons.find((l) => l.id === selectedId) || null;
  const teachingSlots = days.length * periods.filter((p) => !p.isBreak).length;
  const lessonAt = (day, period) => lessons.find((l) => l.day === day && l.period === period);

  const update = (id, fn) => setLessons((prev) => prev.map((l) => (l.id === id ? fn(l) : l)));

  const addLesson = (e) => {
    e.preventDefault();
    const title = e.target.elements.title.value.trim();
    if (!title) return;
    const lesson = { id: `${adding.day}-${adding.period}-${Date.now()}`, ...adding, title, resources: blank() };
    setLessons((prev) => [...prev, lesson]);
    setSelectedId(lesson.id);
    setAdding(null);
  };

  const removeLesson = (id) => {
    setLessons((prev) => prev.filter((l) => l.id !== id));
    setSelectedId(null);
  };

  const addFiles = (id, e) => {
    const names = Array.from(e.target.files).map((f) => f.name);
    update(id, (l) => ({ ...l, resources: { ...l.resources, files: [...l.resources.files, ...names] } }));
  };

  const addLink = (id, e) => {
    e.preventDefault();
    const url = e.target.elements.url.value.trim();
    if (!url) return;
    update(id, (l) => ({ ...l, resources: { ...l.resources, links: [...l.resources.links, url] } }));
    e.target.reset();
  };

  const shareLesson = (l) => {
    const slot = periods.find((p) => p.id === l.period)?.label;
    setShared((prev) => [...prev, `${l.day} (${slot}) — ${l.title}`]);
  };

  const iconBtn = (active) =>
    `flex items-center gap-2 rounded-lg border px-3 py-2 text-sm shadow-sm ${
      active ? "border-primary-600 bg-primary-600 text-white" : "border-border bg-white hover:bg-panel"
    }`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Resources</h2>
          <p className="text-subtle">Your timetable, lesson materials and notes in one place.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setPlannerOpen((v) => !v)} className={iconBtn(plannerOpen)} title="Weekly timetable" aria-pressed={plannerOpen}>
            <CalendarDays size={18} />
            <span className="hidden sm:inline">Planner</span>
          </button>
          <button onClick={() => setNotesOpen((v) => !v)} className={iconBtn(notesOpen)} title="Personal notes" aria-pressed={notesOpen}>
            <StickyNote size={18} />
            <span className="hidden sm:inline">Notes</span>
          </button>
        </div>
      </div>

      {notesOpen && (
        <div className="rounded-2xl border border-border bg-white p-6">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-semibold">
              <StickyNote size={18} /> Personal notes
            </h3>
            <button onClick={() => setNotesOpen(false)} className="text-subtle hover:text-ink" aria-label="Close notes">
              <X size={18} />
            </button>
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write down ideas, reminders, or general notes…"
            className={`${input} min-h-[100px] w-full`}
          />
          <button
            onClick={() => notes.trim() && setShared((prev) => [...prev, `Note: ${notes}`])}
            className="mt-2 flex items-center gap-1.5 rounded-lg bg-primary-600 px-3 py-1.5 text-sm text-white hover:bg-primary-700"
          >
            <Share2 size={14} /> Save and share notes
          </button>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Lessons this week", lessons.length],
          ["Free periods", teachingSlots - lessons.length],
          ["Shared resources", shared.length],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-border bg-white p-5">
            <p className="text-sm text-subtle">{label}</p>
            <p className="mt-1 text-2xl font-semibold">{value}</p>
          </div>
        ))}
      </div>

      {plannerOpen && (
        <section className="rounded-2xl border border-border bg-white p-6">
          <h3 className="mb-4 font-semibold">Weekly timetable</h3>
          <div className="overflow-x-auto">
            <div className="grid min-w-[760px] grid-cols-[110px_repeat(5,minmax(0,1fr))] gap-px overflow-hidden rounded-lg border border-border bg-border text-sm">
              <div className="bg-panel p-2.5 font-medium text-subtle">Time</div>
              {days.map((d) => (
                <div key={d} className="bg-panel p-2.5 text-center font-medium">
                  {d}
                </div>
              ))}

              {periods.map((p) =>
                p.isBreak ? (
                  <div key={p.id} className="col-span-6 flex items-center justify-center gap-3 bg-panel/70 py-1.5 text-xs text-subtle">
                    <span>Break</span>
                    <span>{p.label}</span>
                  </div>
                ) : (
                  <FragmentRow
                    key={p.id}
                    period={p}
                    lessonAt={lessonAt}
                    selectedId={selectedId}
                    onSelect={(id) => {
                      setSelectedId(id === selectedId ? null : id);
                      setAdding(null);
                    }}
                    onAdd={(day) => {
                      setAdding({ day, period: p.id });
                      setSelectedId(null);
                    }}
                  />
                )
              )}
            </div>
          </div>

          {adding && (
            <form onSubmit={addLesson} className="mt-4 flex flex-wrap items-center gap-2 rounded-lg border border-border p-3">
              <span className="text-sm text-subtle">
                {adding.day}, {periods.find((p) => p.id === adding.period)?.label}
              </span>
              <input name="title" autoFocus placeholder="Subject / class, e.g. Mathematics — Grade 7B" className={`${input} min-w-[220px] flex-1`} />
              <button type="submit" className="rounded-lg bg-primary-600 px-3 py-1.5 text-sm text-white hover:bg-primary-700">
                Add lesson
              </button>
              <button type="button" onClick={() => setAdding(null)} className="px-2 text-sm text-subtle">
                Cancel
              </button>
            </form>
          )}

          {selected && (
            <div className="mt-4 space-y-4 rounded-lg border border-border p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{selected.title}</p>
                  <p className="text-sm text-subtle">
                    {selected.day} · {periods.find((p) => p.id === selected.period)?.label}
                  </p>
                </div>
                <button onClick={() => removeLesson(selected.id)} className="flex items-center gap-1 text-sm text-red-600 hover:underline">
                  <Trash2 size={14} /> Remove
                </button>
              </div>

              <div>
                <p className="mb-1 text-sm font-semibold">Lesson plan</p>
                <textarea
                  value={selected.resources.notes}
                  onChange={(e) => update(selected.id, (l) => ({ ...l, resources: { ...l.resources, notes: e.target.value } }))}
                  placeholder="Objectives and plan for this lesson…"
                  className={`${input} min-h-[80px] w-full`}
                />
              </div>

              <div>
                <p className="mb-1 text-sm font-semibold">Lesson materials</p>
                <input type="file" multiple onChange={(e) => addFiles(selected.id, e)} className="text-sm" />
                {selected.resources.files.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {selected.resources.files.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 rounded border border-border p-2 text-sm">
                        <Upload size={14} /> {f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <p className="mb-1 text-sm font-semibold">Reference links</p>
                <form onSubmit={(e) => addLink(selected.id, e)} className="flex gap-2">
                  <input type="url" name="url" placeholder="Add a reference link…" className={`${input} flex-1`} />
                  <button type="submit" className="flex items-center gap-1 rounded-lg bg-primary-600 px-3 py-1.5 text-sm text-white hover:bg-primary-700">
                    <LinkIcon size={14} /> Add
                  </button>
                </form>
                {selected.resources.links.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {selected.resources.links.map((l, i) => (
                      <li key={i} className="rounded border border-border p-2 text-sm">
                        <a href={l} target="_blank" rel="noreferrer" className="text-primary-700 underline">
                          {l}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button onClick={() => shareLesson(selected)} className="flex items-center gap-1 text-sm text-primary-700 hover:underline">
                <Share2 size={14} /> Share this lesson
              </button>
            </div>
          )}
        </section>
      )}

      <section className="rounded-2xl border border-border bg-white p-6">
        <h3 className="mb-3 font-semibold">Shared resources</h3>
        {shared.length === 0 ? (
          <p className="text-subtle">No resources shared yet.</p>
        ) : (
          <ul className="space-y-1">
            {shared.map((s, i) => (
              <li key={i} className="rounded border border-border p-2 text-sm">
                {s}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

// One timetable row: the time label plus a cell for each weekday.
function FragmentRow({ period, lessonAt, selectedId, onSelect, onAdd }) {
  return (
    <>
      <div className="bg-white p-2.5 text-xs text-subtle">{period.label}</div>
      {days.map((day) => {
        const lesson = lessonAt(day, period.id);
        return (
          <div key={day} className="min-h-[64px] bg-white p-1.5">
            {lesson ? (
              <button
                onClick={() => onSelect(lesson.id)}
                className={`h-full w-full rounded-md border p-2 text-left text-xs font-medium leading-snug transition-colors ${
                  selectedId === lesson.id
                    ? "border-primary-600 bg-primary-100 text-primary-900"
                    : "border-primary-200 bg-primary-50 text-primary-800 hover:bg-primary-100"
                }`}
              >
                {lesson.title}
              </button>
            ) : (
              <button
                onClick={() => onAdd(day)}
                aria-label={`Add lesson on ${day} at ${period.label}`}
                className="flex h-full w-full items-center justify-center rounded-md text-border transition-colors hover:bg-panel hover:text-primary-600"
              >
                <Plus size={16} />
              </button>
            )}
          </div>
        );
      })}
    </>
  );
}

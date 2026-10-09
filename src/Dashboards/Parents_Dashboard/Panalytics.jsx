import React, { useState, useMemo } from "react";
import {
  BookOpen,
  Link2,
  Plus,
  TrendingUp,
  TrendingDown,
  Minus,
  X,
} from "lucide-react";

// Brand tokens — consistent with the rest of the platform
const c = {
  page: "#EEF1F6",
  ink: "#1B1F3B",
  subtle: "#6B7280",
  card: "#FFFFFF",
  border: "#E1E5EC",
  panel: "#F5F7FB",
  gold: "#D9A02C",
  goldSoft: "rgba(217,160,44,0.12)",
  goldStrong: "#8A6110",
  teal: "#2E8F86",
  tealSoft: "rgba(46,143,134,0.12)",
  tealStrong: "#1F6359",
  red: "#B84C4C",
  redSoft: "rgba(184,76,76,0.10)",
};

// Mock data generator for a newly linked child — replace with a real API call
const makeMockChild = (id, name, grade, school) => ({
  id,
  name,
  grade,
  school,
  subjects: [
    {
      name: "Mathematics",
      teacher: "Mrs. Wanjiru",
      marks: [
        { assessment: "CAT 1", score: 72, max: 100, date: "2026-01-22" },
        { assessment: "CAT 2", score: 78, max: 100, date: "2026-02-19" },
        { assessment: "Midterm", score: 85, max: 100, date: "2026-03-14" },
      ],
    },
    {
      name: "English",
      teacher: "Mr. Otieno",
      marks: [
        { assessment: "CAT 1", score: 88, max: 100, date: "2026-01-25" },
        { assessment: "CAT 2", score: 81, max: 100, date: "2026-02-21" },
        { assessment: "Midterm", score: 79, max: 100, date: "2026-03-15" },
      ],
    },
    {
      name: "Science",
      teacher: "Ms. Achieng",
      marks: [
        { assessment: "CAT 1", score: 65, max: 100, date: "2026-01-23" },
        { assessment: "CAT 2", score: 70, max: 100, date: "2026-02-20" },
        { assessment: "Midterm", score: 74, max: 100, date: "2026-03-13" },
      ],
    },
    {
      name: "ICT",
      teacher: "Mr. Kamau",
      marks: [
        { assessment: "CAT 1", score: 91, max: 100, date: "2026-01-24" },
        { assessment: "CAT 2", score: 89, max: 100, date: "2026-02-22" },
        { assessment: "Midterm", score: 94, max: 100, date: "2026-03-16" },
      ],
    },
  ],
});

const subjectAverage = (subject) => {
  const pct = subject.marks.map((m) => (m.score / m.max) * 100);
  return pct.reduce((a, b) => a + b, 0) / pct.length;
};

const subjectTrend = (subject) => {
  const pct = subject.marks.map((m) => (m.score / m.max) * 100);
  if (pct.length < 2) return 0;
  return pct[pct.length - 1] - pct[pct.length - 2];
};

const progressColor = (pct) => (pct >= 75 ? c.teal : pct >= 50 ? c.gold : c.red);

export default function ParentAnalytics() {
  const [children, setChildren] = useState([
    makeMockChild("c1", "Amina Njoroge", "Grade 7B", "NYS Primary"),
  ]);
  const [selectedChildId, setSelectedChildId] = useState("c1");
  const [showLinkForm, setShowLinkForm] = useState(false);
  const [subjectFilter, setSubjectFilter] = useState("all");

  const selectedChild = children.find((ch) => ch.id === selectedChildId) || null;

  const allMarks = useMemo(() => {
    if (!selectedChild) return [];
    return selectedChild.subjects
      .flatMap((s) =>
        s.marks.map((m) => ({
          subject: s.name,
          teacher: s.teacher,
          ...m,
        }))
      )
      .filter((m) => subjectFilter === "all" || m.subject === subjectFilter)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [selectedChild, subjectFilter]);

  const handleLinkChild = (e) => {
    e.preventDefault();
    const code = e.target.elements.code.value.trim();
    const name = e.target.elements.name.value.trim();
    if (!code || !name) return;
    const id = `c${children.length + 1}`;
    const newChild = makeMockChild(id, name, "Grade 6A", "NYS Primary");
    setChildren([...children, newChild]);
    setSelectedChildId(id);
    setShowLinkForm(false);
    e.target.reset();
  };

  return (
    <div style={{ background: c.page, color: c.ink }} className="min-h-screen font-sans">
      {/* HEADER */}
      <header className="px-6 py-3 flex items-center justify-between sticky top-0 z-10" style={{ background: c.card, borderBottom: `1px solid ${c.border}` }}>
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: c.gold }}>
            <BookOpen size={16} color={c.ink} />
          </div>
          <span className="font-serif font-semibold text-lg">ClassBridge</span>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm" style={{ color: c.subtle }}>
          <span style={{ color: c.ink, fontWeight: 600, borderBottom: `2px solid ${c.gold}`, paddingBottom: 4 }}>
            Analytics
          </span>
          <span className="hover:opacity-80 transition cursor-pointer">Messages</span>
        </nav>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <div>
          <h1 className="font-serif text-2xl font-semibold">Progress & marks</h1>
          <p className="text-sm mt-1" style={{ color: c.subtle }}>
            Link your child's account to see how they're doing in each subject.
          </p>
        </div>

        {/* Child selector strip */}
        <div className="flex items-center gap-2 flex-wrap">
          {children.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setSelectedChildId(ch.id)}
              className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition"
              style={{
                background: selectedChildId === ch.id ? c.goldSoft : c.card,
                color: selectedChildId === ch.id ? c.goldStrong : c.ink,
                border: `1px solid ${selectedChildId === ch.id ? c.gold : c.border}`,
              }}
            >
              <span
                className="h-6 w-6 rounded-full flex items-center justify-center font-serif font-semibold text-xs"
                style={{ background: c.teal, color: "#fff" }}
              >
                {ch.name.charAt(0)}
              </span>
              {ch.name}
            </button>
          ))}
          <button
            onClick={() => setShowLinkForm(!showLinkForm)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition"
            style={{ border: `1px dashed ${c.border}`, color: c.subtle }}
          >
            <Plus size={14} /> Link a child
          </button>
        </div>

        {/* Link child form */}
        {showLinkForm && (
          <div className="rounded-2xl p-5" style={{ background: c.card, border: `1px solid ${c.border}` }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <Link2 size={15} style={{ color: c.gold }} /> Link a child's account
              </h3>
              <button onClick={() => setShowLinkForm(false)} style={{ color: c.subtle }}>
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleLinkChild} className="grid sm:grid-cols-2 gap-3">
              <input
                type="text"
                name="name"
                placeholder="Child's full name"
                className="rounded-lg p-2.5 text-sm outline-none"
                style={{ background: c.panel, border: `1px solid ${c.border}` }}
              />
              <input
                type="text"
                name="code"
                placeholder="Linking code from school"
                className="rounded-lg p-2.5 text-sm outline-none"
                style={{ background: c.panel, border: `1px solid ${c.border}` }}
              />
              <button
                type="submit"
                className="sm:col-span-2 text-sm font-medium px-4 py-2.5 rounded-lg transition"
                style={{ background: c.gold, color: c.ink }}
              >
                Link account
              </button>
            </form>
            <p className="text-xs mt-2" style={{ color: c.subtle }}>
              Your school issues a linking code for each parent — check the enrollment letter or ask
              the school office.
            </p>
          </div>
        )}

        {selectedChild && (
          <>
            {/* Child info */}
            <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: c.card, border: `1px solid ${c.border}` }}>
              <span
                className="h-11 w-11 rounded-full flex items-center justify-center font-serif font-semibold"
                style={{ background: c.teal, color: "#fff" }}
              >
                {selectedChild.name.charAt(0)}
              </span>
              <div>
                <p className="font-semibold text-sm">{selectedChild.name}</p>
                <p className="text-xs" style={{ color: c.subtle }}>
                  {selectedChild.grade} — {selectedChild.school}
                </p>
              </div>
            </div>

            {/* Subject progress grid */}
            <div>
              <h2 className="font-semibold text-sm mb-3">Subject progress</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {selectedChild.subjects.map((s) => {
                  const avg = subjectAverage(s);
                  const trend = subjectTrend(s);
                  const TrendIcon = trend > 0.5 ? TrendingUp : trend < -0.5 ? TrendingDown : Minus;
                  const trendColor = trend > 0.5 ? c.teal : trend < -0.5 ? c.red : c.subtle;
                  return (
                    <div key={s.name} className="rounded-2xl p-4" style={{ background: c.card, border: `1px solid ${c.border}` }}>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-sm">{s.name}</p>
                          <p className="text-xs" style={{ color: c.subtle }}>{s.teacher}</p>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-medium" style={{ color: trendColor }}>
                          <TrendIcon size={13} />
                          {trend !== 0 ? `${trend > 0 ? "+" : ""}${trend.toFixed(0)}%` : "steady"}
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-3">
                        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: c.panel }}>
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${avg}%`, background: progressColor(avg) }}
                          />
                        </div>
                        <span className="text-sm font-semibold" style={{ color: progressColor(avg) }}>
                          {avg.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Raw marks table */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-sm">Raw marks</h2>
                <select
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                  className="text-xs rounded-lg px-2 py-1.5 outline-none"
                  style={{ background: c.card, border: `1px solid ${c.border}` }}
                >
                  <option value="all">All subjects</option>
                  {selectedChild.subjects.map((s) => (
                    <option key={s.name} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div className="rounded-2xl overflow-hidden" style={{ background: c.card, border: `1px solid ${c.border}` }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: c.panel }}>
                      <th className="text-left font-medium px-4 py-2.5" style={{ color: c.subtle }}>Assessment</th>
                      <th className="text-left font-medium px-4 py-2.5" style={{ color: c.subtle }}>Subject</th>
                      <th className="text-left font-medium px-4 py-2.5 hidden sm:table-cell" style={{ color: c.subtle }}>Teacher</th>
                      <th className="text-left font-medium px-4 py-2.5" style={{ color: c.subtle }}>Date</th>
                      <th className="text-right font-medium px-4 py-2.5" style={{ color: c.subtle }}>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allMarks.map((m, i) => {
                      const pct = (m.score / m.max) * 100;
                      return (
                        <tr key={i} style={{ borderTop: `1px solid ${c.border}` }}>
                          <td className="px-4 py-2.5">{m.assessment}</td>
                          <td className="px-4 py-2.5">
                            <span
                              className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                              style={{ background: c.tealSoft, color: c.tealStrong }}
                            >
                              {m.subject}
                            </span>
                          </td>
                          <td className="px-4 py-2.5 hidden sm:table-cell" style={{ color: c.subtle }}>{m.teacher}</td>
                          <td className="px-4 py-2.5" style={{ color: c.subtle }}>{m.date}</td>
                          <td className="px-4 py-2.5 text-right font-semibold" style={{ color: progressColor(pct) }}>
                            {m.score}/{m.max}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {!selectedChild && (
          <div className="rounded-2xl p-10 text-center" style={{ background: c.card, border: `1px solid ${c.border}` }}>
            <p className="text-sm" style={{ color: c.subtle }}>Link a child's account to see their progress here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
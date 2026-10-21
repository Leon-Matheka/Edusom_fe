import { useMemo, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout.jsx";
import { MessageCircle, Bell, LayoutGrid, ChevronDown, ArrowUpRight } from "lucide-react";
import ParentsM from "./ParentsM.jsx";
import { students, getChildrenByParentId } from "../../mockData/classMockData";

// Same brand tokens as PD_Landing — cool paper/ink base, gold primary, teal secondary.
const c = {
  page: "#FBFAF7",
  ink: "#1B1F3B",
  subtle: "#5B6072",
  card: "#FFFFFF",
  border: "#E7E4DC",
  panel: "#F3F1EA",
  gold: "#D9A02C",
  goldSoft: "rgba(217,160,44,0.12)",
  goldStrong: "#8A6110",
  teal: "#2E8F86",
  tealSoft: "rgba(46,143,134,0.10)",
  tealStrong: "#1F6359",
  danger: "#B3453D",
};

const nav = [
  { label: "Overview", icon: LayoutGrid, to: "/parent" },
  { label: "Messages", icon: MessageCircle, to: "/parent/messages" },
];

// TODO: replace with the signed-in parent's real id once auth is wired up.
const CURRENT_PARENT_ID = 201;

const announcements = [
  {
    id: 1,
    title: "Mid-term reports released",
    body: "Grade 7B mid-term reports are now available under each subject.",
    time: "2h ago",
  },
  {
    id: 2,
    title: "Parents' evening — 24 Oct",
    body: "Book a 10-minute slot with any teacher from the Messages tab.",
    time: "1d ago",
  },
];

function gradeColor(grade) {
  if (grade === "A" || grade === "A+") return c.teal;
  if (grade === "B+" || grade === "B") return c.teal;
  return c.danger;
}

function ChildSwitcher({ children, activeId, onChange }) {
  const [open, setOpen] = useState(false);
  const active = children.find((ch) => ch.id === activeId) || children[0];
  if (!active) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition"
        style={{ border: `1px solid ${c.border}`, background: c.card, color: c.ink }}
      >
        <span
          className="h-6 w-6 rounded-full flex items-center justify-center text-xs font-serif font-semibold"
          style={{ background: c.teal, color: "#fff" }}
        >
          {active.name.charAt(0)}
        </span>
        {active.name}
        {children.length > 1 && <ChevronDown size={14} />}
      </button>

      {open && children.length > 1 && (
        <div
          className="absolute right-0 mt-2 w-48 rounded-xl overflow-hidden z-20"
          style={{ background: c.card, border: `1px solid ${c.border}`, boxShadow: "0 12px 24px -8px rgba(27,31,59,0.18)" }}
        >
          {children.map((ch) => (
            <button
              key={ch.id}
              onClick={() => {
                onChange(ch.id);
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 text-sm hover:opacity-80 transition"
              style={{ color: c.ink, background: ch.id === activeId ? c.panel : "transparent" }}
            >
              {ch.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Overview() {
  const children = useMemo(() => {
    const linked = getChildrenByParentId(CURRENT_PARENT_ID);
    return linked.length > 0 ? linked : students.slice(0, 1);
  }, []);
  const [activeChildId, setActiveChildId] = useState(children[0]?.id);
  const child = children.find((ch) => ch.id === activeChildId) || children[0];

  if (!child) return null;

  const average = Math.round(
    child.performance.reduce((sum, p) => sum + p.score, 0) / child.performance.length
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-semibold" style={{ color: c.ink }}>
            {child.name.split(" ")[0]}'s term at a glance
          </h2>
          <p className="text-sm mt-1" style={{ color: c.subtle }}>
            Grade 7B · Admission {child.admissionNo}
          </p>
        </div>
        <ChildSwitcher children={children} activeId={activeChildId} onChange={setActiveChildId} />
      </div>

      {/* Summary strip */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="rounded-2xl p-5" style={{ background: c.card, border: `1px solid ${c.border}` }}>
          <p className="text-xs font-medium" style={{ color: c.subtle }}>Overall average</p>
          <p className="mt-1 font-serif text-3xl font-semibold" style={{ color: c.ink }}>{average}%</p>
        </div>
        <div className="rounded-2xl p-5" style={{ background: c.card, border: `1px solid ${c.border}` }}>
          <p className="text-xs font-medium" style={{ color: c.subtle }}>Subjects tracked</p>
          <p className="mt-1 font-serif text-3xl font-semibold" style={{ color: c.ink }}>{child.performance.length}</p>
        </div>
        <div className="rounded-2xl p-5" style={{ background: c.card, border: `1px solid ${c.border}` }}>
          <p className="text-xs font-medium" style={{ color: c.subtle }}>Unread messages</p>
          <p className="mt-1 font-serif text-3xl font-semibold" style={{ color: c.ink }}>3</p>
        </div>
      </div>

      {/* Subject performance */}
      <div className="rounded-2xl p-6" style={{ background: c.card, border: `1px solid ${c.border}` }}>
        <h3 className="font-semibold text-base mb-5" style={{ color: c.ink }}>Subject performance</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {child.performance.map((p) => (
            <div
              key={p.subject}
              className="rounded-xl p-4 flex items-center justify-between"
              style={{ background: c.panel }}
            >
              <div>
                <p className="text-sm font-medium" style={{ color: c.ink }}>{p.subject}</p>
                <p className="text-xs mt-0.5" style={{ color: c.subtle }}>{p.teacher}</p>
                <div className="mt-2 h-1.5 w-32 rounded-full overflow-hidden" style={{ background: c.border }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${p.score}%`, background: gradeColor(p.grade) }}
                  />
                </div>
              </div>
              <div className="text-right">
                <p className="font-serif text-lg font-semibold" style={{ color: gradeColor(p.grade) }}>
                  {p.grade}
                </p>
                <p className="text-xs" style={{ color: c.subtle }}>{p.score}%</p>
                <Link
                  to="/parent/messages"
                  className="inline-flex items-center gap-1 mt-1.5 text-xs font-medium hover:opacity-80"
                  style={{ color: c.tealStrong }}
                >
                  Message <ArrowUpRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Announcements */}
      <div className="rounded-2xl p-6" style={{ background: c.card, border: `1px solid ${c.border}` }}>
        <h3 className="font-semibold text-base mb-4" style={{ color: c.ink }}>Announcements</h3>
        <div className="space-y-4">
          {announcements.map((a) => (
            <div key={a.id} className="flex gap-3 pb-4 last:pb-0" style={{ borderBottom: `1px solid ${c.border}` }}>
              <div className="h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: c.tealSoft }}>
                <Bell size={14} style={{ color: c.tealStrong }} />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: c.ink }}>{a.title}</p>
                <p className="text-sm mt-0.5" style={{ color: c.subtle }}>{a.body}</p>
                <p className="text-xs mt-1" style={{ color: c.subtle }}>{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PD_Homepage() {
  const location = useLocation();
  const onMessages = location.pathname.startsWith("/parent/messages");

  return (
    <DashboardLayout
      role="Parent"
      nav={nav}
      user={{ name: "Parent account", detail: "Grade 7B" }}
      title={onMessages ? "Messages" : "Overview"}
      subtitle={onMessages ? "Talk to your child's teachers." : "How your child is doing this term."}
      searchPlaceholder="Search subjects, teachers…"
    >
      <div className="mx-auto max-w-5xl">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="messages" element={<ParentsM />} />
        </Routes>
      </div>
    </DashboardLayout>
  );
}

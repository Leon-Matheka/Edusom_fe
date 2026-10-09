import React, { useMemo, useState } from "react";
import { Send, ChevronLeft, Search } from "lucide-react";
import { teachers, students, getChildrenByParentId } from "../../mockData/classMockData";

const c = {
  page: "#FBFAF7",
  ink: "#1B1F3B",
  subtle: "#5B6072",
  card: "#FFFFFF",
  border: "#E7E4DC",
  panel: "#F3F1EA",
  gold: "#D9A02C",
  goldSoft: "rgba(217,160,44,0.12)",
  teal: "#2E8F86",
  tealSoft: "rgba(46,143,134,0.10)",
  tealStrong: "#1F6359",
};

const CURRENT_PARENT_ID = 201;

// Seed one opening message per teacher so the inbox doesn't look empty on first load.
function seedThread(teacher, childName) {
  return [
    {
      from: "teacher",
      text: `Hi! Quick note on ${childName}'s recent ${teacher.subject} work — happy to chat if you have questions.`,
      time: "Mon, 9:04 AM",
    },
  ];
}

export default function ParentsM() {
  const child = useMemo(() => {
    const linked = getChildrenByParentId(CURRENT_PARENT_ID);
    return linked[0] || students[0];
  }, []);

  const [threads, setThreads] = useState(() => {
    const initial = {};
    teachers.forEach((t) => {
      initial[t.id] = seedThread(t, child.name.split(" ")[0]);
    });
    return initial;
  });

  const [query, setQuery] = useState("");
  const [activeTeacherId, setActiveTeacherId] = useState(teachers[0].id);
  const [draft, setDraft] = useState("");
  const [mobileThreadOpen, setMobileThreadOpen] = useState(false);

  const activeTeacher = teachers.find((t) => t.id === activeTeacherId);
  const activeMessages = threads[activeTeacherId] || [];

  const filteredTeachers = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.subject.toLowerCase().includes(query.toLowerCase())
  );

  function lastMessagePreview(teacherId) {
    const msgs = threads[teacherId] || [];
    return msgs[msgs.length - 1]?.text || "No messages yet";
  }

  function selectTeacher(id) {
    setActiveTeacherId(id);
    setMobileThreadOpen(true);
  }

  function sendMessage() {
    const text = draft.trim();
    if (!text) return;
    setThreads((prev) => ({
      ...prev,
      [activeTeacherId]: [
        ...(prev[activeTeacherId] || []),
        { from: "parent", text, time: "Just now" },
      ],
    }));
    setDraft("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div
      className="rounded-2xl overflow-hidden grid md:grid-cols-[280px_1fr] h-[calc(100vh-160px)] min-h-[420px]"
      style={{ background: c.card, border: `1px solid ${c.border}` }}
    >
      {/* Conversation list */}
      <div
        className={`flex-col ${mobileThreadOpen ? "hidden md:flex" : "flex"}`}
        style={{ borderRight: `1px solid ${c.border}` }}
      >
        <div className="p-4" style={{ borderBottom: `1px solid ${c.border}` }}>
          <h2 className="font-serif text-lg font-semibold" style={{ color: c.ink }}>Messages</h2>
          <p className="text-xs mt-0.5" style={{ color: c.subtle }}>
            {child.name.split(" ")[0]}'s teachers · Grade 7B
          </p>
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={14} style={{ color: c.subtle }} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search teachers or subjects"
              className="w-full pl-8 pr-3 py-2 rounded-lg text-sm focus:outline-none"
              style={{ background: c.panel, color: c.ink, border: `1px solid ${c.border}` }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredTeachers.map((t) => {
            const active = t.id === activeTeacherId;
            return (
              <button
                key={t.id}
                onClick={() => selectTeacher(t.id)}
                className="w-full flex items-start gap-3 px-4 py-3 text-left transition"
                style={{ background: active ? c.tealSoft : "transparent" }}
              >
                <span
                  className="h-9 w-9 rounded-full flex items-center justify-center text-sm font-serif font-semibold flex-shrink-0"
                  style={{ background: c.teal, color: "#fff" }}
                >
                  {t.name.charAt(0)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium truncate" style={{ color: c.ink }}>{t.name}</span>
                    <span className="text-xs flex-shrink-0" style={{ color: c.subtle }}>{t.subject}</span>
                  </span>
                  <span className="block text-xs mt-0.5 truncate" style={{ color: c.subtle }}>
                    {lastMessagePreview(t.id)}
                  </span>
                </span>
              </button>
            );
          })}
          {filteredTeachers.length === 0 && (
            <p className="px-4 py-6 text-sm text-center" style={{ color: c.subtle }}>
              No teachers match "{query}"
            </p>
          )}
        </div>
      </div>

      {/* Thread panel */}
      <div className={`flex-col ${mobileThreadOpen ? "flex" : "hidden md:flex"}`}>
        <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: `1px solid ${c.border}` }}>
          <button
            className="md:hidden p-1 -ml-1"
            onClick={() => setMobileThreadOpen(false)}
            style={{ color: c.subtle }}
          >
            <ChevronLeft size={20} />
          </button>
          <span
            className="h-9 w-9 rounded-full flex items-center justify-center text-sm font-serif font-semibold"
            style={{ background: c.teal, color: "#fff" }}
          >
            {activeTeacher.name.charAt(0)}
          </span>
          <div>
            <p className="text-sm font-semibold" style={{ color: c.ink }}>{activeTeacher.name}</p>
            <p className="text-xs" style={{ color: c.subtle }}>{activeTeacher.subject} teacher</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3" style={{ background: c.page }}>
          {activeMessages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "parent" ? "justify-end" : "justify-start"}`}>
              <div
                className="max-w-[75%] rounded-2xl px-4 py-2.5"
                style={{
                  background: m.from === "parent" ? c.teal : c.card,
                  color: c.ink,
                  border: m.from === "parent" ? "none" : `1px solid ${c.border}`,
                }}
              >
                <p className="text-sm leading-relaxed">{m.text}</p>
                <p className="text-[11px] mt-1 opacity-70">{m.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 flex items-center gap-3" style={{ borderTop: `1px solid ${c.border}` }}>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${activeTeacher.name.split(" ")[0]}...`}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm focus:outline-none"
            style={{ background: c.panel, color: c.ink, border: `1px solid ${c.border}` }}
          />
          <button
            onClick={sendMessage}
            className="p-2.5 rounded-xl transition disabled:opacity-40"
            style={{ background: c.teal, color: c.ink }}
            disabled={!draft.trim()}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

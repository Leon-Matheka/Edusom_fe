import React, { useState } from "react";
import { BookOpen, Send, Search } from "lucide-react";

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
};

// Teachers currently teaching the parent's linked child(ren) — replace with a real API call
const initialTeachers = [
  {
    id: "t1",
    name: "Mrs. Wanjiru",
    subject: "Mathematics",
    child: "Amina Njoroge",
    online: true,
  },
  {
    id: "t2",
    name: "Mr. Otieno",
    subject: "English",
    child: "Amina Njoroge",
    online: false,
  },
  {
    id: "t3",
    name: "Ms. Achieng",
    subject: "Science",
    child: "Amina Njoroge",
    online: true,
  },
  {
    id: "t4",
    name: "Mr. Kamau",
    subject: "ICT",
    child: "Amina Njoroge",
    online: false,
  },
];

const initialMessages = {
  t1: [
    { from: "Mrs. Wanjiru", text: "Amina did well on today's quiz — 8/10.", time: "9:14 AM" },
    { from: "You", text: "That's great to hear, thank you!", time: "9:20 AM" },
  ],
  t2: [{ from: "Mr. Otieno", text: "Reminder: the book report is due Friday.", time: "Yesterday" }],
  t3: [],
  t4: [{ from: "You", text: "Could Amina get extra practice sheets for next week?", time: "Mon" }],
};

// Strips a title (Mrs./Mr./Ms./Dr.) so the avatar shows a sensible initial
const initial = (name) => name.replace(/^(Mrs\.|Mr\.|Ms\.|Dr\.)\s*/, "").charAt(0).toUpperCase();

export default function ParentMessaging() {
  const [teachers] = useState(initialTeachers);
  const [messages, setMessages] = useState(initialMessages);
  const [activeTeacherId, setActiveTeacherId] = useState(initialTeachers[0].id);
  const [messageInput, setMessageInput] = useState("");
  const [search, setSearch] = useState("");

  const activeTeacher = teachers.find((t) => t.id === activeTeacherId) || null;
  const activeMessages = (activeTeacher && messages[activeTeacherId]) || [];

  const filteredTeachers = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase())
  );

  const handleSend = () => {
    if (!messageInput.trim() || !activeTeacherId) return;
    const newMsg = { from: "You", text: messageInput, time: "Just now" };
    setMessages({
      ...messages,
      [activeTeacherId]: [...(messages[activeTeacherId] || []), newMsg],
    });
    setMessageInput("");
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
          <span className="hover:opacity-80 transition cursor-pointer">Analytics</span>
          <span style={{ color: c.ink, fontWeight: 600, borderBottom: `2px solid ${c.gold}`, paddingBottom: 4 }}>
            Messages
          </span>
        </nav>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="font-serif text-2xl font-semibold">Messages</h1>
          <p className="text-sm mt-1" style={{ color: c.subtle }}>
            Your child's teachers, all in one place.
          </p>
        </div>

        <div
          className="rounded-2xl overflow-hidden grid md:grid-cols-3"
          style={{ background: c.card, border: `1px solid ${c.border}`, height: "70vh", minHeight: 480 }}
        >
          {/* TEACHER LIST */}
          <div className="md:col-span-1 flex flex-col" style={{ borderRight: `1px solid ${c.border}` }}>
            <div className="p-3" style={{ borderBottom: `1px solid ${c.border}` }}>
              <div className="flex items-center gap-2 rounded-lg px-2.5 py-2" style={{ background: c.panel }}>
                <Search size={14} style={{ color: c.subtle }} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search teachers or subjects..."
                  className="bg-transparent outline-none text-sm flex-1"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredTeachers.length === 0 ? (
                <p className="text-sm p-4" style={{ color: c.subtle }}>No teachers match your search.</p>
              ) : (
                filteredTeachers.map((t) => {
                  const active = activeTeacherId === t.id;
                  const last = messages[t.id]?.[messages[t.id].length - 1];
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveTeacherId(t.id)}
                      className="w-full flex items-center gap-3 px-3 py-3 text-left transition"
                      style={{ background: active ? c.goldSoft : "transparent", borderBottom: `1px solid ${c.border}` }}
                    >
                      <span className="relative shrink-0">
                        <span
                          className="h-10 w-10 rounded-full flex items-center justify-center font-serif font-semibold"
                          style={{ background: c.teal, color: "#fff" }}
                        >
                          {initial(t.name)}
                        </span>
                        {t.online && (
                          <span
                            className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full"
                            style={{ background: c.teal, border: `2px solid ${c.card}` }}
                          />
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold truncate" style={{ color: active ? c.goldStrong : c.ink }}>
                            {t.name}
                          </p>
                        </div>
                        <p className="text-xs truncate" style={{ color: c.subtle }}>
                          {t.subject} — {t.child}
                        </p>
                        {last && (
                          <p className="text-xs truncate mt-0.5" style={{ color: c.subtle }}>
                            {last.from === "You" ? "You: " : ""}{last.text}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* CHAT WINDOW */}
          <div className="md:col-span-2 flex flex-col min-h-0">
            {activeTeacher ? (
              <>
                <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: `1px solid ${c.border}` }}>
                  <span
                    className="h-9 w-9 rounded-full flex items-center justify-center font-serif font-semibold"
                    style={{ background: c.teal, color: "#fff" }}
                  >
                    {initial(activeTeacher.name)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{activeTeacher.name}</p>
                    <p className="text-xs" style={{ color: c.subtle }}>
                      {activeTeacher.subject} — teaches {activeTeacher.child}
                    </p>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {activeMessages.length === 0 ? (
                    <p className="text-sm text-center mt-8" style={{ color: c.subtle }}>
                      No messages yet — say hello to {activeTeacher.name.split(" ")[0] || activeTeacher.name}.
                    </p>
                  ) : (
                    activeMessages.map((m, i) => (
                      <div key={i} className={`flex flex-col ${m.from === "You" ? "items-end" : "items-start"}`}>
                        <span
                          className="inline-block px-3 py-2 rounded-2xl text-sm max-w-[75%]"
                          style={{
                            background: m.from === "You" ? c.gold : c.panel,
                            color: m.from === "You" ? c.ink : c.ink,
                          }}
                        >
                          {m.text}
                        </span>
                        <span className="text-[10px] mt-1" style={{ color: c.subtle }}>{m.time}</span>
                      </div>
                    ))
                  )}
                </div>

                <div className="p-3 flex items-center gap-2" style={{ borderTop: `1px solid ${c.border}` }}>
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder={`Message ${activeTeacher.name}...`}
                    className="flex-1 rounded-lg px-3 py-2.5 text-sm outline-none"
                    style={{ background: c.panel, border: `1px solid ${c.border}` }}
                  />
                  <button
                    onClick={handleSend}
                    aria-label="Send message"
                    className="h-10 w-10 rounded-lg flex items-center justify-center transition shrink-0"
                    style={{ background: c.gold, color: c.ink }}
                  >
                    <Send size={15} />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-sm" style={{ color: c.subtle }}>Select a teacher to start messaging.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
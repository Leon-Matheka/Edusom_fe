import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Home, FolderOpen, Users, MessageCircle, Bell, Send, Plus, UserCircle, ExternalLink } from "lucide-react";
import { useTheme } from "../../components/layout/ThemeContext.js";
import { students } from "../../mockData/classMockData";
import useMessagingStore, { threadKey } from "../../store/messagingStore";

// TODO: replace with the signed-in teacher once auth is wired up. This is the teacher whose
// conversations with parents show here (and on the Parents messaging page).
const MESSAGING_TEACHER_ID = 1;

const currentUser = { id: "T123", name: "Leon", role: "Teacher", subject: "ICT", school: "NYS" };

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "resources", label: "Resources", icon: FolderOpen },
  { id: "community", label: "Community", icon: Users },
  { id: "messages", label: "Messages", icon: MessageCircle },
];

const feedTabs = [
  { id: "questions", label: "Questions" },
  { id: "content", label: "Content & ideas" },
  { id: "dev_updates", label: "Dev updates" },
];

const people = [
  { name: "Dev Team", online: true },
  { name: "Jane Smith", online: false },
  { name: "Mr. Kamau", online: true },
];

// Reusable two-pane chat: conversation list on the left, thread on the right.
function ChatPanel({ t, items, activeId, onSelect, messages, onSend, emptyText }) {
  const [draft, setDraft] = useState("");
  const active = items.find((i) => i.id === activeId);
  const send = () => {
    if (!draft.trim() || !active) return;
    onSend(draft.trim());
    setDraft("");
  };
  return (
    <div className="grid h-[460px] md:grid-cols-[260px_1fr] overflow-hidden rounded-2xl" style={{ background: t.card, border: `1px solid ${t.border}` }}>
      <div className="overflow-y-auto" style={{ borderRight: `1px solid ${t.border}` }}>
        {items.map((c) => {
          const on = c.id === activeId;
          return (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className="w-full px-4 py-3 text-left transition"
              style={{ background: on ? t.tealSoft : "transparent" }}
            >
              <p className="text-sm font-semibold" style={{ color: on ? t.tealStrong : t.text }}>{c.name}</p>
              {c.sub && <p className="text-[11px]" style={{ color: t.subtle }}>{c.sub}</p>}
              <p className="mt-0.5 truncate text-xs" style={{ color: t.subtle }}>{c.preview}</p>
            </button>
          );
        })}
      </div>

      <div className="flex min-h-0 flex-col">
        {active ? (
          <>
            <div className="px-4 py-3" style={{ borderBottom: `1px solid ${t.border}` }}>
              <p className="text-sm font-semibold">{active.name}</p>
              {active.sub && <p className="text-xs" style={{ color: t.subtle }}>{active.sub}</p>}
            </div>
            <div className="flex-1 space-y-2 overflow-y-auto p-4">
              {messages.length === 0 ? (
                <p className="text-sm" style={{ color: t.subtle }}>No messages yet. Say hi!</p>
              ) : (
                messages.map((m, i) => (
                  <div key={i} className={`flex ${m.mine ? "justify-end" : "justify-start"}`}>
                    <span
                      className="max-w-[80%] rounded-2xl px-3.5 py-2 text-sm"
                      style={{ background: m.mine ? t.teal : t.input, color: m.mine ? "#fff" : t.text }}
                    >
                      {m.text}
                    </span>
                  </div>
                ))
              )}
            </div>
            <div className="flex gap-2 p-3" style={{ borderTop: `1px solid ${t.border}` }}>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Type a message…"
                className="flex-1 rounded-lg px-3 py-2 text-sm outline-none"
                style={{ background: t.input, border: `1px solid ${t.border}`, color: t.text }}
              />
              <button onClick={send} aria-label="Send message" className="rounded-lg px-3" style={{ background: t.teal, color: "#fff" }}>
                <Send size={15} />
              </button>
            </div>
          </>
        ) : (
          <p className="p-6 text-sm" style={{ color: t.subtle }}>{emptyText}</p>
        )}
      </div>
    </div>
  );
}

export default function SocialsPage() {
  const { dark } = useTheme();
  const [tab, setTab] = useState("home");
  const [feedTab, setFeedTab] = useState("questions");
  const [msgTab, setMsgTab] = useState("teachers");

  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([
    { id: 1, author: "Dev Team", role: "Dev", type: "dev_updates", topic: "Uploads", content: "We've improved upload stability for large lesson files.", time: "Today, 10:15 AM" },
    { id: 2, author: "Jane Smith", role: "Teacher", type: "questions", topic: "Analytics", content: "How can I see weekly performance for my 7B class?", time: "Yesterday, 3:42 PM" },
  ]);

  const [resourceInput, setResourceInput] = useState("");
  const [sharedResources, setSharedResources] = useState([
    { id: 1, author: "Leon", content: "Grade 8 Algebra Revision PDF", type: "file" },
    { id: 2, author: "Jane Smith", content: "https://example.com/science-experiment-ideas", type: "link" },
  ]);

  const [notifications, setNotifications] = useState([
    "Dev Team replied to your question on uploads.",
    "Jane Smith shared a new Mathematics resource.",
  ]);
  const [notifOpen, setNotifOpen] = useState(false);

  // Teacher-to-teacher / dev direct messages (local to this page)
  const [dms, setDms] = useState({
    "dev-team": [
      { mine: false, text: "We're checking the bug you reported." },
      { mine: true, text: "Thanks, let me know what you find." },
    ],
    t456: [
      { mine: true, text: "Are you using the new resources page?" },
      { mine: false, text: "Yes, it's very clear and useful." },
    ],
  });
  const dmContacts = [
    { id: "dev-team", name: "Dev Team", sub: "Dev" },
    { id: "t456", name: "Mr. Kamau", sub: "Teacher" },
  ];
  const [dmActive, setDmActive] = useState("dev-team");

  // Parent conversations — shared with the Parents messaging page through the store
  const threads = useMessagingStore((s) => s.threads);
  const sendToParent = useMessagingStore((s) => s.send);
  const parentContacts = useMemo(
    () =>
      students
        .map((s) => {
          const msgs = threads[threadKey(s.parent.id, MESSAGING_TEACHER_ID)] || [];
          const last = msgs[msgs.length - 1];
          return {
            id: s.parent.id,
            name: s.parent.name,
            sub: `Parent of ${s.name.split(" ")[0]}`,
            preview: last?.text || "No messages yet",
            awaitingReply: last?.from === "parent",
          };
        })
        .sort((a, b) => Number(b.awaitingReply) - Number(a.awaitingReply)),
    [threads]
  );
  const [parentActive, setParentActive] = useState(null);

  const t = {
    text: dark ? "#E8F0F0" : "#1B1F3B",
    subtle: dark ? "#96A8B0" : "#6B7280",
    card: dark ? "#161F2C" : "#FFFFFF",
    border: dark ? "#283648" : "#E7E4DC",
    input: dark ? "#182230" : "#F3F1EA",
    gold: "#D9A02C",
    goldSoft: dark ? "rgba(217,160,44,0.16)" : "rgba(217,160,44,0.12)",
    goldStrong: dark ? "#F0C25E" : "#8A6110",
    teal: "#2E8F86",
    tealSoft: dark ? "rgba(46,143,134,0.22)" : "rgba(46,143,134,0.12)",
    tealStrong: dark ? "#7FD8CE" : "#1F6359",
    indigo: "#5B5FA0",
  };
  const card = { background: t.card, border: `1px solid ${t.border}` };
  const typeAccent = (type) => (type === "questions" ? t.gold : type === "content" ? t.teal : t.indigo);

  const createPost = () => {
    if (!postText.trim()) return;
    const topic = feedTab === "questions" ? "Questions" : feedTab === "content" ? "Content" : "Dev";
    setPosts([{ id: Date.now(), author: currentUser.name, role: currentUser.role, type: feedTab, topic, content: postText, time: "Just now" }, ...posts]);
    setPostText("");
    setNotifications([`${currentUser.name} created a new ${feedTab} post.`, ...notifications]);
  };

  const shareResource = () => {
    if (!resourceInput.trim()) return;
    setSharedResources([
      { id: Date.now(), author: currentUser.name, content: resourceInput, type: resourceInput.startsWith("http") ? "link" : "note" },
      ...sharedResources,
    ]);
    setResourceInput("");
    setNotifications([`${currentUser.name} shared a new resource.`, ...notifications]);
  };

  const RoleBadge = ({ role }) => (
    <span
      className="rounded-full px-2 py-0.5 text-[11px] font-medium"
      style={{ background: role === "Dev" ? t.tealSoft : t.goldSoft, color: role === "Dev" ? t.tealStrong : t.goldStrong }}
    >
      {role}
    </span>
  );

  const Avatar = ({ name, role }) => (
    <div
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-semibold"
      style={{ background: role === "Dev" ? t.teal : t.gold, color: role === "Dev" ? "#fff" : "#12172B" }}
    >
      {name.charAt(0)}
    </div>
  );

  const iconBtn = "relative flex h-9 w-9 items-center justify-center rounded-lg transition";

  return (
    <div className="mx-auto max-w-4xl space-y-5" style={{ color: t.text }}>
      {/* TOP NAV */}
      <nav className="flex flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-2.5" style={card} aria-label="Staffroom">
        <div className="flex flex-wrap items-center gap-1">
          <div className="mr-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: t.teal }}>
              <BookOpen size={16} color="#fff" />
            </div>
            <span className="font-semibold">Staffroom</span>
          </div>
          {navItems.map(({ id, label, icon: Icon }) => {
            const on = tab === id;
            return (
              <button
                key={id}
                onClick={() => setTab(id)}
                aria-current={on ? "page" : undefined}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition"
                style={{ background: on ? t.tealSoft : "transparent", color: on ? t.tealStrong : t.subtle }}
              >
                <Icon size={16} /> {label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5">
          <div className="relative">
            <button
              onClick={() => setNotifOpen((v) => !v)}
              aria-label="Staffroom notifications"
              title="Notifications"
              className={iconBtn}
              style={{ border: `1px solid ${notifOpen ? t.teal : t.border}`, color: notifOpen ? t.tealStrong : t.text }}
            >
              <Bell size={16} />
              {notifications.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[10px] font-semibold" style={{ background: t.teal, color: "#fff" }}>
                  {notifications.length}
                </span>
              )}
            </button>
            {notifOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                <div className="absolute right-0 z-50 mt-2 w-72 overflow-hidden rounded-2xl shadow-lg" style={card}>
                  <p className="px-4 py-3 text-sm font-semibold" style={{ borderBottom: `1px solid ${t.border}` }}>Notifications</p>
                  {notifications.length === 0 ? (
                    <p className="px-4 py-6 text-center text-xs" style={{ color: t.subtle }}>You're all caught up.</p>
                  ) : (
                    <ul className="max-h-72 overflow-y-auto">
                      {notifications.map((n, i) => (
                        <li key={i} className="px-4 py-2.5 text-xs leading-relaxed" style={{ borderBottom: i < notifications.length - 1 ? `1px solid ${t.border}` : "none" }}>
                          {n}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            )}
          </div>
          <Link to="/teacher/profile" aria-label="My profile" title="My profile" className={iconBtn} style={{ border: `1px solid ${t.border}`, color: t.text }}>
            <UserCircle size={18} />
          </Link>
        </div>
      </nav>

      {/* HOME */}
      {tab === "home" && (
        <>
          <section className="rounded-2xl p-4" style={card}>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Latest shared</h2>
              <button onClick={() => setTab("resources")} className="text-xs font-medium" style={{ color: t.tealStrong }}>
                See all
              </button>
            </div>
            {sharedResources.length === 0 ? (
              <p className="text-xs" style={{ color: t.subtle }}>No shared resources yet.</p>
            ) : (
              <ul className="grid gap-2 sm:grid-cols-3">
                {sharedResources.slice(0, 3).map((r) => (
                  <li key={r.id} className="rounded-lg p-3" style={{ border: `1px solid ${t.border}` }}>
                    <p className="truncate text-sm">{r.content}</p>
                    <p className="mt-1 text-[11px]" style={{ color: t.subtle }}>by {r.author}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <div className="flex gap-6" style={{ borderBottom: `1px solid ${t.border}` }}>
            {feedTabs.map((ft) => {
              const on = feedTab === ft.id;
              return (
                <button key={ft.id} onClick={() => setFeedTab(ft.id)} className="relative pb-3 text-sm font-medium" style={{ color: on ? t.text : t.subtle }}>
                  {ft.label}
                  {on && <span className="absolute -bottom-px left-0 right-0 h-[2px] rounded-full" style={{ background: typeAccent(ft.id) }} />}
                </button>
              );
            })}
          </div>

          <div className="flex gap-3 rounded-2xl p-4" style={card}>
            <Avatar name={currentUser.name} role={currentUser.role} />
            <div className="flex-1">
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder={
                  feedTab === "questions"
                    ? "Ask a question to other teachers or the devs…"
                    : feedTab === "content"
                    ? "Share a teaching idea, tip, or resource…"
                    : "Share feedback or an observation with the dev team…"
                }
                className="mb-3 min-h-[70px] w-full resize-none rounded-lg p-2.5 text-sm outline-none"
                style={{ background: t.input, border: `1px solid ${t.border}`, color: t.text }}
              />
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: t.subtle }}>Posting to {feedTabs.find((f) => f.id === feedTab)?.label}</span>
                <button onClick={createPost} className="rounded-lg px-4 py-2 text-sm font-medium" style={{ background: t.teal, color: "#fff" }}>
                  Post
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {posts.filter((p) => p.type === feedTab).length === 0 ? (
              <p className="rounded-2xl p-6 text-center text-sm" style={{ ...card, color: t.subtle }}>No posts here yet. Start the conversation.</p>
            ) : (
              posts
                .filter((p) => p.type === feedTab)
                .map((p) => (
                  <div key={p.id} className="flex gap-3 rounded-2xl p-4" style={{ ...card, borderLeft: `3px solid ${typeAccent(p.type)}` }}>
                    <Avatar name={p.author} role={p.role} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold">{p.author}</p>
                          <RoleBadge role={p.role} />
                          <span className="rounded-full px-2 py-0.5 text-[11px] font-medium" style={{ background: t.input, color: t.subtle }}>{p.topic}</span>
                        </div>
                        <span className="whitespace-nowrap text-xs" style={{ color: t.subtle }}>{p.time}</span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed">{p.content}</p>
                    </div>
                  </div>
                ))
            )}
          </div>
        </>
      )}

      {/* RESOURCES */}
      {tab === "resources" && (
        <div className="space-y-5">
          <div className="rounded-2xl p-4" style={card}>
            <h2 className="mb-1 text-lg font-semibold">Shared resources</h2>
            <p className="mb-3 text-xs" style={{ color: t.subtle }}>Share links, file names, or short notes with other teachers.</p>
            <div className="flex gap-2">
              <input
                value={resourceInput}
                onChange={(e) => setResourceInput(e.target.value)}
                placeholder="Paste a link or write a short description…"
                className="flex-1 rounded-lg p-2.5 text-sm outline-none"
                style={{ background: t.input, border: `1px solid ${t.border}`, color: t.text }}
              />
              <button onClick={shareResource} className="flex shrink-0 items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium" style={{ background: t.teal, color: "#fff" }}>
                <Plus size={14} /> Share
              </button>
            </div>
          </div>
          <ul className="space-y-2 rounded-2xl p-4" style={card}>
            {sharedResources.map((r) => (
              <li key={r.id} className="rounded-lg p-3" style={{ border: `1px solid ${t.border}` }}>
                <p className="break-words text-sm">{r.content}</p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="text-xs" style={{ color: t.subtle }}>Shared by {r.author}</span>
                  <span className="rounded-full px-1.5 py-0.5 text-[10px] font-medium" style={{ background: t.tealSoft, color: t.tealStrong }}>{r.type}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* COMMUNITY */}
      {tab === "community" && (
        <div className="grid gap-5 md:grid-cols-[1fr_260px]">
          <div className="space-y-3 rounded-2xl p-5" style={card}>
            <h2 className="text-lg font-semibold">Community space</h2>
            <p className="text-sm leading-relaxed" style={{ color: t.subtle }}>
              Use the Home feed to talk with the community. This space can later hold polls, tags and pinned posts.
            </p>
            <ul className="space-y-1.5 text-sm" style={{ color: t.subtle }}>
              <li>Teachers ask product-wide questions here.</li>
              <li>Devs share roadmap updates and announcements.</li>
              <li>Everyone can react and reply on the Home feed.</li>
            </ul>
          </div>
          <div className="rounded-2xl p-4" style={card}>
            <h2 className="mb-3 text-sm font-semibold">People online</h2>
            <ul className="space-y-2 text-sm">
              {people.map((p) => (
                <li key={p.name} className="flex items-center justify-between">
                  <span>{p.name}</span>
                  <span className="flex items-center gap-1.5 text-xs" style={{ color: p.online ? t.tealStrong : t.subtle }}>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.online ? t.teal : t.subtle }} />
                    {p.online ? "Online" : "Offline"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* MESSAGES: teachers + parents */}
      {tab === "messages" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex rounded-lg p-1" style={{ background: t.input }}>
              {[
                ["teachers", "Teachers & devs"],
                ["parents", "Parents"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setMsgTab(id)}
                  className="rounded-md px-4 py-1.5 text-sm font-medium transition"
                  style={{ background: msgTab === id ? t.card : "transparent", color: msgTab === id ? t.tealStrong : t.subtle }}
                >
                  {label}
                </button>
              ))}
            </div>
            {msgTab === "parents" && (
              <Link to="/parent/messages" className="flex items-center gap-1.5 text-xs font-medium" style={{ color: t.tealStrong }}>
                Open the parents' messaging page <ExternalLink size={12} />
              </Link>
            )}
          </div>

          {msgTab === "teachers" ? (
            <ChatPanel
              t={t}
              items={dmContacts.map((c) => ({ ...c, preview: dms[c.id]?.[dms[c.id].length - 1]?.text || "No messages yet" }))}
              activeId={dmActive}
              onSelect={setDmActive}
              messages={dms[dmActive] || []}
              onSend={(text) => setDms((prev) => ({ ...prev, [dmActive]: [...(prev[dmActive] || []), { mine: true, text }] }))}
              emptyText="Select a conversation to start messaging."
            />
          ) : (
            <ChatPanel
              t={t}
              items={parentContacts}
              activeId={parentActive}
              onSelect={setParentActive}
              messages={(threads[threadKey(parentActive, MESSAGING_TEACHER_ID)] || []).map((m) => ({ mine: m.from === "teacher", text: m.text }))}
              onSend={(text) => sendToParent(parentActive, MESSAGING_TEACHER_ID, "teacher", text)}
              emptyText="Select a parent to read and reply to their messages."
            />
          )}
        </div>
      )}
    </div>
  );
}

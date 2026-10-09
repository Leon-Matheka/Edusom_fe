import React, { useState } from "react";
import {
  BookOpen,
  Sun,
  Moon,
  Home,
  FolderOpen,
  Users,
  MessageCircle,
  Bell,
  Send,
  Plus,
} from "lucide-react";

export default function SocialsPage() {
  // THEME
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => setDarkMode((prev) => !prev);

  // MOCK USER
  const currentUser = {
    id: "T123",
    name: "Leon",
    role: "Teacher",
    subject: "ICT",
    school: "NYS",
  };

  // MAIN TAB: home | resources | community | messages
  const [activeMainTab, setActiveMainTab] = useState("home");

  // FEED TAB: questions | content | dev_updates
  const [activeFeedTab, setActiveFeedTab] = useState("questions");

  // POSTS
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Dev Team",
      role: "Dev",
      type: "dev_updates",
      topic: "Uploads",
      content: "We've improved upload stability for large lesson files.",
      time: "Today, 10:15 AM",
    },
    {
      id: 2,
      author: "Jane Smith",
      role: "Teacher",
      type: "questions",
      topic: "Analytics",
      content: "How can I see weekly performance for my 7B class?",
      time: "Yesterday, 3:42 PM",
    },
  ]);

  // SHARED RESOURCES
  const [resourceInput, setResourceInput] = useState("");
  const [sharedResources, setSharedResources] = useState([
    { id: 1, author: "Leon", content: "Grade 8 Algebra Revision PDF", type: "file" },
    { id: 2, author: "Jane Smith", content: "https://example.com/science-experiment-ideas", type: "link" },
  ]);

  // NOTIFICATIONS
  const [notifications, setNotifications] = useState([
    "Dev Team replied to your question on uploads.",
    "Jane Smith shared a new Mathematics resource.",
  ]);

  // DIRECT MESSAGES
  const [conversations, setConversations] = useState([
    { id: "dev-team", name: "Dev Team", role: "Dev", lastMessage: "We're checking the bug you reported." },
    { id: "t456", name: "Mr. Kamau", role: "Teacher", lastMessage: "Let's sync on exams schedule." },
  ]);

  const [activeConversationId, setActiveConversationId] = useState("dev-team");

  const [messages, setMessages] = useState({
    "dev-team": [
      { from: "Dev Team", text: "We're checking the bug you reported." },
      { from: "You", text: "Thanks, let me know what you find." },
    ],
    t456: [
      { from: "You", text: "Are you using the new resources page?" },
      { from: "Mr. Kamau", text: "Yes, it's very clear and useful." },
    ],
  });

  const [messageInput, setMessageInput] = useState("");

  // NOTIFICATIONS PANEL (top-right icon, dropdown)
  const [notifOpen, setNotifOpen] = useState(false);

  // HANDLERS

  const handleCreatePost = () => {
    if (!postText.trim()) return;
    const newPost = {
      id: Date.now(),
      author: currentUser.name,
      role: currentUser.role,
      type: activeFeedTab,
      topic:
        activeFeedTab === "questions" ? "Questions" : activeFeedTab === "content" ? "Content" : "Dev",
      content: postText,
      time: "Just now",
    };
    setPosts([newPost, ...posts]);
    setPostText("");
    setNotifications([`${currentUser.name} created a new ${activeFeedTab} post.`, ...notifications]);
  };

  const handleShareResource = () => {
    if (!resourceInput.trim()) return;
    const newResource = {
      id: Date.now(),
      author: currentUser.name,
      content: resourceInput,
      type: resourceInput.startsWith("http") ? "link" : "note",
    };
    setSharedResources([newResource, ...sharedResources]);
    setResourceInput("");
    setNotifications([`${currentUser.name} shared a new resource.`, ...notifications]);
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !activeConversationId) return;
    const newMsg = { from: "You", text: messageInput };
    const existing = messages[activeConversationId] || [];
    setMessages({ ...messages, [activeConversationId]: [...existing, newMsg] });
    setMessageInput("");
    setConversations(
      conversations.map((c) => (c.id === activeConversationId ? { ...c, lastMessage: newMsg.text } : c))
    );
  };

  // HELPERS

  const filteredPosts = posts.filter((p) => p.type === activeFeedTab);
  const activeConversation = conversations.find((c) => c.id === activeConversationId) || null;
  const activeConversationMessages = (activeConversation && messages[activeConversationId]) || [];

  // THEME TOKENS — a "staffroom" palette: cool paper / ink, one warm marker-gold accent
  // for primary actions, one teal accent for links and the "dev" identity.
  const t = {
    page: darkMode ? "#12172B" : "#EEF1F6",
    text: darkMode ? "#F2F4FA" : "#1B1F3B",
    subtle: darkMode ? "#939BC2" : "#6B7280",
    card: darkMode ? "#1C2340" : "#FFFFFF",
    border: darkMode ? "#2B3260" : "#E1E5EC",
    input: darkMode ? "#232A4D" : "#F5F7FB",
    gold: "#D9A02C",
    goldSoft: darkMode ? "rgba(217,160,44,0.16)" : "rgba(217,160,44,0.12)",
    goldStrong: darkMode ? "#F0C25E" : "#8A6110",
    teal: "#2E8F86",
    tealSoft: darkMode ? "rgba(46,143,134,0.18)" : "rgba(46,143,134,0.12)",
    tealStrong: darkMode ? "#7FD8CE" : "#1F6359",
    indigo: "#5B5FA0",
    indigoSoft: darkMode ? "rgba(91,95,160,0.2)" : "rgba(91,95,160,0.12)",
    indigoStrong: darkMode ? "#B7B9E0" : "#3E3F73",
  };

  const typeAccent = (type) =>
    type === "questions" ? t.gold : type === "content" ? t.teal : t.indigo;

  const RoleBadge = ({ role }) => {
    const isDev = role === "Dev";
    return (
      <span
        className="text-[11px] font-medium px-2 py-0.5 rounded-full"
        style={{
          background: isDev ? t.tealSoft : t.goldSoft,
          color: isDev ? t.tealStrong : t.goldStrong,
        }}
      >
        {role}
      </span>
    );
  };

  const Avatar = ({ name, role, size = 40 }) => {
    const isDev = role === "Dev";
    return (
      <div
        className="rounded-full flex items-center justify-center font-serif font-semibold shrink-0"
        style={{
          width: size,
          height: size,
          fontSize: size * 0.4,
          background: isDev ? t.teal : t.gold,
          color: "#12172B",
        }}
      >
        {name.charAt(0)}
      </div>
    );
  };

  const navItems = [
    { id: "home", label: "Home feed", icon: Home },
    { id: "resources", label: "Resources", icon: FolderOpen },
    { id: "community", label: "Community", icon: Users },
    { id: "messages", label: "Messages", icon: MessageCircle },
  ];

  const feedTabs = [
    { id: "questions", label: "Questions" },
    { id: "content", label: "Content & ideas" },
    { id: "dev_updates", label: "Dev updates" },
  ];

  return (
    <div style={{ background: t.page, color: t.text }} className="min-h-screen font-sans">
      {/* TOP BAR */}
      <header
        className="px-6 py-3 flex justify-between items-center sticky top-0 z-10"
        style={{ background: t.card, borderBottom: `1px solid ${t.border}` }}
      >
        <div className="flex items-center gap-3">
          <div
            className="h-9 w-9 rounded-lg flex items-center justify-center"
            style={{ background: t.gold }}
          >
            <BookOpen size={18} color="#12172B" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-serif font-semibold leading-tight">
              Staffroom
            </h1>
            <p className="text-xs" style={{ color: t.subtle }}>
              Connect with teachers, share resources, and talk directly with devs.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden md:block text-xs mr-1" style={{ color: t.subtle }}>
            Signed in as <span className="font-semibold" style={{ color: t.text }}>{currentUser.name}</span>
          </span>

          {/* Notifications icon + dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen((prev) => !prev)}
              aria-label="Notifications"
              title="Notifications"
              className="relative h-9 w-9 rounded-lg flex items-center justify-center transition"
              style={{
                border: `1px solid ${notifOpen ? t.gold : t.border}`,
                color: notifOpen ? t.goldStrong : t.text,
                background: notifOpen ? t.goldSoft : "transparent",
              }}
            >
              <Bell size={16} />
              {notifications.length > 0 && (
                <span
                  className="absolute -top-1 -right-1 h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center text-[10px] font-semibold"
                  style={{ background: t.gold, color: "#12172B" }}
                >
                  {notifications.length}
                </span>
              )}
            </button>

            {notifOpen && (
              <>
                {/* click-away overlay */}
                <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                <div
                  className="absolute right-0 mt-2 w-72 rounded-2xl overflow-hidden z-50"
                  style={{ background: t.card, border: `1px solid ${t.border}`, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
                >
                  <div className="px-4 py-3" style={{ borderBottom: `1px solid ${t.border}` }}>
                    <p className="text-sm font-semibold">Notifications</p>
                  </div>
                  {notifications.length === 0 ? (
                    <p className="text-xs px-4 py-6 text-center" style={{ color: t.subtle }}>
                      You're all caught up.
                    </p>
                  ) : (
                    <ul className="max-h-72 overflow-y-auto">
                      {notifications.map((n, i) => (
                        <li
                          key={i}
                          className="px-4 py-2.5 text-xs leading-relaxed"
                          style={{ borderBottom: i < notifications.length - 1 ? `1px solid ${t.border}` : "none" }}
                        >
                          {n}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            )}
          </div>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="h-9 w-9 rounded-lg flex items-center justify-center transition"
            style={{ border: `1px solid ${t.border}`, color: t.text }}
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-4 py-6">
        {/* LEFT SIDEBAR */}
        <aside className="md:col-span-1 space-y-5 md:sticky md:top-20 h-fit">
          {/* Profile Card */}
          <div className="rounded-2xl p-4" style={{ background: t.card, border: `1px solid ${t.border}` }}>
            <div className="flex items-center gap-3 mb-3">
              <Avatar name={currentUser.name} role={currentUser.role} size={44} />
              <div>
                <p className="font-semibold">{currentUser.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <RoleBadge role={currentUser.role} />
                  <span className="text-xs" style={{ color: t.subtle }}>{currentUser.subject}</span>
                </div>
              </div>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: t.subtle }}>
              {currentUser.school} — manage resources, ask questions, and keep in touch with other
              teachers and devs.
            </p>
          </div>

          {/* Navigation */}
          <nav className="rounded-2xl p-2" style={{ background: t.card, border: `1px solid ${t.border}` }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeMainTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMainTab(item.id)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition text-left"
                  style={{
                    background: active ? t.goldSoft : "transparent",
                    color: active ? t.goldStrong : t.text,
                    borderLeft: active ? `3px solid ${t.gold}` : "3px solid transparent",
                  }}
                >
                  <Icon size={16} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* CENTER: FEED / RESOURCES / COMMUNITY / MESSAGES */}
        <main className="md:col-span-2 space-y-5">
          {activeMainTab === "home" && (
            <>
              {/* Feed Tabs — underline style */}
              <div className="flex gap-6" style={{ borderBottom: `1px solid ${t.border}` }}>
                {feedTabs.map((tab) => {
                  const active = activeFeedTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveFeedTab(tab.id)}
                      className="pb-3 text-sm font-medium relative transition"
                      style={{ color: active ? t.text : t.subtle }}
                    >
                      {tab.label}
                      {active && (
                        <span
                          className="absolute left-0 right-0 -bottom-px h-[2px] rounded-full"
                          style={{ background: typeAccent(tab.id) }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Post Composer */}
              <div className="rounded-2xl p-4" style={{ background: t.card, border: `1px solid ${t.border}` }}>
                <div className="flex gap-3">
                  <Avatar name={currentUser.name} role={currentUser.role} size={36} />
                  <div className="flex-1">
                    <textarea
                      value={postText}
                      onChange={(e) => setPostText(e.target.value)}
                      placeholder={
                        activeFeedTab === "questions"
                          ? "Ask a question to other teachers or the devs..."
                          : activeFeedTab === "content"
                          ? "Share a teaching idea, tip, or resource..."
                          : "Share feedback or an observation with the dev team..."
                      }
                      className="w-full rounded-lg p-2.5 text-sm mb-3 resize-none min-h-[70px] outline-none"
                      style={{ background: t.input, border: `1px solid ${t.border}`, color: t.text }}
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: t.subtle }}>
                        Posting to {feedTabs.find((f) => f.id === activeFeedTab)?.label}
                      </span>
                      <button
                        onClick={handleCreatePost}
                        className="text-sm font-medium px-4 py-2 rounded-lg transition"
                        style={{ background: t.gold, color: "#12172B" }}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feed List */}
              <div className="space-y-3">
                {filteredPosts.length === 0 ? (
                  <div className="rounded-2xl p-6 text-center" style={{ background: t.card, border: `1px solid ${t.border}` }}>
                    <p className="text-sm" style={{ color: t.subtle }}>
                      No posts here yet. Start the conversation.
                    </p>
                  </div>
                ) : (
                  filteredPosts.map((p) => (
                    <div
                      key={p.id}
                      className="rounded-2xl p-4 flex gap-3"
                      style={{
                        background: t.card,
                        border: `1px solid ${t.border}`,
                        borderLeft: `3px solid ${typeAccent(p.type)}`,
                      }}
                    >
                      <Avatar name={p.author} role={p.role} size={36} />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-semibold">{p.author}</p>
                            <RoleBadge role={p.role} />
                            <span
                              className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                              style={{ background: t.input, color: t.subtle }}
                            >
                              {p.topic}
                            </span>
                          </div>
                          <span className="text-xs whitespace-nowrap" style={{ color: t.subtle }}>{p.time}</span>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed">{p.content}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {activeMainTab === "resources" && (
            <div className="space-y-5">
              <div className="rounded-2xl p-4" style={{ background: t.card, border: `1px solid ${t.border}` }}>
                <h2 className="font-serif font-semibold text-lg mb-1">My shared resources</h2>
                <p className="text-xs mb-3" style={{ color: t.subtle }}>
                  Share links, file names, or short notes. Later you can connect this to real file
                  uploads in the backend.
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={resourceInput}
                    onChange={(e) => setResourceInput(e.target.value)}
                    placeholder="Paste a link or write a short description..."
                    className="flex-1 rounded-lg p-2.5 text-sm outline-none"
                    style={{ background: t.input, border: `1px solid ${t.border}`, color: t.text }}
                  />
                  <button
                    onClick={handleShareResource}
                    className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg transition shrink-0"
                    style={{ background: t.gold, color: "#12172B" }}
                  >
                    <Plus size={14} /> Share
                  </button>
                </div>
              </div>

              <div className="rounded-2xl p-4" style={{ background: t.card, border: `1px solid ${t.border}` }}>
                {sharedResources.length === 0 ? (
                  <p className="text-sm" style={{ color: t.subtle }}>You haven't shared any resources yet.</p>
                ) : (
                  <ul className="space-y-2">
                    {sharedResources.map((r) => (
                      <li key={r.id} className="rounded-lg p-3" style={{ border: `1px solid ${t.border}` }}>
                        <p className="text-sm break-words">{r.content}</p>
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <span className="text-xs" style={{ color: t.subtle }}>Shared by {r.author}</span>
                          <span
                            className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
                            style={{ background: t.tealSoft, color: t.tealStrong }}
                          >
                            {r.type}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {activeMainTab === "community" && (
            <div className="rounded-2xl p-5 space-y-3" style={{ background: t.card, border: `1px solid ${t.border}` }}>
              <h2 className="font-serif font-semibold text-lg">Community space</h2>
              <p className="text-sm leading-relaxed" style={{ color: t.subtle }}>
                Use the home feed under Questions and Dev updates to interact with the community. This
                space can later hold dedicated features like polls, tags, and pinned posts.
              </p>
              <ul className="space-y-1.5 text-sm" style={{ color: t.subtle }}>
                <li>Teachers ask product-wide questions here.</li>
                <li>Devs share roadmap updates and announcements.</li>
                <li>Everyone can react and reply using the home feed.</li>
              </ul>
            </div>
          )}

          {activeMainTab === "messages" && (
            <div className="rounded-2xl p-5 space-y-3" style={{ background: t.card, border: `1px solid ${t.border}` }}>
              <h2 className="font-serif font-semibold text-lg">Messages overview</h2>
              <p className="text-sm leading-relaxed" style={{ color: t.subtle }}>
                Use the direct messages panel on the right to chat with the devs and other teachers.
                This section can later become a full-screen messages page with search and filters.
              </p>
            </div>
          )}
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="md:col-span-1 space-y-5 md:sticky md:top-20 h-fit">
          {/* Community Panel */}
          <div className="rounded-2xl p-4" style={{ background: t.card, border: `1px solid ${t.border}` }}>
            <h2 className="font-semibold text-sm mb-1">People online</h2>
            <p className="text-xs mb-3" style={{ color: t.subtle }}>People you can reach out to right now.</p>
            <ul className="space-y-2 text-sm">
              {[
                { name: "Dev Team", online: true },
                { name: "Jane Smith", online: false },
                { name: "Mr. Kamau", online: true },
              ].map((p) => (
                <li key={p.name} className="flex items-center justify-between">
                  <span>{p.name}</span>
                  <span className="flex items-center gap-1.5 text-xs" style={{ color: p.online ? t.tealStrong : t.subtle }}>
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: p.online ? t.teal : t.subtle }}
                    />
                    {p.online ? "Online" : "Offline"}
                  </span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setActiveMainTab("community")}
              className="mt-3 w-full text-xs font-medium px-3 py-2 rounded-lg transition"
              style={{ border: `1px solid ${t.teal}`, color: t.tealStrong }}
            >
              Open community space
            </button>
          </div>

          {/* Direct Messages panel */}
          <div className="rounded-2xl p-4 flex flex-col h-80" style={{ background: t.card, border: `1px solid ${t.border}` }}>
            <h2 className="font-semibold text-sm mb-2">Direct messages</h2>
            <div className="flex gap-3 flex-1 min-h-0">
              {/* Conversation list */}
              <div className="w-2/5 pr-2 space-y-1 text-xs overflow-y-auto" style={{ borderRight: `1px solid ${t.border}` }}>
                {conversations.map((c) => {
                  const active = activeConversationId === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setActiveConversationId(c.id)}
                      className="w-full text-left p-2 rounded-lg transition"
                      style={{ background: active ? t.goldSoft : "transparent" }}
                    >
                      <p className="font-semibold text-[11px]" style={{ color: active ? t.goldStrong : t.text }}>
                        {c.name}
                      </p>
                      <p className="truncate" style={{ color: t.subtle }}>{c.lastMessage}</p>
                    </button>
                  );
                })}
              </div>

              {/* Chat window */}
              <div className="w-3/5 flex flex-col text-xs min-h-0">
                <div
                  className="flex-1 rounded-lg p-2 overflow-y-auto mb-2"
                  style={{ border: `1px solid ${t.border}` }}
                >
                  {activeConversation ? (
                    <>
                      <p className="font-semibold mb-1.5">{activeConversation.name}</p>
                      {activeConversationMessages.length === 0 ? (
                        <p style={{ color: t.subtle }}>No messages yet. Say hi!</p>
                      ) : (
                        activeConversationMessages.map((m, idx) => (
                          <div key={idx} className={`mb-1.5 flex ${m.from === "You" ? "justify-end" : "justify-start"}`}>
                            <span
                              className="inline-block px-2.5 py-1.5 rounded-xl max-w-[85%]"
                              style={{
                                background: m.from === "You" ? t.gold : t.input,
                                color: m.from === "You" ? "#12172B" : t.text,
                              }}
                            >
                              {m.text}
                            </span>
                          </div>
                        ))
                      )}
                    </>
                  ) : (
                    <p style={{ color: t.subtle }}>Select a conversation to start messaging.</p>
                  )}
                </div>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 rounded-lg px-2 py-1.5 text-[11px] outline-none"
                    style={{ background: t.input, border: `1px solid ${t.border}`, color: t.text }}
                  />
                  <button
                    onClick={handleSendMessage}
                    aria-label="Send message"
                    className="px-2.5 rounded-lg flex items-center justify-center transition"
                    style={{ background: t.gold, color: "#12172B" }}
                  >
                    <Send size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick shared resources list */}
          <div className="rounded-2xl p-4" style={{ background: t.card, border: `1px solid ${t.border}` }}>
            <h2 className="font-semibold text-sm mb-2">Latest shared</h2>
            {sharedResources.length === 0 ? (
              <p className="text-xs" style={{ color: t.subtle }}>No shared resources yet.</p>
            ) : (
              <ul className="space-y-1.5 max-h-32 overflow-y-auto text-xs">
                {sharedResources.slice(0, 5).map((r) => (
                  <li key={r.id} className="rounded-lg p-2" style={{ border: `1px solid ${t.border}` }}>
                    <p className="truncate">{r.content}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: t.subtle }}>by {r.author}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
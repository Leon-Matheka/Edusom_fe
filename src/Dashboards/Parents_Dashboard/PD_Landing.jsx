import React from "react";
import {
  BookOpen,
  MessageCircle,
  Bell,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Quote,
} from "lucide-react";

// Brand tokens — same palette/typography as the rest of the platform
// (cool paper/ink base, marker-gold primary, teal secondary).
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
};

const features = [
  {
    icon: BookOpen,
    title: "See what's being taught",
    body: "Open any lesson to find the plan, the materials, and the links your child's teacher shared for it.",
  },
  {
    icon: MessageCircle,
    title: "Message teachers directly",
    body: "Ask a quick question about homework or a project without waiting for the next parents' evening.",
  },
  {
    icon: Bell,
    title: "Get real-time updates",
    body: "Announcements, schedule changes, and shared resources land in one place as soon as they're posted.",
  },
  {
    icon: TrendingUp,
    title: "Follow their progress",
    body: "A simple view of attendance and performance over the term, without digging through report cards.",
  },
];

const steps = [
  {
    n: "1",
    title: "Create your account",
    body: "Sign up with the email your child's school has on file — it takes about a minute.",
  },
  {
    n: "2",
    title: "Connect to your child's class",
    body: "Enter the class code from your school, or accept the invite your teacher sends you.",
  },
  {
    n: "3",
    title: "Stay in the loop",
    body: "See lessons, messages, and updates as they happen — no app-hopping or missed newsletters.",
  },
];

export default function ParentsLanding() {
  return (
    <div style={{ background: c.page, color: c.ink }} className="min-h-screen font-sans">
      {/* NAV */}
      <header className="sticky top-0 z-10" style={{ background: c.page, borderBottom: `1px solid ${c.border}` }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: c.teal }}>
              <BookOpen size={16} color={c.ink} />
            </div>
            <span className="font-serif font-semibold text-lg">ClassBridge</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm" style={{ color: c.subtle }}>
            <a href="#features" className="hover:opacity-80 transition">Features</a>
            <a href="#how-it-works" className="hover:opacity-80 transition">How it works</a>
            <a href="#faq" className="hover:opacity-80 transition">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="text-sm font-medium hidden sm:block" style={{ color: c.ink }}>
              Log in
            </button>
            <button
              className="text-sm font-medium px-4 py-2 rounded-lg transition"
              style={{ background: c.teal, color: c.ink }}
            >
              Create account
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight font-semibold">
            Know what's happening in your child's classroom, every day.
          </h1>
          <p className="mt-5 text-base leading-relaxed" style={{ color: c.subtle }}>
            ClassBridge connects you to your child's teachers, lessons, and school updates in one
            simple place — so you're never catching up after the fact.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <button
              className="flex items-center gap-2 text-sm font-medium px-5 py-3 rounded-lg transition"
              style={{ background: c.teal, color: c.ink }}
            >
              Get started free <ArrowRight size={15} />
            </button>
            <button
              className="text-sm font-medium px-5 py-3 rounded-lg transition"
              style={{ border: `1px solid ${c.border}`, color: c.ink }}
            >
              See how it works
            </button>
          </div>
          <p className="mt-4 text-xs" style={{ color: c.subtle }}>
            Free for parents. Set up in under two minutes.
          </p>
        </div>

        {/* Hero visual — a lightweight mock of the parent view */}
        <div
          className="rounded-2xl p-5"
          style={{ background: c.card, border: `1px solid ${c.border}`, boxShadow: "0 20px 40px -12px rgba(27,31,59,0.12)" }}
        >
          <div className="flex items-center gap-3 pb-4" style={{ borderBottom: `1px solid ${c.border}` }}>
            <div className="h-9 w-9 rounded-full flex items-center justify-center font-serif font-semibold" style={{ background: c.teal, color: "#fff" }}>
              A
            </div>
            <div>
              <p className="text-sm font-semibold">Amina's class — Grade 7B</p>
              <p className="text-xs" style={{ color: c.subtle }}>Mrs. Wanjiru — Mathematics</p>
            </div>
          </div>
          <div className="py-4 space-y-3">
            <div className="rounded-xl p-3" style={{ background: c.panel }}>
              <p className="text-xs font-medium" style={{ color: c.tealStrong }}>Today's lesson</p>
              <p className="text-sm mt-1">Fractions and decimals — worksheet and practice set attached.</p>
            </div>
            <div className="rounded-xl p-3" style={{ background: c.panel }}>
              <p className="text-xs font-medium" style={{ color: c.tealStrong }}>New message</p>
              <p className="text-sm mt-1">"Amina did well on today's quiz — 8/10."</p>
            </div>
          </div>
          <div className="pt-3 flex items-center gap-2 text-xs" style={{ color: c.subtle, borderTop: `1px solid ${c.border}` }}>
            <CheckCircle2 size={14} style={{ color: c.teal }} />
            Updated a few minutes ago
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-16">
        <div className="max-w-xl">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold">Everything you need, nothing you don't</h2>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: c.subtle }}>
            Built around the questions parents actually ask: what are they learning, how are they
            doing, and who do I talk to.
          </p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 gap-5">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="rounded-2xl p-5"
                style={{ background: c.card, border: `1px solid ${c.border}` }}
              >
                <div className="h-10 w-10 rounded-lg flex items-center justify-center mb-4" style={{ background: c.tealSoft }}>
                  <Icon size={18} style={{ color: c.tealStrong }} />
                </div>
                <h3 className="font-semibold text-base">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ color: c.subtle }}>{f.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="px-6 py-16" style={{ background: c.panel }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-center">Get set up in three steps</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.n} className="text-center">
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center mx-auto font-serif font-semibold"
                  style={{ background: c.teal, color: c.ink }}
                >
                  {s.n}
                </div>
                <h3 className="mt-4 font-semibold text-base">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed max-w-xs mx-auto" style={{ color: c.subtle }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <Quote size={28} style={{ color: c.teal }} className="mx-auto mb-4" />
        <p className="font-serif text-xl md:text-2xl leading-snug">
          "I used to only hear about school problems after they'd become a big deal. Now I see
          what's coming before it does."
        </p>
        <p className="mt-4 text-sm" style={{ color: c.subtle }}>
          — A parent using ClassBridge
        </p>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div
          className="rounded-2xl px-8 py-12 text-center"
          style={{ background: c.ink }}
        >
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-white">
            Ready to stay closer to your child's school day?
          </h2>
          <p className="mt-3 text-sm max-w-md mx-auto" style={{ color: "#B9BCD1" }}>
            Create your free account and connect to your child's class in a couple of minutes.
          </p>
          <button
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium px-5 py-3 rounded-lg transition"
            style={{ background: c.teal, color: c.ink }}
          >
            Create account <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${c.border}` }}>
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md flex items-center justify-center" style={{ background: c.teal }}>
              <BookOpen size={12} color={c.ink} />
            </div>
            <span className="font-serif font-semibold text-sm">ClassBridge</span>
          </div>
          <p className="text-xs" style={{ color: c.subtle }}>© {new Date().getFullYear()} ClassBridge. Built for schools, teachers, and families.</p>
        </div>
      </footer>
    </div>
  );
}
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowUpRight, Award, Target, TrendingUp, Trophy } from "lucide-react";
import { students, classAverages, getChildrenByParentId } from "../../mockData/classMockData";

// TODO: replace with the signed-in parent's real id once auth is wired up.
const CURRENT_PARENT_ID = 201;

const average = (rows) => Math.round(rows.reduce((sum, r) => sum + r.score, 0) / rows.length);

function barColor(score) {
  if (score >= 70) return "bg-primary-500";
  if (score >= 50) return "bg-secondary-400";
  return "bg-red-400";
}

function Stat({ icon: Icon, label, value, hint }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <div className="flex items-center gap-2 text-sm text-subtle">
        <Icon size={16} className="text-primary-600" /> {label}
      </div>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
      {hint && <p className="mt-0.5 text-xs text-subtle">{hint}</p>}
    </div>
  );
}

export default function ParentAnalytics() {
  const children = useMemo(() => {
    const linked = getChildrenByParentId(CURRENT_PARENT_ID);
    return linked.length > 0 ? linked : students.slice(0, 1);
  }, []);
  const [activeId, setActiveId] = useState(children[0]?.id);
  const child = children.find((c) => c.id === activeId) || children[0];
  if (!child) return null;

  const overall = average(child.performance);
  const ranking = [...students]
    .map((s) => ({ id: s.id, avg: average(s.performance) }))
    .sort((a, b) => b.avg - a.avg);
  const position = ranking.findIndex((r) => r.id === child.id) + 1;
  const classAvgOverall = Math.round(classAverages.reduce((n, r) => n + r.average, 0) / classAverages.length);

  const rows = child.performance.map((p) => {
    const classAvg = classAverages.find((c) => c.subject === p.subject)?.average ?? 0;
    return { ...p, classAvg, diff: p.score - classAvg };
  });
  const best = [...rows].sort((a, b) => b.score - a.score)[0];
  const weakest = [...rows].sort((a, b) => a.score - b.score)[0];
  const focus = [...rows].sort((a, b) => a.score - b.score).slice(0, 2);
  const first = child.name.split(" ")[0];

  const chartData = rows.map((r) => ({ subject: r.subject.slice(0, 5), [first]: r.score, "Class average": r.classAvg }));

  return (
    <div className="space-y-8">
      {children.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {children.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium ${
                c.id === child.id ? "border-primary-600 bg-primary-50 text-primary-700" : "border-border bg-white text-subtle"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}

      <div>
        <h2 className="text-2xl font-semibold">{child.name}</h2>
        <p className="mt-1 text-sm text-subtle">Grade 7B · Admission {child.admissionNo}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={TrendingUp} label="Overall average" value={`${overall}%`} hint={`Class average ${classAvgOverall}%`} />
        <Stat icon={Trophy} label="Class position" value={`${position} of ${students.length}`} />
        <Stat icon={Award} label="Strongest subject" value={best.subject} hint={`${best.score}% · ${best.grade}`} />
        <Stat icon={Target} label="Needs attention" value={weakest.subject} hint={`${weakest.score}% · ${weakest.grade}`} />
      </div>

      <section className="rounded-2xl border border-border bg-white p-6">
        <h3 className="font-semibold">{first} compared with the class</h3>
        <p className="mb-4 text-sm text-subtle">Score per subject against the Grade 7B average.</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E4DC" />
              <XAxis dataKey="subject" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis domain={[0, 100]} tickLine={false} axisLine={false} fontSize={12} width={32} />
              <Tooltip cursor={{ fill: "rgba(46,143,134,0.06)" }} />
              <Legend />
              <Bar dataKey={first} fill="#2E8F86" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Class average" fill="#A8D8D4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-border bg-white">
        <div className="p-6 pb-3">
          <h3 className="font-semibold">Subject breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-y border-border bg-panel text-left text-subtle">
                <th className="px-6 py-2.5 font-medium">Subject</th>
                <th className="px-3 py-2.5 font-medium">Teacher</th>
                <th className="px-3 py-2.5 font-medium">Score</th>
                <th className="px-3 py-2.5 font-medium">Vs class</th>
                <th className="px-3 py-2.5 font-medium">Grade</th>
                <th className="px-6 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.subject} className="border-b border-border last:border-0">
                  <td className="px-6 py-3 font-medium">{r.subject}</td>
                  <td className="px-3 py-3 text-subtle">{r.teacher}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-panel">
                        <div className={`h-full rounded-full ${barColor(r.score)}`} style={{ width: `${r.score}%` }} />
                      </div>
                      <span className="tabular-nums">{r.score}%</span>
                    </div>
                  </td>
                  <td className={`px-3 py-3 tabular-nums ${r.diff >= 0 ? "text-primary-700" : "text-red-600"}`}>
                    {r.diff >= 0 ? "+" : ""}
                    {r.diff}
                  </td>
                  <td className="px-3 py-3 font-semibold">{r.grade}</td>
                  <td className="px-6 py-3 text-right">
                    <Link to="/parent/messages" className="inline-flex items-center gap-1 text-xs font-medium text-primary-700 hover:underline">
                      Message <ArrowUpRight size={12} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-primary-50 p-6">
        <h3 className="font-semibold text-primary-800">Where to focus</h3>
        <ul className="mt-2 space-y-1.5 text-sm text-primary-900">
          {focus.map((f) => (
            <li key={f.subject}>
              {f.subject}: {f.score}% ({f.diff >= 0 ? `${f.diff} above` : `${Math.abs(f.diff)} below`} the class average). Ask {f.teacher} how to support {first} at home.
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

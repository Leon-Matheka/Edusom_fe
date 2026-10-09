import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import SubjectPerformanceChart from "../Student_Dashboard/components/SubjectPerformanceChart";
import WeakTopics from "../Student_Dashboard/components/WeakTopics";

function Analytics() {
  const [data, setData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Example: fetch combined results (CATs + Exams)
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/analytics"); // backend endpoint
        const results = await res.json();
        setData(results);
      } catch (err) {
        console.error("Error fetching analytics:", err);
      }
    }
    fetchData();
  }, []);

  // Filter student by search
  const handleSearch = () => {
    const student = data.find(
      (s) => s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSelectedStudent(student || null);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <h2 className="text-2xl font-bold text-slate-800">Performance Analytics</h2>

      {/* Overall class averages */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
        <h3 className="text-lg font-semibold mb-4">Class Averages</h3>
        <ul className="space-y-2 text-slate-700">
          {data.map((cls, i) => (
            <li key={i}>
              {cls.className} – Average: {cls.average}%
            </li>
          ))}
        </ul>
      </div>

      {/* Weak sectors */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
        <h3 className="text-lg font-semibold mb-4">Areas Needing More Explanation</h3>
        <WeakTopics topics={data.flatMap((cls) => cls.weak_topics || [])} />
      </div>

      {/* Student search */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
        <h3 className="text-lg font-semibold mb-4">Search Student Progress</h3>
        <div className="flex items-center space-x-2 mb-4">
          <Search className="text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Enter student name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Search
          </button>
        </div>

        {selectedStudent ? (
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">
              {selectedStudent.name} – Progress Overview
            </h4>
            <div className="grid md:grid-cols-2 gap-6">
              {selectedStudent.subject_summary.map((subject, i) => (
                <SubjectPerformanceChart key={i} subject={subject} />
              ))}
            </div>
            <WeakTopics topics={selectedStudent.weak_topics} />
          </div>
        ) : (
          <p className="text-slate-500">Search a student to view progress.</p>
        )}
      </div>
    </div>
  );
}

export default Analytics;
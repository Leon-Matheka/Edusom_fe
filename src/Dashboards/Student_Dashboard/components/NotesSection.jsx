import React, { useEffect, useState } from "react";
import { PenTool } from "lucide-react";

export default function NotesSection() {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("studentNotes");
    if (saved) setNotes(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("studentNotes", notes);
  }, [notes]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center space-x-2 mb-4">
        <PenTool size={18} className="text-primary-500" />
        <h2 className="text-lg font-semibold text-slate-800">Quick Notes</h2>
      </div>
      <textarea
        className="w-full h-40 p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm resize-none bg-slate-50"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write your thoughts here... (Auto-saved)"
      />
    </div>
  );
}

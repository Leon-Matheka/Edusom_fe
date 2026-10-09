import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  ChevronDown,
  ChevronUp,
  Upload,
  Link as LinkIcon,
  StickyNote,
  Plus,
  Share2,
  X,
} from "lucide-react";

export default function ResourcePlanner() {
  const currentTeacherId = "T123"; // replace with logged-in teacher ID
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Which day panel is open
  const [openDay, setOpenDay] = useState(null);
  // Which lesson (within whichever day) is open: { day, id } | null
  const [openLesson, setOpenLesson] = useState(null);
  // Day currently showing the "add lesson" mini-form
  const [addingLessonDay, setAddingLessonDay] = useState(null);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // lessonsByDay: { Monday: [ { id, time, title, resources: { files: [], links: [], notes: "" } } ], ... }
  const [lessonsByDay, setLessonsByDay] = useState(
    Object.fromEntries(days.map((d) => [d, []]))
  );

  // Notes panel (separate from per-lesson notes) — toggled from an icon, behaves like a day panel
  const [notesOpen, setNotesOpen] = useState(false);
  const [notes, setNotes] = useState("");

  const [shared, setShared] = useState([]);

  useEffect(() => {
    Papa.parse("/teachers_data.csv", {
      download: true,
      header: true,
      complete: (r) => {
        const mine = r.data.filter((c) => c.teacher_id === currentTeacherId);
        setClasses(mine);

        // Seed the Monday-Friday panels from the CSV so existing classes show up
        // as lessons a teacher can click into and add resources/notes for.
        const seeded = Object.fromEntries(days.map((d) => [d, []]));
        mine.forEach((c) => {
          if (days.includes(c.day)) {
            seeded[c.day].push({
              id: c.class_id || `${c.day}-${c.time}-${c.subject}`,
              time: c.time || "",
              title: c.class_name ? `${c.subject} — ${c.class_name}` : c.subject,
              resources: { files: [], links: [], notes: "" },
            });
          }
        });
        setLessonsByDay(seeded);
        setLoading(false);
      },
      error: () => setLoading(false),
    });
  }, []);

  const toggleDay = (day) => {
    setOpenDay(openDay === day ? null : day);
    setOpenLesson(null);
    setAddingLessonDay(null);
  };

  const toggleLesson = (day, id) => {
    const isSame = openLesson && openLesson.day === day && openLesson.id === id;
    setOpenLesson(isSame ? null : { day, id });
  };

  const updateLesson = (day, id, updater) => {
    setLessonsByDay((prev) => ({
      ...prev,
      [day]: prev[day].map((l) => (l.id === id ? updater(l) : l)),
    }));
  };

  const handleAddLesson = (e, day) => {
    e.preventDefault();
    const time = e.target.elements.time.value;
    const title = e.target.elements.title.value;
    if (!title) return;
    const newLesson = {
      id: `${day}-${Date.now()}`,
      time,
      title,
      resources: { files: [], links: [], notes: "" },
    };
    setLessonsByDay((prev) => ({ ...prev, [day]: [...prev[day], newLesson] }));
    setAddingLessonDay(null);
    setOpenLesson({ day, id: newLesson.id });
  };

  const handleLessonFileUpload = (day, id, e) => {
    const uploaded = Array.from(e.target.files).map((f) => f.name);
    updateLesson(day, id, (l) => ({
      ...l,
      resources: { ...l.resources, files: [...l.resources.files, ...uploaded] },
    }));
  };

  const handleLessonAddLink = (day, id, e) => {
    e.preventDefault();
    const url = e.target.elements.url.value;
    if (!url) return;
    updateLesson(day, id, (l) => ({
      ...l,
      resources: { ...l.resources, links: [...l.resources.links, url] },
    }));
    e.target.reset();
  };

  const handleLessonNotesChange = (day, id, value) => {
    updateLesson(day, id, (l) => ({
      ...l,
      resources: { ...l.resources, notes: value },
    }));
  };

  const handleShareLesson = (day, lesson) => {
    const label = `${day} ${lesson.time ? `(${lesson.time}) ` : ""}— ${lesson.title}`;
    setShared([...shared, label]);
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">📚 Resource Planner</h2>
          <p className="text-slate-600">
            Your teaching overview, weekly planner, and resource hub in one place.
          </p>
        </div>

        {/* Notes icon — opens/closes exactly like a day panel */}
        <button
          onClick={() => setNotesOpen(!notesOpen)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg border shadow-sm ${
            notesOpen ? "bg-green-600 text-white border-green-600" : "bg-white hover:bg-slate-50"
          }`}
          title="Personal notes"
        >
          <StickyNote size={18} />
          <span className="hidden sm:inline">Notes</span>
        </button>
      </div>

      {/* Notes panel, same collapsible behaviour as a day panel */}
      {notesOpen && (
        <div className="bg-white p-6 rounded shadow border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <StickyNote size={18} /> Personal Notes
            </h3>
            <button onClick={() => setNotesOpen(false)} className="text-slate-400 hover:text-slate-600">
              <X size={18} />
            </button>
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write down ideas, reminders, or general notes..."
            className="w-full border rounded p-2 min-h-[100px]"
          />
          <button
            onClick={() => setShared([...shared, `Note: ${notes}`])}
            className="mt-2 flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded"
          >
            <Share2 size={14} /> Save & Share Notes
          </button>
        </div>
      )}

      {/* Overview Summary */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Classes</h3>
          <p className="text-2xl">{classes.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Subjects Taught</h3>
          <p className="text-2xl">{[...new Set(classes.map((c) => c.subject))].length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">School</h3>
          <p className="text-2xl">{classes[0]?.school || "N/A"}</p>
        </div>
      </div>

      {/* Weekly Planner: Monday - Friday only */}
      <div className="bg-white p-6 rounded shadow mt-6">
        <h3 className="text-lg font-semibold mb-4">Weekly Planner</h3>
        {loading ? (
          <p>Loading schedule...</p>
        ) : (
          days.map((day) => {
            const dayLessons = lessonsByDay[day] || [];
            return (
              <div key={day} className="border rounded-lg mb-3">
                <button
                  onClick={() => toggleDay(day)}
                  className="w-full flex items-center justify-between px-4 py-2 font-semibold bg-slate-100 hover:bg-slate-200"
                >
                  <span>{day}</span>
                  {openDay === day ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {openDay === day && (
                  <div className="p-4 space-y-2">
                    {dayLessons.length === 0 && (
                      <p className="text-slate-500">No lessons scheduled.</p>
                    )}

                    {dayLessons.map((lesson) => {
                      const isOpen =
                        openLesson && openLesson.day === day && openLesson.id === lesson.id;
                      return (
                        <div key={lesson.id} className="border rounded-lg overflow-hidden">
                          <button
                            onClick={() => toggleLesson(day, lesson.id)}
                            className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 hover:bg-slate-100 text-left"
                          >
                            <div>
                              <p className="font-semibold">{lesson.title}</p>
                              {lesson.time && (
                                <p className="text-sm text-slate-500">Time: {lesson.time}</p>
                              )}
                            </div>
                            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>

                          {isOpen && (
                            <div className="p-3 space-y-4 bg-white">
                              {/* Lesson plan / notes for this specific lesson */}
                              <div>
                                <p className="text-sm font-semibold mb-1">Lesson plan</p>
                                <textarea
                                  value={lesson.resources.notes}
                                  onChange={(e) =>
                                    handleLessonNotesChange(day, lesson.id, e.target.value)
                                  }
                                  placeholder="Write the lesson plan / objectives for this lesson..."
                                  className="w-full border rounded p-2 min-h-[80px]"
                                />
                              </div>

                              {/* File resources for this lesson */}
                              <div>
                                <p className="text-sm font-semibold mb-1">Lesson materials</p>
                                <input
                                  type="file"
                                  multiple
                                  onChange={(e) => handleLessonFileUpload(day, lesson.id, e)}
                                />
                                {lesson.resources.files.length > 0 && (
                                  <ul className="mt-2 space-y-1">
                                    {lesson.resources.files.map((f, i) => (
                                      <li key={i} className="text-sm border p-2 rounded flex items-center gap-2">
                                        <Upload size={14} /> {f}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>

                              {/* Link resources for this lesson */}
                              <div>
                                <p className="text-sm font-semibold mb-1">Reference links</p>
                                <form
                                  onSubmit={(e) => handleLessonAddLink(day, lesson.id, e)}
                                  className="flex gap-2"
                                >
                                  <input
                                    type="url"
                                    name="url"
                                    placeholder="Add a reference link..."
                                    className="flex-1 border rounded px-2 py-1"
                                  />
                                  <button
                                    type="submit"
                                    className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1"
                                  >
                                    <LinkIcon size={14} /> Add
                                  </button>
                                </form>
                                {lesson.resources.links.length > 0 && (
                                  <ul className="mt-2 space-y-1">
                                    {lesson.resources.links.map((l, i) => (
                                      <li key={i} className="text-sm border p-2 rounded">
                                        <a
                                          href={l}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="text-blue-600 underline"
                                        >
                                          {l}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>

                              <button
                                onClick={() => handleShareLesson(day, lesson)}
                                className="flex items-center gap-1 text-green-600 hover:underline text-sm"
                              >
                                <Share2 size={14} /> Share this lesson
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Add a new lesson slot */}
                    {addingLessonDay === day ? (
                      <form
                        onSubmit={(e) => handleAddLesson(e, day)}
                        className="flex flex-wrap gap-2 items-center border rounded p-2"
                      >
                        <input
                          type="text"
                          name="time"
                          placeholder="Time (e.g. 9:00 - 9:40)"
                          className="border rounded px-2 py-1 w-40"
                        />
                        <input
                          type="text"
                          name="title"
                          placeholder="Lesson title / subject"
                          className="flex-1 border rounded px-2 py-1 min-w-[160px]"
                        />
                        <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">
                          Add
                        </button>
                        <button
                          type="button"
                          onClick={() => setAddingLessonDay(null)}
                          className="text-slate-500 px-2"
                        >
                          Cancel
                        </button>
                      </form>
                    ) : (
                      <button
                        onClick={() => setAddingLessonDay(day)}
                        className="flex items-center gap-1 text-sm text-green-700 hover:underline"
                      >
                        <Plus size={14} /> Add lesson
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Shared Resources */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Shared Resources</h3>
        {shared.length === 0 ? (
          <p className="text-slate-500">No resources shared yet.</p>
        ) : (
          <ul className="space-y-1">
            {shared.map((s, i) => (
              <li key={i} className="border p-2 rounded">
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

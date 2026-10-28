import { create } from "zustand";
import { teachers, students } from "../mockData/classMockData";

// One conversation per (parent, teacher) pair. Both the Parents messaging page and
// the teacher's Staffroom > Messages > Parents tab read and write the same threads,
// so a message sent on one side shows up on the other.
// In-memory only for now — swap `send` for an API call when the backend is ready.
export const threadKey = (parentId, teacherId) => `${parentId}:${teacherId}`;

function seedThreads() {
  const threads = {};
  students.forEach((s) => {
    const first = s.name.split(" ")[0];
    teachers.forEach((t) => {
      threads[threadKey(s.parent.id, t.id)] = [
        {
          from: "teacher",
          text: `Hi! Quick note on ${first}'s recent ${t.subject} work — happy to chat if you have questions.`,
          time: "Mon, 9:04 AM",
        },
      ];
    });
  });
  return threads;
}

const useMessagingStore = create((set) => ({
  threads: seedThreads(),
  // from: "parent" | "teacher"
  send: (parentId, teacherId, from, text) =>
    set((state) => {
      const key = threadKey(parentId, teacherId);
      return {
        threads: {
          ...state.threads,
          [key]: [...(state.threads[key] || []), { from, text, time: "Just now" }],
        },
      };
    }),
}));

export default useMessagingStore;

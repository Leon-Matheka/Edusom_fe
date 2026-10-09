// src/components/TeacherList.js
import React, { useEffect, useState } from "react";
import Papa from "papaparse";

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Papa.parse("/teachers_data.csv", {
      download: true,
      header: true, // use CSV headers as object keys
      complete: (result) => {
        setTeachers(result.data);
        setLoading(false);
      },
      error: (err) => {
        console.error("Error parsing CSV:", err);
        setLoading(false);
      }
    });
  }, []);

  return (
    <div>
      <h2>Teachers</h2>
      {loading ? (
        <p>Loading teacher data...</p>
      ) : (
        <ul>
          {teachers.map((t) => (
            <li key={t.teacher_id}>
              <strong>{t.full_name}</strong> — {t.subject}
              <br />
              Email: {t.email}
              <br />
              School: {t.school}
              <br />
              Experience: {t.years_experience} years
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TeacherList;
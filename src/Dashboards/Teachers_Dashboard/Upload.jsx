import { useState } from 'react';
import axios from 'axios';

function Upload() {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter(
      file => file.size <= 500 * 1024 * 1024 // 500MB limit
    );
    setFiles(validFiles);
    setMessage(""); // reset message
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setMessage("No files selected.");
      return;
    }

    try {
      const formData = new FormData();
      files.forEach(file => formData.append("files", file));

      // Adjust URL to match your FastAPI backend
      await axios.post("http://localhost:8000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Files uploaded successfully!");
      setFiles([]);
    } catch (error) {
      setMessage("❌ Upload failed. Check server connection.");
    }
  };

  return (
    <div>
      <h2>📤 Upload CATs / Exams</h2>
      <p>Select one or more files to upload. Max size: 500MB</p>

      {/* File Upload */}
      <input
        type="file"
        multiple
        onChange={handleChange}
        style={{
          padding: '0.5rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: '#fff',
        }}
      />

      {/* Scan Section */}
      <div style={{ marginTop: '1.5rem' }}>
        <h3>📷 Scan Physical CATs</h3>
        <p>Use your device camera to capture and upload exams.</p>
        <input
          type="file"
          accept="image/*"
          capture="environment"   // opens back camera on mobile
          onChange={handleChange}
          style={{
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: '#fff',
          }}
        />
      </div>

      {/* File List */}
      {files.length > 0 && (
        <ul style={{ marginTop: '1rem', paddingLeft: '1rem' }}>
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      )}

      {/* Submit Button */}
      <button
        onClick={handleUpload}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#00b894',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Submit
      </button>

      {/* Status Message */}
      {message && (
        <p style={{ marginTop: '1rem', color: '#0984e3' }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Upload;
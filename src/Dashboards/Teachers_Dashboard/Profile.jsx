function Profile() {
  return (
    <div>
      <h2>👤 Teacher Profile</h2>
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
        <img
          src="https://via.placeholder.com/150"
          alt="Teacher"
          style={{ borderRadius: '8px', width: '150px', height: '150px' }}
        />
        <div>
          <label>
            Full Name:
            <input type="text" defaultValue="Leon Otieno" style={{ marginLeft: '1rem' }} />
          </label>
          <br /><br />
          <label>
            ID Number:
            <input type="text" defaultValue="TCH-2025-001" style={{ marginLeft: '1rem' }} />
          </label>
        </div>
      </div>
      <div>
        <h3>🏆 Achievements</h3>
        <textarea rows={3} defaultValue="Best Math Teacher 2024, STEM Club Mentor" style={{ width: '100%' }} />
        <h3>📚 Teaching History</h3>
        <textarea rows={3} defaultValue="5 years teaching Mathematics and Physics at NYS" style={{ width: '100%' }} />
        <h3>🎯 Specialization</h3>
        <textarea rows={2} defaultValue="Mathematics, Physics, Data Analysis" style={{ width: '100%' }} />
      </div>
    </div>
  );
}

export default Profile;
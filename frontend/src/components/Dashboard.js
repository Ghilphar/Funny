// Dashboard.js

import React from 'react';
import axios from 'axios';

function Dashboard() {
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/logout');
      window.location.href = '/login';
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;

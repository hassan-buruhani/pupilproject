import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css'; // Import the CSS file

const Dashboard = ({ token }) => {
  const [pupilCount, setPupilCount] = useState(0);
  const [classCount, setClassCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const pupilsResponse = await axios.get('http://localhost:8000/api/pupil-count/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPupilCount(pupilsResponse.data.count);

        const classesResponse = await axios.get('http://localhost:8000/api/class-count/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClassCount(classesResponse.data.count);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };
    fetchCounts();
  }, [token]);

  return (
    <div className="container">
      <div className="header">
        <h1>School Management Dashboard</h1>
      </div>
      <div className="dashboard">
        <div className="overview">
          <h3>Overview</h3>
          <p>Total Pupils: {pupilCount}</p>
          <Link to="/pupils">View All Pupils</Link>
          <p>Total Classes: {classCount}</p>
          <Link to="/classes">View All Classes</Link>
        </div>
        <div className="manage">
          <div className="manage-link">
            <h3>Register Pupil</h3>
            <Link to="/register-pupil">Register Pupil</Link>
          </div>
          <div className="manage-link">
            <h3>Update Pupil</h3>
            <Link to="/pupilupdate">Update Pupil</Link>
          </div>
          <div className="manage-link">
            <h3>Register Guardian</h3>
            <Link to="/register-guardian">Register Guardian</Link>
          </div>
          <div className="manage-link">
            <h3>Update Guardian</h3>
            <Link to="/update-guardian">Update Guardian</Link>
          </div>
          <div className="manage-link">
            <h3>Register Class</h3>
            <Link to="/register-class">Register Class</Link>
          </div>
          <div className="manage-link">
            <h3>Update Class</h3>
            <Link to="/update-class">Update Class</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

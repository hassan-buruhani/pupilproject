import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Enrollments = ({ token }) => {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      const response = await axios.get('http://localhost:8000/api/enrollments/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEnrollments(response.data);
    };
    fetchEnrollments();
  }, [token]);

  return (
    <div>
      <h2>Enrollments</h2>
      <ul>
        {enrollments.map((enrollment) => (
          <li key={enrollment.id}>{enrollment.pupil} enrolled in {enrollment.class_assigned}</li>
        ))}
      </ul>
    </div>
  );
};

export default Enrollments;

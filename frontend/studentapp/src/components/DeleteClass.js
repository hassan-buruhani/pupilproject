import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteClass = ({ token }) => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      const classesResponse = await axios.get('http://localhost:8000/api/classes/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClasses(classesResponse.data);
    };
    fetchClasses();
  }, [token]);

  const handleDelete = async (classId) => {
    try {
      await axios.delete(`http://localhost:8000/api/classes/${classId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClasses(classes.filter((cls) => cls.id !== classId));
      alert('Class deleted successfully');
    } catch (error) {
      console.error(error);
      alert('Error deleting class');
    }
  };

  return (
    <div>
      <h2>Delete Classes</h2>
      <ul>
        {classes.map((cls) => (
          <li key={cls.id}>
            {cls.name} <button onClick={() => handleDelete(cls.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteClass;

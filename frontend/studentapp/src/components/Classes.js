import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table'; // Import the Table component

const Classes = ({ token }) => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      const response = await axios.get('http://localhost:8000/api/classes/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClasses(response.data);
    };
    fetchClasses();
  }, [token]);

  const columns = ['name', 'class_teacher'];

  return (
    <div>
      <h2>Classes</h2>
      <Table data={classes} columns={columns} />
    </div>
  );
};

export default Classes;

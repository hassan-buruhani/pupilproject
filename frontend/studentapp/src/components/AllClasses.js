import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Table.css'; // Import the CSS file

const AllClasses = ({ token }) => {
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/classes/${id}/delete/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClasses(classes.filter(classObj => classObj.id !== id));
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

  const columns = ['name', 'class_teacher', 'actions'];

  return (
    <div className="table-container">
      <h2>Classes</h2>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column.replace('_', ' ').toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {classes.map((classObj) => (
            <tr key={classObj.id}>
              <td>
                <Link to={`/update-class/${classObj.id}`}>
                  {classObj.name}
                </Link>
              </td>
              <td>{classObj.class_teacher}</td>
              <td>
                <button onClick={() => handleDelete(classObj.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllClasses;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Table.css'; // Import the CSS file

const AllGuardians = ({ token }) => {
  const [guardians, setGuardians] = useState([]);

  useEffect(() => {
    const fetchGuardians = async () => {
      const response = await axios.get('http://localhost:8000/api/guardians/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGuardians(response.data);
    };
    fetchGuardians();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/guardians/${id}/delete/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGuardians(guardians.filter(guardian => guardian.id !== id));
    } catch (error) {
      console.error('Error deleting guardian:', error);
    }
  };

  const columns = ['name', 'age', 'gender', 'phone_number', 'nida_id', 'relationship', 'pupil', 'actions'];

  return (
    <div className="table-container">
      <h2>Guardians</h2>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column.replace('_', ' ').toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {guardians.map((guardian) => (
            <tr key={guardian.id}>
              <td>
                <Link to={`/update-guardian/${guardian.id}`}>
                  {guardian.name}
                </Link>
              </td>
              <td>{guardian.age}</td>
              <td>{guardian.gender}</td>
              <td>{guardian.phone_number}</td>
              <td>{guardian.nida_id}</td>
              <td>{guardian.relationship}</td>
              <td>{guardian.pupil}</td>
              <td>
                <button onClick={() => handleDelete(guardian.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllGuardians;

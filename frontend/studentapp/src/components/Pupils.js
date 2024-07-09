import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import './Table.css'; // Import the CSS file

const Pupils = ({ token }) => {
  const [pupils, setPupils] = useState([]);

  useEffect(() => {
    const fetchPupils = async () => {
      const response = await axios.get('http://localhost:8000/api/pupils/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPupils(response.data);
    };
    fetchPupils();
  }, [token]);

  const columns = ['first_name', 'last_name', 'date_of_birth', 'gender', 'address', 'nida_id', 'current_class'];

  return (
    <div className="table-container">
      <h2>Pupils</h2>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column.replace('_', ' ').toUpperCase()}</th>
            ))}
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {pupils.map((pupil) => (
            <tr key={pupil.id}>
              <td>
                <Link to={`/update-pupil/${pupil.id}`}>
                  {pupil.first_name} {pupil.last_name}
                </Link>
              </td>
              <td>{pupil.last_name}</td>
              <td>{pupil.date_of_birth}</td>
              <td>{pupil.gender}</td>
              <td>{pupil.address}</td>
              <td>{pupil.nida_id}</td>
              <td>{pupil.current_class}</td>
              <td>
                <Link to={`/update-pupil/${pupil.id}`}>Update</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pupils;

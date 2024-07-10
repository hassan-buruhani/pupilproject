import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

const UpdateGuardian = ({ token }) => {
  const [id, setId] = useState('');
  const [guardian, setGuardian] = useState({
    name: '',
    age: '',
    gender: '',
    phone_number: '',
    nida_id: '',
    relationship: '',
    pupil_id: '',
  });

  const handleChange = (e) => {
    setGuardian({
      ...guardian,
      [e.target.name]: e.target.value,
    });
  };

  const fetchGuardian = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/guardians/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGuardian(response.data);
    } catch (error) {
      console.error(error);
      alert('Error fetching guardian');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/guardians/${id}/`, guardian, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Guardian updated successfully');
    } catch (error) {
      console.error(error);
      alert('Error updating guardian');
    }
  };

  return (
    <div>
      <h2>Update Guardian</h2>
      <div>
        <label>Guardian ID:</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button onClick={fetchGuardian}>Fetch Guardian</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Guardian Name:</label>
          <input
            type="text"
            name="name"
            value={guardian.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={guardian.age}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Gender:</label>
          <input
            type="text"
            name="gender"
            value={guardian.gender}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phone_number"
            value={guardian.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>NIDA ID:</label>
          <input
            type="text"
            name="nida_id"
            value={guardian.nida_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Relationship:</label>
          <input
            type="text"
            name="relationship"
            value={guardian.relationship}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Pupil ID:</label>
          <input
            type="text"
            name="pupil_id"
            value={guardian.pupil_id}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateGuardian;

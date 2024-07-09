import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RegisterGuardian = ({ token }) => {
  const [guardian, setGuardian] = useState({
    name: '',
    age: '',
    gender: '',
    phone_number: '',
    nida_id: '',
    relationship: '',
    pupil: '',
  });
  const [pupils, setPupils] = useState([]);

  useEffect(() => {
    const fetchPupils = async () => {
      const pupilsResponse = await axios.get('http://localhost:8000/api/pupils/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPupils(pupilsResponse.data);
    };
    fetchPupils();
  }, [token]);

  const handleChange = (e) => {
    setGuardian({
      ...guardian,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/guardians/', guardian, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Guardian registered successfully');
    } catch (error) {
      console.error(error);
      alert('Error registering guardian');
    }
  };

  return (
    <div>
      <h2>Register Guardian</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
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
          <label>Pupil:</label>
          <select name="pupil" value={guardian.pupil} onChange={handleChange} required>
            <option value="">Select a pupil</option>
            {pupils.map((pupil) => (
              <option key={pupil.id} value={pupil.id}>
                {pupil.first_name} {pupil.last_name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterGuardian;
